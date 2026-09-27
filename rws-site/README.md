# RWS Site

The public website and client-services area for **Real World Studio (RWS)**.

## Primary domain

- https://realworldstudio.co.uk

## Purpose

RWS is the service arm for websites, digital presentation and related client work. This area should make the offer easy to understand, show finished work professionally, and provide a clean route from enquiry to delivery and ongoing care.

## Main content areas

- RWS home page
- Services
- Package / pricing information
- Monthly care options
- Portfolio
- Client case studies
- Enquiry/contact flow
- Client project summaries
- Marketing material

## Client work

Client projects should remain clearly separated from the RWS marketing site.

Suggested structure:

```text
rws-site/
├── public/
├── portfolio/
├── clients/
│   └── <client-slug>/
└── docs/
```

Where possible, client-specific repositories may later be preferable for projects that become substantial.

## Current reference client

**JLB Clothing** is the first major client reference case in the RWS project history.

Its work has included:

- product/category presentation
- market-day information
- image/media management
- Spotlight content
- colour and sold-out status
- engagement sorting
- administration tools
- social-media-fed content

Do not place private client credentials, API tokens or personal customer information in this repository.

## RWS presentation direction

The established RWS visual direction is:

- clean
- editorial
- workshop-like
- warm white
- charcoal
- steel grey
- craft green / pale green
- restrained brass/seal details

Avoid ornamental clutter that conflicts with the practical studio identity.

## Product relationship

RWS is related to RWE but should remain visually and commercially understandable on its own.

```text
RWE
└── broader entertainment / Project 2088 identity

RWS
└── web and digital services
```

Shared brand resources should come from `../shared/` rather than being copied repeatedly.

## Development rules

- Keep client secrets out of source control.
- Keep reusable RWS components separate from one-off client code.
- Prefer accessible, responsive layouts.
- Preserve clear ownership of client assets.
- Document external dependencies and hosting requirements.
- Use permanent case-study URLs where practical.

## Near-term priorities

1. Establish the canonical RWS site tree.
2. Move current RWS material into this area.
3. Create reusable service/package components.
4. Create a client-project template.
5. Add portfolio/case-study structure.
6. Connect shared branding from `../shared/`.

## Status

**Migration scaffold.** Existing production material should be audited before files are moved or removed.
