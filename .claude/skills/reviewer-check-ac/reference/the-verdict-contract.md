# The verdict contract

> Use when: composing the final output, or unsure how to phrase PASS, REJECT, or a withdrawn finding.

The verdict is the loop's routing signal: PASS means the lead packages, REJECT means a fresh builder is
re-dispatched. The shape is fixed so the lead can act on it without interpretation.

## The words

- `PASS` at the start of its own line. Cite what you ran (test names, diff checks, exit codes) so it is auditable.
- `REJECT: <first failed item>` at the start of its own line. Give the AC, what you observed, the fix direction.
- `RETRACTED: <finding>` at the start of its own line when you withdraw an earlier finding you now see was wrong.
  Say what evidence changed your mind. Never silently drop a finding.

## Why ONE reason, not a list

A list tempts the builder to shotgun several fixes at once (bigger diff, harder re-review), and the first
fix often changes the picture for the rest. Give the most severe blocker; the next appears on the next
pass if it is still real.

## Good REJECT

> `REJECT: AC-1 (RED-first): the new test `retry-gives-up-after-3` passes, but the builder's pasted RED
> shows a different test failing on a different assertion. The new assertion is vacuous: it passes with
> the fix's key line removed, because it never checks the exhausted-retries path. Assert that path so it
> fails on unfixed code, then re-show RED then GREEN.`

Concrete, one item, observed evidence, fix direction.

## Bad verdicts

- "Looks good": no executed command, that is reading.
- "REJECT: test is weak, naming is off, maybe check the edge case": vague, multi-item, no evidence.
- `PASS` with no new/changed test or real-data check run this turn: you trusted the builder's claim.

## After the verdict

You never write or edit anything, and never mutate the tree or index. On REJECT the lead dispatches a fresh
builder with your first failed item and re-runs you. Your job ends at the honest verdict.
