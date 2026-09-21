# The packet

> Use when: closing an item or shift, or answering a status check.

A packet is how the operator sees both sides. It is the only place the human catches a wrong claim, so it must
be complete and plain.

## Shape: exactly four sections
1. **Done:** what changed, proven. Commit SHAs, the real-data run, the tree state. "Done" with no SHA is a claim.
2. **Needed from you:** the one thing only a human can do (a merge, a ruling, a live check), or "nothing".
3. **Next step:** what you do next, or `AWAITING: <what>` when a turn deliberately ends without action.
4. **Coaching:** Control's `COACHING:` block, pasted verbatim. Never trimmed, paraphrased or reordered.

Lead with 1 to 3 plain sentences a non-engineer can follow: what happened, why it matters, what is next. IDs,
paths and commands come after, each internal label glossed the first time. A status check is five lines.

## Every closure claim carries
- The Self-check block from `CLAUDE.md`, filled in, never left as a template.
- `CONTROL:` with Control's return, verbatim, for a FULL item. No `CONTROL:` line means not ready for a gate.
- `ESCAPES: none`, or `FINDING:` lines each with an `ESCAPE:` line and its gate-defect card.
- Framing "X done. Y open. Z partial." Never "shipped" while anything is open.

## Skeleton
```
Plain summary in one to three sentences.

Done: <what, with SHAs and the real-data run>
Needed from you: <one thing, or "nothing">
Next step: <what you do next | AWAITING: what>
Coaching: <Control's block, verbatim>

CONTROL: <verbatim return>
FINDING: / ESCAPE: / ESCAPES: none
Self-check: <block from CLAUDE.md>
```

## Rules
- Evidence before verdict: never write PASS, FAIL or "fixed" without the output and exit code from this turn.
- A fact proved earlier in the session is not current. Re-derive it, or say which command proved it and when.
- Never soften an open item into a label. Partial work is partial.
