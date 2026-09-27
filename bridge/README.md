# The Bridge

**The Bridge** is the shared RWE data, event and integration layer connecting Project 2088, QA, achievements, websites and future services.

It is infrastructure rather than a public-facing website.

## Core purpose

The Bridge should provide one canonical language for RWE systems so that the game, QA tools, websites and backend services do not each invent incompatible versions of the same event or identifier.

```text
Project 2088 / UE5
        │
        ▼
    The Bridge
        │
 ┌──────┼─────────┐
 ▼      ▼         ▼
QA   Achievements  RWE services
```

## Planned areas

```text
bridge/
├── api/
├── schemas/
├── events/
├── qa/
├── achievements/
├── database/
├── ue5/
├── security/
└── docs/
```

## BDD roadmap

The Bridge Design Document is being developed toward v1.0:

- **v0.2 — Core Architecture**
  Identity, products, builds, events, QA and achievements.
- **v0.3 — Data Architecture**
  Tables, relationships, fields, IDs and retention.
- **v0.4 — Event Specification**
  Canonical UE5 events and payloads.
- **v0.5 — QA Console**
  Screens, filters, comparisons, sessions and adaptive questions.
- **v0.6 — Achievement System**
  Achievement definitions, accounts, offline queue and notifications.
- **v0.7 — API**
  Service boundaries and interfaces.
- **v0.8 — Security / Privacy**
  Permissions, retention, authentication and data handling.
- **v0.9 — UE5 Blueprints**
  Engine integration patterns.
- **v1.0 — Ready**
  Implementable canonical specification.

## Canonical entities

The Bridge should eventually define stable IDs and schemas for at least:

- product
- game build
- tester
- test session
- event
- world cell
- encounter
- death
- route
- flag
- achievement
- feedback
- QA interview
- asset/record references

## Canonical event principle

An event should have one authoritative definition.

Example conceptual envelope:

```json
{
  "event_id": "E8D391",
  "event_type": "example.event",
  "schema_version": "1.0",
  "product": "project2088",
  "build": "098",
  "session_id": "82F91",
  "timestamp": "...",
  "payload": {}
}
```

The exact production schema belongs in `schemas/` and must be versioned.

## QA Console relationship

QA is a first-class Bridge consumer, not an afterthought.

Planned deep-link patterns include:

- `/build/<id>`
- `/session/<id>`
- `/tester/<id>`
- `/flag/<id>`
- `/achievement/<id>`
- `/event/<id>`

The QA interface is intended to work as a lightweight PWA on mobile with fuller tooling on desktop.

## Adaptive QA

The QA system is expected to support:

- tester profiles
- build comparisons
- session timelines
- deaths
- encounters
- routes
- event inspection
- feedback
- achievements
- longitudinal comparison
- adaptive follow-up questions
- later crash/performance information

## Unreal Engine integration

Project 2088 should emit canonical events rather than website-specific or QA-specific events.

Important engine architecture convention already established:

- `BP_Pistol` is the firearm parent.
- `BP_Mag` is the magazine parent.
- Shared calls should target parent classes wherever appropriate rather than hard-coding individual child assets.

## Privacy and security rules

Never commit:

- passwords
- authentication secrets
- private API keys
- database credentials
- personally identifying tester data
- production access tokens

Schemas should define what data is necessary before implementation begins.

RWE's public privacy principle remains:

> We will never sell your information.

## Implementation priorities

1. Establish directory structure.
2. Define ID conventions.
3. Create canonical event envelope.
4. Create schema-version rules.
5. Define Build, Tester and Session entities.
6. Implement the first QA event flow.
7. Add validation/test fixtures.
8. Connect UE5 only after the contract is stable enough to test.

## Status

**Architecture/scaffold stage.** The BDD remains the authoritative design source while implementation begins.
