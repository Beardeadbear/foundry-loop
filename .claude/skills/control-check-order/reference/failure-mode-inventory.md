# Failure-mode inventory

> Use when: the order's surface writes, copies, deletes, captures or certifies operator or customer data (a
> sync, an import, a migration, a publish, a template, a config), before anything is built.

A surface like this fails in one class: a write that destroys, drops or fakes data while reporting success. The
inventory lists every place that can happen, so a broken row is found before a line is built, not by a live run.
The one who lists how it breaks is not the one shipping it: Control writes it, the builder builds against it.

## How to build it
1. Read the code path (read-only). List every point that writes, copies, deletes, overwrites, captures or
   certifies data. One row each, with `file:function`.
2. Ask each row: **what stops this from succeeding while doing nothing, or destroying something?**
3. Mark it SAFE (say why, with the guard or the test) or BROKEN (say how, with the input that triggers it).
4. Any unanswered row means the surface is not ready to build.

## Questions that find the broken rows
| Ask | Typical break |
|---|---|
| What if the input is empty? | "nothing received" is treated as "delete everything" |
| What if the read failed halfway? | a partial read is written as if complete |
| What if it runs twice? | duplicate rows, double charge, a second copy overwrites the first |
| What if two runs overlap? | last writer wins, silently |
| What if the target already exists? | overwritten with no backup or check |
| What if the source or target is the wrong environment? | acts on production from a test run |
| What is reported on success? | a success line printed before the write is verified |
| What is the way back? | no undo, no backup, no dry run |
| What does a throw or crash do to the process or a shared service? | an unhandled exception takes the whole server down, not just the request |

## Row format
`| <file:function> | <what stops success-with-no-effect or destruction> | SAFE (why) / BROKEN (how) |`
BROKEN rows go in the return under `INVENTORY:`; the lead files a finding and orders the guard first.

## Rules
- A SAFE row names its guard. "Looks fine" is not a reason.
- Never widen the check to make a BROKEN row read SAFE; fix the sentence or the code.
- The inventory is part of the order, so it is reviewed at Gate 1 with the rest.
