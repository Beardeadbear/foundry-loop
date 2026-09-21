# Card rules

> Use when: you create or edit a backlog card, change a status, or a gate reports a card error.

## Schema: one key per line, always
```
---
title: "<verb> <thing>: <one line>"
tags: [backlog]
status: ready
status_note: "<SHAs, what was verified, what remains>"
priority: high
effort: M
risk: full
kind: defect
blocks: loop
premise: unverified
deps: []
triage: pending
updated: YYYY-MM-DD
---
```
Enums: `status` ready, gated-on(&lt;slug&gt;), in-flight, parked, done · `priority` high, med, low · `effort` XS, S, M, L,
XL · `risk` full, light · `kind` defect, feature, gate-defect, chore · `blocks` loop, release, none ·
`premise` holds, dead, unverified. `parked` requires `parked_reason`. `triage: pending` only on a new card,
cleared at the daily triage. Optional: `ref`, `epic`, `source`, `design`, `parked_reason`, `waive_evidence`.

Body: what and why in 2 to 4 sentences, scope, a pointer to the design if it lives elsewhere, and **the proving
check (RED first if it is a fix)**. A big design elsewhere makes this a thin card pointing at the plan; never
copy the design into the card.

## Quoting is parsing, not style
Quote any value containing a colon-space, `#`, `[`, `]`, `{`, `}`, `|`, `>`, or a leading `-`. YAML reads an
unquoted colon-space as a new key and everything after `#` as a comment. A card that does not parse is
invisible to the gate and every filter while sitting on disk looking fine. Never put two keys on one line.

**Narrative goes in `status_note`, never in `status`.** Exactly one `status_note` per card: replace it, do not
append. **Partial work is never `done`.** It stays `ready` with a note naming the remaining half.
`blocks: loop` means the defect stalls the loop or its tooling; `release` means it blocks the deliverable.
`premise: dead` means the stated MECHANISM is gone, never that the symptom did not happen. Re-read the card for
evidence the symptom was observed before archiving; if so, re-scope to the real cause.

## `done` means shipped by a human
A card is `done` only after the human has shipped it (Gate 2 "yes" and the merge). Work that is committed on a branch
and waiting for Gate 2 stays `in-flight`, with the commit SHA in `status_note`. Marking it `done` early overstates
the state and clears the gate of every card that waits on it.

## `done/` is a location with a biconditional rule
A card in `done/` has status `done`, and a card with status `done` is in `done/`. Anything else is corruption.
Close a card in the same pass that verifies its packet, with the commit SHA in `status_note`. A FULL card also
needs its order file and a `CONTROL:` check with `ORDER-OK` (or `waive_evidence` with a reason).
