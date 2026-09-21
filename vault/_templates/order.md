---
title: "Order: <card slug>"
tags: [control, order]
card: <slug>
tier: full                  # full | light  (by surface; unsure = full)
model: sonnet               # opus only with a reason on this line
updated: YYYY-MM-DD
---

## Premise (each claim: command + output, or UNVERIFIED)
Every command must run from the repo root, so Control can re-run it. A probe script outside the repo cannot be re-run.
- <claim> : `<command>` -> <result>

## Scope
In: <files / behaviour>.  Out: <named>.

## Acceptance criteria
Itemised. Each names the check that proves it AND how it fails if the claim is false. The check must still run after the commit,
against the item's SHA, and fail if the claim is false. A `git diff` of the working tree cannot.
1. <AC> | check: `<test or command>` | fails when: <..>

## Real fixture
<path to the redacted real input the RED and the verify use>. None yet? Creating it is step 1.
Provenance (`<name>.provenance.md`): <source> · <capture date> · <what was redacted> · <what was kept>.

## Environment for verify-real
<the real environment the scenarios run on: its name and how to reach it, read-only or scoped>. Say whether it is
disposable or SHARED. If shared, list only scenarios that cannot harm it. A local checkout
counts ONLY if named here as the environment. Nothing to run on? Write `UNVERIFIABLE-HERE` and the human live
check the packet must list.

## Budget and caps
Production diff <n> lines; collateral <n>. Turns cap <n>. Same defect rejected twice = park.

## Reuse
<canonical helper(s) to compose, or "none identified: recon required">

## Failure-mode inventory (required if it writes, copies, deletes or certifies operator/customer data)
| Point | What stops it succeeding while doing nothing, or destroying something? | SAFE (why) / BROKEN (how) |
|---|---|---|

## Operator scenarios (user-facing items)
What a person says, in what state, including the wrong state (no record, yesterday's record, twice, wrong
environment, typo, "undo that"). One line each; verify runs every line.

## Gate-1 forks pre-ruled
<ruling ids from rulings.md that apply, or "none">

## Three steps ahead
Forces next: <..> · Breaks if premise wrong: <..> · Collides with live item: <..>

## Open items (each done, or listed as a ruling owed to the operator)
- [ ] Every AC is itemised, names its check, and says how it fails if the claim is false
- [ ] Fixture named, with provenance on file (source, capture date, redaction)
- [ ] Failure-mode inventory filled, or `n/a: writes no data`
- [ ] Environment for verify-real named, or `UNVERIFIABLE-HERE` declared
- [ ] Rulings owed by the operator listed, or `none`
