---
name: lead-plan-shift
description: >
  Lead's shift-planning method: rank the ready backlog into a proposed scope of at most 5 cards, each with
  why-this, why-now and why-safe-for-this-mode. Use at step 2 of /shift and /night-shift when no cards were
  named. Proposes only; the operator approves. Never starts work.
---

# lead-plan-shift

Input: `vault/backlog/`, the active epic plan, `vault/control/rulings.md`, the last shift report, and the mode
(attended or overnight).

1. **Drain first.** Any `ready` card of kind `gate-defect` goes to the top.
2. **Eligible** means `status: ready`, named by the active epic plan (jira or backlog mode), and every gate
   re-evaluated by its check this turn. A gate whose referent was archived reads as cleared; confirm it.
3. **Overnight filter.** Exclude: a fork not yet ruled, a missing credential or environment, a FULL card with
   no real fixture, any `parked` card (it needs a ruling), and anything that depends on an unmerged card.
   Attended mode keeps the first two out only if you cannot ask.
4. **Rank** by value (epic order, what it unblocks, severity) times suitability (LIGHT before FULL overnight,
   well specified, small). Take at most 5, fewer if the backlog is thin. Never pad. Overnight, also drop anything
   that cannot finish as a PR-ready branch; never assume a merge is coming.
5. **For each pick:** why-this, why-now, why-safe for this mode, tier, and an estimated diff cap. For each
   notable card left out: one line why.

Return:
```
PROPOSED-SCOPE:
  1. <slug>  risk:<full|light>  cap:+A/-B  why-this: ..  why-now: ..  why-safe: ..
SKIPPED:
  <slug>: <one-line reason>
```
Then WAIT for the operator's approval. Nothing in this list is a scope until it is approved and locked.

Trigger sites: the start of `/shift` and `/night-shift` with no cards named. No third site. Builders and reviewers
cannot load this skill (the gate enforces ownership), and a goal that names it is malformed.

Gotchas: high value is not the same as overnight-safe. Never propose a card whose reproduction you have not
seen. A proposal that lists more than 5 cards has not ranked anything.
