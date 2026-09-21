---
name: lead-maintain-vault
description: >
  Lead's vault-upkeep method: keep the vault true and findable after any write. Update the index, move done
  cards, re-check gates, fix links by hand, surface stale and staged items. Use at LEARN after every item, after
  any vault write, and whenever the gate reports vault errors.
---

# lead-maintain-vault

1. Run the gate (`node scripts/check-vault.mjs`). Read every error and warning. Shape rules live in
   `lead-write-vault`; this skill only repairs.
2. **Index.** Every note in `decisions/`, `plans/`, `lessons/` is listed under its heading with a one-line
   hook. Remove entries whose file is gone. An unlisted note is unfindable, which is the same as unwritten.
3. **Cards.** A card with `status: done` moves to `vault/backlog/done/` (`git mv`) and gets today's `updated`.
   After archiving anything, re-run the gate and read the `gate cleared` warnings: a gate whose referent was
   archived reads as cleared, not gone. Update the cards that were gated on it.
4. **Stale.** A card `in-flight` for more than 3 days with no progress line: ask, or set it `parked` with a
   `parked_reason`. Every `parked` card waiting on a ruling goes on the operator's list.
5. **Links.** Fix each broken `[[link]]` by hand, one at a time. Never bulk-rewrite. Two notes on one topic:
   merge into the canonical one.
6. **Staging.** List unattended drafts in `vault/staging/` for the operator. Never promote them yourself.
7. Re-run the gate. Done means 0 errors and every warning either fixed or explained in one line.

Gotchas: fixing a link by changing what it points to can hide a deleted note; check that the target is the
right note. Never delete a note you have not read. The gate reports; you fix.
