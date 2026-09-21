mode: named          # named | proposed
locked: YYYY-MM-DD
push: none           # none | allowed  (allowed = may push the shift branch and open a DRAFT PR; never main)
HALT: no             # the operator writes "yes" to stop after the current task
tasks:
  - slug: <card-slug>   risk: full     # full | light
  - slug: <card-slug>   risk: light
