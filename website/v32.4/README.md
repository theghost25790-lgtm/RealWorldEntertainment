# Website V32.4 — Bridge Groundwork

V32.4 connects the canonical RWE record system to Project 2088 runtime telemetry.

## V32.4.1 — Canonical Event Envelope ✅

Implemented:
- stable machine-readable event envelope;
- Project → Build → Installation → Session → Event hierarchy;
- event, schema and Bridge version fields;
- tester vs per-session player identity separation;
- UTC timestamps;
- immutable event IDs for idempotent retries;
- v0.3 session lifecycle;
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

Files:
- `entity-resolution.json`
- `entity-resolution.md`
- `entity-resolution-tests.json`
- `validate-entity-resolution.mjs`

### Identity classes

**Permanent canonical record**
- Build
- Location
- Faction / Corporation
- Project

**Runtime instance**
- Event
- Installation
- Session
- Tester
- Player instance
- Weapon instance
- Magazine instance
- NPC instance
- Combat context

**UE5/gameplay asset**
- concrete weapon asset such as `MT-09_A` or `v57`
- concrete magazine asset

**Project content FormID**
- `F#######`

These identity classes are deliberately separate.

### Exact resolution now enforced

- `project_id` must resolve to Project 2088.
- `build_id` must resolve to a Build record.
- `location_id`, `previous_location_id`, and `next_location_id` resolve to Location records.
- runtime instance fields must match their registered namespace.
- archived Build IDs remain valid historical identities.
- titles/aliases are not accepted where a canonical `*_id` is required.

### Compatibility

CER-0.1 `faction` remains an enum/string.

Mapped legacy values:
- Construct → `RWE-P2088-FACTION-CONSTRUCT`
- Anamika → `RWE-P2088-CORP-ANAMIKA`
- Lockhead → `RWE-P2088-CORP-LOCKHEAD`

Legacy values without permanent records remain valid but advisory-unmapped:
- Scavs
- Mercenaries
- Citizens

No IDs are invented for them.

### New resolution errors

- `ERR-ID-001 UNKNOWN_CANONICAL_ID`
- `ERR-ID-002 WRONG_ENTITY_TYPE`
- `ERR-ID-003 INVALID_INSTANCE_ID`
- `ERR-ID-004 ALIAS_NOT_CANONICAL_ID`
- `WARN-ID-001 LEGACY_VALUE_UNMAPPED`

## CI validation

The Bridge workflow now validates:
1. Event Type Registry
2. Entity / ID Resolver
3. Canonical Event Envelope against both

## Next

**V32.4.4 — Session Lifecycle Contract**

That phase turns the existing lifecycle states into explicit allowed transitions, offline replay rules, open/close commands, and session acceptance tests.
