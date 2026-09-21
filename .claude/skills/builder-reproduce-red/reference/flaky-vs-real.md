# Flaky vs Real

> Use when: the failure you are trying to reproduce is not deterministic (fails sometimes, passes sometimes).

A test that fails intermittently is not a reproduction. Calling it RED corrupts the loop: a fix cannot be
verified against a failure you cannot reliably trigger, and green after your change may be luck.

## The test

Run the failing check about 5 times on unchanged code.

- **5/5 fail** -> deterministic -> a real reproduction. Proceed.
- **Some pass** -> not reproduced yet. Find the source of variance first.

## Sources of variance

| Source | Signal | Action |
|---|---|---|
| Timing or race in the product | fails under load, order-dependent, double submit | a real concurrency defect; force the ordering so it fails every time, then fix |
| Environment | network, DNS, missing binary, rate limit | not a product bug; quarantine with a reason and date per the testing rules, do not "fix" the product |
| Test setup | shared fixture, state leaking between tests | fix the test isolation; the product may be fine |
| Non-deterministic input | random data, timestamps | pin the seed or clock so the test is deterministic |

## Example

A form-submit test fails 2 of 5 runs. Cause: two submits race and the second overwrites the first. Make it
deterministic by awaiting the first submit's handler before firing the second, then treat it as normal RED.

## Honest outcomes

Environmental: record it and move on, it is not your defect. Real timing bug: reproduce deterministically,
then proceed. Either way, no fix rides on an un-pinned intermittent failure.
