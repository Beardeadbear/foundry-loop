# When complexity pays

> Use when: you are about to flag something as overbuild but are not sure it is unearned.

A gate that rejects justified complexity is as harmful as one that misses overbuild: it pushes builders
toward copy-paste and unhandled edge cases. These are the tests that say "earned, clear it."

## Rule of three

Abstraction is earned at the third real, differently-shaped use, not the first or a speculative second.

| Callers (existing now) | Call |
|---|---|
| One | Inline it (premature) |
| Two | Usually inline or a tiny helper; watch for diverging shapes |
| Three or more, shared shape | Earned; the duplication is now the liability |

The call sites must exist now in the code, not "eventually."

## Earned by a documented incident

A guard, retry or seemingly redundant check tied to a specific past failure is earned however defensive it
looks. Evidence: a commit, a bug or incident note, a test that fails without it. Incident-backed means
load-bearing, never overbuild. Example: a double-check on a payment write added after a data-loss bug.
Removing or loosening it is judged by reviewer-check-no-weakening (`preservation-protocol.md`).

## Earned by a real, present contract

- Config that a real second caller passes differently.
- Error handling for a failure that can occur on this path (name the trigger: 500, missing file, empty or malformed payload, network flake). Handling the possible unhappy path is required.
- A parameter a real caller in the diff exercises.

## One line

Overbuild serves a hypothetical future; earned complexity serves a present need: a third live caller, a
documented incident, a possible failure, a contract someone uses.

## Reviewer stance

When unsure, ask the diff to show the present need: the third call site, the incident reference, the
failure trigger, the non-default caller. Present: clear it. "Might need it later", "future-proofing",
"just in case": REJECT with the simpler alternative. Do not demand the builder prove a negative, but do not
accept a hypothetical as a justification.
