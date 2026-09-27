# BDD — Bridge Design Document

## Foundational document

**RWE Bridge BDD v0.2 — Core Architecture**

Original:

`RWE_Bridge_BDD_v0.2_Core_Architecture.docx`

## Core principle

The Bridge enhances Project 2088; it must never become a requirement for the game to function.

## BDD owns

- cross-system identity
- product/build/install/session hierarchy
- telemetry/event transport
- offline tolerance
- event idempotence
- data architecture
- QA ingestion
- achievement infrastructure
- API boundaries
- privacy/security architecture
- UE5-to-Bridge integration

## Current machine authority

The practical continuation of the BDD now lives in:

`/bridge/`

Do not maintain a second incompatible event/schema definition inside this documentation folder.
