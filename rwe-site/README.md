# RWE Site

The public website for **Real World Entertainment (RWE)** and the main public home of **Project 2088**.

## Primary domain

- https://realworldentertainment.co.uk

## Purpose

This area contains the public-facing RWE experience. It should explain what RWE is, present Project 2088 clearly, preserve development history, provide build and testing information, and act as the public index into RWE material.

## Main content areas

- Project 2088
- Devlogs and development records
- Build archive and installation information
- Visual Archive
- Signals / in-world articles
- Britana, London and Neo-Victoria world pages
- Timeline and lore records
- Founders pages
- Gallery
- Art submissions
- Public documentation
- Important links / directory

## Record-first structure

Important public records should have permanent, directly linkable pages rather than existing only inside collection pages.

Examples:

- `/devlog/<id>`
- `/signal/<id>`
- `/visual/<id>`
- `/build/<id>`

Existing examples in the current site plan include:

- `/devlog/158`
- `/signal/SIG-001`
- `/visual/RWE-VA-013`
- `/build/098`

## Build distribution

Large game packages should **not** be committed directly to the normal Git repository.

Use repository records for:

- build metadata
- release notes
- checksums
- installation instructions
- links to the actual release package

Packaged Project 2088 builds should continue to use GitHub Releases or another dedicated distribution route.

## Project 2088 public principles

The public website should consistently reflect the current world direction:

- Albion is a living world, not a universal wasteland.
- Abandoned places are noteworthy because most places are occupied or functioning.
- Construct continuously repairs and maintains infrastructure.
- Free Cities are viable societies, not simply ruined spaces.
- World information should distinguish faction control from civic health.

## Submission route

Current art-submission route:

- https://realworldentertainment.co.uk/submissions

Submission/admin systems must keep review and approval separate from public display.

## Development rules

- Do not break existing live routes during migration.
- Existing `website/` content remains the source to audit before moving files here.
- Prefer permanent URLs for records.
- Keep public copy distinct from internal design documentation.
- Do not commit passwords, API keys, private tokens, customer data or admin secrets.
- Avoid unnecessary duplicated assets; reusable assets belong in `../shared/`.

## Near-term priorities

1. Audit the existing `website/` tree.
2. Map every live route to its future location.
3. Migrate without breaking existing public links.
4. Consolidate public navigation and the important-links directory.
5. Reconcile devlog/build archive records.
6. Connect shared branding and components from `../shared/`.

## Status

**Migration scaffold.** Do not delete the existing `website/` tree until the replacement has been checked route-by-route.
