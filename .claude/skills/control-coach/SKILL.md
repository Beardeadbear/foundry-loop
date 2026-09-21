---
name: control-coach
description: >
  Control's guidance method. Closing shape: read how an item or shift went and coach the operator. Next
  shape: with nothing in flight, say where things stand and recommend the next item. Use when the dispatch
  says MODE: coach (closing or next).
---

# control-coach

**Closing** (input: card, order, `vault/shift/progress.md`, reject history, rulings):
1. Count: rounds to green, rejects (by reason), parked items, escapes found, questions asked.
2. Name what slowed us, with the number, not a feeling.
3. Propose ONE change to make: a better card, a missing fixture, a skill or rule edit, a gate check. If a
   bug escaped the gate, propose the gate-defect card (`PROPOSE-CARD: <slug> — <what check to add>`).
4. Recommend the next item and why (epic plan order, gates cleared, tier suits the moment).
LIGHT items: batch into one coaching note per shift.

**Next** (nothing in flight; input: backlog, epic plan, rulings, `vault/shift/`):
1. State in three lines: what is in flight, what is ready, what is blocked and by what checkable gate.
2. Recommend ONE next item with its tier and why now.

Return:
```
COACHING:
  SLOWED BY: <number + cause>
  CHANGE: <one thing>
  PROPOSE-CARD: <slug — check>       (zero or more)
  NEXT ITEM: <slug — why>
```
Gotchas: coaching about the operator's own orders must be specific and kind: name the card, the gap, the fix.
Never flatter. If nothing went wrong, say so in one line and stop.
