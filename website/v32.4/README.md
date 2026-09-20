# Website V32.4 — Bridge Groundwork

V32.4 begins the connection between the public/canonical RWE record system and Project 2088 runtime telemetry.

## V32.4.1 — Canonical Event Envelope

Implemented:
- stable machine-readable event envelope;
- Project → Build → Installation → Session → Event hierarchy;
- schema and Bridge version fields;
- tester vs per-session player identity separation;
- UTC timestamps;
- client-generated immutable event IDs for idempotent retries;
- session lifecycle preservation from v0.3;
- exact lowercase dot event naming;
- command/event separation;
- existing BP_Pistol and BP_Mag lineage rules preserved;
- examples using registered events only;
- zero-dependency validator;
- machine-readable negative test vectors preserving canonical CER errors.

### Current machine contract

- `project_id`: `RWE-P2088`
- `build_id`: `RWE-P2088-BUILD-098`
- `schema_version`: `CER-0.3`
- `bridge_version`: `RWE-BRIDGE-0.1`

### Preserved rejection rules

- unknown event spelling → `ERR-EVT-001`
- unsupported event version → `ERR-EVT-002`
- missing required envelope field → `ERR-SCH-001`
- invalid firearm lineage → `ERR-CLS-001`

The envelope does not redefine event-specific payloads. Those remain owned by the Canonical Event Registry.

## Next

V32.4.2 should migrate the Event Type Registry into machine-readable form, preserving exact registered names, versions, required payloads, producers, consumers, route IDs and status.
