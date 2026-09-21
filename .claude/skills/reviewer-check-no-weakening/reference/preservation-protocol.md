# Preservation protocol

> Use when: the diff removes or softens an existing mechanism (guard, validation, retry, check) and you must decide whether that is safe. This is also the canonical home for "a mechanism with incident provenance is not overbuild."

Chesterton's fence: do not remove a fence until you can tell why it was built. Mechanisms rarely exist by
accident; a guard that looks redundant often encodes a past failure.

## Default is KEEP

Every existing mechanism is LOAD-BEARING until it fails the gate below. No story found means the research
is incomplete, not that the mechanism is unnecessary.

## The 4 labels (exactly one per removal)

| Label | Meaning | Needs |
|---|---|---|
| LOAD-BEARING | Earns its place; keep | The default |
| NEEDS-PROVENANCE | Cannot yet tell | Honest label when unresearched |
| QUARANTINE-CANDIDATE | Probably removable, not proven | Plausible story, replacement not yet tested |
| DELETE-SAFE | Provably removable now | All three parts of the delete gate |

Never default to QUARANTINE or DELETE-SAFE without a completed provenance story.

## Provenance story

Tell why it was added in 3 sentences or fewer, with evidence: a commit found via `git log -S`, an incident or
bug note, a vault entry, a `why:` comment, a test that fails without it. No story: NEEDS-PROVENANCE, and the
removal does not pass.

## Delete gate (all three)

1. Confidence at least 0.85 that it is dead, from understanding rather than skimming.
2. Replacement named: what now covers what it covered, or why nothing needs it.
3. Bounded blast radius stated: which tests fail, which behavior changes, which failure returns. "I think it's unused" is not an analysis.

Any gap: the removal is a REJECT.

## Consequences for the verdict

- Deleted to "simplify" and short of DELETE-SAFE: `REJECT: weakening: removes <mechanism>; provenance and blast radius not established. Restore it or supply the full delete gate.` You reject the removal, not the mechanism.
- Incident provenance makes a mechanism untouchable. That includes loosening, widening or softening, not just deleting.
- Overbuild is not the lens for it: reviewer-check-overbuild must not flag incident-backed code, and this protocol judges any removal of it. An unenforced hard rule stays LOAD-BEARING; the finding is "add enforcement," never "delete."

## One-line test

Can the builder tell the story of why it was put here, and exactly what breaks if they are wrong? If not, it stays.
