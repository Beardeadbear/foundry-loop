---
name: lead-record-learning
description: >
  Distill ONE durable lesson from a finished item into the vault: the settled why/how, not code, status or
  a run log. Use at LEARN. One job: capture what is still true in 6 months, in the one canonical place.
---

# lead-record-learning

1. Is it durable? A root cause pattern, a reusable path, a decision and its reason, a known error and its
   workaround. Not: status, what you did, raw output.
2. Search the vault for the topic first. **Merge into the existing note** if there is one.
3. Otherwise create `vault/lessons/<slug>.md` (or `decisions/`) with front matter: `title`, `tags`,
   `summary`, `updated`, plus 2-3 links to related notes.
4. Add it to the folder list in `vault/index.md`.
5. Check: every link you wrote resolves; no orphan (the note is listed in the index).
6. Unattended run (night shift)? Write to `vault/staging/` instead. A human promotes.

Gotchas: never write secrets or customer data. Distill; do not paste logs. If a note disagrees with the
code, the code wins and the note is fixed.
