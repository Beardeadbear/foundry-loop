---
name: reviewer-check-overbuild
description: >
  Reviewer's simplicity gate: given the diff, judge whether it introduces overbuild (premature abstraction,
  speculative error handling, needless config, dead flexibility) or wrongly removes a load-bearing
  mechanism. Co-equal with correctness. Use at VERIFY.
---

# reviewer-check-overbuild

Against the goal's minimum/built/delta, list what the diff adds. For each addition ask: does an AC or a
real failure need it? Flag, first match wins:
- an abstraction with one implementation, a factory for one product, config for a value that never changes
- error handling for a case that cannot occur; a new dependency where stdlib or an existing one works
- a new helper duplicating one that already exists in the repo (grep before you flag)
- a rewrite/reformat beyond the goal's file-ownership table

**Do not flag** a mechanism that has incident provenance (a guard added after a real failure). Deleting
one of those is reviewer-check-no-weakening's job, not overbuild's.

Verdict: cleared, or `REJECT: overbuild: <the first finding, file:line, what to cut>`. Overbuild is a
REJECT even when every AC passes.

## Reference (use when)
Read a file only when its row applies. Never load them all.

| Use when | Read |
|---|---|
| The diff adds prose to a skill, agent or rule file, or adds logic whose proper layer is unclear | `reference/boundary-principle.md` |
| The diff adds an abstraction, an error handler, a config knob, or a parameter and you must decide if it is overbuild | `reference/the-4-patterns.md` |
| You are about to flag something as overbuild but are not sure it is unearned | `reference/when-complexity-pays.md` |
| You want concrete calls for catching overbuild versus clearing earned or load-bearing complexity | `reference/worked-examples.md` |
