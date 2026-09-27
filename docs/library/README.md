# RWE Documentation Library

This is the canonical documentation library inside the existing `docs/` tree.

The existing HTML files in `docs/` also serve public/static routes, so they remain in place. New human-readable documentation should be organised under `docs/library/` rather than added to the legacy top-level `documentation/` directory.

## Library structure

```text
docs/library/
├── player/
│   ├── FAQ.md
│   ├── INSTALL_SIDEQUEST.md
│   ├── SAVE_DATA.md
│   └── TROUBLESHOOTING.md
├── project/
├── development/
└── operations/
```

## Source rules

- Player-facing installation/support material lives in `player/`.
- Project/GDD material should live in `project/`.
- Development process/reference material should live in `development/`.
- Repository, release and operational procedures should live in `operations/`.
- Bridge technical contracts remain authoritative in `../../bridge/` and should be linked rather than duplicated.

## Migration status

The four existing Markdown documents from `/documentation` have been copied into `docs/library/player/`.

The old `/documentation` copies remain temporarily for compatibility while references are checked.

## Canonical policy

From this point forward, update the `docs/library/` copy first. The legacy `documentation/` directory should receive no new documents.
