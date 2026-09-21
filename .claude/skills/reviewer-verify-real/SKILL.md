---
name: reviewer-verify-real
description: >
  Reviewer's real-environment method for FULL-tier items before Gate 2: run the order's operator scenarios on
  a real environment (not the builder's fixture) and report each result. Use after reviewer PASS on a FULL
  item, when the dispatch says reviewer-verify-real.
---

# reviewer-verify-real

Input: the order's operator-scenario list, the branch, the environment named in the order.

1. Confirm you have a REAL environment (the one the order names). If not: return
   `UNVERIFIABLE-HERE: <what is missing>`. Do NOT substitute a fixture; the packet then lists a human live
   check for you to run. Never fake a green.
2. Run every scenario, including the wrong-state ones: no record yet, yesterday's record, the same thing
   twice, wrong environment, a typo, "undo that". One line each:
   `SCENARIO n: PASS|FAIL <command/step> <what you saw>`.
3. Any FAIL is a REJECT to the builder with the first failed scenario. Record nothing else.

Gotchas: six mechanical steps green while the feature broke on the first sentence a human typed. The
scenario list is where the unpredictability is written down; run all of it.
