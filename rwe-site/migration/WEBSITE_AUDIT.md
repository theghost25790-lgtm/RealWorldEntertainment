# RWE Website Migration Audit

Date: 27 September 2026  
Branch: `structure-v1`

## Safety rule

The existing public/static `docs/` site and legacy `website/` packages are **not deleted or moved in this pass**.

This prevents route breakage while the new workspace is established.

## What was found

### `website/v32.2/` — Individual Record System

Contains:

- canonical record schema
- record-page contract
- Build 096D / 097B / 098 records
- Devlog 157–161 records
- SIG-001
- RWE-VA-013

### `website/v32.3/` — Global Archive Search

Contains:

- master record registry
- searchable world/corporation records
- registry validator

### `website/v32.4/` — Bridge Groundwork

Contains:

- canonical event envelope
- event type registry
- identity/entity resolution
- session lifecycle
- Bridge validators and examples

This material belongs to **The Bridge**, not the future RWE public-site source tree.

## Migration completed

### Into `rwe-site/`

- `contracts/record.schema.json`
- `contracts/record-page-contract.md`
- `data/records/`
- `data/master-record-registry.json`
- `data/world/`
- `tools/validate-registry.mjs`

### Into `bridge/`

V32.4 groundwork has begun migration into:

- `bridge/schemas/`
- `bridge/events/`
- `bridge/qa/`
- `bridge/api/`
- `bridge/docs/`

## Existing live/public implementation

The repository's `docs/` directory currently contains the static/public record implementation including routes for:

- builds
- devlogs
- Signals
- Visual Archive
- world records
- archive/search

Those files remain in place in this pass.

## Important duplication during migration

For the moment there are intentionally two copies of some source records:

1. legacy/versioned source under `website/`
2. organised future source under `rwe-site/` or `bridge/`

The old copy is preserved for auditability until the new structure is verified.

## Next website migration stage

1. Treat `rwe-site/data/master-record-registry.json` as the candidate future registry source.
2. Run registry validation against the migrated data.
3. Map every existing public `docs/` route to its source record.
4. Build the new RWE public-site templates inside `rwe-site/`.
5. Compare generated output route-by-route with the current public implementation.
6. Only after route parity is confirmed should old `website/` packages be archived or removed.

## Do not do yet

- Do not delete `website/`.
- Do not move the current `docs/` HTML tree.
- Do not change GitHub Pages/deployment settings.
- Do not rewrite permanent public routes.
- Do not make draft records searchable merely to make counts match.
