---
name: builder-fix-code
description: >
  Builder's fix move: patch the ROOT CAUSE of a reproduced defect with the smallest change that turns the RED
  test green. No workarounds, no drive-by refactors, no weakening the gate. Use after builder-reproduce-red.
---

# builder-fix-code

1. Re-read the root cause in the goal. Read the actual files and the existing pattern before editing.
2. Before the first edit, state three lines: **minimum** (least that fixes it) / **built** (what you will
   change) / **delta** (the difference and why). Compose an existing helper before writing a new one.
3. Edit by hand, one anchored change at a time. After each, re-read the region or grep it; an edit success
   means a string matched, not that your change landed.
4. Run the RED test: GREEN. Run the neighbouring tests for the area. Output to a file, tail + exit code.
5. Handle the unhappy path the fix touches (missing input, empty result, error), not only the happy one.
6. Leave the work uncommitted. Report adjacent defects as findings; do not fix them.

Gotchas: fixing the symptom in one caller when a shared function is the cause leaves every sibling caller
broken. Grep the callers first. Never edit the gate or the failing test to reach green.

## Reference (use when)
Read a file only when its row applies. Never load them all.

| Use when | Read |
|---|---|
| Deciding what NOT to touch while fixing, or when your diff is growing past the defect | `reference/minimal-blast-radius.md` |
| You have a RED test and are about to edit; trace the failure to its cause first | `reference/root-cause-tracing.md` |
