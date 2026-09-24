# Website V32.4 — Bridge Groundwork

V32.4 connects the canonical RWE record system to Project 2088 runtime telemetry.

## V32.4.1 — Canonical Event Envelope ✅

Implemented:
- stable machine-readable event envelope;
- Project → Build → Installation → Session → Event hierarchy;
- event, schema and Bridge version fields;
- tester vs per-session player identity separation;
- UTC occurrence timestamps;
- immutable event IDs for idempotent retries;
- lowercase dot event naming;
- command/event separation;
- BP_Pistol and BP_Mag lineage rules.

Current constants:
- `project_id`: `RWE-P2088`
- `build_id`: `RWE-P2088-BUILD-098`
- `schema_version`: `CER-0.3`
- `bridge_version`: `RWE-BRIDGE-0.1`

## V32.4.2 — Machine-Readable Event Type Registry ✅

`event-types.json` contains the **36 populated source event rows** from the canonical workbook.

The source dashboard says 38, so the registry retains:
`EVENT_COUNT_MISMATCH: observed 36 / declared 38`

No missing events were invented.

## V32.4.3 — Entity / ID Resolution ✅

Resolver:
`RWE-ENTITY-0.1`

Identity classes remain separate:
- permanent canonical records;
- runtime instance IDs;
- UE5/gameplay asset identities;
- Project content FormIDs.

Canonical Build/Location IDs and runtime namespaces are type-checked. Legacy faction strings remain migration-safe.

## V32.4.4 — Session Lifecycle Contract ✅

Contract:
`RWE-SESSION-0.1`

Files:
- `session-lifecycle.json`
- `session-lifecycle.md`
- `session-lifecycle-tests.json`
- `session-record.schema.json`
- `validate-session-lifecycle.mjs`
- `examples/session-record.json`

### States

`NO_SESSION → STARTING → OPEN → OPEN_OFFLINE → REPLAYING → ENDING → CLOSED`

### Locked behaviour

- gameplay events require a valid durable session context;
- OPEN sends live;
- OPEN_OFFLINE writes immutable events to a durable local queue;
- REPLAYING preserves original event IDs and occurrence timestamps;
- new events created during replay stay behind the unresolved backlog;
- offline session.end sets `end_requested=true` instead of discarding queued evidence;
- ENDING rejects newly-created gameplay facts while final evidence flushes;
- CLOSED is immutable;
- exact duplicate event/start/end retries are idempotent;
- session build_id and installation_id are immutable bindings;
- a process restart does not silently continue gameplay in the old session;
- interrupted evidence is recovered/closed before new gameplay receives a new session_id.

### End reasons

- `user_exit`
- `test_completed`
- `application_shutdown`
- `crash_recovered`
- `forced_reset`
- `qa_terminated`
- `unknown_interruption`

### Lifecycle errors

- `ERR-SES-001 UNKNOWN_SESSION`
- `ERR-SES-002 INVALID_SESSION_STATE`
- `ERR-SES-003 SESSION_CLOSED`
- `ERR-SES-004 BUILD_SESSION_MISMATCH`
- `ERR-SES-005 INSTALLATION_SESSION_MISMATCH`
- `ERR-SES-006 SESSION_START_CONFLICT`

### QA completeness

A session is QA-complete only when it is CLOSED, closure evidence exists, and no replayable event remains unresolved.

Permanent sync/validation failures are retained as QA evidence rather than silently discarded.

## CI validation

The Bridge workflow validates:
1. Event Type Registry
2. Entity / ID Resolver
3. Session Lifecycle + Session Record
4. Canonical Event Envelope against the machine contracts

## Next

**V32.4.5 — QA Ingestion Contract**

That phase defines exactly what accepted Bridge evidence QA receives, how raw events become session timelines/flags, what QA may derive, and what stays immutable.
