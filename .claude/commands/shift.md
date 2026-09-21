---
description: Supervised multi-item shift. Locked scope, operator online for Gate 1 forks
---

# /shift

The `/night-shift` engine with ONE difference: the operator is online, so Gate 1 forks are **asked live**,
not self-approved and not silently parked. Everything else is identical. On divergence, `/night-shift`
wins except where this file says otherwise.

## Scope
$ARGUMENTS

## Flow
1. Load `dev-lead`.
2. Scope = the cards named above (each a slug in `vault/backlog/`). Empty: run `lead-plan-shift` (attended
   mode) and WAIT for approval.
3. Lock: write `vault/shift/scope.md` (format in `/night-shift`). Nothing outside `tasks` starts. The
   operator may extend scope mid-shift by message; update the file and log the extension. You never extend
   it yourself.
4. Per task, the full loop. At Gate 1:
   - mechanical task (no fork): proceed, log `design_verdict: SKIPPED-mechanical`.
   - **fork or design choice: post a GATE-1 PACKET in chat** (options, evidence, your lean) and pause THAT
     task. Move to the next locked task while waiting. On a ruling: log `approver: operator-live`, resume.
   - no ruling once every other task is done: mark it `parked-awaiting-ruling`. Never self-approve a fork.
5. Operator interrupts (a ruling, a halt, a priority flip inside scope) are processed at the next tool-call
   boundary: acknowledge, apply, log.
6. End with `lead-report-shift`: the report goes to `vault/shift/reports/<date>-shift.md` and into chat.

Gate 2 is absolute: no push to main, no merge, no tag. Silent operator: do NOT convert to night behaviour;
unresolved forks stay parked.
