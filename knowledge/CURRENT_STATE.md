# Current State

Last updated: 27 September 2026

## Repository

Current repository:

`theghost25790-lgtm/RealWorldEntertainment`

Preferred future short repository name:

`RWE`

Active reorganisation branch:

`structure-v1`

## Main product areas

### RWE Site

Path:

`/rwe-site/`

Role:

Public Real World Entertainment and Project 2088 website.

Primary domain:

https://realworldentertainment.co.uk

### RWS Site

Path:

`/rws-site/`

Role:

Real World Studio services and client work.

Primary domain:

https://realworldstudio.co.uk

### The Bridge

Path:

`/bridge/`

Role:

Canonical event, schema, API, session, QA and integration infrastructure.

Current groundwork includes:

- canonical event envelope
- canonical event registry
- session lifecycle
- session record schema
- first implementation event subset

### QR Site

Path:

`/qr-site/`

Role:

Fast mobile destinations for QR codes and NFC tags.

Current routes include:

- submissions
- latest devlog
- Build 098
- Construct Terminal

### Shared

Path:

`/shared/`

Role:

Reusable assets, design tokens, common utilities and shared representations.

## Legacy areas

These remain intentionally present during migration:

- `/website/`
- `/docs/` public/static route tree
- `/documentation/`

They must not be deleted until route and content parity is confirmed.

## Documentation

Canonical human-readable documentation library:

`/docs/library/`

Player support material has been copied to:

`/docs/library/player/`

## Tablet workflow

The repository is cloned into Acode on Android.

Working model:

```text
Acode tablet
    ↕
Git
    ↕
GitHub
    ↕
ChatGPT
```

The owner can pull AI-authored changes with:

`git pull`

Push authentication should use secure GitHub authentication such as SSH, not passwords shared in chat.
