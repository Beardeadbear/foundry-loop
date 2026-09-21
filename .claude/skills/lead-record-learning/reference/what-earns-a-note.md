# What earns a vault note

> Use when: deciding whether a lesson is durable, and which folder it belongs in.

Over-writing buries the vault in state that belongs to the tracker and git. Under-writing loses the thinking
the next session needs. The line is the 6-month test.

## The 6-month test
Will this still be true and worth knowing in 6 months? Yes, and it is reasoning (why or how we decided): a
note. No, or it is state: not the vault (tracker, git, or nowhere).

## Earns a note
| Kind | Example | Home |
|---|---|---|
| A decision's why | "chose an allow-list over a flag because it is greppable" | `decisions/` |
| A reusable lesson | "guards must normalise case; a class of bugs hides there" | `lessons/` |
| A known error | symptom, workaround, root cause not yet fixed | `lessons/` |
| A dissolve | "reproduction showed the report was a non-bug" | `lessons/` (dedup fuel) |

## Does not earn a note
- **Code or behaviour:** it is in the repo; "the function now normalises case" is the diff.
- **Status:** the tracker or card owns "item X is done".
- **Run artifacts:** test output, counts, one run's results.
- **The play-by-play:** nobody re-reads "first A, then B". Keep the lesson, one line.

## Fact or reasoning?
Reference describes what the system is; a decision or lesson describes our response to it. Facts about the
system go where `lead-write-vault` says facts go; reasoning goes to decisions or lessons.

## Merge, don't multiply
Search the topic first (`shared-read-vault`). If a note owns it, extend that note and add a link. A second
note on one topic is drift and breaks the one-canonical-note law. Unsure which is canonical: stop and ask.
Unattended run: write to `staging/`; a human promotes. Never write secrets or customer data.
