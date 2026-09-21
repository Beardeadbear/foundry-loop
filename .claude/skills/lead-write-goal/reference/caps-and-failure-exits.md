# Caps and failure exits

> Use when: you are writing the goal's last line, the failure exit, or a builder returned PARTIAL and you must re-slice.

A goal with only a success exit never ends on a hard case. The builder grinds, quality drops, and it is
tempted to weaken a check to escape. The cap gives it an honest exit.

## The rule
Every goal ends: **"If <condition>, stop and report PARTIAL. Do not grind."** Never omit it.

## Cap conditions
| Condition | Example wording | Meaning of the signal |
|---|---|---|
| Turn budget | "not green within ~N turns" | a runaway; return before a hard truncation |
| Scope balloon | "needs a file outside the ownership list" | wrong root cause, or a bigger item |
| Unreproducible | "cannot reproduce in 2 attempts: report a clean no-op" | maybe a non-bug (pairs with `builder-reproduce-red`) |
| Blocked input | "fixture or tool unavailable: return BLOCKED and name it" | the lead must supply it |
| Diff budget | "production lines over budget = halt" | overbuild, or the premise is wrong |

## What the builder does at the cap
Leaves partial work uncommitted in the tree, states a factual status (`PARTIAL`, `STUCK`, `BLOCKED`), the
evidence so far, and what remains. It never deletes its work and never edits a test or the gate to pass.

## What you do with it
- A capped return is a signal that the goal or root cause needs rethinking. Re-derive the root cause, then
  dispatch a narrower slice. Do not just raise the cap.
- The SAME defect rejected twice parks the item; a NEW defect each round does not count.
- Two capped returns on one item: stop and re-plan with the operator.

## Calibration
Generous enough that a normal fix finishes well inside it, tight enough that a stuck one stops early. A
handful of turns fits a deterministic defect; a larger task class gets a larger cap, still finite.
