# Website V32.4 — Bridge Groundwork

V32.4 connects the canonical RWE record system to Project 2088 runtime telemetry.

## V32.4.1 — Canonical Event Envelope ✅

Implemented:
- stable machine-readable event envelope;
- Project → Build → Installation → Session → Event hierarchy;
- event, schema and Bridge version fields;
- tester vs per-session player identity separation;
- UTC timestamps;
- client-generated immutable event IDs for idempotent retries;
- v0.3 session lifecycle;
- lowercase dot event naming;
- command/event separation;
- BP_Pistol and BP_Mag lineage rules;
- canonical examples and negative test vectors.

### Current machine contract

- `project_id`: `RWE-P2088`
- `build_id`: `RWE-P2088-BUILD-098`
- `schema_version`: `CER-0.3`
- `bridge_version`: `RWE-BRIDGE-0.1`

## V32.4.2 — Machine-Readable Event Type Registry ✅

The exact populated rows from the canonical workbook's `03_Event Registry` are now exported into:

`website/v32.4/bridge/event-types.json`

Preserved per event:
- Event ID
- canonical event name
- version
- domain
- meaning
- producer
- consumers
- original required fields
- V32.4 derived payload fields
- wire ID
- importance
- high-volume flag
- PII flag
- category
- status

The envelope validator now resolves event names and versions from this registry rather than a hard-coded three-event test set.

### Registry health finding

The workbook dashboard declares **38 total registered events**, while the actual Event Registry sheet contains **36 populated rows**.

The machine registry therefore records:

`EVENT_COUNT_MISMATCH: observed 36 / declared 38`

No missing events were invented.

### Required-field migration

The original workbook fields remain in `required_fields_original`.

V32.4 runtime payload fields are derived into `required_payload_fields_v324` by subtracting only:
- `session_id`
- `build_id`
- `timestamp`

Those fields now live in the stable V32.4.1 envelope.

Legacy `player_id` remains untouched until an explicit identity migration is designed.

## Validation

CI now validates both:
1. the machine Event Type Registry;
2. the Canonical Event Envelope against that registry.

## Next

**V32.4.3 — Entity / ID Resolution**

This will define how Build, Location, Faction, NPC, weapon and other canonical identifiers resolve across Website Registry → Bridge → QA → UE5.
