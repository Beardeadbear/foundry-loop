# The boundary principle

> Use when: the diff adds prose to a skill, agent or rule file, or adds logic whose proper layer is unclear.

Some "overbuild" is not excess to delete; it is content in the wrong layer. Deleting loses the intent;
moving it fixes the layer.

## The test (apply after you understand the mechanism)

> Would this block change if the model were replaced by a perfectly compliant executor?

- No: it is MECHANICAL, a deterministic procedure written as prose. Verdict: wrong layer, migrate it to a
  script or command, and name the home. Do not say "shorten the prose"; that treats the symptom.
  Example: a 15-line "compute the idempotency key by hashing these fields" section becomes a script the skill calls.
- Yes: it is REASONING (interpretation, trade-off, ambiguity). It stays in the prompt; then check it against
  the 4 patterns and the token test below.

## Why it matters

A builder can go wrong in two opposite ways:
1. Add mechanical prose the model must re-execute every run: slow, non-deterministic, token-expensive. Flag wrong layer.
2. Delete reasoning that looked verbose but carried the judgment the agent needs. That is a preservation
   violation (reviewer-check-no-weakening), not a simplification.

Tell them apart; do not treat all length as fat.

## Does it earn its tokens?

Every line in a skill is paid for on every dispatch. Reasoning content earns its place if removing it would
change behavior for the worse. True-but-inert text (a restatement, a pep talk, a definition the model knows)
is overhead.

| Situation | Verdict |
|---|---|
| Mechanical prose in a prompt | Migrate to a script (wrong layer) |
| Reasoning, verbose, behavior-changing | Trim to a reference file, keep a pointer; never delete |
| Reasoning, inert, no behavior change, no home | Delete candidate; if an existing mechanism was removed, run the preservation protocol first |

Never collapse these into a bare "too long, cut it."
