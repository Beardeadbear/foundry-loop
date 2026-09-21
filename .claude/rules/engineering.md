# Engineering discipline

Always on, for every agent that touches code. How a change is made and verified.

## How you think
- **Systems first.** Read the actual files before editing. Follow the existing pattern. Check the imports
  (never introduce an alien library). The tests define expected behaviour, not your assumptions.
- **Simplicity is a feature.** Before the first edit state three lines: **minimum** (the least that solves it)
  / **built** (what you will change) / **delta** (the difference and why). Never build for a hypothetical
  need. Compose an existing helper before writing a new one; if you write a new one, say why the existing
  one does not fit.
- **Root cause only.** No workarounds. On a non-trivial fix ask: is there a more elegant way?
- **Minimal blast radius.** Touch only what the task needs. Adjacent defects become cards, not inline fixes.
  Match the file's style; no drive-by reformatting. Clean up only what your change caused.
  This covers commands you hand the operator: before proposing anything that deletes, switches, resets,
  overwrites or prunes, state what the target exists for and what would be lost. A branch or clone is not
  stale because its name looks old; check what it carries.
- **Dependencies cost forever.** Prefer the standard library or an existing dependency. Justify any new one
  in the commit.
- **No hardcoded customer, tenant or environment token.** Derive it from the abstraction.
- **Four recurring traps.**
  1. Flag every architectural choice (schema, API, auth) as a decision, not a detail.
  2. Handle the unhappy path (errors, missing files, empty input), not only the happy one.
  3. Never call an API you are not certain exists. Check the source or the docs, including any runtime
     behaviour you design on.
  4. Never hand-roll a parser for a formal language. Use a parser, or fail loudly on ambiguity. Approximate
     AND confident is the failure.
- **Two viable readings of a task:** name both and lead with your recommendation. Never silently pick one.
- **Never swallow errors silently.** Handle or surface. An empty catch is a defect.

## Fork test
An item is fork-heavy, and needs design and design-review before Gate 1, if ANY hold: two or more credible
options with different blast radius or reversibility; it touches a schema, public API, auth or permissions, or a
data model; it introduces a new user-visible behaviour shape. Otherwise it is mechanical. Unsure: treat it as a fork.

## Evidence before verdict
Never write PASS, FAIL, "fixed" or a count without the proving output and exit code, captured the same turn.
An edit succeeding means a string matched, not that your change landed: re-read or grep it. Reproduce before
you fix; a report is a lead, not a verdict. Surgical, reasoning-dependent edits are made by hand, one anchored
change at a time, and verified by hand. Scripts are for uniform mechanical bulk changes only.

## Shared checkout
Stage explicit file paths. Never `git add -A`, `git add .`, a directory pathspec, or `git commit -a`.
Before `git stash` or `git reset`, list what it will affect and confirm none of it belongs to another agent.

## Another owner's artifact
A defect in a document someone else owns (an order, a ruling, a plan): capture it and hand it to the owner.
Do not correct it. The finder, the fixer and the grader are three different parties.

## A blocking check must explain itself
A message on a blocking check states what actually happened and what to do instead. Two causes that need
different remedies get two messages. Never widen a check to stop it firing: fix the sentence, not the guarantee.
