# RWE Knowledge Base

This folder is the persistent, human-readable project memory shared between the project owner and future AI sessions.

## Purpose

Use this folder for information that must remain available even when a chat ends:

- current project state
- important decisions
- canonical links
- naming rules
- architecture rules
- product relationships
- migration status
- glossary and terminology
- future priorities

## Files

- `CURRENT_STATE.md` — what is true now
- `DECISIONS.md` — decisions that should not be casually reversed
- `LINKS.md` — important domains, routes and repository locations
- `GLOSSARY.md` — canonical names and meanings
- `PROJECT_2088.md` — high-level game/world/system memory
- `WORKFLOW.md` — how the owner, tablet, GitHub and AI work together

## Design documents

Major Project 2088 design-document families are catalogued under:

`/docs/library/design-documents/`

The register includes:

- GDD revision history and current authority
- BDD foundation and Bridge continuation
- SDD revision history
- TDD scope/current technical authority
- World Bible status
- level/region design authority
- QA design authority
- legacy master notes

Before making a major design change, check:

`/docs/library/design-documents/REGISTER.md`

## Update protocol

When an important decision is made:

1. Update the relevant file.
2. Add the date.
3. Record what changed and why.
4. Avoid deleting old decisions silently; mark superseded items instead.
5. Keep secrets, passwords, private keys, personal customer data and API tokens out of this folder.

## Source-of-truth order

When information conflicts, prefer:

1. current canonical schema / code
2. current knowledge-base decision
3. current design-document register / current version
4. current project documentation
5. legacy/versioned material
6. chat recollection

## AI instruction

Future AI sessions should read `/AI_START_HERE.md`, this directory and the Design Document Register before making major structural or canonical changes.
