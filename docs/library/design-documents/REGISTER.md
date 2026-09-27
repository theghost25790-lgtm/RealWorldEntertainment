# Design Document Register

Last reviewed: 27 September 2026

This register records the major Project 2088 / RWE design documents currently known to the shared project workspace.

## GDD — Game Design Document

### Project 2088 GDD — World Continuity Expansion v0.1

Original file:

`Project_2088_GDD_World_Continuity_Expansion_v0.1.docx`

Date:

23 September 2026

Status:

**Superseded by v0.2**

Introduced:

- World Continuity System (WCS)
- Continuity Event Generator (CEG)
- passive infrastructure systems
- incidents
- dependencies
- propagation
- recovery
- generated-content loop

### Project 2088 GDD — World Continuity Expansion v0.2

Original file:

`Project_2088_GDD_World_Continuity_Expansion_v0.2.docx`

Date:

23 September 2026

Status:

**Superseded by v0.3**

Expanded:

- Cell archetypes
- incident lifecycle
- detection and knowledge
- mission synthesis
- faction doctrine
- off-screen simulation
- economy interaction
- VR UX
- Quest performance considerations
- worked systemic scenarios

### Project 2088 GDD — World Continuity Expansion v0.3

Original files include:

- `Project_2088_GDD_World_Continuity_Expansion_v0.3.docx`
- `Project_2088_GDD_World_Continuity_Expansion_v0.3_REISSUED.docx`

Date:

25 September 2026

Status:

**Superseded by v0.4**

Formalised the lightweight simulation representation standard:

- normalised floats as authoritative capability values
- readable enums derived from those values
- separate knowledge states
- struct-based system records
- physical asset contributions
- thresholds and hysteresis
- Blueprint-friendly data organisation

Core design phrase:

**Enums describe; floats simulate; structs organise; Data Tables configure; events make change visible.**

### Project 2088 GDD — World Continuity Expansion v0.4

Original files include:

- `Project_2088_GDD_World_Continuity_Expansion_v0.4.docx`
- `Project_2088_GDD_World_Continuity_Expansion_v0.4(1).docx`

Date:

26 September 2026

Status:

**Superseded by v0.5**

Formalised authored-space / procedural-situation level design:

- Area Traversal Graphs (ATG)
- Three Route Mesh
- route families A / B / C
- route crosslinks
- node/edge state
- encounter pins
- Situation Director
- strongpoint topology
- optional engagement
- terrain-driven connectivity
- greybox workflow

Core level rule:

**Authored geography. Systemic occupancy. Optional engagement. Persistent consequence.**

### Project 2088 GDD v0.5 — Current World Continuity Expansion

Canonical source file:

`Project_2088_GDD_v0.5_REISSUED.docx`

Related source copies:

- `Project_2088_GDD_World_Continuity_Expansion_v0.5.docx`
- `Project_2088_GDD_World_Continuity_Expansion_v0.5(1).docx`

Date:

26 September 2026

Status:

**CURRENT GDD EXPANSION**

Adds Living Regions:

- Regional Shell + Cell Streaming
- persistent and abstract Cell simulation
- Regional Escalation & Propagation System (REPS)
- faction-pressure spread
- escalation stages
- World Event Queue
- exploration-memory route tracing
- hostile encounter map marks
- resume/catch-up evaluation
- first three-Cell implementation slice

Core design rule:

**The world operates. Something changes. Somebody notices. Somebody reacts. The player may intervene. The world remembers.**

Living Region rule:

**An unloaded Cell is abstract, not paused.**

Current GDD ownership:

- game rules
- world simulation meaning
- missions
- dynamic encounters
- traversal
- player-facing consequences
- level-design principles
- design-level performance constraints

Exact UE5 implementation remains BDD/TDD territory.

---

## BDD — Bridge Design Document

### RWE Bridge BDD v0.2 — Core Architecture

Original file:

`RWE_Bridge_BDD_v0.2_Core_Architecture.docx`

Date:

13 September 2026

Status:

**Foundational working document**

Primary principle:

**The Bridge enhances Project 2088; it must never become a requirement for the game to function.**

Defines:

- Account
- Product
- Build
- Installation
- Session
- Gameplay Event
- Achievement Definition / Unlock
- QA Question / Response
- internal QA Console
- authentication boundary
- privacy-minimal data model
- offline event queue
- append-first telemetry
- product-independent architecture
- identifier strategy
- relational database direction

Original hierarchy:

`Product → Build → Installation → Session → Event`

BDD staged roadmap:

- v0.2 — Core Architecture
- v0.3 — Data Architecture
- v0.4 — Event Specification
- v0.5 — QA Console
- v0.6 — Achievement System
- v0.7 — API
- v0.8 — Security / Privacy
- v0.9 — UE5 Blueprints
- v1.0 — Ready

### Current Bridge implementation authority

Later BDD work is now represented directly in:

`/bridge/`

Important current contracts:

- `bridge/schemas/canonical-event-envelope.schema.json`
- `bridge/schemas/session-record.schema.json`
- `bridge/events/canonical-event-registry.json`
- `bridge/events/definitions/core-v0.1.json`
- `bridge/api/bridge-contract.json`
- `bridge/qa/session-lifecycle.json`

These machine-readable contracts supersede older prose where exact field names or runtime behaviour differ.

---

## SDD — Sound Design Document

### Project 2088 SDD v1

Original file:

`Project2088_Sound_Design_Document_SDD_v1.docx`

Date:

26 July 2026

Status:

**Superseded by SDD v2**

Retained as historical audio-development reference.

### Project 2088 SDD v2

Original file:

`Project2088_Sound_Design_Document_SDD_v2.docx`

Date:

26 July 2026

Status:

**CURRENT SOUND DESIGN DOCUMENT**

Title:

**Audio Philosophy, Voice Database and Quest Production Standards**

Core philosophy:

**The player should hear the world before the world explains itself.**

Defines:

- silence and uncertainty as deliberate audio tools
- Construct audio identity
- generational trauma in corporate dialogue
- hostility escalation tiers 0–5
- Blank Security voice direction
- factional voice segregation
- voice database fields
- permanent audio IDs
- quest voice production pipeline
- filename convention
- Meta Quest-focused audio production standards

Construct voice rule:

Do not perform anger. Perform certainty.

Voice database dimensions include:

- ID
- Faction
- Character
- Voice Group
- AI State
- Hostility Tier
- Trigger
- Line
- Emotion
- Cooldown
- Chance
- Priority
- production/testing status

---

## TDD — Technical Design Document

Status:

**No single standalone canonical TDD Word file located yet.**

Current technical authority is distributed through:

- `/bridge/`
- Unreal architecture rules in the knowledge base
- GDD technical boundaries
- canonical schemas and validators

Confirmed Unreal contracts include:

- `BP_Pistol` is the firearm parent class
- `BP_Mag` is the magazine parent class
- shared systems should reference parent contracts where appropriate

A standalone TDD should eventually consolidate:

- Blueprint architecture
- class hierarchy
- interfaces
- Data Tables
- structs
- enums
- save-state representation
- world simulation implementation
- streaming architecture
- Quest optimisation budgets
- Bridge client integration

---

## World Bible

Status:

**No standalone canonical World Bible file located yet.**

Current world/canon material exists across:

- `knowledge/PROJECT_2088.md`
- current GDD
- RWE world records
- Signals
- dialogue/narrative work
- approved canon decisions

The World Bible should own lore and canon rather than implementation mechanics.

---

## Level / Region Design

Current authority:

GDD v0.4 and v0.5.

Important systems:

- Area Traversal Graph
- route families A/B/C
- strongpoints
- towns
- event/encounter pins
- critical infrastructure nodes
- route-state changes
- terrain constraints
- authored greybox records
- Regional Shell
- Cell Streaming
- exploration memory
- REPS propagation

Current visual/reference work also includes Clifton Fringe region and level-design concept boards.

---

## QA Design

Current authority:

- BDD v0.2 foundation
- `bridge/qa/`
- QA architecture decisions in the knowledge base

Planned QA capabilities:

- tester profiles
- build comparisons
- session timelines
- deaths
- encounters
- routes
- flags
- achievements
- event inspection
- adaptive QA interviews
- longitudinal comparison
- later crash/performance analysis

Permanent deep-link pattern:

- `/build/<id>`
- `/session/<id>`
- `/tester/<id>`
- `/flag/<id>`
- `/achievement/<id>`
- `/event/<id>`

---

## Legacy master design notes

Original file:

`Project 2088.docx`

Date:

10 July 2026

Status:

**LEGACY / HISTORICAL REFERENCE — NOT CURRENT CANON BY DEFAULT**

Contains early:

- inventory concepts
- sound references
- dialogue
- level lists
- SPLICE statistics
- skills
- NPC classes
- world concepts
- historical timeline
- technology
- locations
- economy
- weapons

This document predates major later canon changes, including the current Albion/Britana direction. It must not automatically override newer GDD, World Bible or explicit canon decisions.

---

## Not Design Documents

The following are important records but are tracked elsewhere:

- Devlogs
- build definitions
- website release packages
- art/concept boards
- build manifests
- installation guides
- campaign documents

They may cross-reference DDs but should not be mixed into the canonical design-document register.
