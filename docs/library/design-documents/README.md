# RWE / Project 2088 Design Documents

This directory is the canonical index for Project 2088 and RWE design documentation.

## Why this exists

Project 2088 documentation has grown across multiple documents, Word files, website architecture packages, Bridge schemas and development conversations. This directory gives every major design document a permanent place and defines what each document is responsible for.

## Document families

- **GDD** — Game Design Document
- **BDD** — Bridge Design Document
- **SDD** — Sound Design Document
- **TDD** — Technical Design Document / implementation architecture
- **World Bible** — lore, canon, factions, places and narrative truth
- **Level Design** — authored spaces, traversal graphs, Cells and regional topology
- **QA Design** — QA Console, telemetry interpretation and tester workflow
- **Website / Product Architecture** — RWE public records, archive and route system

## Important publication rule

The current GitHub repository is public.

Full internal Word originals are therefore **not automatically copied into this public repository**. This directory records their existence, status and authority without exposing unreleased design material.

The original files remain preserved in the owner's ChatGPT Library and can be moved into a private RWE documentation repository later.

## Authority rule

When documents overlap:

1. A newer explicitly versioned document supersedes an older version of the same document family.
2. Canonical machine schemas/code override prose where implementation behaviour is concerned.
3. The World Bible owns lore/canon.
4. The GDD owns player-facing game design.
5. The BDD/TDD owns technical architecture and transport.
6. The SDD owns audio philosophy, voice structure and audio production standards.
7. Superseded and legacy documents remain historical reference only.

See `REGISTER.md` for the complete known document register.
