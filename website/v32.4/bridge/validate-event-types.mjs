import fs from "node:fs";
const path="website/v32.4/bridge/event-types.json";
const r=JSON.parse(fs.readFileSync(path,"utf8"));
const errors=[];
const ids=new Set(), names=new Set();
const wires=new Set(["WIR-001","WIR-002","WIR-003","WIR-004","WIR-005","WIR-006","WIR-007","WIR-008"]);
for(const e of r.events){
  if(ids.has(e.event_id)) errors.push("duplicate event_id "+e.event_id); ids.add(e.event_id);
  const key=e.event_name+"@"+e.version;
  if(names.has(key)) errors.push("duplicate event contract "+key); names.add(key);
  if(!/^[a-z][a-z0-9_]*\.[a-z][a-z0-9_]*$/.test(e.event_name)) errors.push("invalid event name "+e.event_name);
  if(!Number.isInteger(e.version)||e.version<1) errors.push("invalid version "+e.event_id);
  if(!wires.has(e.wire_id)) errors.push("unknown wire "+e.event_id+" -> "+e.wire_id);
  if(!Array.isArray(e.required_fields_original)||!Array.isArray(e.required_payload_fields_v324)) errors.push("bad required fields "+e.event_id);
  for(const field of e.required_payload_fields_v324){
    if(!e.required_fields_original.includes(field)) errors.push("derived payload field not in source "+e.event_id+" -> "+field);
    if(r.envelope_owned_fields.includes(field)) errors.push("envelope field leaked into v324 payload "+e.event_id+" -> "+field);
  }
}
if(r.events.length!==36) errors.push("expected 36 populated source event rows, got "+r.events.length);
if(r.dashboard_declared_total!==38) errors.push("dashboard declared count changed unexpectedly");
if(!r.health.some(h=>h.code==="EVENT_COUNT_MISMATCH"&&h.observed===36&&h.declared===38)) errors.push("count mismatch health record missing");
if(errors.length){errors.forEach(e=>console.error("ERROR:",e));process.exit(1);}
console.log("RWE Event Type Registry OK");
console.log("Events:",r.events.length);
console.log("Unique contracts:",names.size);
console.log("Source:",r.source_registry_version);
console.log("Bridge schema:",r.bridge_schema_version);
console.log("Health warning: EVENT_COUNT_MISMATCH 36/38");
