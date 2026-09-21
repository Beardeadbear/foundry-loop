# PR contents: the evidence each section needs

> Use when: assembling the Gate 2 packet and you need to know what proof each section must carry.

A section backed by prose instead of captured output is a weak spot the human cannot verify.

| Section | Required evidence | Why |
|---|---|---|
| Summary | 1-3 plain sentences: what changed, why, what it fixes; no jargon in line one | the human grasps it without the diff |
| Changed files | exact `git diff --stat <base>..HEAD`, production vs collateral vs budget | a file that should not be touched is a finding: investigate before packaging |
| Before / after | the RED run on unfixed code (command, failing output, exit); the gate run green (exit 0, re-run this turn); the reviewer's PASS and the commands it executed | this trio is the proof; paste it, never summarise it away |
| Real-data run | the command, the fixture, the result | a synthetic pass does not prove the real shape |
| Blast radius | other code touched, who is affected, changed behaviour for existing users, data touched | the human cannot see what the diff does not show |
| NOT covered | untested paths and why, quarantined tests with dates, open items, what the gate cannot catch | this section is what makes the packet honest; never omit it |
| Findings | `FINDING:` lines with `ESCAPE:` cards, or `ESCAPES: none` | an escaped bug must teach the gate |
| Self-check | the block from `CLAUDE.md`, every claim with a SHA | "done" with no SHA is a soft label |

## As a PR body
If the human authorises a push, the same packet is the PR body. Write it once so it serves the Gate 2 read
and the PR record. Agents never push or merge; the human does.

## The one test
Could the human authorise the ship from this alone, without a follow-up question? If they would ask "did the
gate actually pass?" or "what does this touch?", evidence is missing. Add it.
