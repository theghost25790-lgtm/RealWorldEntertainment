# Working With This Repository

Last updated: 27 September 2026

## Goal

Allow the project owner and future ChatGPT sessions to work on the same persistent project state.

## Normal tablet start

From Acode terminal:

```bash
cd /public/2088/RWE
git switch structure-v1
git pull
```

## After local edits

```bash
git status
git add .
git commit -m "Describe the change"
git push
```

## After AI edits

Run:

```bash
git pull
```

Then refresh/reopen the changed files in Acode.

## Local QR site preview

```bash
cd /public/2088/RWE/qr-site
busybox httpd -f -p 8080 -h .
```

Open:

`http://127.0.0.1:8080/`

Stop the server with Ctrl+C.

## Future AI workflow

When starting a fresh chat about this repository:

1. Tell ChatGPT to read `AI_START_HERE.md`.
2. Ask it to inspect `knowledge/`.
3. Work from the current branch/repository state rather than chat memory alone.
4. Update `knowledge/` when a durable decision changes.

## What belongs in shared memory

Good candidates:

- naming decisions
- architecture decisions
- current versions
- important URLs
- migration state
- canonical project rules
- major next priorities

Do not store:

- passwords
- SSH private keys
- API secrets
- customer personal information
- private access tokens
