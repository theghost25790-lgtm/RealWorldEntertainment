# V32.4.2 — Machine-Readable Event Type Registry

Source: `Project_2088_Canonical_Event_Registry_v0.1.xlsx` → `03_Event Registry`

## Result

The canonical event table is now machine-readable without renaming its events.

- Event rows migrated: **36**
- Event IDs preserved exactly.
- Event names preserved exactly.
- Versions preserved.
- Domains and meanings preserved.
- Producer and consumer strings preserved.
- Original required fields preserved.
- Wire IDs preserved.
- Importance / high-volume / PII / category / status preserved.

## Count discrepancy

The workbook dashboard declares **38 total registered events**, while the actual Event Registry sheet contains **36 populated event rows**.

V32.4.2 treats the Event Registry sheet as authoritative.

**No two events have been invented to force the count to 38.**

The machine registry carries an `EVENT_COUNT_MISMATCH` health warning until the source workbook is reconciled.

## Envelope migration

V32.4.1 moved these context fields into the stable top-level envelope:

- `session_id`
- `build_id`
- `timestamp`

For every event, V32.4.2 therefore stores both:

- `required_fields_original` — exact workbook definition;
- `required_payload_fields_v324` — derived event payload after subtracting only envelope-owned context.

This keeps the source auditable while giving Bridge a usable runtime contract.

## Event families

- Session
- Player
- Location
- Firearm
- Magazine
- NPC
- Combat
- Interaction
- Contract
- Achievement
- QA

## Important

`player_id` has **not** been silently renamed or removed from event payload contracts.

The newer `tester_id` / `player_instance_id` identity distinction belongs to the envelope identity layer. A later explicit migration can reconcile legacy `player_id` after the project chooses the exact compatibility rule.

## Next

V32.4.3 — Entity / ID Resolution.

That phase will define how canonical IDs such as:

- `RWE-P2088-BUILD-098`
- `RWE-P2088-LOC-NEOVICTORIA`
- `RWE-P2088-FACTION-CONSTRUCT`

are resolved and validated when they appear inside event context or payloads.
