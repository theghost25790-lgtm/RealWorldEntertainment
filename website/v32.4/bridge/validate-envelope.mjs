import fs from "node:fs";

const root="website/v32.4/bridge";
const schema=JSON.parse(fs.readFileSync(root+"/canonical-event-envelope.schema.json","utf8"));
const contract=JSON.parse(fs.readFileSync(root+"/bridge-contract.json","utf8"));
const eventRegistry=JSON.parse(fs.readFileSync(root+"/event-types.json","utf8"));
const vectors=JSON.parse(fs.readFileSync(root+"/test-vectors.json","utf8"));

const examplePaths=[
  root+"/examples/location.entered.json",
  root+"/examples/weapon.fired.json",
  root+"/examples/npc.killed.json"
];

const eventMap=new Map(eventRegistry.events.map(e=>[e.event_name,e]));
const hardErrors=[];

function isUtcIso(v){
  return typeof v==="string" &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/.test(v) &&
    !Number.isNaN(Date.parse(v));
}

function eventName(v){
  return typeof v==="string" && /^[a-z][a-z0-9_]*\.[a-z][a-z0-9_]*$/.test(v);
}

function validate(e){
  const codes=[];

  for(const field of schema.required){
    if(!(field in e)) codes.push("ERR-SCH-001");
  }

  if(!eventName(e.event_name) || !eventMap.has(e.event_name)){
    codes.push("ERR-EVT-001");
    return [...new Set(codes)];
  }

  const def=eventMap.get(e.event_name);

  if(e.event_version!==def.version) codes.push("ERR-EVT-002");

  if(typeof e.event_id!=="string" || !/^EVT-[A-Za-z0-9][A-Za-z0-9_-]+$/.test(e.event_id)){
    codes.push("ERR-SCH-002");
  }
  if(e.schema_version!==contract.schema_version) codes.push("ERR-SCH-002");
  if(e.bridge_version!==contract.bridge_version) codes.push("ERR-SCH-002");
  if(!isUtcIso(e.timestamp)) codes.push("ERR-SCH-002");
  if(e.project_id!==contract.project_id) codes.push("ERR-SCH-002");
  if(!e.payload || typeof e.payload!=="object" || Array.isArray(e.payload)){
    codes.push("ERR-SCH-002");
    return [...new Set(codes)];
  }

  for(const field of def.required_payload_fields_v324){
    if(!(field in e.payload)) codes.push("ERR-SCH-001");
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

  return [...new Set(codes)];
}

for(const file of examplePaths){
  const e=JSON.parse(fs.readFileSync(file,"utf8"));
  const allowed=new Set(Object.keys(schema.properties));
  for(const field of Object.keys(e)){
    if(!allowed.has(field)) hardErrors.push(file+": unknown top-level field "+field);
  }
  const codes=validate(e);
  if(codes.length) hardErrors.push(file+": expected ACCEPT, got "+codes.join(", "));
}

const baseWeapon=JSON.parse(fs.readFileSync(root+"/examples/weapon.fired.json","utf8"));

for(const vector of vectors.vectors){
  const e=structuredClone(baseWeapon);
  for(const [field,value] of Object.entries(vector.mutate||{})) e[field]=value;
  for(const field of vector.remove||[]) delete e[field];
  for(const [field,value] of Object.entries(vector.mutate_payload||{})) e.payload[field]=value;

  const codes=validate(e);
  if(!codes.includes(vector.expected)){
    hardErrors.push(vector.id+" "+vector.name+": expected "+vector.expected+", got "+(codes.join(", ")||"ACCEPT"));
  }
}

if(eventMap.size!==eventRegistry.source_event_count){
  hardErrors.push("event-types.json: event map count mismatch");
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
console.log("Registered event types:",eventMap.size);
console.log("Valid examples:",examplePaths.length);
console.log("Negative vectors:",vectors.vectors.length);
console.log("Current build:",contract.current_build_id);
