---
name: control-check-order
description: >
  Control's control-check-order method: adversarially review ONE order before Gate 1: premises re-run, tier, fixture,
  acceptance criteria, failure-mode inventory, caps. Returns ORDER-OK or ORDER-REJECT + the FIRST issue.
  Use when the dispatch says MODE: check-order.
---

# control-check-order

Input: the order file (`vault/control/orders/<slug>.md`), its card, and the epic plan if any. Work down the
list and stop at the first failure.

1. **Premises.** Re-run every cheap premise command yourself. Output differs from the order = REJECT.
   A claim with no command and no UNVERIFIED label = REJECT.
2. **Tier.** Compare the tier with the SURFACE (auth, permissions, data writes, parsing, concurrency,
   customer data = FULL). File-kind check: does the named file list match the tier? Unsure = FULL.
3. **Fixture.** A real redacted input is named, or "creating it" is step 1. An invented fixture = REJECT.
4. **Acceptance criteria.** Itemised; each names its check; each states why it fails if the claim is false.
5. **Failure-mode inventory** (required if it writes, copies, deletes or certifies operator/customer data).
   YOU list every such point from the code, one row each: what stops it succeeding while doing nothing, or
   destroying something? SAFE (why) or BROKEN (how). A BROKEN row is a finding before a line is built; an
   unanswered row means the surface is not ready to build.
6. **Scope and caps.** Inside the card and the active epic plan. A diff budget split, a turn cap and a
   failure exit exist. "Three steps ahead" lines are present.
7. **Vault.** A prior fix on this class (regression), dissolve (maybe not a bug), or ruling that applies.

Return:
```
ORDER-OK | ORDER-REJECT: <first issue, file:line or command>
INVENTORY: <rows, if applicable>
RECOMMEND: <one next action for the lead/operator>
```
Gotchas: an order that reads confidently is not a proven one. A premise you did not re-run is a premise you
did not check.

## Reference (use when)
Read a file only when its row applies. Never load them all.

| Use when | Read |
|---|---|
| The order's surface writes, copies, deletes, captures or certifies operator or customer data (a sync, an import, a migration, a publish, a template, a config), before anything is built | `reference/failure-mode-inventory.md` |
