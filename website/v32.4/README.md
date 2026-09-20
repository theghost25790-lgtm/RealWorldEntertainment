# Website V32.4 — Bridge Groundwork

V32.4 begins the connection between the public/canonical RWE record system and Project 2088 runtime telemetry.

## V32.4.1 — Canonical Event Envelope

Implemented:
- stable machine-readable event envelope;
- Project → Build → Installation → Session → Event hierarchy;
- schema and Bridge version fields;
- tester vs per-session player identity separation;
- UTC timestamps;
- client-generated immutable event IDs for idempotent retries;
- session lifecycle preservation from v0.3;
- exact lowercase dot event naming;
- command/event separation;
- existing BP_Pistol and BP_Mag lineage rules preserved;
- examples using registered events only;
- zero-dependency validator/test vectors.

The envelope does not redefine event-specific payloads. Those remain owned by the Canonical Event Registry.

## Next

V32.4.2 should migrate the Event Type Registry into machine-readable form, preserving exact registered names and required payloads.
