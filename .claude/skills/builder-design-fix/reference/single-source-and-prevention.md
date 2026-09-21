# Single Source and Prevention

> Use when: a fix would repeat the same logic in more than one place, or its shape is a check that catches a bad state after the fact.

## 1. Single-source the fix

If the same logic is patched in N places, the fix belongs at the one point they all derive from. Patching ten
consumers while missing the producer means the next consumer written has the bug again.

- Find the derivation point (producer, shared helper, schema), fix there, route the N sites through it.
- If no shared point exists, creating one is the fix, but only when 3+ real sites exist today, not for one.
- Tell: your fix adds the same filter where data arrives instead of changing what is emitted. Fix the producer.

## 2. Prevent or normalize before reject-and-retry

A gate that blocks and forces a rewrite burns a round-trip per slip. Prefer, in order:

1. **Make the bad state impossible**: constrained writer, validation at write time, a schema the producer cannot violate.
2. **Normalize**: canonicalize on the way in (trim, casefold, resolve path). Tolerant reader, strict writer.
3. **Reject-and-retry**: reserve for genuine judgment failures (fabricated evidence), where normalizing would hide a lie.

Ask of any check: could the producer be shaped so this never fires? If yes, that is the better fix.

## Example

A form submit is rejected downstream when the phone field has spaces. Instead of validating in five handlers,
normalize once in the form's serializer and delete the compensating checks.

## Combined test

The great fix: change the one producing point so the bad state cannot exist, and delete the downstream patches
that compensated. If your design adds a patch and keeps the compensations, you are still on the symptom.
