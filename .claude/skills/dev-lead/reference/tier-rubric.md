# Tier Rubric

> Use when: declaring a tier, or a LIGHT item starts touching something sensitive.

Depth follows cost-of-being-wrong, never diff size. A 3-line change to a credential scrubber is FULL; a
300-line doc script is LIGHT. Declare the tier BEFORE intake: a tier chosen at close is an excuse.

## Pick the tier
Ask each question. One "high" answer makes the item FULL. Unsure means FULL.

| Question | High means |
|---|---|
| How much does a wrong call touch? | shared code, many callers |
| Can we undo it cheaply? | one-way door, data already written |
| Does it read or write credentials, PII, customer data? | yes |
| Will a wrong call fail loudly? | it fails silently |
| Can the gate exercise it? | needs a live or manual check |
| Is the shape new here? | first of its kind, or copied by future work |

| Tier | Applies to | Machinery |
|---|---|---|
| LIGHT | docs, prose, renames, test-only diffs, no behaviour change | builder, gate, reviewer diff-read |
| FULL | auth, permissions, data writes or migrations, parsing, concurrency, customer data, unclear | control-check-order, real-data RED, adversarial reviewer, reviewer-verify-real, coaching |

If a LIGHT item's real diff touches a FULL surface: halt and re-tier. Why: the cheap loop was sized for a
risk the change no longer has.

## Proof each tier needs
| Proof | LIGHT | FULL | What it proves |
|---|---|---|---|
| The gate, exit 0 pasted this turn | yes | yes | plumbing only |
| RED on a real, redacted input, then GREEN | if behaviour changed | yes | the fix fixes the real shape |
| Reviewer PASS, fresh context | diff-read | full AC + overbuild + no-weakening | independent check |
| `reviewer-verify-real` scenario lines | no | yes | it works in the named environment |
| Live check by a human or environment the agents lack | no | when the surface needs it | what no sandbox can show |

## Rules
- Green on a fixture you invented is a build signal, not a verdict. Why: it passes whether or not the claim is true.
- Gate green proves plumbing, not behaviour. A FULL item can be gate-green and still wrong live.
- Never run a live check per commit; run it once per item, before the packet. Why: it is the slow, costly step.
- Evidence before verdict: the gate output and exit code are in this turn's transcript, not "the builder said so".
