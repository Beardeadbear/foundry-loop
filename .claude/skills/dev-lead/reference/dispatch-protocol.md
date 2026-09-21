# Dispatch Protocol

> Use when: dispatching a builder, reviewer or control sub-agent.

`lead-write-goal` composes the goal string; this file owns the mechanics around it.

## The dispatch
1. Dispatch a sub-agent with the goal as the whole prompt. It has no other context, so the goal is
   self-contained. Why: a builder given a half-briefing invents the rest.
2. Name the skills it must read in the prompt (table in `dev-lead/SKILL.md`). Sub-agents do not inherit yours.
3. Append `MANDATORY_ARTIFACTS: <paths>` (changed files plus the new test). Verify they exist on disk before
   accepting the return. Why: a turn-limit kill can read as "done".
4. Pin the gate: the builder may not edit the gate, the failing test or an existing check to reach green.
5. After every return run `git status`. A stash, commit or edit outside the ownership table is a FINDING.

## Reviewer payload: carry YOUR RED
Send `{AC, diff, gate result, your own RED capture, fixture, reviewer skills line}`. The reviewer cannot re-derive
RED without mutating the tree, so a builder-only RED paste is unchecked. It cross-checks the builder's RED against
yours; divergence is a REJECT. Never dispatch a reviewer on a defect without your RED. Without the skills line
it runs at preload-only coverage.

## Control modes
| Mode | Gets | Never gets |
|---|---|---|
| check-order | order, card, epic plan | the diff |
| fork-lean | the fork and options | your own lean, the diff |
| coach | card, order, progress trail, rulings | the diff |

## Design-review dispatch (fork or feature items)
1. Designer: a builder with `builder-design-fix` produces the memo.
2. Design-reviewer: a FRESH `reviewer` with `reviewer-check-design`. Never the designer's context. Why: a
   self-reviewed design is the failure this step exists to catch.
3. `APPROVE-DESIGN`: proceed to Gate 1 with the verdict as evidence. It is not a third human gate.
4. `REJECT-DESIGN`: a fresh design pass carrying the reason verbatim. Cap 2 rejects on one item, then park.
5. BUILD starts only on APPROVE-DESIGN, with a fresh builder.

## Parallelism
Builders run in parallel only on disjoint file sets declared in their goals; never the same file. Never run the
gate while a builder is alive. Finish or cap the current item before the next.

## After the return
COMPLETE with artifacts: dispatch the reviewer. REJECT or any other status: `recovery-and-reject.md`.
