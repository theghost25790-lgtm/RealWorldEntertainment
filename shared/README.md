# Shared

Resources intentionally reused across **RWE Site**, **RWS Site**, **The Bridge** and **QR Site**.

The purpose of this area is to prevent the same logo, colour value, schema or utility from quietly diverging across products.

## Suggested structure

```text
shared/
├── assets/
│   ├── logos/
│   ├── icons/
│   └── images/
├── css/
│   ├── tokens.css
│   └── common.css
├── js/
│   └── utilities/
├── components/
├── schemas/
└── docs/
```

## What belongs here

Good shared candidates:

- canonical RWE/RWS logos
- reusable icons
- design tokens
- spacing/type variables
- common buttons/navigation patterns
- shared JavaScript helpers
- canonical ID helpers
- schemas consumed by more than one product
- common accessibility utilities

## What does not belong here

Do not move something into `shared/` merely because two files currently look similar.

Keep it in the product area when it is:

- page-specific
- client-specific
- Project 2088 lore/content
- a Bridge-only schema
- an RWS-only sales component
- a QR-only experience

Shared code should have a genuine multi-product reason to exist.

## Naming conventions

For paths and code:

- lowercase
- hyphen-separated filenames/folders where practical
- descriptive names
- avoid spaces in web asset paths
- avoid unnecessary duplicate variants

For human-facing product names:

- **RWE**
- **RWS**
- **The Bridge**
- **QR Site**
- **Project 2088**

## Design-token principle

Brand values should eventually be defined once.

Example:

```css
:root {
  --rwe-bg: ...;
  --rwe-text: ...;
  --rwe-accent: ...;
  --space-sm: ...;
  --space-md: ...;
}
```

The actual production values should be agreed before this becomes canonical.

## Schema rule

If a schema is owned by The Bridge but consumed by multiple products, the authoritative definition should remain in `../bridge/schemas/`.

This folder may contain generated clients, documentation or shared representations, but should not create a competing source of truth.

## Asset rule

Before adding a new logo/icon/image:

1. Check whether a canonical version already exists.
2. Use the canonical asset where possible.
3. Avoid embedding slightly different copies in each product.
4. Keep source/master assets distinguishable from web-optimised outputs.

## Security

Never use `shared/` as a convenient place for:

- secrets
- environment passwords
- API tokens
- private keys
- production credentials

Shared means reusable code/assets — **not shared secrets**.

## Near-term priorities

1. Inventory existing logos and brand files.
2. Choose canonical versions.
3. Establish initial design tokens.
4. Add common web utilities only when duplication appears.
5. Document asset provenance/ownership where needed.

## Status

**Scaffold.** Populate gradually as genuinely reusable resources are identified during migration.
