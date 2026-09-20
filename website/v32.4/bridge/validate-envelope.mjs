import fs from "node:fs";

const root = "website/v32.4/bridge";
const schema = JSON.parse(fs.readFileSync(root + "/canonical-event-envelope.schema.json","utf8"));
const contract = JSON.parse(fs.readFileSync(root + "/bridge-contract.json","utf8"));
const vectors = JSON.parse(fs.readFileSync(root + "/test-vectors.json","utf8"));

const examplePaths = [
  root + "/examples/location.entered.json",
  root + "/examples/weapon.fired.json",
  root + "/examples/npc.killed.json"
];

const registeredVersions = new Map([
  ["location.entered",1],
  ["weapon.fired",1],
  ["npc.killed",1]
]);

const hardErrors = [];

function isUtcIso(v){
  return typeof v === "string" &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/.test(v) &&
    !Number.isNaN(Date.parse(v));
}

function eventName(v){
  return typeof v === "string" && /^[a-z][a-z0-9_]*\.[a-z][a-z0-9_]*$/.test(v);
}

function validate(e){
  const codes=[];

  for(const field of schema.required){
    if(!(field in e)) codes.push("ERR-SCH-001");
  }

  if(!eventName(e.event_name) || !registeredVersions.has(e.event_name)){
    codes.push("ERR-EVT-001");
    return [...new Set(codes)];
  }

  if(e.event_version !== registeredVersions.get(e.event_name)){
    codes.push("ERR-EVT-002");
  }

  if(typeof e.event_id !== "string" || !/^EVT-[A-Za-z0-9][A-Za-z0-9_-]+$/.test(e.event_id)){
    codes.push("ERR-SCH-002");
  }
  if(e.schema_version !== contract.schema_version) codes.push("ERR-SCH-002");
  if(e.bridge_version !== contract.bridge_version) codes.push("ERR-SCH-002");
  if(!isUtcIso(e.timestamp)) codes.push("ERR-SCH-002");
  if(e.project_id !== contract.project_id) codes.push("ERR-SCH-002");
  if(!e.payload || typeof e.payload !== "object" || Array.isArray(e.payload)) codes.push("ERR-SCH-002");

  if(e.event_name === "weapon.fired" && e.payload){
    const required=["player_id","weapon_instance_id","weapon_asset","parent_class","rounds_fired","ammo_type","location_id"];
    for(const field of required) if(!(field in e.payload)) codes.push("ERR-SCH-001");
    if(e.payload.parent_class !== contract.class_contracts.firearm_parent) codes.push("ERR-CLS-001");
    if(!Number.isInteger(e.payload.rounds_fired) || e.payload.rounds_fired < 1) codes.push("ERR-SCH-002");
  }

  if(e.event_name === "location.entered" && e.payload){
    for(const field of ["player_id","location_id","previous_location_id"]){
      if(!(field in e.payload)) codes.push("ERR-SCH-001");
    }
  }

  if(e.event_name === "npc.killed" && e.payload){
    for(const field of ["player_id","npc_instance_id","npc_type","faction","killer_id","weapon_asset","location_id"]){
      if(!(field in e.payload)) codes.push("ERR-SCH-001");
    }
  }

  return [...new Set(codes)];
}

for(const file of examplePaths){
  const e=JSON.parse(fs.readFileSync(file,"utf8"));
  const allowed=new Set(Object.keys(schema.properties));
  for(const field of Object.keys(e)){
    if(!allowed.has(field)) hardErrors.push(file + ": unknown top-level field " + field);
  }
  const codes=validate(e);
  if(codes.length) hardErrors.push(file + ": expected ACCEPT, got " + codes.join(", "));
}

const baseWeapon=JSON.parse(fs.readFileSync(root + "/examples/weapon.fired.json","utf8"));

for(const vector of vectors.vectors){
  const e=structuredClone(baseWeapon);

  for(const [field,value] of Object.entries(vector.mutate || {})) e[field]=value;
  for(const field of vector.remove || []) delete e[field];
  for(const [field,value] of Object.entries(vector.mutate_payload || {})) e.payload[field]=value;

  const codes=validate(e);
  if(!codes.includes(vector.expected)){
    hardErrors.push(vector.id + " " + vector.name + ": expected " + vector.expected + ", got " + (codes.join(", ") || "ACCEPT"));
  }
}

if(contract.session_lifecycle.join(">") !== "NO_SESSION>STARTING>OPEN>OPEN_OFFLINE>REPLAYING>ENDING>CLOSED"){
  hardErrors.push("bridge-contract.json: session lifecycle drift");
}

if(contract.class_contracts.firearm_parent !== "BP_Pistol"){
  hardErrors.push("bridge-contract.json: firearm parent drift");
}
if(contract.class_contracts.magazine_parent !== "BP_Mag"){
  hardErrors.push("bridge-contract.json: magazine parent drift");
}

if(hardErrors.length){
  hardErrors.forEach((e)=>console.error("ERROR:",e));
  console.error("\nCanonical Event Envelope validation failed with " + hardErrors.length + " error(s).");
  process.exit(1);
}

console.log("RWE Bridge Canonical Event Envelope OK");
console.log("Schema:",contract.schema_version);
console.log("Bridge:",contract.bridge_version);
console.log("Valid examples:",examplePaths.length);
console.log("Negative vectors:",vectors.vectors.length);
console.log("Current build:",contract.current_build_id);
