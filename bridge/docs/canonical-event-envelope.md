# V32.4.1 — Canonical Event Envelope

Status: **LOCKED FOR BRIDGE GROUNDWORK**  
Date: **20 September 2026**

## Purpose

The Canonical Event Envelope gives UE5, RWE Bridge, the Event Validator, Event Store, QA, Achievements and Analytics one stable wrapper for every canonical Project 2088 event.

It does **not** replace the Canonical Event Registry.

The registry remains authoritative for:
- exact event names;
- event versions;
- producers and consumers;
- event-specific required payload;
- class-lineage rules;
- canonical errors;
- routing/wire rules.

This envelope standardises the context around those registered facts.

## Canonical hierarchy

Project → Build → Installation → Session → Event

Every canonical gameplay/QA event can therefore be traced upward to the exact build and installed game instance that produced it.

## Locked top-level fields

| Field | Required | Meaning |
| --- | --- | --- |
| event_id | Yes | Unique immutable occurrence ID. Client generated. The same ID is reused when retrying the same event. |
| event_name | Yes | Exact registered lowercase `domain.action` event name. |
| event_version | Yes | Version of that event contract. |
| schema_version | Yes | Canonical schema/registry version used to validate the event. |
| bridge_version | Yes | RWE Bridge contract/producer version. |
| timestamp | Yes | ISO-8601 UTC occurrence time. |
| project_id | Yes | Canonical project/product identity. |
| build_id | Yes | Canonical build identity. |
| installation_id | Yes | Installed game-instance identity. |
| session_id | Yes | Session identity. |
| source_system | Yes | Authorised producer/source system. |
| tester_id | Nullable | Longitudinal QA tester identity. |
| player_instance_id | Nullable | Per-session player actor identity. |
| payload | Yes | Event-specific canonical payload. |

## Identity separation

`tester_id` and `player_instance_id` are deliberately separate.

**tester_id** answers:
> Which tester/person does this QA history belong to over time?

**player_instance_id** answers:
> Which player actor inside this particular session produced or received this event?

An anonymous/local QA run may have `tester_id: null` while still having a valid session and player instance.

## Version discipline

Three versions serve different purposes:

- `event_version` — version of the individual event contract such as `weapon.fired`.
- `schema_version` — version of the canonical schema/registry used to validate the message.
- `bridge_version` — version of the Bridge implementation/transport contract that emitted or wrapped it.

Do not rename a live event in place. Add a new event version and migrate deliberately.

## Naming discipline

Canonical event names remain lowercase dot notation:

- `session.started`
- `player.died`
- `location.entered`
- `weapon.fired`
- `npc.killed`

Do not invent synonyms such as `weapon.pickup` when the registry says `weapon.picked_up`.

## Commands are not events

Commands request action. Events record facts.

Examples:

- command: `session.start`
- event: `session.started`

- command: `event.submit`
- accepted canonical event: whatever registered fact was submitted

The Bridge must never convert an imperative command into a differently named gameplay fact.

## Retry and immutability rule

Canonical events are append-first.

If transport fails and the client retries the same event, it sends the same `event_id`. The backend can therefore make submission idempotent without creating duplicate facts.

Once accepted into the Event Store, the canonical event is immutable. Corrections should be represented by explicit later records rather than destructive editing.

## Session lifecycle

V32.4 preserves the v0.3 session lifecycle:

`NO_SESSION → STARTING → OPEN → OPEN_OFFLINE → REPLAYING → ENDING → CLOSED`

Rules:
- gameplay events normally require an OPEN session;
- OPEN_OFFLINE may queue events locally;
- REPLAYING submits queued events with their original IDs and original occurrence timestamps;
- ENDING accepts only lifecycle-safe finalisation traffic;
- CLOSED does not accept new gameplay events.

## Payload migration note

The v0.1 Event Registry still contains event-specific `player_id` requirements.

V32.4.1 does not silently rewrite those rows.

The new `player_instance_id` field is the v0.3 identity-layer distinction. Event-specific payload cleanup belongs to V32.4.2 / the Event Type Registry migration. Until then, registered v0.1 payload fields remain valid exactly as written.

## Class lineage

The existing confirmed UE5 contracts remain unchanged:

- firearm events must resolve through `BP_Pistol`;
- magazine events must resolve through `BP_Mag`.

Concrete assets such as `MT-09_A`, `v57` or a magazine child can change without changing the semantic parent contract.

## First Bridge constants

For V32.4 groundwork:

- Project 2088 project identity: `RWE-P2088`
- Current build identity: `RWE-P2088-BUILD-098`
- Envelope schema version: `CER-0.3`
- Initial Bridge contract version: `RWE-BRIDGE-0.1`

These constants are machine-readable in `bridge-contract.json`.

## Validation order

1. Validate envelope syntax.
2. Resolve `event_name` in Event Registry.
3. Validate `event_version`.
4. Resolve build/session/installation context.
5. Authorise `source_system`.
6. Validate event-specific payload.
7. Validate class lineage where relevant.
8. Accept and persist immutable event, or reject using canonical error codes.
9. Route only accepted events to QA, Achievements, Analytics or other authorised consumers.

## Boundary

**Bridge records facts. QA interprets them. Evidence preserves what happened.**
