# QR Site

A lightweight, mobile-first web surface for **QR codes, NFC tags and physical Project 2088 / RWE touchpoints**.

## Purpose

Physical tags should open fast, simple destinations without forcing the main RWE website to become a collection of one-off landing pages.

Typical sources include:

- NTAG215 NFC tags
- QR stickers
- tester cards
- posters
- physical props
- event/demo materials
- art-submission cards
- Project 2088 in-world experiences

## Core rule: encode stable URLs

Do not permanently encode a frequently changing destination into hundreds of physical tags.

Prefer:

```text
physical tag
   ↓
stable short RWE route
   ↓
current destination
```

This allows the destination to change later without rewriting the physical NFC tag or QR code.

## Suggested structure

```text
qr-site/
├── index/
├── access/
├── nfc/
├── build/
├── tester/
├── submissions/
├── terminal/
├── redirects/
└── shared/
```

## Planned experiences

### Art submission

Current public submission destination:

- https://realworldentertainment.co.uk/submissions

A QR/NFC route can act as a short stable entry point before forwarding users there.

### Project 2088 build/testing

Possible route family:

- `/build/<id>`
- `/tester/<id>`
- `/install`
- `/help`

These pages should be concise and designed primarily for phones.

### Construct terminal

A scan can open an in-universe Construct terminal/access screen.

Uses include:

- ACCESS DENIED
- identity/clearance presentation
- fictional system status
- Project 2088 teaser content
- hidden links
- event/demo interactions

The experience should always remain clearly fictional where confusion with a real authority/service is possible.

### Devlog

A tag can point to a stable latest-devlog route which redirects to the current record.

## NFC notes

NTAG215 tags have limited storage. Prefer writing a short HTTPS URL rather than storing large blocks of text.

For public tags:

- use HTTPS
- keep the destination short
- avoid sensitive query parameters
- do not put private credentials in the URL
- test on both Android and iPhone where possible
- provide a visible QR fallback when a tag is important

## Performance target

These pages should feel immediate on mobile.

Prefer:

- small HTML/CSS/JS payloads
- compressed images
- minimal third-party dependencies
- clear touch targets
- graceful offline/error states
- accessible contrast and text sizing

## Analytics/privacy

If scan analytics are introduced later, collect only what is genuinely useful and document it clearly.

Do not create hidden tracking simply because a physical tag makes it possible.

## Near-term priorities

1. Create one reusable mobile landing-page template.
2. Create `/submissions` QR/NFC entry page.
3. Create Construct terminal demo.
4. Create latest-devlog redirect.
5. Create build/tester template.
6. Test locally in Acode.
7. Test with the user's NTAG215 tags.

## Status

**Ready for first implementation.** This is a good first area to develop and run directly from the Android tablet.
