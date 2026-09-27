# TDD — Technical Design Document

A standalone consolidated TDD has not yet been recovered as a dedicated Word document.

For now, the technical source of truth is distributed across:

- `/bridge/`
- `/knowledge/`
- current GDD implementation boundaries
- Unreal Engine architecture decisions

## TDD should consolidate

- UE5 Blueprint architecture
- parent/child class contracts
- interfaces
- structs
- enums
- Data Tables
- AI architecture
- save/load
- World Cell runtime representation
- WCS / CEG implementation
- ATG / streaming implementation
- performance budgets
- Meta Quest 2 / Quest 3 constraints
- Bridge client/event queue
- debugging hooks

## Confirmed technical contracts

- firearm parent: `BP_Pistol`
- magazine parent: `BP_Mag`

The TDD must not redefine canonical Bridge schemas independently of `/bridge/`.
