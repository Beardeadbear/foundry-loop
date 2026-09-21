# RED-First Discipline

> Use when: establishing the failing check, or about to trust a green result you have not seen fail.

RED-first is the proof the fix changed something. Without it a passing test may have passed before your change.

## The rule

Before any fix: a test asserting the **correct** behaviour, run on **current unfixed code**, with the failure
and exit code captured to a file. That failure is the bug made mechanical.

## Counts / does not count

| Counts | Does not count |
|---|---|
| Fails, message matches the reported symptom, and you can point at the wrong line | Errors for an unrelated reason (import error, bad fixture): a broken test |
| Asserts the correct output, red because the code is wrong | Asserting the buggy output "so it is red now, I will flip it later": inverted logic |

A test written after the fix may never have failed on the old code; you cannot tell it from a tautology.

## Capture

Show the command, the failing assertion, the exit code. "Reproduced locally" without output is not evidence.

## Cannot reproduce

Two serious attempts and still green: stop and return a clean no-op with what you tried. The report was a lead,
not a verdict; it may be a non-bug or already fixed. Inventing a failing test ships a fix for nothing.

## Proving an existing green can go red

A passing test and a test that stopped testing look identical in a summary line. Make it fail on purpose.

- **Perturb a scratch copy, never the tracked tree.** Copy the code under test outside the repo and break the
  copy. A crash between break and restore would leave the real tree wrong. If you must break tracked files,
  the restore is part of the proof: show an empty diff afterwards.
- **Poison a shared value.** When N sites should read one constant, point it at something that must fail (a
  nonexistent path). Exactly the N dependent tests should go red; a site that stays green is not reading it.

Never report a check passes until you have seen it fail for a reason you caused.
