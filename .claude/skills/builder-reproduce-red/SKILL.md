---
name: builder-reproduce-red
description: >
  Builder's first move: reproduce the defect as a FAILING check on current code before any fix, and locate
  the test the gate really runs. Use at BUILD start. If it cannot be reproduced, say so: it may be a non-bug.
---

# builder-reproduce-red

1. Find the wired test: which test file does the gate command actually execute? Prove it (run it, or trace
   the config). An orphan test that never gates is worthless.
2. Write the smallest test that fails **for the reason in the goal**, using the real fixture the goal names.
3. Run it on current code. Save output to a file; show the tail and the exit code. It must FAIL, and the
   failure message must match the reported symptom.
4. Two serious attempts and still green? STOP. Return a clean no-op with what you tried.

Gotchas: a test that fails for an unrelated reason (import error, bad fixture) is not RED. A test that
passes against the one consumer that already works proves nothing. Never invent rows; use the real shape.

## Reference (use when)
Read a file only when its row applies. Never load them all.

| Use when | Read |
|---|---|
| You are about to decide where a new failing test lives, before writing it | `reference/find-the-wired-test.md` |
| The failure you are trying to reproduce is not deterministic (fails sometimes, passes sometimes) | `reference/flaky-vs-real.md` |
| Establishing the failing check, or about to trust a green result you have not seen fail | `reference/red-first-discipline.md` |
