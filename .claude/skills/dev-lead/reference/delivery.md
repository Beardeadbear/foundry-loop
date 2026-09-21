# Delivery

> Use when: an item is gate-green and reviewer-PASS and you commit it for a human to ship.

A human ships. Agents commit locally; they never push `main`, tag, open-and-merge a PR, or merge.

## Branching
| Unit | Branch |
|---|---|
| one item | `foundry/<card-slug>` |
| one shift | `shift/<yyyy-mm-dd>` |

Never commit on `main`. Confirm first: `git status --porcelain` and `git rev-parse --abbrev-ref HEAD`.
Why: a commit on the wrong branch is invisible until the human reviews.

## The order: stage, gate, commit
1. Stage explicit file paths for this item only. Never `git add -A`, `git add .`, or a directory path. Why: it
   sweeps in another agent's dirty files.
2. `git diff --cached --stat`: confirm the staged set is exactly the ownership table, no more.
3. Run the gate ONCE, output to a file: `$GATE_CMD > /tmp/gate-$$.log 2>&1; echo "exit:$?"; tail -20 /tmp/gate-$$.log`.
   Never while a builder is alive.
4. Commit that staged set: `type(scope): description`, with the co-author line the project requires.
5. Commit only what you gated. Any edit after the gate means stage again and gate again. Why: the committed
   tree must be the gated tree; an uncommitted file can make a commit look greener than it is.
6. Verify from disk: `git show --stat HEAD` lists the expected files.

## Package
`lead-package-pr` builds the PR body: summary, files, RED to GREEN paste, blast radius, what is not covered.
Move the card to `vault/backlog/done/` in the same branch, not a later one.

## Hand-off to the human
Report the branch name, the commit SHAs and the packet. The human reviews, pushes, opens the PR, merges and
tags. Until then the item is "committed on a branch", not "shipped". Unattended: leave the branch ready and
list it in the shift report.

## Never
- Push, tag or merge `main`, force-push, or skip hooks.
- Delete or overwrite a file you did not read; commit secrets or customer data.
- Sweep a stale lock file: a lock is a mutex until proven otherwise. Ask.
- Amend or rebase a commit the human has seen; add a new commit.
