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

A normal connected session is:

`NO_SESSION → STARTING → OPEN → ENDING → CLOSED`

An interrupted network path is:

`OPEN → OPEN_OFFLINE → REPLAYING → OPEN`

If the player requests an end while offline:

`OPEN_OFFLINE [end_requested=true] → REPLAYING → ENDING → CLOSED`

## Why offline ending does not create another state

The seven-state lifecycle remains stable.

While offline, `session.end` sets `end_requested=true` but the session stays `OPEN_OFFLINE`. It cannot safely close until queued evidence has been replayed or retained as explicit sync-failure evidence.

When connectivity returns:

1. move to REPLAYING;
2. submit the original queued events;
3. preserve their event IDs and occurrence timestamps;
4. move to ENDING after the backlog resolves;
5. finalise `session.ended`;
6. move to CLOSED.

## Event acceptance by state

| State | New gameplay evidence |
| --- | --- |
| NO_SESSION | Reject |
| STARTING | Reject |
| OPEN | Accept live |
| OPEN_OFFLINE | Accept into durable local queue |
| REPLAYING | Buffer behind the ordered replay backlog |
| ENDING | Reject newly created gameplay; flush only already-existing/final lifecycle evidence |
| CLOSED | Reject new evidence; allow idempotent acknowledgement of exact retries only |

## Offline replay

Replay does not create a second fact.

If this event occurred offline:

`EVT-WPN-84721`

then replay submits:

`EVT-WPN-84721`

again.

The following do not change:
- event_id;
- event_name/version;
- occurrence timestamp;
- session_id;
- build_id;
- installation_id;
- payload.

Backend receipt time is transport/storage metadata and is not a replacement for the canonical event timestamp.

## Queue ordering

The local queue keeps an internal queue sequence separate from the immutable event body.

Replay submits the oldest unresolved evidence first.

New events created while REPLAYING may continue to be captured, but they remain behind the older backlog until ordering is restored.

## Session identity

A valid session_id must exist before gameplay evidence begins.

For offline operation, Bridge may create a collision-resistant `SES-...` identity before backend connectivity.

Once accepted, that ID is immutable. The backend must never silently remap an offline session ID because queued event envelopes already reference it.

## Build and installation immutability

A session is bound to one:
- project_id;
- build_id;
- installation_id.

An event claiming a different build returns:

`ERR-SES-004 BUILD_SESSION_MISMATCH`

An event claiming a different installation returns:

`ERR-SES-005 INSTALLATION_SESSION_MISMATCH`

A build switch therefore creates a **new session**.

## Crash recovery

V32.4.4 deliberately does not resume new gameplay into the previous session after a process restart.

Instead:

1. recover the previous durable session metadata;
2. recover/replay its queued evidence;
3. close it with an interruption end reason;
4. retain any permanent sync failures as QA evidence;
5. create a fresh session for new gameplay.

This keeps one process run from becoming an ambiguous continuation of an earlier run.

## End reasons

Locked initial set:

- `user_exit`
- `test_completed`
- `application_shutdown`
- `crash_recovered`
- `forced_reset`
- `qa_terminated`
- `unknown_interruption`

## QA completeness

A session is QA-complete when:
- it is CLOSED;
- closure evidence exists;
- no replayable event remains unresolved.

A closed session may still be marked **complete with sync issues** when permanent validation/sync failures are retained as evidence.

That distinction is important: telemetry failure is itself useful QA evidence and must not disappear.

## New lifecycle errors

- `ERR-SES-002 INVALID_SESSION_STATE`
- `ERR-SES-003 SESSION_CLOSED`
- `ERR-SES-004 BUILD_SESSION_MISMATCH`
- `ERR-SES-005 INSTALLATION_SESSION_MISMATCH`
- `ERR-SES-006 SESSION_START_CONFLICT`

Existing:
- `ERR-SES-001 UNKNOWN_SESSION`

## Principle

**The session is the evidence boundary.**

Build tells us what software ran.  
Installation tells us where it ran.  
Session tells us which continuous play/test context produced the evidence.  
Events tell us what happened inside that context.
