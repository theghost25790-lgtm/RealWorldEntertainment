# Project 2088 — Persistent Summary

Last updated: 27 September 2026

## World direction

Albion/Britana is **not a dead world**.

Destruction is localised rather than universal. Ordinary life continues. Construct repairs infrastructure. Abandoned locations are noteworthy precisely because most places are occupied, maintained or socially observed.

## Social surveillance rule

A raided or empty property can create association risk.

Nearby people may:

- watch from windows or doorways
- avoid helping
- remember who entered or left
- whisper or reposition
- close curtains
- later report unusual behaviour

Desired feeling:

**Nobody stops you; everybody sees you.**

## World simulation

### Cell Health

Measures civic resilience.

Factors include:

- infrastructure
- supply
- civic continuity
- security confidence
- social cohesion
- connectivity

Faction control and Cell Health are separate.

### Conflict Pressure

Measures instability/pressure.

Factors include:

- faction pressure
- recent violence
- scarcity
- isolation
- player-caused pressure
- event triggers

Conflict can spread between cells over time and generate new events.

## World structure

Current design direction:

```text
Region
  └── Location
       └── Cells / Junctions / Strongholds / Towns / Event Cells
```

The base map can remain persistent while nearby cells load as the player approaches.

Player travel history can be represented by discovered/solid paths.

Hostile encounters can be marked separately.

## Current prototype focus

Clifton and the approach toward the city are being used as an early regional design reference.

## Core corporations

- Construct
- Anamika
- Lockhead

## Player-facing themes

- grey morality
- social observation
- functioning societies rather than universal ruin
- reconstruction and control
- Free Cities as viable alternatives
- world state changing through local events
