# Testing

Always on, for every agent that writes or runs tests.

## RED first
1. Write the test first, using the real, redacted fixture the order names.
2. Run it. It must FAIL, for the reason in the report.
3. Write the minimal implementation.
4. Run it. It must PASS.
5. Refactor only if needed, with the test still green.

## The wired test
Find the test the gate really runs. Never assume a path: an orphan test never gates. A test that would pass
whether or not the claim is true is not evidence.

## Real fixtures
Redacted real inputs live in the directory named by `fixtures_dir` in `CLAUDE.md` (default
`fixtures/redacted/`), each with a `<name>.provenance.md`: source, date captured, what was redacted, what was
kept. None exists for the surface? Creating one is step 1 of the item (`builder-make-fixture`). The raw capture
never enters the repo.

## The gate
Deterministic, hermetic, no LLM in it. Checks that depend on a real environment run at verify-real, never on
every iteration. Nobody edits the gate or a failing test to reach green.

## Quarantine: environment failures only
A test failing because of the environment (network flake, missing fixture, third-party rate limit, DNS) gets a
tag in its header with a 7-day deadline, so environment debt is visible and does not read as a regression:

    // @quarantine: <reason> - <YYYY-MM-DD>+7d - <ticket or owner>

- A quarantined test is excluded from the failing count. A quarantine with no date is invalid.
- A release is blocked by more than 5 active quarantines or any older than 7 days. Control's coaching
  reports both numbers at every close.
- Resolve by fixing the environment (preferred), pinning the fixture, or deleting the test. "Quarantine and
  forget" is not allowed past the deadline.
