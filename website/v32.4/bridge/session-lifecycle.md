# V32.4.4 — Session Lifecycle Contract

Status: **COMPLETE / GROUNDWORK LOCKED**  
Contract: **RWE-SESSION-0.1**

## Purpose

The Session Lifecycle Contract defines when Project 2088 evidence belongs to a valid play session and what happens when connectivity, shutdown or recovery interrupts the normal path.

The canonical commands remain:
- `session.start`
- `session.end`
- `event.submit`
- `events.submit_batch`

The canonical lifecycle facts remain:
- `session.started`
- `session.ended`

Commands request action. Events record what happened.

## States

`NO_SESSION → STARTING → OPEN → OPEN_OFFLINE → REPLAYING → ENDING → CLOSED`

Not every session must visit every state.

Normal connected:
`NO_SESSION → STARTING → OPEN → ENDING → CLOSED`

Network interruption:
`OPEN → OPEN_OFFLINE → REPLAYING → OPEN`

Offline end:
`OPEN_OFFLINE [end_requested=true] → REPLAYING → ENDING → CLOSED`

## Event acceptance by state

| State | New gameplay evidence |
| --- | --- |
| NO_SESSION | Reject |
| STARTING | Reject |
| OPEN | Accept live |
| OPEN_OFFLINE | Accept into durable local queue |
| REPLAYING | Buffer behind ordered replay backlog |
| ENDING | Reject new gameplay; flush existing/final lifecycle evidence |
| CLOSED | Reject new evidence; exact duplicate retries may receive idempotent acknowledgement |

## Offline replay

Replay never creates a second fact.

The event body remains unchanged:
- event_id;
- event name/version;
- occurrence timestamp;
- session_id;
- build_id;
- installation_id;
- payload.

Backend receipt time is separate transport/storage metadata.

The local queue keeps ordering metadata outside the canonical event body and replays oldest unresolved evidence first.

## Session identity and binding

A valid `session_id` exists before gameplay evidence begins.

A session is immutably bound to one project, build and installation. A build or installation mismatch is rejected. A build switch therefore creates a new session.

## Crash recovery

A process restart does not silently resume new gameplay into the previous session.

Bridge recovers the old durable context and queued evidence, closes that session as interrupted, retains any sync failures as evidence, and starts a new session for later gameplay.

## End reasons

- `user_exit`
- `test_completed`
- `application_shutdown`
- `crash_recovered`
- `forced_reset`
- `qa_terminated`
- `unknown_interruption`

## QA completeness

A session is QA-complete when:
- state is CLOSED;
- closure evidence exists;
- no replayable evidence remains unresolved.

A CLOSED session may be complete-with-sync-issues when permanent failures are retained as explicit QA evidence.

## Offline start evidence

An offline session still creates the canonical `session.started` fact.

The transition into `OPEN_OFFLINE` is only committed after that event and the session context have been written durably. `session.started` becomes the first queued lifecycle evidence and later replays with its original event ID and timestamp.

## Idempotence

Network acknowledgement loss must not create duplicate sessions or duplicate facts.

### Repeated session.start

When the same session ID and immutable context are retried while STARTING or another active/recoverable state is bound, Bridge returns the existing session context.

A different session/context attempting to start while another is active or recoverable returns:

`ERR-SES-006 SESSION_START_CONFLICT`

### Repeated session.end

- in ENDING: return the current ending state;
- in CLOSED: return an already-closed receipt;
- in OPEN_OFFLINE or REPLAYING: keep `end_requested=true`.

A duplicate request never creates a second `session.ended` fact.

### Repeated event submission

The same `event_id` is the same fact.

An exact retry after lost acknowledgement receives an idempotent accepted/already-stored receipt rather than another event row.

## Session Record schema

`session-record.schema.json` defines the durable session object shared by Bridge and later QA ingestion.

It records:
- canonical project/build context;
- installation identity;
- optional tester/player identity;
- lifecycle state;
- creation/open/activity/end timestamps;
- end request/reason;
- recovery status;
- pending queue count/timestamps.

## Lifecycle errors

- `ERR-SES-001 UNKNOWN_SESSION`
- `ERR-SES-002 INVALID_SESSION_STATE`
- `ERR-SES-003 SESSION_CLOSED`
- `ERR-SES-004 BUILD_SESSION_MISMATCH`
- `ERR-SES-005 INSTALLATION_SESSION_MISMATCH`
- `ERR-SES-006 SESSION_START_CONFLICT`

## Principle

**The session is the evidence boundary.**

Build tells us what software ran.  
Installation tells us where it ran.  
Session tells us which continuous play/test context produced the evidence.  
Events tell us what happened inside that context.
