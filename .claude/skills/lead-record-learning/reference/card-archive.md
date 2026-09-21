# Card archive: moving a done card to done/

> Use when: an item closed green and its driving card must leave the live backlog.

Runs at LEARN, after the lesson is written and linked, in the same pass that verifies the packet. The full
schema and quoting rules live in `lead-write-vault`.

## When it applies
- **Green close only:** gate green and reviewer PASS, or an operator-authorised ship. A REJECT, PARTIAL,
  STUCK, parked or abandoned item keeps its card live in `vault/backlog/`.
- **A driving card exists.** Free-text work with no card archives nothing. Never search the backlog for
  "the card that seems related".

## Steps
1. Set `status: done` on the card (one key per line).
2. Put the commit SHA(s) in `status_note`, replacing the old note (exactly one `status_note`).
3. Move the file: `git mv vault/backlog/<slug>.md vault/backlog/done/<slug>.md`. Rename, never copy and delete.
4. A FULL card also needs its order file `vault/control/orders/<slug>.md` and a `CONTROL:` check with
   `ORDER-OK` (from `control-check-order`), or a `waive_evidence` line with a reason. Missing both: it cannot go to `done/`.
5. Land the move with the item's other vault edits, before the gate run that precedes the commit.
6. Run the vault check; report before and after counts.

## The biconditional
A card in `done/` has status `done`, and a card with status `done` is in `done/`. Anything else is
corruption: a `done` card left in the root reads as live work, and a live card in `done/` vanishes from the
board.

## Gotchas
- Partial work is never `done`: keep it `ready` with a note naming the remaining half.
- `premise: dead` is not "the symptom never happened". Re-read for evidence it was observed; if so, re-scope.
- Already in `done/` is a no-op; only the note is refreshed.
