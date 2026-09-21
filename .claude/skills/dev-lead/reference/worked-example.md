# Worked Example

> Use when: you want one end-to-end trace of a FULL item.

Illustrative. Invented defect: "a sync deletes every row when the incoming payload is empty."

1. INTAKE. `shared-read-vault` finds no prior verdict. Class: defect. Tier: FULL (data writes, deletion), declared
   before intake. Name the redacted real fixture: `fixtures/redacted/sync-empty.json`, with provenance.
2. ORDER. Write `vault/control/orders/sync-empty-deletes.md`: premises each with command and output, tier, fixture,
   diff budget, caps, scenarios. Dispatch `control` `MODE: check-order` (`control-check-order`). It re-runs a
   premise, lists failure modes, returns `ORDER-OK`. Keep its return for the `CONTROL:` line.
3. SPEC. Reproduce first on the real fixture: run the sync with the empty payload; rows drop 40 to 0. Paste that
   as YOUR RED. The filled goal is the spec.
4. GATE 1. Packet: one plain line, RED, AC ("empty payload leaves rows unchanged"; fails if any row is lost),
   `CONTROL:` line. Human says "yes".
5. GOAL. `lead-write-goal`: ownership table, absolute tool paths, budget, fixture, skills
   `builder-reproduce-red`, `builder-fix-code`, `MANDATORY_ARTIFACTS`.
6. BUILD. Dispatch builder. It shows RED on the fixture, fixes the root cause (empty means no-op, not delete-all),
   shows GREEN, returns a `RECEIPT:`. You run `git status`, then the gate once.
7. VERIFY. Fresh reviewer with `reviewer-check-ac`, `-overbuild`, `-no-weakening`, `-agnostic`, plus your RED.
   It replies `PASS`. Had it said `REJECT: AC-2 a null payload still deletes`, a NEW builder gets only that item.
8. VERIFY-REAL. Fresh reviewer with `reviewer-verify-real` runs scenarios: empty payload, yesterday's rows, the
   same payload twice, wrong environment, "undo that". One report line each.
9. PACKAGE and GATE 2. `lead-package-pr`; packet with Self-check, pasted proof, blast radius, `CONTROL:`.
   Human "yes". Commit on `foundry/sync-empty-deletes`; the human pushes and merges.
10. LEARN. `lead-record-learning` writes one lesson; `lead-maintain-vault` runs. Dispatch `control` `MODE: coach`
    (`control-coach`); paste its block verbatim. Move the card to `vault/backlog/done/`. End `ESCAPES: none`.

Through-line: every phase left evidence, two human gates held, and the fix was reproduced before it was designed.
