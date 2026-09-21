---
name: reviewer-verify-real
description: >
  Reviewer's real-environment method for FULL-tier items before Gate 2: run the order's operator scenarios on
  a real environment (not the builder's fixture) and report each result. Use after reviewer PASS on a FULL
  item, when the dispatch says reviewer-verify-real.
---

# reviewer-verify-real

Input: the order's operator-scenario list, the branch, the environment named in the order.

1. Confirm you can reach the environment the order names under "Environment for verify-real". A local
   checkout counts only if the order names it. Nothing named, or not reachable: return
   `UNVERIFIABLE-HERE: <what is missing>`. Do NOT substitute a fixture; the packet then lists a human live
   check for you to run. Never fake a green.
2. **Shared environment: do no harm.** Run only scenarios that cannot damage or take it down: no malformed or
   hostile input, no load, no write you cannot undo. You never start, stop or modify it. A scenario that could
   harm it is listed `UNVERIFIABLE-HERE: <scenario> (could break: <what>)` for a disposable copy or a human.
3. Run every safe scenario, including the wrong-state ones: no record yet, yesterday's record, the same thing
   twice, wrong environment, a typo, "undo that". One line each:
   `SCENARIO n: PASS|FAIL <command/step> <what you saw>`.
4. Any FAIL is a REJECT to the builder with the first failed scenario. Record nothing else.

Gotchas: six mechanical steps green while the feature broke on the first sentence a human typed. The
scenario list is where the unpredictability is written down; run all of it.
