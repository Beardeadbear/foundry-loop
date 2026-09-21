---
name: lead-package-pr
description: >
  Assemble the evidence packet for a verified change: summary, changed files, before/after, real-data run,
  blast radius, and what is NOT covered. Use at PACKAGE; the human approves Gate 2 from it.
---

# lead-package-pr

```
## Summary        two sentences a non-engineer follows
## Changed files  path : why (production vs collateral, with line counts vs budget)
## Before / after RED output -> GREEN output (tails + exit codes)
## Real-data run  the command, the fixture, the result
## Reviewer       PASS + the commands the reviewer executed
## Blast radius   what else this touches; who is affected
## NOT covered    what was not tested, and why. Never omit this section
## Findings       FINDING: lines and their ESCAPE: cards, or "ESCAPES: none"
## Tracker update DRAFT only (comment + suggested transition + SHA/PR). The dev posts it. Omit in mode "cards"
## Self-check     the block from CLAUDE.md
```

Gotcha: every "done" claim carries a commit SHA. "Completed" with no SHA is a soft label.
