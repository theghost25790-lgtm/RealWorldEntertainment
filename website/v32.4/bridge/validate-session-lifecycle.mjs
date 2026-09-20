import fs from "node:fs";

const root="website/v32.4/bridge";
const c=JSON.parse(fs.readFileSync(root+"/session-lifecycle.json","utf8"));
const tests=JSON.parse(fs.readFileSync(root+"/session-lifecycle-tests.json","utf8"));
const errors=[];

function transition(from,trigger,context={}){
  if(from==="CLOSED") return "ERR-SES-002";

  if(from==="OPEN_OFFLINE" && trigger==="session.end") return "OPEN_OFFLINE";
  if(from==="REPLAYING" && trigger==="session.end") return "REPLAYING";
  if(from==="ENDING" && trigger==="network_unavailable") return "ENDING";

  const candidates=c.transitions.filter(t=>t.from===from && t.trigger===trigger);
  if(!candidates.length) return "ERR-SES-002";

  if(from==="REPLAYING" && trigger==="backlog_drained"){
    return context.end_requested ? "ENDING" : "OPEN";
  }
  if(from==="STARTING" && trigger==="session.started"){
    return context.online===false ? "ERR-SES-002" : "OPEN";
  }
  if(from==="STARTING" && trigger==="offline_start_committed"){
    return context.offline_allowed ? "OPEN_OFFLINE" : "ERR-SES-002";
  }
  if(from==="OPEN" && trigger==="session.end"){
    return c.end_reasons.includes(context.end_reason) ? "ENDING" : "ERR-SES-002";
  }
  if(from==="OPEN_OFFLINE" && trigger==="network_restored"){
    return context.queued===false ? "OPEN" : "REPLAYING";
  }
  if(from==="ENDING" && trigger==="session.ended"){
    return context.resolved ? "CLOSED" : "ERR-SES-002";
  }
  return candidates[0].to;
}

function eventPolicy(state){
  if(state==="OPEN") return "ACCEPT_LIVE";
  if(state==="OPEN_OFFLINE") return "ACCEPT_QUEUE_LOCAL";
  if(state==="REPLAYING") return "ACCEPT_BUFFER_ORDERED";
  if(state==="CLOSED") return "ERR-SES-003";
  return "ERR-SES-002";
}

function startIdempotence(t){
  const active=["STARTING","OPEN","OPEN_OFFLINE","REPLAYING","ENDING"];
  if(!active.includes(t.state)) return "ERR-SES-002";
  if(t.existing_session_id===t.requested_session_id && t.context_match) return "RETURN_EXISTING_SESSION";
  return "ERR-SES-006";
}

function endIdempotence(t){
  if(!t.same_session) return "ERR-SES-001";
  if(t.state==="ENDING") return "RETURN_ENDING";
  if(t.state==="CLOSED") return "RETURN_ALREADY_CLOSED";
  if(t.state==="OPEN_OFFLINE" || t.state==="REPLAYING") return "SET_END_REQUESTED";
  return "ERR-SES-002";
}

for(const t of tests.vectors){
  let actual;

  if(t.kind==="transition"){
    actual=transition(t.from,t.trigger,t.context);
  } else if(t.kind==="event_policy"){
    actual=eventPolicy(t.state);
  } else if(t.kind==="offline_end"){
    const state=transition(t.state,t.trigger,{});
    const endRequested=(t.state==="OPEN_OFFLINE" && t.trigger==="session.end");
    if(state!==t.expected_state || endRequested!==t.expected_end_requested){
      errors.push(t.id+": offline end mismatch");
    }
    continue;
  } else if(t.kind==="binding"){
    actual=t.session_build_id===t.event_build_id ? "ACCEPT" : "ERR-SES-004";
  } else if(t.kind==="installation_binding"){
    actual=t.session_installation_id===t.event_installation_id ? "ACCEPT" : "ERR-SES-005";
  } else if(t.kind==="replay_identity"){
    actual=(t.original.event_id===t.replayed.event_id && t.original.timestamp===t.replayed.timestamp)
      ? "ACCEPT" : "ERR-SES-002";
  } else if(t.kind==="start_idempotence"){
    actual=startIdempotence(t);
  } else if(t.kind==="end_idempotence"){
    actual=endIdempotence(t);
  } else if(t.kind==="offline_start_evidence"){
    actual=(t.state==="STARTING" && t.durable_first_event===c.source_events.started) ? "ACCEPT" : "ERR-SES-002";
  } else {
    actual="UNKNOWN_TEST";
  }

  if(actual!==t.expected){
    errors.push(t.id+": expected "+t.expected+", got "+actual);
  }
}

const expectedStates=["NO_SESSION","STARTING","OPEN","OPEN_OFFLINE","REPLAYING","ENDING","CLOSED"];
if(JSON.stringify(Object.keys(c.states))!==JSON.stringify(expectedStates)) errors.push("state set/order drift");

for(const transitionDef of c.transitions){
  if(!c.states[transitionDef.from]) errors.push("unknown transition from "+transitionDef.from);
  if(!c.states[transitionDef.to]) errors.push("unknown transition to "+transitionDef.to);
}

if(new Set(c.end_reasons).size!==c.end_reasons.length) errors.push("duplicate end_reason");
if(c.session_id_policy.immutable!==true) errors.push("session_id must be immutable");
if(c.offline_queue.preserve_event_id!==true) errors.push("replay must preserve event_id");
if(c.offline_queue.preserve_occurrence_timestamp!==true) errors.push("replay must preserve occurrence timestamp");
if(!String(c.offline_queue.offline_session_start||"").includes("session.started")) errors.push("offline start must preserve session.started evidence");
if(c.crash_recovery.resume_same_gameplay_session_after_process_restart!==false) errors.push("process restart gameplay-resume policy drift");
if(!c.idempotence?.session_start || !c.idempotence?.session_end || !c.idempotence?.event_retry) errors.push("idempotence contract incomplete");

if(errors.length){
  errors.forEach(e=>console.error("ERROR:",e));
  console.error("\nSession lifecycle validation failed with "+errors.length+" error(s).");
  process.exit(1);
}

console.log("RWE Session Lifecycle OK");
console.log("Contract:",c.contract_version);
console.log("States:",Object.keys(c.states).length);
console.log("Transitions:",c.transitions.length);
console.log("End reasons:",c.end_reasons.length);
console.log("Test vectors:",tests.vectors.length);
