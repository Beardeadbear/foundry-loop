# Acceptance-criteria shape: itemised, objective, grounded

> Use when: you are writing or self-checking the AC in a spec before Gate 1.

These criteria flow downstream unchanged: `lead-write-goal` pins them, the builder cannot edit them to pass,
and `reviewer-check-ac` verifies each by re-execution. Write them for that pipeline.

## Itemised
- **One criterion, one checkable fact.** "Auth works and errors are logged and nothing regressed" is three
  criteria; the reviewer cannot return the FIRST failed item against a compound.
- **Numbered**, so a verdict can say "AC-3 failed".
- **Ordered by weight:** (1) the new proving test RED then GREEN, (2) no-weakening, (3) back-compat,
  (4) agnostic, then feature-specific items by severity. A weakened gate outranks a cosmetic miss.

## Objective
- **Shown in the transcript.** Name the command and the expected output or exit code, the grep and its match.
  "Feels faster" is not an AC; "p95 of `<command>` under N ms in the run output" is.
- **Binary.** If a threshold is needed, it is in the criterion, chosen now, not negotiated at review.
- **Actable by a fresh context.** An AC only the builder could check ("internal state is consistent")
  is malformed; restate it as an observable.

## Grounded
- **RED-first is AC one.** A test never red on current code proves nothing.
- **Real commands and paths, verified to exist.** Exception: never hardcode the test file path; the goal tells
  the builder to find the canonical wired test, because an orphan test never gates.
- **Traces to the problem.** A criterion that does not is scope creep with a checkbox.

## Self-test before Gate 1
For each AC: could a fresh reviewer verify this by running something and citing output? A "no" means
rewrite or delete. Then for the set: if all pass, is the problem solved at the spec's minimum? A gap means a
criterion is missing.
