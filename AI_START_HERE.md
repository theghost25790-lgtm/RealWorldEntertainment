# AI START HERE

This repository contains the canonical shared project memory for Real World Entertainment.

If you are ChatGPT or another assistant working on this project, read this file first, then open:

- `knowledge/README.md`
- `knowledge/CURRENT_STATE.md`
- `knowledge/DECISIONS.md`
- `knowledge/LINKS.md`
- `knowledge/GLOSSARY.md`

## Rule

The GitHub knowledge base is the persistent source of truth for project facts that must survive across chats.

Chat memory may help with continuity, but important project decisions should be written into `knowledge/`.

## Current workspace

Primary development areas:

- `rwe-site/` — Real World Entertainment public website
- `rws-site/` — Real World Studio
- `bridge/` — shared backend/event/QA integration layer
- `qr-site/` — QR/NFC mobile access experiences
- `shared/` — reusable assets/code/schemas
- `docs/library/` — documentation library

Active reorganisation branch:

- `structure-v1`

Do not delete legacy `website/`, `docs/` public routes, or `documentation/` copies until migration parity has been verified.
