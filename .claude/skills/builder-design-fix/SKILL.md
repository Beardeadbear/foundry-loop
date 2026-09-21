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
