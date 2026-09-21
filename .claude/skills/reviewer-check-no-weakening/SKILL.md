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
