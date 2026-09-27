# RWE Development Workspace Structure

This repository is being reorganised into four primary product areas.

```text
RWE repository
├── rwe-site/
│   └── Real World Entertainment public website
├── rws-site/
│   └── Real World Studio website and client services
├── bridge/
│   └── Backend, canonical events, QA and integrations
├── qr-site/
│   └── QR/NFC landing pages and lightweight experiences
├── shared/
│   └── Reusable code, assets and schemas
├── builds/
├── campaigns/
├── docs/
└── .github/
```

## Migration rule

Existing live files stay in place until their destination has been checked.
Nothing should be deleted simply to make the repository look tidy.

## Naming

Use lowercase folder names with hyphens for paths.
Use product display names in UI and documentation:

- RWE
- RWS
- The Bridge
- QR Site

## Working branches

- `main` — stable / published material
- `structure-v1` — repository reorganisation and migration work

## Next migration targets

1. Audit the current `website/` folder.
2. Decide what moves to `rwe-site/`.
3. Consolidate `docs/` and `documentation/`.
4. Establish the first Bridge schemas.
5. Create a mobile-first QR/NFC page template.
