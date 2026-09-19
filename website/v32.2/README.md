# RWE Website V32.2 — Individual Record System

Status: implementation draft
Purpose: make archive objects permanently linkable and move collection pages toward discovery/index roles.

## Canonical routes

- /devlog/158
- /signal/SIG-001
- /visual/RWE-VA-013
- /build/098

## Shared record contract

Every record uses:
- record_id
- record_type
- project
- canonical_path
- title
- lifecycle/status
- visibility
- published_at / updated_at
- summary/body
- tags
- related_records
- canonical_url

Record-specific metadata sits under a type-specific object.

## Migration rule

Existing archive content is source-of-truth. Do not invent missing transcript, artist, artwork title, provenance, recovery date, access class, or reliability data.

SIG-001 is structurally created but its original transcript is not present in the preserved sources available to this implementation pass.

RWE-VA-013 is structurally created but its original title, artist credit, artwork/story and metadata are not present in the preserved sources available to this implementation pass.

Those two records remain draft until the original archive data is supplied or recovered.

## Build 098 source

Build 098 metadata is grounded in the official GitHub Release:
Project2088-Build98, published 2026-09-11.

## Devlog 158 source

Devlog 158 is grounded in the preserved internal weekly record for 7–13 September 2026. Public copy is condensed from verified progress, architecture decisions and next priorities.

## Collection behaviour

Collection pages should show summary cards only and link to these canonical routes.

## Permanent record behaviour

Each individual record page should include:
- archive breadcrumb
- canonical record ID
- status
- date
- primary content
- metadata
- related records
- previous / next where applicable
- back-to-archive action
- copy permanent link action
- canonical URL metadata for search engines

This package is intentionally separate from the current live CMS. It is a portable source-of-truth implementation that can be migrated into the live site without rewriting the archive model.
