---
name: reviewer-check-design
description: >
  Reviewer's design gate: adversarially review ONE design memo before it is built. Returns APPROVE-DESIGN or
  REJECT-DESIGN + the FIRST reason. Use when the dispatch says DESIGN-REVIEW. Never rewrites the design.
---

# reviewer-check-design

Input: the memo, its options, its recommendation. You did not write it.

1. Is the root cause real? Re-derive it from the code and the reproduction. An unreproduced cause = REJECT.
2. Are the options genuinely different? Is the smallest option present?
3. Does the recommendation follow from the evidence, and does the memo say what would flip it?
4. Blast radius and reversibility stated; unhappy paths (empty input, failure, concurrency) considered.
5. Is the plan buildable: files, signatures, the enumerated case list, a proving check?
6. `shared-read-vault`: does a prior decision or lesson already settle this?

Return `APPROVE-DESIGN` or `REJECT-DESIGN: <first reason>` at the start of its own line.

Gotchas: judge, never co-author. Do not propose your own design; name what is missing.
