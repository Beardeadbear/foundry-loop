---
name: lead-write-vault
description: >
  The sole authority on writing into vault/: which kind goes in which folder, the card schema and its quoting
  rules, supervised versus staged writes, the done/ rule, amending a settled document, and the close. Use
  whenever you create or edit anything under vault/: a card, a plan, a decision, a lesson, an order, a note.
  Do not consult any other document about vault shape; this is it.
---

# lead-write-vault

This skill is the only authority on `vault/` shape. Exception: if another document parses or reproduces where
this one does not, the evidence wins, not the precedence. Report the conflict; do not follow the broken one.

## Before you write
1. **Read first.** Open `vault/index.md`, then the topic. Never search the whole tree first.
2. **Does a canonical note already exist for this topic?** One per topic is the law. It exists: amend it, never
   create a sibling. Unsure which is canonical: stop and ask the operator.
3. **Pick the kind before the folder.** Filing a task as a plan hides it from the board.

| Kind | Home |
|---|---|
| a task ready to be built | `vault/backlog/<slug>.md`. Root is LIVE work, `done/` is shipped |
| an epic's campaign plan | `vault/plans/<epic>.md`, named by `active_epic` in `CLAUDE.md` |
| a settled call and its reason | `vault/decisions/`, never re-litigated |
| a root cause, known error, workaround | `vault/lessons/` |
| an order for one item | `vault/control/orders/<slug>.md` |
| Control's return, verbatim | `vault/control/checks/<slug>-<mode>.md` |
| the operator's ruling | `vault/control/rulings.md`, appended, never edited |
| a draft, an unattended write, an audit output | `vault/staging/`, for operator promotion |

**Supervised writes land directly. Unattended writes (night shift, scheduled) go to `staging/`.** Do not stage
what the operator is watching you write; do not land what nobody reviewed.

## Cards
A card is one markdown file with front matter, one key per line, filled from `vault/_templates/card.md`. The
five rules that break cards most:
- Quote any value containing a colon-space, `#`, `[`, `{`, `|`, `>` or a leading `-`. A card that does not parse
  is invisible to the gate and every filter while looking fine on disk.
- Narrative goes in `status_note`, never in `status`. Exactly one `status_note`; replace it, do not append.
- Partial work is never `done`. It stays `ready` with a note naming the remaining half.
- `done` means SHIPPED BY A HUMAN, and `done/` is its location: the two go together. Committed on a branch and
  awaiting Gate 2 is `in-flight`, with the SHA in `status_note`. A FULL card also needs its order file and a
  `CONTROL:` check with `ORDER-OK` to be `done`.
- `status: parked` requires `parked_reason`. A parked card is not eligible for a shift until the operator rules.

## Rules
- Write on discovery, not at end of turn: a confirmed root cause, a reusable path, a systemic pattern.
- A finding becomes a card or a note, not a dispatch in the same turn.
- Never re-litigate a settled call. Cite the decision; reopening needs new evidence, not a new opinion.
- Truth order: code, then the tracker, then the vault. If the tree disagrees with a note, fix the note.
- The index is hand-maintained. List every new note under its heading, or it is unfindable.
- Write an item's vault changes before the gate run that precedes its commit, never between the gate and the
  commit: the committed tree must be the tree that was gated.

## The close
Run `node scripts/check-vault.mjs`. Done means 0 errors and every warning fixed or explained in one line. Report
the before and after counts, never a bare "clean". Then `lead-maintain-vault` if anything moved.

## Reference (use when)
Read a file only when its row applies. Never load them all.

| Use when | Read |
|---|---|
| You must change a ruling, decision or approved plan, or a rule needs to refer to "the current plan" | `reference/amending-and-pointers.md` |
| You create or edit a backlog card, change a status, or a gate reports a card error | `reference/card-rules.md` |
