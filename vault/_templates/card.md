---
title: "<verb> <thing>: <one line>"
tags: [backlog, <area>]
status: ready                # ready | gated-on(<slug>) | in-flight | done
status_note: "<narrative: SHAs, what was verified, what remains>"
priority: high               # high | medium | low        (own line)
effort: S                    # S | M | L                  (own line)
risk: full                   # full | light. Unsure = full
kind: defect                 # defect | feature | gate-defect | chore
deps: []
ref: ""                      # tracker ticket key or URL (Jira PROJ-123, issue URL)
epic: ""                     # parent epic key; the epic plan in vault/plans/ names ready cards
source: cards                # cards | jira | backlog
design: ""                   # path to a plan in vault/plans/ if the design lives elsewhere
triage: pending              # pending until blocks/premise are set
blocks: none                 # loop | release | none          (set at triage)
premise: unverified          # holds | dead | unverified       (set at triage)
updated: YYYY-MM-DD
---
What / why (2-4 sentences). Scope. Pointer to the design.

**Reproduction (real data):** <fixture path + command>
**Proving check:** <the test or command that is RED now and must be GREEN; RED-first if a fix>
**Out of scope:** <named>
