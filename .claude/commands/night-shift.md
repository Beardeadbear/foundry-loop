---
description: Overnight autonomous shift. Locked scope, self-approved Gate 1, PR-ready by morning, never merges
---

# /night-shift

Hand the loop a locked scope and run it autonomously until done, parked, or halted. Self-approve Gate 1
INSIDE the scope; never cross Gate 2. The operator wakes to a report and PR-ready branches, not a merged main.

**Before INTAKE declare each item's depth tier** (dev-lead). **Overnight, any fork not covered by the rules
below PARKS.** Nobody rules while nobody watches.

## Scope
$ARGUMENTS

## Boundary (operator-signed for this shift only)
Approving the scope authorises: working on branch `shift/<date>`, one commit per item. It does NOT
authorise: a merge, a push to `main`, a tag, or (unless `push: allowed` is written in `scope.md`) any push.
With `push: allowed`, you may push the shift branch and open a DRAFT PR. Nothing further.

## No addressee overnight
Any fork of ANY kind parks (scope ambiguity, design fork, premise collapse, cap breach, unclear AC).
Parking = set the task `parked` in `vault/shift/progress.md` (template: `vault/_templates/progress.md`) + one line of why + **start the next item in
the SAME turn.** A turn that ends in a question is a defect, not a courtesy. Parked forks are batched into
the morning report.

## Flow
1. Load `dev-lead`.
2. Scope: named cards in `$ARGUMENTS` are the scope. Empty: propose the top 5 ready cards (value x suitability
   overnight: exclude anything gated or needing a human present), each with why-this / why-now /
   why-safe-overnight; WAIT for the operator's approval. That is the one human decision in this mode.
3. Order + lock: for each FULL task the lead writes the order and `control` (MODE: check-order) must return
   `ORDER-OK`; otherwise the task is parked. Then write `vault/shift/scope.md` from `vault/_templates/scope.md`. Each task is a card slug with its `risk` tier. Drain any open
   `gate-defect` cards first. The lock is authoritative: no task outside it starts, however valuable.
4. Per task, the full loop:
   - INTAKE: the task must be an exact entry of `tasks`. Gated on something unmet (dependency, missing
     credential, human step)? Park it. Never guess past a gate.
   - SPEC / GOAL as normal. A forking or new-feature task runs DESIGN <> DESIGN-REVIEW first.
   - **Cap.** When a task goes in-flight, record its diff cap and base SHA in `progress.md`. A diff over the cap at
     close parks the task.
   - **Gate 1 self-approval, only inside scope.** Before dispatching, append to `progress.md`:
     `{task, scope_ref, design_verdict: APPROVE-DESIGN | SKIPPED-mechanical, timestamp, approver:
     "night-self-approval"}`. A fork-heavy task with no design verdict is an invalid self-approval: park. A FULL task with no `ORDER-OK` from `control` is likewise invalid: park.
     LIGHT items skip the design ceremony.
   - BUILD <> VERIFY as `/work`: loop until the gate is green AND the reviewer PASSES. A design rejected
     twice, or a builder rejected twice on the SAME defect: park it and move on.
   - PACKAGE: `lead-package-pr`.
   - **Gate 2: STOP.** Commit to `shift/<date>`. Never merge, never push `main`, never tag.
   - **Between tasks:** `git status` shows no stray debris; scope file untouched; only then start the next.
5. **Halt:** the operator writes `HALT: yes` in `scope.md`. Read it at each task's INTAKE only, never
   mid-build. The in-flight task finishes or parks; no later task starts. Killing the session is the only
   immediate stop.
6. **Morning report** (scope exhausted, caps exhausted, or halted): write `vault/shift/reports/<date>.md`
   (template: `vault/_templates/report.md`) and paste it as the closing message. Every "done" carries a SHA; each item states
   its tier. `questions asked mid-shift` must be **0**; non-zero is a shift defect and the report says so.

No argument and nothing to propose: say so and stop. Never invent scope.
