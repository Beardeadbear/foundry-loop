# The Fork Decision

> Use when: two or more viable fix shapes exist and you must weigh them and recommend one.

The deliverable is never an open options list: honest tradeoffs, then ONE defended recommendation.

## Lay out the real fork

Usually 2 to 3 genuinely viable shapes, not a strawman beside your favourite. Include the smallest option even
if you will not recommend it. Options differing only in naming are one option.

| # | Approach | Layer | Blast radius | Tradeoff |
|---|---|---|---|---|
| A | guard in the shared parser | code | 1 file | rejects at the edge only |
| B | change the exporter | producer | 1 producer + N readers | needs a coordinated release |

Two readings of the problem itself: name both, lead with your recommendation; never silently pick.

## Five criteria (defend the pick by name)

1. **Root-cause fit**: source or symptom? A larger change that kills the class beats a smaller symptom patch.
2. **Layer correctness**: mechanical work (counting, thresholds) in code; judgment stays prose.
3. **Blast radius**: files and consumers touched, false-trigger risk. Smaller wins ties.
4. **Elegance**: state the simpler shape you considered and why it fails. If you cannot name one, you have not looked.
5. **Reversibility**: additive beats mutating; one-commit backout beats rewiring consumers.

## Preservation

Never propose removing or bypassing a mechanism with provenance (a `why` comment, an incident, a decision
record) without disproving its reason first. Rarely firing is not dead. Removing a load-bearing guard is a
regression, not a candidate.

## Recommendation

Pick ONE, defended on the named criteria, stating what the losing options cost you and what evidence would
flip your choice. If there is no real fork, say so and hand back a plain fix plan.
