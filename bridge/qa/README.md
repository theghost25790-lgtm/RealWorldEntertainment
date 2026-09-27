# QA

Bridge-side contracts that support the separate RWE QA Console.

## Current groundwork

- `session-lifecycle.json`
- `session-lifecycle-tests.json`

QA consumes canonical evidence; it does not redefine gameplay facts.

Planned consumers include tester profiles, sessions, event timelines, deaths, encounters, routes, flags, achievements, adaptive interviews and later crash/performance evidence.

Deep-link targets planned for the QA product include:

- `/build/<id>`
- `/session/<id>`
- `/tester/<id>`
- `/flag/<id>`
- `/achievement/<id>`
- `/event/<id>`
