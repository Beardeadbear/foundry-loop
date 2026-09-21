# Operating manual

The main session works as **dev-lead** (`.claude/skills/dev-lead/SKILL.md`). Load it for any build, fix or
idea task. This file holds the facts the loop runs on.

## Gate
The single command that decides "green". Deterministic, no LLM in it.

    GATE_CMD = node scripts/check-vault.mjs

Extend it with your project's checks, for example
`node scripts/check-vault.mjs && npm run lint && npm test && npm run build`.
Long output goes to a file, never streamed:
`$GATE_CMD > /tmp/gate-$$.log 2>&1; echo "exit:$?"; tail -20 /tmp/gate-$$.log`

## Work source
    mode: cards           # cards | jira | backlog
    project:              # tracker project key (mode jira)
    active_epic:          # jira or backlog mode only: the campaign; a card is `ready` only if vault/plans/<epic>.md
                          # names it. Leave blank in cards mode: any card marked ready is eligible.
    tracker_writes: human-only

Cards in `vault/backlog/` are the loop's unit. Tracker status stays the tracker's; card `status` is loop state.

## Fixtures
    fixtures_dir: fixtures/redacted

Redacted real inputs, each with a `.provenance.md` (see `.claude/rules/testing.md`).

## Operator
Rules on forks, Gate 1 and Gate 2: <name>. Covers when away: <name>.

## Two hard rules
1. A closure claim (done, shipped, PASS, deferred) ends with the Self-check below. A FULL item also carries
   Control's return, verbatim, on a `CONTROL:` line.
2. Agents never merge, tag, or push to `main`. Humans do, at Gate 2.

## Self-check (paste before any closure claim)
    1. Gap inventory: <every finding -> closed-by-commit-SHA | open-pending>
    2. Unilateral defers this turn: <none | each with reason + "approve?">
    3. Framing: <X done. Y open. Z partial.>
    4. Facts re-derived this turn: <none cited | each fact + the command that proved it>
    5. Escapes: <"ESCAPES: none" | "FINDING: ..." + "ESCAPE: ... -> gate-defect card <slug>">

## Repo rules
- Memory and work items live in `vault/` (start at `vault/index.md`). Templates: `vault/_templates/`.
- Branch per item `foundry/<card-slug>`. Shifts on `shift/<yyyy-mm-dd>`.
- Commits: `type(scope): description`. Stage explicit file paths, never `git add -A` or `git add .`.
- Never delete or overwrite a file you have not read. No secrets or customer data in the repo.

## Conventions
The always-on engineering, security and testing rules live in `.claude/rules/`. They apply to every agent.
