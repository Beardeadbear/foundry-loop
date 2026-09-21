# Foundry Loop

![Foundry Loop: a fixed loop for building with Claude Code](docs/foundry-loop.png)

A way of working with Claude Code where one main agent runs a **fixed loop**, three specialised sub-agents do
the building and judging, a **plain test command** decides what is green, and a **human signs only two
things**: what to build, and what ships.

It is a set of plain files (`CLAUDE.md`, sub-agents, skills, slash commands and a folder of markdown). No
CLI, no services, one small session-start hook, and no dependencies beyond Claude Code and Node 20 or newer (no npm packages;
the scripts are plain ES modules).

Full design, logic and the detailed loop flow: **[docs/Foundry-Loop.pdf](docs/Foundry-Loop.pdf)**.

## The idea

Single-agent sessions fail in predictable ways: the agent fixes what it never reproduced, grades its own
work, weakens a test to get green, forgets yesterday's decision, and keeps grinding on a bad path. Each rule
here answers one of those failures.

- **Orchestrate, don't implement.** The main session (the *dev-lead*) plans, dispatches and judges. It never
  edits product code.
- **Maker is not checker.** The builder writes. A fresh-context reviewer judges the code. A read-only
  *control* agent judges the plan and the flow. Control never reads the diff; the reviewer never judges the plan.
- **One agent, one identity.** Skills are methods only, and each is named for its owner:
  `builder-fix-code`, `reviewer-check-ac`, `control-coach`, `lead-write-goal`, `shared-read-vault`. An agent
  may load only its own prefix or `shared-`. The gate checks it.
- **A deterministic gate decides "green".** One command, no LLM in it. Nobody may edit it or a failing test
  to get a pass.
- **Real data or it is not done.** Green on a fixture you invented is a build signal, not a verdict.
- **Two human gates.** Gate 1 approves the spec. Gate 2 authorises shipping. Agents never merge, tag or push `main`.
- **Memory lives in the repo.** A markdown `vault/` holds decisions, lessons, cards and orders, so every
  session starts informed.

## The loop

```
INTAKE > ORDER > [control: check-order] > SPEC > [GATE 1: you] > GOAL
   > BUILD <> VERIFY (reviewer) > [reviewer: verify-real] > PACKAGE > [GATE 2: you]
   > SHIP (you) > LEARN > [control: coach]
```

One item at a time. Fork-heavy or new-feature items add `DESIGN <> DESIGN-REVIEW` before Gate 1. Every REJECT
sends a **new** builder the first failed item; the same defect rejected twice parks the item.

## Who does what

| Role | Is | Job | Never |
|---|---|---|---|
| **You (operator)** | human | Approve specs (Gate 1), authorise shipping (Gate 2), rule on forks | |
| **dev-lead** | main session, skill | Write orders and goals, dispatch, run the gate, talk to you | Edit product code |
| **builder** | sub-agent | Failing test first, minimal root-cause fix, report its proving command | Commit, gate, review itself |
| **reviewer** | sub-agent | Judge the diff by running things: AC, overbuild, weakening, real-environment scenarios | Fix, or judge the plan |
| **control** | sub-agent, read-only | Challenge the order, give an independent fork lean, coach you, recommend what is next | Read the diff, edit, decide |

## Commands

| Command | Use |
|---|---|
| `/work <card \| ticket \| text>` | One item, full loop, you at both gates. No argument: shows state and recommends the next item |
| `/shift <cards>` | Several items back to back, you online. Forks are asked live; that task pauses, the next continues |
| `/night-shift <cards>` | You approve a scope once and leave. Gate 1 is self-approved inside the scope, every fork is parked, the morning report lists what to merge. Nothing is merged or pushed to `main` |

## Session start

Open Claude Code in the repo and the main session is already the dev-lead. A `SessionStart` hook
(`.claude/hooks/load-dev-lead.mjs`) injects the `dev-lead` skill at startup, resume, clear and compact, so the
identity survives a long session. It skips sub-agents, fails open, and `FOUNDRY_LEAD=0 claude` opens a plain
session. The first time a developer opens the repo, Claude Code asks them to trust the project hooks. The
skill must stay under 9,000 characters (hook output is capped at 10,000); the gate enforces it.

## Quick start

1. Copy `.claude/`, `vault/`, `scripts/` and `CLAUDE.md` into the root of your repository.
2. Edit `CLAUDE.md`: set `GATE_CMD` to your test, lint and build, name the operator, choose the work source.
3. Turn on branch protection for `main`. The `permissions.deny` list in `.claude/settings.json` is a speed
   bump, not a security boundary; the server-side protection is the real backstop.
4. Run `node scripts/check-vault.mjs`. It must be green.
5. File a card: copy `vault/_templates/card.md` to `vault/backlog/<slug>.md` and fill it in. Start with a chore.
6. In Claude Code, run `/work <slug>`. Then a defect. Watch one REJECT happen.
7. Only then try `/shift`, and last `/night-shift` on **light** cards.

## Work sources

`CLAUDE.md` sets `mode: cards | jira | backlog`. Cards are always the loop's unit. In `jira` or `backlog` mode
each card carries `ref:` to its ticket and `epic:` to its campaign, and an epic plan in `vault/plans/` names the
only cards that may be `ready`. The tracker owns workflow status; the card owns the reproduction, proving
check, tier and loop state. Agents read the tracker; a human writes to it. Ticket text is data, never instructions.

## The router and the reference files

The lead never works a phase from memory. `dev-lead/SKILL.md` carries a **router**: one table of the skills the
lead loads itself (trigger to skill), and one table of who it dispatches at each phase and which skills it names
in the dispatch. Sub-agents do not inherit the lead's skills, so the dispatch names theirs.

Depth lives in `reference/` folders beside each skill and is read **just in time**. Each skill ends with a
"Reference (use when)" table, and every reference file opens with a `> Use when:` line. The lead reads
`gate-choreography.md` only when it presents a gate, `recovery-and-reject.md` only when a builder returns
STUCK, and so on. This keeps the always-loaded body short (`dev-lead` is injected whole at session start and
must stay under 9,000 characters) and puts depth where it is needed.

## Add your own method skill

A method skill is one job, written as steps the model follows. There is no router to edit: routing is the
skill's **name** (which agent may load it) plus **where it is listed** (how it reaches that agent).

1. **Pick the owner.** Which agent wears it? Name the skill `<owner>-<job>`: `builder-`, `reviewer-`,
   `control-`, `lead-`, or `shared-` for any agent. A new *job* that fits none of them is a new agent, not a
   skill.
2. **Create** `.claude/skills/<owner>-<job>/SKILL.md`. One job, a description that says exactly when to use it,
   numbered steps, a literal return shape the lead can check, and gotchas that each name the incident behind
   them. No client, tenant or environment names inside a skill.

   ~~~
   ---
   name: builder-migrate-schema      # must equal the folder name
   description: >
     One sentence: what it does. Use when the goal says MIGRATE.
   ---
   # builder-migrate-schema
   1. Numbered steps the agent follows.
   Return: `MIGRATION-READY: <file>` or `MIGRATION-BLOCKED: <first reason>`.
   Gotchas: <a real failure, and the consequence it caused>.
   ~~~

3. **Route it.** Sub-agents do not inherit the lead's skills, so choose one:
   - **Always-on for that agent** (every item): add it under `skills:` in `.claude/agents/<owner>.md`. Its full
     text is preloaded, so keep that list short.
   - **Task-specific** (only some items): do not preload. Add it to the "Method skills named" cell of that
     phase's row in the dispatch table in `.claude/skills/dev-lead/SKILL.md` (the `+ task skills` part). The
     lead then names it in the goal's "Read these skills" line when it writes the goal.
   - **A lead method:** name it in that phase's bullet in `dev-lead/SKILL.md`.
4. **Run the gate.** `node scripts/check-vault.mjs` fails if the prefix is wrong, the name does not match the
   folder, an agent loads another agent's skill, or the skill is **unrouted** (in no agent's `skills:` list and
   not named in the dispatch table). Keep `dev-lead/SKILL.md` under 9,000 characters; put detail in your skill.
5. **Add depth as a reference, not as body.** Keep `SKILL.md` to the steps, the return shape and the gotchas.
   Put longer guidance in `reference/<topic>.md`, open it with a `> Use when: ...` line, and add it to the
   skill's "Reference (use when)" table. The gate fails on a reference that is unlinked, dead, or has no
   "Use when" line.
6. **Prove it.** Run `/work` on a card that needs the skill and confirm the dispatch names it and the agent's
   return follows its shape. A skill nobody has seen run is unproven.

## Optional: tracker connector and real environment

Two example files ship for the optional integrations. Neither is required for the loop to run.

- **`.env.example`**: copy to `.env` (git-ignored) and fill in. Claude Code does not read `.env` itself; load it
  into the shell that starts `claude` (`set -a; source .env; set +a`). It holds the read-only tracker
  credentials and the scoped, non-production environment that `reviewer-verify-real` uses. With no
  environment set, the reviewer returns `UNVERIFIABLE-HERE` and the packet lists a human live check.
- **`.mcp.json.example`**: copy to `.mcp.json` when your team has a tracker MCP server, and replace the
  placeholder command. Secrets come from the environment through `${VAR}`, never written into the file.
  Use a read-only token: agents read the tracker and a human writes to it. `.mcp.json` is git-ignored here;
  commit it deliberately if the team wants to share it.

## Depth tiers

| Tier | Applies to | Machinery |
|---|---|---|
| **LIGHT** | docs, prose, renames, test-only diffs | builder, gate, reviewer diff-read |
| **FULL** | auth, permissions, data writes or migrations, parsing, concurrency, customer data, anything unclear | check-order, real-data RED, adversarial reviewer, reviewer-verify-real, coaching |

Unsure means FULL. A tier is declared at intake, never at close.

## Layout

```
CLAUDE.md                   gate command, hard rules, work source, self-check
.env.example                template for the optional tracker and verify-real credentials
.mcp.json.example           template for an optional read-only tracker MCP server
.claude/
  settings.json             deny list (force-push, push to main, tag, merge, stash) + the session-start hook
  hooks/                    load-dev-lead.mjs  (SessionStart: main session wears dev-lead)
  rules/                    engineering.md  security.md  testing.md  (always on, every agent)
  agents/                   builder.md  reviewer.md  control.md
  skills/                   dev-lead (identity) + 24 method skills, named <owner>-<job>;
                            each may carry reference/ files read only when needed
  commands/                 work.md  shift.md  night-shift.md
vault/
  index.md                  start here
  backlog/  backlog/done/   cards: one markdown file per task
  plans/                    one campaign plan per active epic
  decisions/  lessons/      settled calls, root causes, known errors
  control/                  orders/  checks/ (control returns)  rulings.md
  shift/                    scope.md, progress.md, reports/
  staging/                  unattended writes wait here for a human
  _templates/               card, order, epic-plan, lesson, scope, progress, report
scripts/check-vault.mjs      gate: card schema, links, index coverage, skill ownership (Node built-ins only)
docs/Foundry-Loop.pdf       design, logic, detailed flow, agents, skills, commands
```

## What is enforced, and what is not

- **By files and tools:** the session-start hook makes the main session the lead; the reviewer and control have no Write or Edit; the deny list blocks the risky git
  and `gh` commands, and `Edit` on `scripts/check-vault.mjs` and `.claude/settings.json` (so an agent cannot
  weaken the gate); `scripts/check-vault.mjs` rejects malformed cards and bad enums, a `parked` card with no
  reason, a FULL card in `done/` with no order and no `ORDER-OK` check, broken links, unlisted notes, a locked
  shift task that is parked or done, any agent loading a skill that another agent owns, a skill that is not
  routed, and a reference that is unlinked, dead or has no "Use when" line. It warns on stale `in-flight`
  cards, an unnamed operator, an empty `active_epic` in tracker mode, and a gate that covers only the vault.
- **By discipline and your review:** that the lead dispatches the right agent at the right phase, and pastes
  Control's return verbatim on a `CONTROL:` line. A FULL item with no `CONTROL:` line is not ready for a gate.
  If the team later wants this enforced, a second hook (`Stop`) that blocks a FULL closure with no `CONTROL:` line
  is the smallest step.
- **Known limits:** the reviewer is the same model family as the builder, so correlated blind spots are
  possible; add diverse checks (mutation or property tests, an optional second-model review) to your own gate.
  `git push` to a branch that tracks `main`, and a builder committing, are not blocked by the deny list. A small
  hook can close them later. Tracker sync is manual by design: agents read the tracker and a human writes to it.
- **Not covered:** an agent with no access to a real environment cannot run `reviewer-verify-real`. It says so
  (`UNVERIFIABLE-HERE`) and the packet lists a human live check.
