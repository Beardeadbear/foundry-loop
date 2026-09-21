# Classify the Problem

> Use when: a finding is reproduced (or not) and you are about to shape a fix; decide first whether a fix should exist.

Every finding lands in exactly ONE of four classes, and the class decides whether a fix exists. Many flags in a
large audit are not defects at all; designing a fix for them wastes effort and can break working behaviour.

## The four classes

| Class | Meaning | Outcome |
|---|---|---|
| 1. Product defect | our system misbehaves reproducibly against its own contract | design the fix |
| 2. Client-app or environment behaviour | only reproduces against one external app or setup; swap it and the failure vanishes | out of scope; log it |
| 3. Deliberate design choice | a mechanism working as designed, with a recorded reason (comment, decision note, incident) | leave it alone |
| 4. False positive | does not survive reproduction; the line already handles it or the report misread it | dissolve it, write down what you checked |

## Decide in order

1. Does it reproduce on current code? No -> class 4. Stop.
2. Does the root cause live in our code, or in an external app or environment? External -> class 2. Stop.
3. Is the "broken" behaviour documented as intended, and does the reason still hold? Yes -> class 3. Stop.
4. Otherwise -> class 1. Continue to options.

Check the vault for a prior decision before classing something as 3; never re-litigate a settled call. A
mechanism with provenance is load-bearing until its reason is disproven; rarely firing is not dead.

## Example

"Sync job drops rows" reproduces only against one customer's export that contains a duplicate key their app
allows. Swap the source and it passes: class 2. Log it for the customer.

## Exit

Classes 2 to 4 end the job with the class, the reason, and the evidence. A memo that designs a fix without
naming the class is malformed.
