# Itemized verification

> Use when: checking the goal's Done-when block and you need the verifying act for a given criterion type.

"Looks right" is never verification. Each criterion type has a specific act; you cite its output.

| AC type | Act | REJECT when |
|---|---|---|
| New test, RED-first | Confirm the test exists and is wired into the gate; compare the builder's RED capture with the lead's | No RED evidence, or the test is an orphan the gate never runs |
| Gate green | The lead already ran the gate. Do not re-run it; run only the new/changed tests and the real-data check, output to a file | You ran nothing; a new test fails; a check was skipped |
| No weakening | Diff the gate/config and the failing-test files: unchanged except the added test | The gate or test was edited to pass |
| Back-compat | Run the existing tests covering the old behavior | Old behavior changed without being an AC |
| Agnostic | Apply reviewer-check-agnostic to the diff | A client/tenant/vendor literal leaked |
| Root cause | Read the fix: is the cause removed or the symptom masked? | It special-cases the one input or swallows the symptom |

## RED-first deserves the most care

A test that is green now but was never seen failing may be a tautology that passed on the old code too;
it guards nothing. If there is no command + failing output + exit code on unfixed code, REJECT with
"missing RED-first proof" even though the suite is green.

Example: a retry helper "fixed" with a test asserting `retry(fn)` returns a value. It passes on old code
too. The test must assert the failing case (fn throws twice, then succeeds) and visibly fail before the fix.

## Act, don't read

Every check is a command whose output you cite: the new test by name, the diff of gate/test files, the
grep for leaks. A PASS resting on "I read the diff and it looks correct" is the maker grading itself.

## Severity order for the single REJECT

Weakened gate or missing RED-first (the fix is unprovable) > back-compat miss > cosmetic or token miss.
The builder fixes that one, you re-run, the next surfaces if still real.
