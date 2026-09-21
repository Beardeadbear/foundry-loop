---
name: reviewer-check-ac
description: >
  Reviewer's correctness gate: verify each acceptance criterion in the goal against the builder's actual
  work by ACTING (re-run the test, grep the diff), not by reading claims. Output is PASS or REJECT + the
  FIRST failed criterion. Use at VERIFY.
---

# reviewer-check-ac

For each AC in the goal, in order:
1. Say what would prove it and what would falsify it.
2. Run it: the new/changed test, a grep of the diff, the real-data check. Save long output to a file.
3. Record: `AC n: PASS|FAIL <command> <exit code> <one line of what you saw>`.

Then the fixed checks: RED-first proof present and matching the lead's capture · no-weakening intact ·
back-compat held · no hardcoded customer/tenant token · diff within the file-ownership table and budget.

Verdict: `PASS`, or `REJECT: <first failed item>` at the start of its own line. Stop at the first failure;
the loop re-runs you after the one fix.

Gotchas: "looks right" is not evidence; a PASS with no executed command is a REJECT of the review. A test
that would pass either way is not proof; say so and REJECT. Reviewing your own earlier round is not fresh.

## Reference (use when)
Read a file only when its row applies. Never load them all.

| Use when | Read |
|---|---|
| Checking the goal's Done-when block and you need the verifying act for a given criterion type | `reference/itemized-verification.md` |
| Composing the final output, or unsure how to phrase PASS, REJECT, or a withdrawn finding | `reference/the-verdict-contract.md` |
