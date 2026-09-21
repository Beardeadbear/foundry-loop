# The Solution-Design Memo

> Use when: writing the final memo, and again as a self-check before returning it.

The memo lets the implementer build without re-deriving. If it needs its author present to interpret, it is not done.

## Skeleton (fill every section, in this order)

```
# Solution Design: <bug or behaviour>
## Reproduction     command + file:line + output (or COULD NOT REPRODUCE + what you checked)
## Root cause       the single source, not the symptom
## Classification   product-defect | external/client | design-choice | false-positive (if not defect: stop, no fix)
## Options          | # | Approach | Layer | Blast radius | Tradeoff |
## Recommendation   Option X: why it wins; the simpler shape you rejected and why
## Build plan       Files / Shape / Proof / Preservation
## Verdict          RECOMMENDED: build X | NO FIX: reason | NEEDS EVIDENCE: what to pull
```

## Build-plan rows

- **Files**: exact paths, not "the validation layer".
- **Shape**: what changes and how, additive where possible; enough that the diff is imaginable.
- **Proof**: the test that fails now and passes after, named as the wired test the gate runs (see
  builder-reproduce-red). A plan without a RED test is a hope.
- **Preservation**: each load-bearing mechanism touched and why it survives.
- List every case from recon; an unlisted case is an unbuilt case.

## Self-check before returning

- Did I reproduce on current code, or trust a report?
- Is the root cause the source, or a symptom one level up?
- Did I classify, and stop if it is not a product defect?
- Is the layer right (mechanical work in code, judgment in prose)?
- Did I look for an existing mechanism and single-source the fix?
- Does the plan name a test that fails now and passes after?
- Is it the smallest change, or gold-plated?

Return the memo only; no code edits. It will be reviewed by a fresh context (reviewer-check-design), never by you.
