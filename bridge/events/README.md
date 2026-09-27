# Events

Canonical Project 2088 event definitions and examples.

## Authority

`canonical-event-registry.json` is the machine-readable event registry migrated from the V32.4 groundwork.

Do not rename events casually. Commands request actions; events record facts.

## Initial implementation subset

`definitions/core-v0.1.json` identifies the first events to wire through the implementation:

- `session.started`
- `session.ended`
- `player.died`
- `location.entered`
- `weapon.fired`

Every emitted event must use the canonical envelope in `../schemas/canonical-event-envelope.schema.json`.

Examples live in `examples/`.
