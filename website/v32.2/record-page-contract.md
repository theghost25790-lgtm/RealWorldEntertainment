# Shared Record Page Contract

## Header
RWE ARCHIVE
PROJECT 2088 / {RECORD TYPE} / {RECORD ID}

Show:
- title
- record ID
- status
- publication/recovery date where known

## Primary content
Render the record body without duplicating collection-page copy.

## Metadata
Use only fields present in the record source. Omit unknown values on public pages.

## Related records
Render explicit record relationships as links.

## Footer actions
- Previous / Next where ordered
- Back to archive
- Copy permanent link

## SEO / canonical
Each page must output one canonical URL matching canonical_url.
IDs and canonical paths are immutable once public.

## Collection rule
Collection/index pages become discovery surfaces:
- title
- date/status
- short summary
- READ RECORD action

The individual record page becomes the source of truth.

## Missing-source rule
A record can exist structurally before publication, but publish_ready=false records must not be exposed publicly until original archive data has been recovered.
