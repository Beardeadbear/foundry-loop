# Intake Classes

> Use when: classifying an item at INTAKE.

Classify first. If it is ambiguous, ask; never guess. The class sets the goal shape and the skills you name.

| Class | It is | Loop changes | Builder skills named | Reviewer skills named |
|---|---|---|---|---|
| defect | behaviour violates a stated requirement | the filled goal IS the spec; reproduce first | builder-reproduce-red, builder-fix-code (+ builder-make-fixture if no real fixture) | reviewer-check-ac, -overbuild, -no-weakening, -agnostic |
| feature | a new capability not yet specced | real `lead-write-spec` pass; design review before Gate 1 | builder-design-fix, then builder-fix-code | adds reviewer-check-design at DESIGN-REVIEW |
| docs | prose, comments, templates; no behaviour | LIGHT tier; no RED; the gate still runs | builder-fix-code | reviewer-check-ac (diff-read) |
| chore | rename, dependency bump, config, cleanup | LIGHT unless it touches a FULL surface | builder-fix-code | reviewer-check-overbuild |

## Design-review trigger (fail toward review)
| Condition | Result |
|---|---|
| a real fork exists (simple vs robust, two homes) | DESIGN <> DESIGN-REVIEW before Gate 1 |
| class is feature | trigger it |
| unsure either applies | trigger it |
| plain defect, no fork | skip it |

## Before you spec
1. Run `shared-read-vault` on the item's summary. A prior fix on this class is a regression signal; a prior
   dissolve is a likely non-bug; a known error means apply its workaround. Why: re-litigating a settled call wastes a loop.
2. Check the card's central claim against the tree with one command. A card records a moment, not a state.
   Say which you verified, the card or your recon. Why: a builder sent to build what already exists ships a second path.
3. If the premise is false, write the true state onto the card and stop that item. Never invent a replacement premise.
4. A feature whose needed skill is missing is a sequencing flag: build the skill first, or defer. Never dispatch
   a builder to read a skill that does not exist.

A builder that verifies an instruction and declines to build is doing its job. Accept a STOP-and-report.
