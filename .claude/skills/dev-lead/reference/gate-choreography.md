# Gate Choreography

> Use when: presenting the Gate 1 or Gate 2 packet.

Both gates are hard stops. You present, the human decides, you proceed only on an explicit "yes". Silence,
a thumbs-up on something else, or "looks fine" about a part is not approval. Why: autonomy lives inside the
loop; the gates are the human's steering, and a crossed gate is worse than a slow one.

## Gate 1: approve the spec and goal
Packet, plain language first:
1. One line: what and why, a non-engineer can follow it.
2. Class and tier, and whether it belongs to the active epic.
3. The reproduced root cause: `file:line` plus mechanism, with your RED capture pasted.
4. Acceptance criteria. Each states how it FAILS if the claim is false. A check that passes either way is not
   evidence; send the goal back to `lead-write-goal`.
5. The fork, if any: your recommendation marked, plus the `CONTROL:` line (fork-lean shown next to yours).
6. FULL items: the `CONTROL:` line from check-order, verbatim. Without it the item is not Gate-1-ready.
7. An unresolved `ORDER-REJECT`: say the item is BLOCKED on it and name the defect. Do not start BUILD until a
   ruling names that reject. A general "approved" does not waive it; ask the operator to rule or fix it. Why:
   the human line that overrides a check must say which check, or the override is invisible in the record.

## Gate 2: authorize delivery
Packet is evidence, not a claim:
1. The Self-check from `CLAUDE.md`: every finding closed-by-SHA or open; "X done. Y open. Z partial".
2. Pasted proof: gate exit 0, reviewer PASS, RED to GREEN, and for FULL the verify-real scenario lines.
3. Blast radius: files, branch, what a human must do next.
4. What is NOT covered: deferred live checks, quarantined tests, open items.
5. FULL: the `CONTROL:` coaching line, verbatim.
Every packet ends: Done, Needed from you, Next step, Coaching.

## Attended vs unattended
| Mode | Gate 1 | Gate 2 |
|---|---|---|
| Attended | present, STOP, wait for "yes" | present, STOP, wait for "yes" |
| Unattended (`/night-shift`) | only as the command defines; a fork or open question parks the item | never crossed; the branch is left ready with the packet in the shift report |

## What "yes" means
"Yes" approves exactly what the packet showed. If the human changes an AC, the scope or a fork answer,
re-present the changed packet. A "yes" to Gate 1 is not a "yes" to Gate 2.

## Never auto-cross
Do not push, tag or merge on inferred approval. When unsure whether a gate is open, present and wait.
