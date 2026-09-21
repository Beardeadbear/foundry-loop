---
name: builder-design-fix
description: >
  Builder's design method: for ONE reproduced defect or desired behaviour, design the smallest root-cause
  fix, surface the 2 to 3 honest options, and recommend one. Advisory: writes a design memo, never edits
  product code. Use when the goal says DESIGN, before any fork-heavy or new-feature build.
---

# builder-design-fix

1. Restate the problem and cite the reproduction (real fixture, command, output).
2. Find the root cause in the code. Name the file and function; read the callers.
3. List 2 to 3 honest options. For each: what changes, blast radius, reversibility, what it forces next.
   Include the smallest option even if you do not recommend it.
4. Recommend ONE, with the evidence that would flip your choice.
5. Give the buildable plan for the recommendation: files created, modified, removed; key signatures; the
   enumerated list of every case from recon; the proving check.

Return the memo only. No code edits.

Gotchas: a design reviewed by the context that wrote it does not count as reviewed. Options that differ only
in naming are one option. If there is no real fork, say so and hand back a plain fix plan.

## Reference (use when)
Read a file only when its row applies. Never load them all.

| Use when | Read |
|---|---|
| A finding is reproduced (or not) and you are about to shape a fix; decide first whether a fix should exist | `reference/classify-the-problem.md` |
| Starting a design pass with a report or a claim, or when a fix would touch several places and you must find where it belongs | `reference/root-cause-tracing.md` |
| A fix would repeat the same logic in more than one place, or its shape is a check that catches a bad state after the fact | `reference/single-source-and-prevention.md` |
| Writing the final memo, and again as a self-check before returning it | `reference/solution-memo.md` |
| Two or more viable fix shapes exist and you must weigh them and recommend one | `reference/the-fork-decision.md` |
