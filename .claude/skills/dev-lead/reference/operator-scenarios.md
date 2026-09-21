# Operator scenarios

> Use when: the item is user-facing: writing its scenarios or running the live check.

Six mechanical steps went green while the feature broke on the first sentence a human typed. Humans are
unpredictable; the scenario list is where that unpredictability gets written down, before the live check.

## Build the list
Write it in the order file (`Operator scenarios`) BEFORE any live check, with the expected outcome written first.
Cover the normal case and every wrong state:

| State or move | Ask |
|---|---|
| No record yet | Does it explain what to do, not just fail? |
| A record from yesterday | Does stale data mislead it? |
| The same action twice | Duplicate, no-op, or a clear refusal? |
| The wrong environment | Does it refuse, or act on the wrong one? |
| Two intents in one breath ("test it AND automate it") | Does it split, ask, or silently pick one? |
| A different surface (an IDE panel instead of the terminal) | Same behaviour? |
| A typo in a name | A helpful match, or a bare error? |
| "Undo that" | Is there a way back, and is it safe? |
| Empty, maximum size, unicode | Edge input the fixture may not cover |
| A dependency slow or down | Timeout, partial write, or clean failure? |
| Missing permission | Refused clearly, nothing half done? |

## Report format
One line per scenario: `SCENARIO n: <what the person does> | <state> | expected: <..> | result: PASS|FAIL <what you saw>`.
`reviewer-verify-real` runs every line on a real environment. Any FAIL is a REJECT, not a report.

## Rules
- A bare error on a wrong-state scenario is a defect: an error names what went wrong and what to do.
- The list belongs to the item, not to the feature in general. Every user-facing item writes its own.
- A scenario you cannot run here is `UNVERIFIABLE-HERE`, listed for a human live check. Never mark it green.
