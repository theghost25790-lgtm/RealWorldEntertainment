# RWE Website V32.3 — Global Archive Search

V32.3 begins with the Master Record Registry created on 20 September 2026.

## Source of truth

`master-record-registry.json` is the canonical identity and migration registry.

A public projection is exposed at:

`/archive/records.json`

## Search rule

Only records with both `publish_ready: true` and `searchable: true` may appear in public Archive Search.

This prevents placeholder records, unrecovered lore, unpublished art metadata or provisional world entities from leaking into public results.

## First searchable objects

- Build 096D
- Build 097B
- Build 098
- Devlog 158
- Devlog 159
- Devlog 160

Devlog 157 is intentionally excluded until its original record is recovered.

SIG-001 and RWE-VA-013 remain protected migration routes and are intentionally excluded.

## Next V32.3 expansion

As source records are migrated, search can expand to Signals, Visual Archive, Locations, Corporations, Factions, People, Founders, Systems, Builds and Development Records.

The registry becomes a shared discovery layer rather than a second copy of archive content.

## Search v1.1

The search layer now supports:
- canonical IDs
- titles and aliases
- tags and system keywords
- platforms
- summaries
- verified related-record expansion
- record-type filtering
- shareable `?q=` and `?type=` URLs

Ranking prioritises exact canonical identity before descriptive metadata.

## Registry validation

`validate-registry.mjs` checks:
- duplicate canonical IDs
- duplicate canonical paths
- broken relations
- searchable records that are not publish-ready
- missing titles on searchable public records
- malformed metadata arrays
- self-relations
- multiple builds marked current

A GitHub Actions workflow runs these checks on relevant pull requests and on changes merged to `main`.
