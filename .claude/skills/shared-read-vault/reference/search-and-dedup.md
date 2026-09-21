# Search and dedup: reading a prior verdict

> Use when: a finding or idea might already have been judged, and you must decide what the prior verdict means.

The same finding classes recur. Re-litigating a settled one wastes a builder, or ships a fix for a non-bug.

## What each prior verdict means
| Found in the vault | Meaning | Your action |
|---|---|---|
| Dissolved (non-bug) | a session reproduced it and found no defect | do not build; cite it; reopen only with NEW evidence |
| Fixed | a fix shipped before | a new occurrence is a **regression**: flag it; the old note shows what used to work |
| Known error | symptom + workaround, root cause open | apply and report the workaround; do not re-investigate from scratch |
| Settled decision | a call and its reason | cite it; do not re-litigate |
| No prior | genuinely new | reproduce and proceed |

## Search efficiently
1. `vault/index.md`: pick the topic that owns the area.
2. In that topic, `decisions/`, `lessons/` and `backlog/done/`, grep the specific mechanism or symptom (a
   function name, an error string, the slug), not a broad term.
3. Read the 1-2 matching hits and ignore near-misses. Two searches max; no hit means no prior.

## The regression catch
A match on a prior fix is the highest-value result. Something fixed broke again, or the earlier fix was
incomplete. Surface it loudly; never file it as a known duplicate.

## When the vault and the code disagree
The note is thinking as of when it was written; the code is current. If a note says "fixed" but you can
reproduce the defect, the code wins: treat it as a regression and mark the note stale. A note never talks
you out of a reproduction you can see.
