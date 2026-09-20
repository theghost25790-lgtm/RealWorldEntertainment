import fs from "node:fs";

const root = "website/v32.4/bridge";
const schema = JSON.parse(fs.readFileSync(root + "/canonical-event-envelope.schema.json","utf8"));
const contract = JSON.parse(fs.readFileSync(root + "/bridge-contract.json","utf8"));

const examplePaths = [
  root + "/examples/location.entered.json",
  root + "/examples/weapon.fired.json",
  root + "/examples/npc.killed.json"
];

const registered = new Set(["location.entered","weapon.fired","npc.killed"]);
const errors = [];

function fail(file,msg){ errors.push(file + ": " + msg); }
function isUtcIso(v){ return typeof v === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/.test(v) && !Number.isNaN(Date.parse(v)); }
function eventName(v){ return typeof v === "string" && /^[a-z][a-z0-9_]*\.[a-z][a-z0-9_]*$/.test(v); }

for (const file of examplePaths) {
  const e = JSON.parse(fs.readFileSync(file,"utf8"));
  for (const field of schema.required) if (!(field in e)) fail(file,"missing required field " + field);
  const allowed = new Set(Object.keys(schema.properties));
  for (const field of Object.keys(e)) if (!allowed.has(field)) fail(file,"unknown top-level field " + field);

  if (!/^EVT-[A-Za-z0-9][A-Za-z0-9_-]+$/.test(e.event_id || "")) fail(file,"invalid event_id");
  if (!eventName(e.event_name)) fail(file,"event_name must use lowercase domain.action");
  if (!registered.has(e.event_name)) fail(file,"example event is not in the V32.4.1 registered test set");
  if (!Number.isInteger(e.event_version) || e.event_version < 1) fail(file,"invalid event_version");
  if (e.schema_version !== contract.schema_version) fail(file,"schema_version mismatch");
  if (e.bridge_version !== contract.bridge_version) fail(file,"bridge_version mismatch");
  if (!isUtcIso(e.timestamp)) fail(file,"timestamp must be ISO-8601 UTC Z");
  if (e.project_id !== contract.project_id) fail(file,"project_id mismatch");
  if (!e.build_id) fail(file,"build_id required");
  if (!e.installation_id) fail(file,"installation_id required");
  if (!e.session_id) fail(file,"session_id required");
  if (!e.source_system) fail(file,"source_system required");
  if (!e.payload || typeof e.payload !== "object" || Array.isArray(e.payload)) fail(file,"payload must be object");

  if (e.event_name === "weapon.fired") {
    const p=e.payload;
    for (const f of ["player_id","weapon_instance_id","weapon_asset","parent_class","rounds_fired","ammo_type","location_id"]) if (!(f in p)) fail(file,"weapon.fired missing payload " + f);
    if (p.parent_class !== contract.class_contracts.firearm_parent) fail(file,"weapon.fired must resolve through BP_Pistol");
    if (!Number.isInteger(p.rounds_fired) || p.rounds_fired < 1) fail(file,"rounds_fired must be >= 1");
  }

  if (e.event_name === "location.entered") {
    for (const f of ["player_id","location_id","previous_location_id"]) if (!(f in e.payload)) fail(file,"location.entered missing payload " + f);
  }

  if (e.event_name === "npc.killed") {
    for (const f of ["player_id","npc_instance_id","npc_type","faction","killer_id","weapon_asset","location_id"]) if (!(f in e.payload)) fail(file,"npc.killed missing payload " + f);
  }
}

if (contract.session_lifecycle.join(">") !== "NO_SESSION>STARTING>OPEN>OPEN_OFFLINE>REPLAYING>ENDING>CLOSED") {
  errors.push("bridge-contract.json: session lifecycle drift");
}

if (errors.length) {
  errors.forEach((e)=>console.error("ERROR:",e));
  console.error("\nCanonical Event Envelope validation failed with " + errors.length + " error(s).");
  process.exit(1);
}

console.log("RWE Bridge Canonical Event Envelope OK");
console.log("Schema:", contract.schema_version);
console.log("Bridge:", contract.bridge_version);
console.log("Examples:", examplePaths.length);
console.log("Current build:", contract.current_build_id);
