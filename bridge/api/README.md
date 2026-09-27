# API

Transport and service contracts for The Bridge.

`bridge-contract.json` records the current groundwork constants and validation order.

The API layer should remain independent from the public RWE website. It is responsible for receiving commands/events, validating identity and session context, applying idempotence rules, and routing accepted evidence to authorised consumers.

No production credentials, tokens or database secrets belong in this directory.
