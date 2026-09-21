# Find the Wired Test

> Use when: you are about to decide where a new failing test lives, before writing it.

The obvious test location is often not the one the gate runs. An orphan test passes review and passes
locally, yet never gates anything, so the bug it guards can regress freely.

## Steps

1. **Read the gate composition, not your assumption.** Open the gate config or script the goal names and
   trace which test files or globs it executes. (You never run the gate; the lead does. Reading it is enough.)
2. **Match the neighbours.** Find where tests for similar code already live and run; put yours beside them.
   If sibling tests sit next to the source, yours does too.
3. **Prove it is wired.** Run only the single test command the gate delegates to (a targeted run, not the
   gate itself) and confirm your test's NAME appears in the output. "The suite passed" proves nothing.
4. **Not in the output?** Move the file or fix the glob until it appears.

## Example

You add `tests/sync-job.test.js` because that "feels right", but the gate globs `src/**/*.spec.js`. Your test
exists, maybe passes, and is never executed. Fix: rename it to `src/sync/sync-job.spec.js`, rerun the targeted
command, see `sync-job` in the output.

## Why it matters

Assuming the path is the most common way a "fixed and tested" defect silently regresses. A reviewer
(reviewer-check-ac) checks that your new test actually runs in the gate; an orphan test is a REJECT.
Report the exact command and the output line showing your test name.
