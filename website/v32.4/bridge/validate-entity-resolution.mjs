import fs from "node:fs";

const root="website/v32.4/bridge";
const resolver=JSON.parse(fs.readFileSync(root+"/entity-resolution.json","utf8"));
const master=JSON.parse(fs.readFileSync("website/v32.3/master-record-registry.json","utf8"));
const tests=JSON.parse(fs.readFileSync(root+"/entity-resolution-tests.json","utf8"));
const errors=[];

const exact=new Map(resolver.exact_entities.map(e=>[e.id,e]));
const masterById=new Map(master.records.map(r=>[r.record_id,r]));

function resolveCanonical(field,value){
  const rule=resolver.canonical_field_rules[field];
  if(!rule) return "NO_RULE";
  if(value===null && rule.nullable) return "ACCEPT";
  if(typeof value!=="string") return "ERR-ID-001";
  const entity=exact.get(value);
  if(entity){
    return rule.semantic_types.includes(entity.semantic_type) ? "ACCEPT" : "ERR-ID-002";
  }
  const aliasHit=resolver.exact_entities.find(e=>{
    const m=masterById.get(e.id);
    const values=[e.title,...(m?.aliases||[])].filter(Boolean);
    return values.some(v=>String(v).toLowerCase()===value.toLowerCase());
  });
  if(aliasHit) return "ERR-ID-004";
  return "ERR-ID-001";
}

function resolveInstance(field,value){
  const rule=resolver.runtime_instance_namespaces[field];
  if(!rule) return "NO_RULE";
  if(value===null && rule.nullable) return "ACCEPT";
  if(typeof value!=="string") return "ERR-ID-003";
  return new RegExp(rule.pattern).test(value) ? "ACCEPT" : "ERR-ID-003";
}

function resolveLegacy(field,value){
  const group=resolver.legacy_resolution[field];
  if(!group) return "NO_RULE";
  const mapped=group.accepted_mapped.find(x=>x.value===value);
  if(mapped) return mapped.canonical_id;
  if(group.accepted_unmapped.some(x=>x.value===value)) return "WARN-ID-001";
  return "WARN-ID-001";
}

for(const e of resolver.exact_entities){
  if(e.semantic_type==="project") continue;
  const source=masterById.get(e.id);
  if(!source){
    errors.push("resolver entity missing from master registry: "+e.id);
    continue;
  }
  const expectedType=e.semantic_type==="corporation"?"corporation":e.semantic_type;
  if(source.record_type!==expectedType) errors.push("type drift "+e.id+" resolver="+e.semantic_type+" master="+source.record_type);
  if(source.title!==e.title) errors.push("title drift "+e.id);
}

for(const t of tests.vectors){
  let actual;
  if(t.kind==="canonical") actual=resolveCanonical(t.field,t.value);
  else if(t.kind==="instance") actual=resolveInstance(t.field,t.value);
  else if(t.kind==="legacy") actual=resolveLegacy(t.field,t.value);
  else if(t.kind==="form_id") actual=new RegExp(resolver.asset_identity.form_id.pattern).test(t.value)?"ACCEPT":"ERR-ID-003";
  else actual="UNKNOWN_TEST_KIND";

  if(actual!==t.expected) errors.push(t.id+": expected "+t.expected+", got "+actual);
}

const ids=resolver.exact_entities.map(e=>e.id);
if(new Set(ids).size!==ids.length) errors.push("duplicate exact entity id");

if(errors.length){
  errors.forEach(e=>console.error("ERROR:",e));
  console.error("\nEntity resolution validation failed with "+errors.length+" error(s).");
  process.exit(1);
}

console.log("RWE Entity / ID Resolution OK");
console.log("Resolver:",resolver.resolver_version);
console.log("Exact entities:",resolver.exact_entities.length);
console.log("Instance namespaces:",Object.keys(resolver.runtime_instance_namespaces).length);
console.log("Canonical field rules:",Object.keys(resolver.canonical_field_rules).length);
console.log("Test vectors:",tests.vectors.length);
