# Spec anti-patterns

> Use when: reviewing your own spec before Gate 1, or a reviewer rejected a build for something the spec planted.

Each pattern ships a defect into the loop while every sentence reads fine.

| # | Pattern | Tell | Damage | Fix |
|---|---|---|---|---|
| 1 | Solution wearing a spec | names files, mechanisms or libraries in the problem ("add a cache to fix the slow list") | the design fork never happens; a one-line fix is foreclosed | problem = symptoms + impact only; mechanism goes to a non-binding "candidate direction" |
| 2 | Unbounded spec | no out-of-scope; "improve", "modernise" | the builder picks the stop line; the reviewer cannot call creep | minimum/built/delta plus a named out-of-scope list |
| 3 | Hypothetical-need smuggling | "should support", "future-proof", "configurable so later" | becomes a knob or one-implementation interface that the overbuild check then rejects, wasting a loop | justify each increment by a present need; futures go to out-of-scope with "revisit when X is real" |
| 4 | Vibe criterion | "works correctly", "robust", "graceful" | reviewer rubber-stamps or invents a standard after the build | restate as command, output, exit code |
| 5 | Compound criterion | "and", "also", semicolons in one AC | a half-pass; the builder guesses which half to fix | split until each item fails alone |
| 6 | Unread prior | re-proposes something already settled, dissolved or shipped | re-litigation or a duplicate mechanism | run `shared-read-vault` first; cite "prior: <note>, differs because..." |
| 7 | Silent scope-gate skip | no sentence on the current milestone | a well-written spec for work that should not happen now | state whether it advances the active epic; if not, propose a defer |

## Quick check
Read the problem statement aloud: any file name or library in it is pattern 1. Count the AC: any "and" is
pattern 5. Search for "should support" and "later": pattern 3.

The reviewer rejects on what the spec planted, so a fix here saves a full build loop.
