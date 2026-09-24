# V32.4.3 — Entity / ID Resolution

Status: **COMPLETE / GROUNDWORK LOCKED**  
Resolver: **RWE-ENTITY-0.1**

## Why this exists

Project 2088 now has several kinds of identity. They must not be treated as interchangeable.

### 1. Permanent canonical records

Examples:
- `RWE-P2088-BUILD-098`
- `RWE-P2088-LOC-NEOVICTORIA`
- `RWE-P2088-FACTION-CONSTRUCT`

These resolve against the RWE Master Record Registry and remain stable over time.

### 2. Runtime instances

Examples:
- `SES-...`
- `NPCI-...`
- `WPNI-...`
- `MAGI-...`
- `CMB-...`

These identify occurrences or spawned objects during play. They belong to session evidence and are not public archive records.

### 3. UE5 child asset identities

Examples already present in the Canonical Event Registry:
- `MT-09_A`
- `v57`
- `Mac 10`

A weapon asset remains a concrete UE5/gameplay child identity. It is validated semantically through `BP_Pistol`; it does not become an RWE archive record simply because telemetry mentions it.

Magazine children follow `BP_Mag`.

### 4. Project asset FormIDs

The Project 2088 Asset Database defines permanent content FormIDs using:

`F#######`

Example:
`F0300042`

These are content/asset database identities, separate from runtime instances and from gameplay child asset names.

## Canonical ID rules

Fields ending in a locked canonical ID contract must contain the actual ID.

Valid:

`location_id: RWE-P2088-LOC-NEOVICTORIA`

Invalid:

`location_id: Neo Victoria`

The human title is an alias/lookup term, not the canonical field value.

## Type safety

An ID can exist and still be wrong for the field.

For example:

`build_id: RWE-P2088-LOC-NEOVICTORIA`

must fail because the ID resolves to a Location, not a Build.

## Archived records

Archived builds remain valid identities.

`RWE-P2088-BUILD-096D`

still resolves even though Build 098 is current. Historical QA/event evidence must never become invalid merely because a newer build exists.

## Faction compatibility

CER-0.1 currently stores `faction` as an enum/string.

V32.4.3 therefore does not silently rewrite it.

Mapped legacy values:
- Construct → `RWE-P2088-FACTION-CONSTRUCT`
- Anamika → `RWE-P2088-CORP-ANAMIKA`
- Lockhead → `RWE-P2088-CORP-LOCKHEAD`

Known legacy faction values without permanent world records remain accepted but unresolved:
- Scavs
- Mercenaries
- Citizens

They return advisory `WARN-ID-001`, not fabricated IDs.

## New canonical resolution errors

- `ERR-ID-001 UNKNOWN_CANONICAL_ID`
- `ERR-ID-002 WRONG_ENTITY_TYPE`
- `ERR-ID-003 INVALID_INSTANCE_ID`
- `ERR-ID-004 ALIAS_NOT_CANONICAL_ID`

## Validation order

For an event:
1. validate envelope structure;
2. resolve event type/version;
3. resolve project/build context;
4. validate runtime instance namespaces;
5. validate event payload fields;
6. resolve canonical location fields;
7. resolve advisory legacy faction mappings;
8. validate BP_Pistol / BP_Mag lineage;
9. persist or reject;
10. route accepted evidence.

## Important boundary

**A record ID says what something is across the ecosystem.**

**An instance ID says which occurrence of it existed during a particular run.**

**An asset identity says which concrete game/content asset was involved.**

Keeping these separate is what lets Website, Bridge, QA and UE5 share data without confusing a world concept with one spawned object.
