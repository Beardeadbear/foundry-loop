---
name: shared-read-vault
description: >
  Search the vault for a prior verdict before planning, deciding, or classifying a finding. Use at intake
  and before any substantive work: "has this been decided", "check the vault", "dedup this". One job:
  don't re-litigate a settled call or re-solve a dissolved non-bug.
---

# shared-read-vault

1. Open `vault/index.md`. Pick the topic. Open the topic list. Two hops; never grep the whole tree first.
2. Look in `decisions/`, `lessons/`, and `backlog/` (including `done/`) for the same area or failure class.
3. Classify what you found:
   - prior **fix** on the same class = this is a **regression**; flag it
   - prior **dissolve** ("not a bug") = probably a non-bug; stop and report
   - **known error** = apply the recorded workaround
   - **settled decision** = do not re-litigate; cite it
4. Report in one line: the note path and what it changes about the plan. No match: say "no prior".

Gotcha: a finding is a lead. A vault note proves what was true when written; re-check it against the code
before acting on it.

## Reference (use when)
Read a file only when its row applies. Never load them all.

| Use when | Read |
|---|---|
| A finding or idea might already have been judged, and you must decide what the prior verdict means | `reference/search-and-dedup.md` |
