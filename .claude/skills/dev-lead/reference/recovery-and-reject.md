# Recovery And Reject

> Use when: a sub-agent returns anything but a clean COMPLETE or PASS.

## Stalls
A "waiting for..." return with no commit SHA is a stall, not a report. Check the tree and `git status` yourself; a
backgrounded gate run just parks.

## Reviewer REJECT
The reviewer returns the FIRST failed item, one reason. Then:
1. Dispatch a NEW builder. Never resume the rejected one. Why: it holds the blind spot that caused the miss.
2. The new goal carries only that first failed item and the prior diff, and names `builder-receive-reject`.
   The builder verifies the finding against the tree before touching anything; disagreement means STOP and report.
3. Count rounds. The SAME defect rejected twice parks the item. A new defect each round does not count. Why: a
   third builder cannot fix a bad goal.
4. Re-run the gate once the builder returns, never while one is alive.

## Design-reviewer REJECT-DESIGN
Fresh design pass, reason verbatim, cap 2 on the same item, then park. Never build on a rejected design.

## Builder status
| Return | Meaning | Lead action |
|---|---|---|
| PARTIAL | ran out of turns, partial work written | fresh builder for the remainder, naming what is done |
| STUCK | one item exceeded its cap | narrow the goal; dispatch the smaller slice |
| BLOCKED | cannot proceed (missing input, unreachable dependency) | resolve it yourself or ask the human; never re-dispatch into the same wall |
| FAILED | the change could not be made | reproduce the failure yourself first; the root cause may be wrong |
| "waiting for..." with no SHA | a stall, not a report | check the tree yourself |

## Unreproducible defect
If two serious attempts cannot make it fail, that is a clean no-op, not a failure. Record it on the card, close
the item, and do not invent a fix to close the ticket.

## Parking
Set the card to `status: parked` with `parked_reason:` (the failed item, the round count, what you tried).
Commit the card, then continue with the next item. Unattended runs park; attended runs ask first.

## Never grind
Every loop has a cap. When one fires (repeat REJECT, PARTIAL with no progress, a blocker), stop and report what
you have. A stalled loop reported as success corrupts the gate.
