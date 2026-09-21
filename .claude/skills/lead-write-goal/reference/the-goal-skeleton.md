# The goal skeleton, slot by slot

> Use when: you are filling the goal string in `lead-write-goal` and want the purpose and failure mode of each slot.

The skeleton in `lead-write-goal/SKILL.md` is canonical. This expands each slot; it adds nothing to it.

| Slot | Fill with | If skipped or wrong |
|---|---|---|
| `GOAL: <id> ... UNCOMMITTED` | item id + end state: fixed, left in the working tree | builder commits or gates on its own; the lead loses the single gated commit |
| Vault notes | the specific notes: triage note, a prior same-class fix, the lesson. Not "the vault" | builder re-solves a dissolved non-bug |
| Skills | paths of the SKILL.md files the builder must Read (`builder-reproduce-red`, `builder-fix-code`, `builder-make-fixture` if no real fixture) | sub-agents inherit no skills; the builder improvises |
| Root cause | `file:line` + mechanism, 1-2 sentences, reproduced by YOU | builder fixes a symptom on the wrong line. No real `file:line` = no goal yet |
| Reuse | helper(s) confirmed by recon, or "none identified: recon required" | a wrong name sends the builder to compose something ill-fitting and gives the reviewer false confidence |
| File ownership | the exact files it may touch | scope creep the reviewer cannot call |
| Tools | absolute paths: runner, scripts, log path | the builder guesses a path and runs the wrong thing |
| Canonical wired test | an instruction: "verify which test the gate runs" | an orphan test the gate never runs |
| Done-when | itemised AC, each with a fails-if (see `acceptance-criteria.md`) | unverifiable "verify it works" |
| Diff budget | production lines; collateral lines | overbuild passes unnoticed |
| Failure exit | turns + scope trigger (see `caps-and-failure-exits.md`) | a hard case grinds forever |

## Fixed vs filled
- **Fixed every goal:** the gate is pinned (builder never edits it, never runs it), work is left uncommitted,
  AC (1) is RED-first, no hardcoded customer/tenant/environment token, the failure exit exists.
- **Filled per item:** id, notes, skills, root cause, reuse, ownership, tools, and the specific scenario,
  guard and behaviour in AC (1)-(3) and (5).

## Design fork
If the fix has a real simple-vs-robust choice, state it in the goal with the default ("default to X unless Y").
Never make the builder guess an architectural call.

## How a goal goes wrong
- Root cause is a symptom: reproduce and trace first.
- No skills named, or no cap, or no fails-if on an AC.
- A hardcoded test path: the builder writes a test that never gates.
- Reuse invented rather than recon'd.
