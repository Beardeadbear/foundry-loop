# The 4 overbuild patterns

> Use when: the diff adds an abstraction, an error handler, a config knob, or a parameter and you must decide if it is overbuild.

Each is a REJECT only if the addition is not earned by this change's present need; check
`when-complexity-pays.md` before flagging.

| # | Pattern | Tell | Counter-question |
|---|---|---|---|
| 1 | Premature abstraction | Interface, base class, factory or strategy for ONE caller, "so we can swap later" | How many real call sites are in this diff? One: inline it |
| 2 | Speculative error handling | try/catch, retry or fallback for a failure that cannot occur on this path | Can I name the trigger? No: remove it |
| 3 | Needless config | A flag/option/env var that only ever receives its default | Does any caller pass a non-default value? No: hardcode |
| 4 | Dead flexibility | Parameters, hooks, generics nothing calls | Does a real caller exercise every parameter? Prune the rest |

## Why each costs

1. An abstraction is a bet on a future that usually does not arrive, and it guesses the wrong seam before the second use exists.
2. Dead error paths cannot be triggered, so they are untested and rot. A broad catch that swallows the impossible also swallows real bugs.
3. Config is a permanent interface; every flag doubles the state space to test and document.
4. Dead parameters get copied, passed through and defended in tests, making the real signature harder to read.

## Examples (REJECT)

- A sync job reads one JSON file; the builder adds a `Source` interface plus `FileSource` "for a remote source later."
- A form submit handler parses a field already validated non-empty; the builder wraps it in try/catch with retry and a default.
- A batch job gains `--batch-size`, but every call passes the default.
- A helper takes an `options` object with six fields; its only caller passes one.

## Do not confuse

The unhappy path that CAN happen (500s, missing file, empty payload) is required, not overbuild.

## Through-line

All four build for a hypothetical future. Ask: does THIS change use it now? No: overbuild. But prose in the
wrong layer is a migrate, not a delete (`boundary-principle.md`), and a mechanism with incident provenance
is never bare-deleted (reviewer-check-no-weakening, `preservation-protocol.md`).
