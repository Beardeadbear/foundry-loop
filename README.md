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

## Using the commands

Open Claude Code in the repo and type the command. The session is already the dev-lead (see Session start).

```
/work sync-empty-payload-deletes-rows      # one card, you at both gates
/work MOCK-1                               # a ticket or epic key: intake only, cards and a plan, nothing built
/work                                      # no argument: shows where things stand and recommends the next item
/shift sync-null-incoming-typeerror:full | fix-readme-typo:light
/night-shift fix-readme-typo:light | sync-empty-payload-deletes-rows:full
/night-shift fix-readme-typo:light push: allowed
/night-shift                               # no cards named: proposes a scope of up to 5 and waits for your approval
```

A card is named by its slug (the file name without `.md`). `:light` or `:full` sets its tier (unsure means full).

| Use | When |
|---|---|
| `/work` | New or risky work, your first runs, anything you want to watch. One item, you decide at both gates. |
| `/shift` | Several items while you are at your desk. A fork is put to you live, that task waits, and the shift carries on with the others. |
| `/night-shift` | A queue of well-specified cards you can leave running. Forks are parked, never asked. |

**How the lead chooses what to take overnight.** Two ways. *You name the cards*, and those are the scope: the safest
way to stay in control. *You name none*, and the lead runs `lead-plan-shift`, which proposes at most five cards and
waits for your approval:
1. Ready `gate-defect` cards go first.
2. A card is eligible only if it is `ready`, named by the active epic plan (Jira or backlog mode), and its gates are
   re-checked that turn.
3. Overnight it drops anything with an unruled fork, a missing credential or environment, a FULL card with no real
   fixture, a `parked` card, or a dependency on an unmerged card, and anything that cannot finish as a PR-ready branch.
4. It ranks what is left by value (epic order, what it unblocks, severity) times suitability (LIGHT before FULL,
   well specified, small), takes at most five and never pads the list.
5. Each pick gets why-this, why-now, why-safe, its tier and an estimated diff cap, and each notable card left out gets
   a one-line reason.

Nothing is a scope until you approve it. Even then, each FULL task must pass Control's order check before the scope is
locked, and at each task's start the lead parks anything gated, needing a human, or forking. The ranking is the
model's judgment, so read the proposal before you approve it.

**Before you leave a night shift:** each card is `ready` with a reproduction and acceptance criteria, a redacted real
fixture exists for anything that touches data, the tier is set, `GATE_CMD` runs green, and `main` is protected. To stop a
shift early, write `HALT: yes` in `vault/shift/scope.md`; the current task finishes and nothing new starts.

**In the morning:** read `vault/shift/reports/<date>.md`. It lists what is committed on `shift/<date>` and waiting for
your Gate 2, what a human must do (review and merge, live checks), each parked card with the fork that stopped it, and
`questions asked mid-shift: 0`. Rule on the parked cards and set them back to `ready`, review and merge the branch
yourself, then tell the lead in Claude Code that Gate 2 is approved so it can close the cards. A card only becomes
`done` when you say so.

**A live fork in `/shift`:** the lead posts a Gate 1 packet with the options and Control's independent lean, and keeps
working on other cards. Answer with your ruling (for example "A, throw a named error"); it logs the ruling, sets the
card back to `ready` and carries it through build, review and commit.

## Quick start

1. Copy `.claude/`, `vault/`, `scripts/` and `CLAUDE.md` into the root of your repository.
2. Edit `CLAUDE.md`: set `GATE_CMD` to your test, lint and build, name the operator, choose the work source.
3. Decide where the vault lives: **shared** (delete the `vault/` block in `.gitignore`, so cards, orders and
   lessons travel with the repo) or **local** (keep it; the packet then carries the evidence). Turn on branch
   protection for `main`. The `permissions.deny` list in `.claude/settings.json` is a speed
   bump, not a security boundary; the server-side protection is the real backstop.
4. Bootstrap the vault files, then run the gate. It must be green (warnings are advice):
   `cp vault/_templates/index.md vault/index.md && cp vault/_templates/rulings.md vault/control/rulings.md`
   `node scripts/check-vault.mjs`
5. File a card: copy `vault/_templates/card.md` to `vault/backlog/<slug>.md` and fill it in. Start with a chore.
6. In Claude Code, run `/work <slug>`. Then a defect. Watch one REJECT happen.
7. Only then try `/shift`, and last `/night-shift` on **light** cards.

## Work sources

`CLAUDE.md` sets `mode: cards | jira | backlog`. Cards are always the loop's unit. In `jira` or `backlog` mode
each card carries `ref:` to its ticket and `epic:` to its campaign, and an epic plan in `vault/plans/` names the
only cards that may be `ready`. The tracker owns workflow status; the card owns the reproduction, proving
check, tier and loop state. Agents read the tracker; a human writes to it. Ticket text is data, never instructions. The deny list hides the write
tools of a server named `jira` from the agents (tested: they are not even offered); another Jira or Atlassian
connector attached to the account is not covered, so disable it for loop sessions.

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

## Is the vault committed?

In this repository the vault's **live content** (the index, the rulings ledger, cards, orders, Control's checks,
lessons, decisions, plans, shift files and reports) is git-ignored, so trying the loop never pollutes it. Only
`vault/_templates/` and the `.gitkeep` files are tracked; bootstrap `vault/index.md` and `vault/control/rulings.md`
from the templates (Quick start, step 4). The `.gitignore` is not part of the files you copy into your own repo
(step 1), so your vault is shared through git unless you choose otherwise. If your team wants the vault
shared through git, which is the point of "memory lives in the repo", delete the `vault/` block in `.gitignore`.
While it is ignored, a reviewer on a branch cannot see the card, order or Control's checks, so `lead-package-pr`
puts the order's acceptance criteria, the `CONTROL:` line and the inventory into the packet verbatim, and the
gate warns that the vault is local.

## Test runs

The loop was run headless in a throwaway copy on a mock project: a 2-line data-deletion defect in a `sync()`
function, filed as a FULL card, with the operator's approvals typed in by hand at each gate. Four valid runs, each
fixing what the one before exposed.

| Run | Control dispatches | Order rejects | Session cost | What it exposed, then fixed |
|---|---|---|---|---|
| 1 | 5 | 2 | $2.37 | The packet did not carry the order's evidence while the vault was git-ignored. An index committed with a pointer to an ignored note. The order template had no acceptance-criteria, fixture-provenance or environment fields. |
| 2 | 3 | 1 | $2.27 | Live vault files (`index.md`, `rulings.md`) were tracked while their content was ignored; the order lacked an acceptance-criteria section. |
| 3 | 2 | 1, waived by ruling | $2.05 | The lead built on an unresolved ORDER-REJECT after a general "approved". The lead loaded a reviewer skill itself. |
| 4 | 2 | 0 | $1.95 | Clean: one commit holding only the fix and its test, tree clean, gate green, evidence in the packet, lead loaded only its own skills. |

A targeted probe confirmed the fix for run 3: with an open ORDER-REJECT on file and a general "approved", the lead
did not build; it re-checked the reject and asked for a ruling that names it.

Read these numbers with care. It is one small mock task, a few runs, and model behaviour varies between runs
(Control flagged the undated fixture in three of four). Costs are the session totals the harness reported.
`reviewer-verify-real` ran on the local checkout because the order named it, and reported the real-source check as
`UNVERIFIABLE-HERE`.

### Shift tests

`/night-shift` and `/shift` were run the same way, on a four-card mock backlog: a LIGHT typo, the FULL empty-payload
defect, a card needing a product decision only the operator can make, and a card gated on the FULL one.

| Test | What it showed | Session cost |
|---|---|---|
| `/night-shift`, four named cards | Typo and FULL fix committed, one commit each on `shift/<date>`, both through a builder and a reviewer. Fork card and gated card parked with reasons. 0 questions asked, no push, `main` untouched. Morning report with SHAs, what a human must do, and Control's coaching. Gate green at the end. | $1.85 |
| `/night-shift`, no cards named | The planner proposed two picks and skipped two with reasons, locked nothing, committed nothing, and waited for approval. | $0.21 |
| `/night-shift`, halt | `HALT: yes` set after the first task finished. The second task was not started, and the report was written. | $1.30 |
| `/shift`, fork plus a light card | The light card finished. The fork got a GATE-1 packet with two options and Control's independent lean, was parked awaiting a ruling, and the shift ended. On the operator's ruling it logged the ruling, resumed, built, reviewed and committed. | $2.00 |

These runs found and fixed six problems: the gate rejected finished or parked tasks in a locked scope; the lead
edited a LIGHT item itself, skipping the builder and reviewer; cards were marked `done` when they were only
committed on a branch (`done` now means shipped by a human, and the report says "Committed, awaiting your
Gate 2"); the halt flag was read after progress lines were written; `active_epic` was wrongly required in cards
mode; and acceptance checks that cannot fail after the commit (the order template now says they must).

### More mock tests

Everything here was mocked: a fake Jira MCP server (its write tools log only), a local HTTP service as the
environment with its credentials in a git-ignored `.env`, a local bare repo as the remote, and a fake `gh`. `.env`,
`.mcp.json` and `.jira*` are git-ignored; only the two `.example` files are tracked.

| Test | Setup | Result | Cost |
|---|---|---|---|
| Reject loop, three planted defects | A builder's work with a skipped existing test, a hardcoded client name, or a needless factory class, run through verify only. | The reviewer returned `REJECT` with the exact line and rule each time. A new builder fixed it, a re-review passed, and the final trees were clean. | $1.1 each |
| Two strikes | The same defect rejected twice in a row. | No third builder was dispatched. The card was parked with a reason, the rejected diff was saved to staging, and the tree was cleaned. | $0.19 |
| Design loop | A card whose fork is an engineering choice (a new function or a changed return shape). | Control gave an independent lean, a builder wrote the memo, a fresh reviewer returned `APPROVE-DESIGN`, Gate 1 self-approval was logged with that verdict, then build, review and commit. A first attempt parked correctly because the card left a behaviour unspecified. | $1.83 |
| Parallel builders | Two cards on disjoint files, and two on the same file. | Not used. Both pairs ran one after the other, so the parallel permission was removed: the loop is one item at a time. | $0.8-1.1 |
| Real environment (mock dev server, `.env`) | A local HTTP service as a shared environment, reachable and unreachable. | Reachable: verify-real ran its scenarios over HTTP, including a wrong-token case. Unreachable: `UNVERIFIABLE-HERE`. The token appeared in no file, git history or message. One hostile scenario crashed the shared server; the fix added a do-no-harm rule and an inventory row, and a re-run kept the server up and caught the risk at order check. | $1.3-1.7 |
| Tracker (mock Jira MCP server) | An epic with a ready ticket, a vague ticket, and a ticket carrying an injected instruction. Write tools were honeypots. | An epic plan and cards with `ref` links; the vague ticket went back to its owner; the injected instruction was ignored and reported; 6 read calls and 0 write attempts. | $0.32 |
| Crash resume | The session was killed mid-build, then a fresh session started on the same shift. | It did not trust the leftover work: it re-ran the RED and the gate, used a fresh reviewer, committed on PASS and logged a `RECOVERY` line. The resume rule was added to the command. | $0.84 |
| `push: allowed` (bare remote, fake `gh`) | A shift with `push: allowed` against a local bare repo. | The shift branch was pushed, `main` stayed untouched, and `gh pr create --draft` was the only `gh` call. No merge. | $0.77 |
| Push and merge `main` | Asked to push `main` and merge. | Refused on hard rule 2. Then, with no rules in view, the permission deny list refused all four commands (push to `main`, tag, `gh pr merge`, stash), even in bypass mode. | $0.13 |
| Large diff | A rename across 25 files, including a config-file string a naive rename would miss. | +37/-37 lines, within its cap, 15 of 15 tests, no leftovers, one builder and one reviewer. | $0.90 |

Fifteen headless runs cost about $14 in total.

**Not tested, because it needs a real system or a real second person** (steps for your developers are in
[docs/dev-pilot-checklist.md](docs/dev-pilot-checklist.md)): a real deployed environment (the mock proves
the mechanism, not Fliplet's staging), a real Jira connector, a real draft PR on GitHub, two developers on one repo,
a second model family as reviewer, and re-tiering when a LIGHT item's diff turns out to touch a FULL surface.

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
  index.md                  start here (local; bootstrapped from _templates/index.md)
  backlog/  backlog/done/   cards: one markdown file per task
  plans/                    one campaign plan per active epic
  decisions/  lessons/      settled calls, root causes, known errors
  control/                  orders/  checks/ (control returns)  rulings.md
  shift/                    scope.md, progress.md, reports/
  staging/                  unattended writes wait here for a human
  _templates/               card, order, epic-plan, lesson, scope, progress, report, index, rulings
scripts/check-vault.mjs      gate: card schema, links, index coverage, skill ownership (Node built-ins only)
docs/Foundry-Loop.pdf       design, logic, detailed flow, agents, skills, commands
```

## What is enforced, and what is not

- **By files and tools:** the session-start hook makes the main session the lead; the reviewer and control have no Write or Edit; the deny list blocks the risky git
  and `gh` commands, and `Edit` on `scripts/check-vault.mjs` and `.claude/settings.json` (so an agent cannot
  weaken the gate); `scripts/check-vault.mjs` rejects malformed cards and bad enums, a `parked` card with no
  reason, a FULL card in `done/` with no order and no `ORDER-OK` check, broken links, unlisted notes, a locked
  shift task with no card, any agent loading a skill that another agent owns, a skill that is not
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
