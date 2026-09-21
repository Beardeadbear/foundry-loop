---
name: reviewer-check-no-weakening
description: >
  Reviewer's protection gate: verify nothing that was protecting us was removed or loosened (a test, an
  assertion, a guard, a validation, a permission). Use at VERIFY on every diff.
---

# reviewer-check-no-weakening

Scan the diff for, in order:
1. Deleted or skipped tests; loosened assertions (`toBe` to `toBeTruthy`, exact to contains, removed cases).
2. Edits to the gate command, CI config, lint rules, or test config.
3. Removed validation, auth/permission checks, guards, error handling, logging.
4. Widened permissions, broadened catch blocks, changed timeouts or thresholds to pass.

Any hit: run the **preservation protocol**: find why it existed (`git log -S`, vault notes, comments). If
you cannot show it is dead, the change is a weakening.

Verdict: cleared, or `REJECT: weakening: <what, file:line, what it protected>`. Green reached by editing
the gate or the failing test is an automatic REJECT, regardless of AC.

## Reference (use when)
Read a file only when its row applies. Never load them all.

| Use when | Read |
|---|---|
| The diff changes a shared function, artifact, schema, default or output shape, and you must prove the neighbors survived | `reference/adjacent-regression-scan.md` |
| The diff removes or softens an existing mechanism (guard, validation, retry, check) and you must decide whether that is safe. This is also the canonical home for "a mechanism with incident provenance is not overbuild." | `reference/preservation-protocol.md` |
