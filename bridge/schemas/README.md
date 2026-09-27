# Schemas

Machine-readable contracts shared by Bridge producers and consumers.

Current groundwork:

- `canonical-event-envelope.schema.json` — stable wrapper for canonical events.
- `session-record.schema.json` — durable session record.

Schema changes must be versioned. Never silently repurpose a field that has already been emitted by a build.
