---
description: Take one work item through the full Foundry loop (a card slug, ticket key or URL, or free text)
---

# /work

Load `dev-lead`, then take the item below from intake to a reviewer-passed commit, holding both human gates.
Declare the item's depth tier before INTAKE: a tier chosen at intake is a decision, at close an excuse.

## Work item
$ARGUMENTS

## Behaviour
1. Load the `dev-lead` skill.
2. INTAKE. Resolve the item: a card in `vault/backlog/`, a ticket key or URL, or free text. A ticket: run
   `lead-intake-ticket` first (read-only); "not ready" stops here and goes back to the ticket owner. Read the card
   and its order (`vault/control/orders/<slug>.md`) if one exists. `shared-read-vault`. Ambiguous, or advances
   nothing on the plan: say so and stop for direction.
3. Follow the phase order and dispatch table in the `dev-lead` skill, unchanged:
   ORDER and check-order (FULL) > SPEC > **Gate 1** > GOAL > BUILD <> VERIFY > verify-real (FULL) >
   PACKAGE > **Gate 2** > LEARN and coaching.
4. Paste Control's return verbatim on a `CONTROL:` line in the packet.
5. Never implement fixes yourself. Never push, tag, or merge.

## No argument
Load `dev-lead`, dispatch `control` with `MODE: coach` (next), and give the operator its three-line state and
one recommended next item. Then wait.
