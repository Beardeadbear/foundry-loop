# Acceptance criteria for the Done-when block

> Use when: you are writing the Done-when items of a goal, or the reviewer will verify them by re-execution.

The AC are the contract the builder builds to and the checklist the reviewer runs. Vague AC give vague
verdicts; objective AC make the loop deterministic.

## Four properties, every AC
1. **Objective.** "Submit works" is not an AC; "POST with a valid payload returns 200 and a record; an empty
   payload returns 400 and writes nothing" is.
2. **Itemised.** One checkable claim per number, so the REJECT can name the FIRST failure.
3. **Shown in the transcript.** The proof is captured command output, not a claim.
4. **Discriminating.** State "fails if the claim is false, here is how". A check that passes either way
   (a config read cited as proof a lint runs, a green gate that only holds because a file is uncommitted)
   looks like evidence and proves nothing.

## The standard set
| AC | Claim | Fails if false when |
|---|---|---|
| (1) | NEW test for the scenario, RED on current code, then GREEN | the test was never red |
| (2) | No-weakening: a named guard intact | the guard's own test now accepts an input it used to reject |
| (3) | Back-compat: a named behaviour preserved | existing tests for it go red |
| (4) | No hardcoded customer/tenant/environment token | `grep` of the diff for the literal hits |
| (5) | The real-data check passes (command named) | it exits non-zero on the real fixture |
| (6) | The return line names the proving command; builder did not gate or commit | absent, or the tree is committed |

The lead's own gate run is separate: green on a fully committed tree, output to a file, exit code read.

## AC-1 example
Good: "(1) a test asserting a sync with an empty payload writes nothing; it FAILED on current code first
(RED run shown). Fails if false: it passes with the fix removed."
Bad: "(1) test the sync" (vague) or "test that empty payload writes a row" (asserts the bug).

## Anti-patterns
- **Un-observable:** "the code is clean". Drop it; the reviewer's overbuild check covers simplicity.
- **Compound:** "handles all inputs". Split it.
- **Prescribes the how:** "use a regex". State the what.
- **Non-discriminating:** see property 4.

Test each AC: what output proves this? No answer, rewrite it. The reviewer cannot verify what cannot be shown.
