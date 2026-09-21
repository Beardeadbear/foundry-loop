---
title: "<verb> <thing>: <one line>"
tags: [backlog, <area>]
status: ready                # ready | gated-on(<slug>) | in-flight | parked | done
status_note: "<narrative: SHAs, what was verified, what remains>"
priority: high               # high | med | low
effort: S                    # XS | S | M | L | XL
risk: full                   # full | light. Unsure = full
kind: defect                 # defect | feature | gate-defect | chore
blocks: none                 # loop | release | none          (set at triage)
premise: unverified          # holds | dead | unverified       (set at triage)
deps: []
triage: pending              # cleared at the daily triage
updated: YYYY-MM-DD
# optional keys, each on its own line:
# ref: ""                    # tracker ticket key or URL
# epic: ""                   # parent epic; its plan in vault/plans/ names the ready cards
# source: cards              # cards | jira | backlog
# design: ""                 # path to a plan if the design lives elsewhere
# parked_reason: ""          # REQUIRED when status is parked: the fork or gate that stopped it
# waive_evidence: ""         # a reason, when a FULL card is done without an order and CONTROL check
---
What / why (2-4 sentences). Scope. Pointer to the design.

**Reproduction (real data):** <fixture path + command>
**Proving check:** <the test or command that is RED now and must be GREEN; RED-first if a fix>
**Out of scope:** <named>

Full schema, quoting and status rules: `.claude/skills/lead-write-vault/SKILL.md`.
