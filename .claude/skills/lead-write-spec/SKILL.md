---
name: lead-write-spec
description: >
  Turn a FEATURE idea into the spec + acceptance criteria the human approves at Gate 1. For a DEFECT the
  filled goal (lead-write-goal) is the spec; skip this. Use at SPEC for feature/new-behaviour cards.
---

# lead-write-spec

Produce one page:
1. **Problem in user terms.** Who, what they cannot do, why it matters. No implementation words.
2. **Minimum / built / delta.** The least that solves it; what you propose to build; the difference. State
   why each extra is needed or cut it.
3. **Out of scope**, named.
4. **Acceptance criteria**, itemised. Each AC is objective, grounded in real data, and NAMES the check that
   proves it (test file, command, or manual step with expected output). "Works well" is not an AC.
5. **Operator scenarios** (user-facing only): the wrong-state sentences (see dev-lead).
6. **Fork list** if any: 2-3 honest options with your recommendation. A fork means DESIGN <> DESIGN-REVIEW.
7. **Risk tier** (LIGHT/FULL) with the surface that decided it.

Gotchas: an AC that would pass whether or not the feature works is not an AC. Write the "why it fails if
the claim is false" clause for each.

## Reference (use when)
Read a file only when its row applies. Never load them all.

| Use when | Read |
|---|---|
| You are writing or self-checking the AC in a spec before Gate 1 | `reference/acceptance-criteria-shape.md` |
| An idea or card has words that could mean two builds, before you write the spec | `reference/ambiguity-scan.md` |
| Reviewing your own spec before Gate 1, or a reviewer rejected a build for something the spec planted | `reference/spec-anti-patterns.md` |
