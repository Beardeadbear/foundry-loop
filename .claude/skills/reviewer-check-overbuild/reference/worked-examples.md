# Worked examples

> Use when: you want concrete calls for catching overbuild versus clearing earned or load-bearing complexity.

Invented, generic cases. Same skill, two directions: reject unearned additions, protect scars.

## Caught overbuild (correct REJECT)

**A. Premature abstraction.** Goal: a sync job reads one JSON config. Diff adds a `ConfigSource`
interface and `FileConfigSource` "for a future remote source."
REJECT: one call site, one implementation. Inline the read; add the interface when a second source exists.

**B. Speculative error handling.** Goal: parse a field the form-submit handler already validated non-empty.
Diff wraps it in try/catch, a retry loop and a default.
REJECT: no branch can execute; name the failure trigger or remove them. A dead catch also hides real bugs.

**C. Needless config.** Goal: batch an export. Diff adds `--batch-size` threaded everywhere; every call
passes the default.
REJECT: no caller varies it. Hardcode; add the flag when a second value is needed.

**D. Mechanical prose (wrong layer).** Diff adds a 15-line "hash these fields to build the key" procedure
to a skill.
REJECT: deterministic, so it would not change under a perfectly compliant executor. Move it to a script and
call it (`boundary-principle.md`). Not "shorten the prose."

## Mechanisms saved

**E. Incident-backed guard, clear it.** Existing code double-validates a write to an external store, and a
commit message ties it to a past data-loss bug. Redundant-looking but load-bearing: never flag for deletion.

**F. Deletion to "simplify," REJECT the removal.** The builder removed a skip-condition from a retry helper
to shorten it, with no provenance and no blast-radius analysis.
REJECT: provenance not established; restore it or supply the full delete gate (`preservation-protocol.md`).

**G. Earned abstraction, clear it.** A shared parser used by three genuinely different call sites already
in the change. Three live callers, shared shape: earned by the rule of three.

## Pattern

REJECT unearned new complexity (A to D) and unsafe deletions (F). Clear earned complexity (G) and
incident-backed mechanisms (E). Cut fat and guard scars; never one without the other.
