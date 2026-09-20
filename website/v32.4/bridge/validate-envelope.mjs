import fs from "node:fs";

const root="website/v32.4/bridge";
const schema=JSON.parse(fs.readFileSync(root+"/canonical-event-envelope.schema.json","utf8"));
const contract=JSON.parse(fs.readFileSync(root+"/bridge-contract.json","utf8"));
const eventRegistry=JSON.parse(fs.readFileSync(root+"/event-types.json","utf8"));
const resolver=JSON.parse(fs.readFileSync(root+"/entity-resolution.json","utf8"));
const master=JSON.parse(fs.readFileSync("website/v32.3/master-record-registry.json","utf8"));
const vectors=JSON.parse(fs.readFileSync(root+"/test-vectors.json","utf8"));

const examplePaths=[
  root+"/examples/location.entered.json",
  root+"/examples/weapon.fired.json",
  root+"/examples/npc.killed.json"
];

const eventMap=new Map(eventRegistry.events.map(e=>[e.event_name,e]));
const exact=new Map(resolver.exact_entities.map(e=>[e.id,e]));
const masterById=new Map(master.records.map(r=>[r.record_id,r]));
const hardErrors=[];

function isUtcIso(v){
  return typeof v==="string" &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/.test(v) &&
    !Number.isNaN(Date.parse(v));
}

function eventName(v){
  return typeof v==="string" && /^[a-z][a-z0-9_]*\.[a-z][a-z0-9_]*$/.test(v);
}

function resolveCanonical(field,value){
  const rule=resolver.canonical_field_rules[field];
  if(!rule) return null;
  if(value===null && rule.nullable) return null;
  if(typeof value!=="string") return "ERR-ID-001";

  const entity=exact.get(value);
  if(entity){
    return rule.semantic_types.includes(entity.semantic_type) ? null : "ERR-ID-002";
  }

  const aliasHit=resolver.exact_entities.find(e=>{
    const source=masterById.get(e.id);
    const values=[e.title,...(source?.aliases||[])].filter(Boolean);
    return values.some(v=>String(v).toLowerCase()===value.toLowerCase());
  });

  return aliasHit ? "ERR-ID-004" : "ERR-ID-001";
}

function resolveInstance(field,value){
  const rule=resolver.runtime_instance_namespaces[field];
  if(!rule) return null;
  if(value===null && rule.nullable) return null;
  if(typeof value!=="string") return "ERR-ID-003";
  return new RegExp(rule.pattern).test(value) ? null : "ERR-ID-003";
}

function validate(e){
  const codes=[];
  const warnings=[];

  for(const field of schema.required){
    if(!(field in e)) codes.push("ERR-SCH-001");
  }

  if(!eventName(e.event_name) || !eventMap.has(e.event_name)){
    codes.push("ERR-EVT-001");
    return {codes:[...new Set(codes)],warnings};
  }

  const def=eventMap.get(e.event_name);

  if(e.event_version!==def.version) codes.push("ERR-EVT-002");

  if(typeof e.event_id!=="string" || !/^EVT-[A-Za-z0-9][A-Za-z0-9_-]+$/.test(e.event_id)){
    codes.push("ERR-SCH-002");
  }
  if(e.schema_version!==contract.schema_version) codes.push("ERR-SCH-002");
  if(e.bridge_version!==contract.bridge_version) codes.push("ERR-SCH-002");
  if(!isUtcIso(e.timestamp)) codes.push("ERR-SCH-002");

  const projectError=resolveCanonical("project_id",e.project_id);
  if(projectError) codes.push(projectError);

  const buildError=resolveCanonical("build_id",e.build_id);
  if(buildError) codes.push(buildError);

  for(const field of ["event_id","installation_id","session_id","tester_id","player_instance_id"]){
    if(field in e){
      const err=resolveInstance(field,e[field]);
      if(err) codes.push(err);
    }
  }

  if(!e.payload || typeof e.payload!=="object" || Array.isArray(e.payload)){
    codes.push("ERR-SCH-002");
    return {codes:[...new Set(codes)],warnings};
  }

  for(const field of def.required_payload_fields_v324){
    if(!(field in e.payload)) codes.push("ERR-SCH-001");
  }

  for(const field of Object.keys(resolver.canonical_field_rules)){
    if(field in e.payload){
      const err=resolveCanonical(field,e.payload[field]);
      if(err) codes.push(err);
    }
  }

  for(const field of Object.keys(resolver.runtime_instance_namespaces)){
    if(field in e.payload){
      const err=resolveInstance(field,e.payload[field]);
      if(err) codes.push(err);
    }
  }

  if("faction" in e.payload){
    const mapped=resolver.legacy_resolution.faction.accepted_mapped.find(x=>x.value===e.payload.faction);
    const unmapped=resolver.legacy_resolution.faction.accepted_unmapped.find(x=>x.value===e.payload.faction);
    if(!mapped && unmapped) warnings.push("WARN-ID-001");
    else if(!mapped && !unmapped) warnings.push("WARN-ID-001");
  }

  if(def.domain==="Firearm" && def.required_payload_fields_v324.includes("parent_class")){
    if(e.payload.parent_class!==contract.class_contracts.firearm_parent) codes.push("ERR-CLS-001");
  }

  if(def.domain==="Magazine" && def.required_payload_fields_v324.includes("parent_class")){
    if(e.payload.parent_class!==contract.class_contracts.magazine_parent) codes.push("ERR-CLS-002");
  }

  if(e.event_name==="weapon.fired" && "rounds_fired" in e.payload){
    if(!Number.isInteger(e.payload.rounds_fired) || e.payload.rounds_fired<1) codes.push("ERR-SCH-002");
  }

  return {codes:[...new Set(codes)],warnings:[...new Set(warnings)]};
}

for(const file of examplePaths){
  const e=JSON.parse(fs.readFileSync(file,"utf8"));
  const allowed=new Set(Object.keys(schema.properties));
  for(const field of Object.keys(e)){
    if(!allowed.has(field)) hardErrors.push(file+": unknown top-level field "+field);
  }
  const result=validate(e);
  if(result.codes.length) hardErrors.push(file+": expected ACCEPT, got "+result.codes.join(", "));
}

const baseWeapon=JSON.parse(fs.readFileSync(root+"/examples/weapon.fired.json","utf8"));

for(const vector of vectors.vectors){
  const e=structuredClone(baseWeapon);
  for(const [field,value] of Object.entries(vector.mutate||{})) e[field]=value;
  for(const field of vector.remove||[]) delete e[field];
  for(const [field,value] of Object.entries(vector.mutate_payload||{})) e.payload[field]=value;

  const result=validate(e);
  if(!result.codes.includes(vector.expected)){
    hardErrors.push(vector.id+" "+vector.name+": expected "+vector.expected+", got "+(result.codes.join(", ")||"ACCEPT"));
  }
}

if(eventMap.size!==eventRegistry.source_event_count){
  hardErrors.push("event-types.json: event map count mismatch");
}

if(contract.entity_resolution_version!==resolver.resolver_version){
  hardErrors.push("bridge-contract.json: entity resolver version mismatch");
}

if(contract.session_lifecycle.join(">")!=="NO_SESSION>STARTING>OPEN>OPEN_OFFLINE>REPLAYING>ENDING>CLOSED"){
  hardErrors.push("bridge-contract.json: session lifecycle drift");
}
if(contract.class_contracts.firearm_parent!=="BP_Pistol"){
  hardErrors.push("bridge-contract.json: firearm parent drift");
}
if(contract.class_contracts.magazine_parent!=="BP_Mag"){
  hardErrors.push("bridge-contract.json: magazine parent drift");
}

if(hardErrors.length){
  hardErrors.forEach(e=>console.error("ERROR:",e));
  console.error("\nCanonical Event Envelope validation failed with "+hardErrors.length+" error(s).");
  process.exit(1);
}

console.log("RWE Bridge Canonical Event Envelope OK");
console.log("Schema:",contract.schema_version);
console.log("Bridge:",contract.bridge_version);
console.log("Resolver:",contract.entity_resolution_version);
console.log("Registered event types:",eventMap.size);
console.log("Valid examples:",examplePaths.length);
console.log("Negative vectors:",vectors.vectors.length);
console.log("Current build:",contract.current_build_id);
