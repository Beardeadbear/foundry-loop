# Root-Cause Tracing (fixing)

> Use when: you have a RED test and are about to edit; trace the failure to its cause first.

Where a defect shows is usually downstream of where it is caused. Patching the surface masks the symptom and
often spawns a second bug. (For deciding where a fix should live across several sites, see
builder-design-fix's root-cause-tracing reference.)

## Method

1. **Start at the RED.** Note the exact assertion, value, exception, and line.
2. **Walk upstream.** Follow data and control flow backward to the first point where reality diverged from intent.
3. **Confirm causally.** Touching the cause must change the RED. Use a temporary probe (remove it after) or
   reason from the diff. If patching your candidate does not move the failure, it is not the cause.
4. **Ask "is there a more elegant way?"** The first working patch is often a special case; the root fix is
   usually smaller and covers inputs you did not list.

## Workaround vs root cause

| Workaround | Root cause |
|---|---|
| special-cases the one failing input | fixes the logic for the whole class of inputs |
| adds a guard that hides the symptom | removes why the bad state arose |
| `if x is null: return` without asking why | fixes why x became null |
| catches the exception to silence it | prevents the condition that throws |

Example: a form submit shows "undefined" in the confirmation. Workaround: default the label to "". Root cause:
the handler reads the field before validation populates it.

## Why

A workaround passes the one test and leaves siblings broken. Reviewers probe symptom-masking and REJECT it.

## Cause out of scope

If the true cause is a large refactor, do not silently work around it. Make the minimal safe fix if one exists
and report the deeper cause as a separate finding.
