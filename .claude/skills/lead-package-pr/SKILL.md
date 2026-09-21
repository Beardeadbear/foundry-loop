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
## Evidence       ONLY when the vault is git-ignored: the order's AC, the CONTROL: line and the inventory, verbatim
## Findings       FINDING: lines and their ESCAPE: cards, or "ESCAPES: none"
## Tracker update DRAFT only (comment + suggested transition + SHA/PR). The dev posts it. Omit in mode "cards"
## Self-check     the block from CLAUDE.md
```

Gotchas: if `.gitignore` excludes vault content, the branch does not carry the card, the order or Control's checks,
and a reviewer on the branch sees only this packet. Paste them into Evidence. Every "done" claim carries a
commit SHA. "Completed" with no SHA is a soft label.

## Reference (use when)
Read a file only when its row applies. Never load them all.

| Use when | Read |
|---|---|
| Assembling the Gate 2 packet and you need to know what proof each section must carry | `reference/pr-contents.md` |
