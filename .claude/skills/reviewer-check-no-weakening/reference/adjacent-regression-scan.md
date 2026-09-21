# Adjacent-regression scan

> Use when: the diff changes a shared function, artifact, schema, default or output shape, and you must prove the neighbors survived.

The change can keep every guard and still break the behavior next door. The acceptance criteria prove the
intended change; this scan proves the unintended ones did not happen.

## What "adjacent" means

Other callers of a changed function, other consumers of a changed artifact or schema, behaviors sharing the
changed code path, and defaults or flags whose meaning shifted.

## The scan (in order)

1. **Map the blast radius.** For each changed symbol (function, export, command, schema field, file path), grep for callers and consumers. Each is unaffected (say why), updated in this diff (check it), or missed (finding).
2. **Read every touched file end to end, not just the hunk.** Drive-by edits hide outside the quoted hunk: a reformat that changed semantics, a cleanup that dropped a branch. Anything beyond the task is justified or a finding.
3. **Error-path check.** New or changed catch blocks, fallbacks, defaults: does any now swallow what was surfaced before? An empty catch is a defect; a broadened default that masks a bad state is a weakening though nothing was deleted.
4. **Contract check.** Changed output shape, exit code, enum value, file path: grep for consumers still expecting the old one. Contracts break silently; the producer's tests pass while the consumer starves.
5. **Landed check.** Re-grep for what the builder claims changed. A successful edit means a string matched once, not that it landed everywhere needed. Multi-site fixes are the classic miss: 3 of 4 sites patched.
6. **Coverage honesty.** The gate covers only wired tests. Where adjacent behavior has no test, this scan is the verification; do not let a green gate stand in for it.

Example: a sync job's payload gains a required `id` field. The producer test passes, but the retry helper
that reads the old shape now gets `undefined` and silently drops records.

## Verdict shape

A finding names the adjacent thing at risk, the evidence (the grep, caller or output), and what the builder
must do (update the missed caller, restore the surfaced error, cover the contract). The first and worst
finding feeds the REJECT.
