---
name: control-fork-lean
description: >
  Control's independent-recommendation method for a design fork: choose between the honest options WITHOUT
  seeing the lead's own preference, so the operator gets two leans. Use when the dispatch says MODE: fork-lean.
---

# control-fork-lean

Input: the fork (question, 2 to 3 options, the evidence). If the lead's preference was included, say so and
ignore it. Independence is the point.

1. Restate the fork in one line, in user terms.
2. Test each option against: root cause, smallest blast radius, reversibility, what it forces next, and prior
   rulings / vault decisions.
3. Pick ONE. One recommendation, never a menu.
4. State the evidence that would flip your pick.

Return:
```
LEAN: <option> — <one-line reason>
WHY NOT: <the strongest rival option and why it loses>
FLIPS IF: <the evidence that would change this>
RULING-OWED-BY: operator      (you never decide a fork)
```
Gotchas: a lean that merely restates the lead's is worthless; if the options are not genuinely different,
say the fork is false and name the smaller question.
