---
name: reviewer-check-agnostic
description: >
  Reviewer's agnostic gate: no hardcoded client, tenant, environment, vendor or product token in code, tests,
  fixtures or docs. Returns cleared or REJECT with the first hit. Use at VERIFY on every diff.
---

# reviewer-check-agnostic

1. Grep the diff for: organisation, tenant and client names; hostnames and URLs; account and user ids; emails;
   strings that look like keys or tokens; environment names used as logic (`if env == "..."`).
2. For each hit ask: is it derived from an abstraction (config, parameter, fixture id) or hardcoded?
   Hardcoded in product logic is a REJECT. In a fixture it must be a redacted placeholder.
3. Verdict: cleared, or `REJECT: agnostic: <hit, file:line, what to derive it from>`.

Gotchas: a real name in a test title, a comment or a commit message is still a leak. A secret-shaped string is
a security finding, not just an agnostic one: stop and flag it.

## Reference (use when)
Read a file only when its row applies. Never load them all.

| Use when | Read |
|---|---|
| Running reviewer-check-agnostic on a diff and you need the token classes, the scan commands, or the dependency-versus-accelerator test | `reference/token-scan.md` |
