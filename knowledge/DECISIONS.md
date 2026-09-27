# Canonical Decisions

Last updated: 27 September 2026

## Repository structure

**Decision:** Use one RWE development workspace with clearly separated product areas.

Current top-level product paths:

- `rwe-site/`
- `rws-site/`
- `bridge/`
- `qr-site/`
- `shared/`

## Migration safety

**Decision:** Do not delete or destructively move legacy website/public files during the first migration pass.

Reason:

Existing `docs/` content may currently back public routes. Migration should use copy → verify → switch → retire.

## The Bridge

**Decision:** The Bridge is infrastructure, not a public website.

It owns:

- canonical event contracts
- schemas
- session context
- identity resolution
- QA ingestion contracts
- API/service contracts

## Canonical events

**Decision:** Commands request actions; events record facts.

Event names use lowercase `domain.action` notation.

Examples:

- `session.started`
- `session.ended`
- `location.entered`
- `weapon.fired`
- `player.died`

Do not casually invent synonyms for registered events.

## Unreal lineage

**Decision:** Shared firearm logic should target the parent class `BP_Pistol`.

**Decision:** Shared magazine logic should target the parent class `BP_Mag`.

## QR/NFC architecture

**Decision:** Physical tags should encode stable RWE routes rather than volatile final destinations.

Pattern:

```text
physical tag
  ↓
stable RWE route
  ↓
current destination
```

This lets destinations change without rewriting tags.

## Documentation

**Decision:** `docs/library/` is the future canonical human-readable documentation library.

The old `documentation/` directory is legacy and should receive no new documentation.

## Shared project memory

**Decision:** Important project facts that must survive across chats should be recorded in `knowledge/`.

Chat memory is helpful but is not the sole source of truth.
