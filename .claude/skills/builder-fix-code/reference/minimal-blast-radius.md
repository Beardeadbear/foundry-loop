# Minimal Blast Radius

> Use when: deciding what NOT to touch while fixing, or when your diff is growing past the defect.

Every changed line is a line the reviewer must verify and a chance for a new defect. The fix should read as
exactly the fix.

## The rule

Change only what moves RED to GREEN at the root cause. Anything else you notice, flag; do not fix.

## Do not

- **Drive-by refactors.** "While I am here" doubles the review surface and couples an unrelated change to the fix.
- **Reformat.** Match the file's style. A 100-line whitespace diff hides the 3-line fix.
- **Fix adjacent bugs.** Defects cluster, but the reviewer cannot cleanly verify two fixes at once. Report it.
- **Add a dependency silently.** Prefer the standard library or an existing dependency; justify any new one.
- **Make it configurable or generic.** That is overbuild (reviewer-check-overbuild REJECTs it). Do today's need.

## Example

Fixing an empty-payload crash in a sync job, you see the retry loop is ugly and a second null check is missing
elsewhere. Fix only the empty-payload guard. Put "retry loop cleanup" and "missing null check in export" in
your return as findings.

## Why

Smaller diff means faster review, fewer REJECTs on churn, less regression risk, and one revertable change.
Leave the work uncommitted; the lead commits.

## Flag-do-not-fix

End your return with a short "noticed nearby" list. It is signal for the lead, delivered as information rather
than as unreviewed changes riding along.
