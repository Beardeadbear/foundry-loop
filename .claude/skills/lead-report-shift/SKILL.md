---
name: lead-report-shift
description: >
  Lead's shift-report method: compose the shift or morning report from evidence and write it to
  vault/shift/reports/. Use at the end of /shift and /night-shift (scope exhausted, caps hit, or halted).
  Every done claim carries a commit SHA or PR; questions asked overnight must be 0.
---

# lead-report-shift

Input: `vault/shift/scope.md`, `progress.md`, the shift branch's `git log`, the `vault/control/checks/` returns,
and each item's packet. Count from the trail, never from memory.

1. **Committed, awaiting Gate 2.** For every item the shift finished, run `git log`/`git rev-parse` this turn and
   put the SHA (or PR) and the tier on its line. Nothing is "done" until a human ships it, and no SHA means it goes
   under partial.
2. **How.** One paragraph: rounds to green, rejects and their reasons, notable choices.
3. **Needed from you.** Branches or PRs to review and merge; each parked item with the one fork or gate that
   stopped it; blockers hit. Batched, so the operator can rule on them together.
4. **Escapes.** `FINDING:` and `ESCAPE:` lines with their gate-defect cards, or `ESCAPES: none`.
5. **Coaching.** Dispatch `control` (`MODE: coach`, batched for LIGHT items) and paste its block verbatim.
6. If the shift was halted, say so and name the task that was in flight when it fired.
7. **Questions asked mid-shift:** the number from `progress.md`. It must be 0; non-zero is a shift defect and
   the report says so.
8. Write `vault/shift/reports/<date>.md` from `vault/_templates/report.md` and paste it as the closing message.
   Then run `lead-maintain-vault`.

Trigger sites: the end of `/shift` and `/night-shift`. No third site.

Gotchas: "completed" with no SHA is a soft label. Partial work is never done. A report written before the
last `git log` can misstate the shift.
