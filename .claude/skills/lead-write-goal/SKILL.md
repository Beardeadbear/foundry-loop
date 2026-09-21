---
name: lead-write-goal
description: >
  Compose the exact goal string the lead dispatches to a builder, from an approved spec, a reproduced root
  cause, and the wired test. Use at GOAL. One job: spec -> a capped, self-contained builder brief.
---

# lead-write-goal

The builder gets no other context. Everything it needs is in the string. Fill every slot:

```
GOAL: <item id> is fixed and left UNCOMMITTED in the working tree.
Read the vault notes: <paths>. Read these skills for this task: <SKILL.md paths>. Pin the gate.
Root cause (verified by me, with output): <file:line + mechanism, 1-2 sentences>.
Reuse: <canonical helper(s) to compose, or "none identified: recon required">. A NEW helper over a named one
  needs a stated reason in your return.
File ownership: you may touch ONLY: <files>. Nothing else.
Tools (absolute paths): <test runner, scripts, log path>.
Find the CANONICAL wired test: verify which test the gate runs. Do not assume a path.
Done when ALL are shown in the transcript (each states why it would fail if the claim were false):
 (1) NEW test <scenario> is RED on current code, then GREEN;
 (2) no-weakening: <guard> intact;
 (3) back-compat: <behaviour> preserved;
 (4) no hardcoded customer/tenant/environment token;
 (5) the real-data check <command> passes;
 (6) return `RECEIPT: pass <proving command>`. Never gate. Never commit.
Diff budget: production <n> lines; collateral (tests, fixtures, docs) <n>. Production over budget = halt.
Failure exit: if <N turns> or scope balloons, stop and report PARTIAL. Do not grind.
```

Fork-heavy / large / security items add a **program-design sketch** after the root cause, approved at
Gate 1: files created/modified/removed, key signatures, and the enumerated list of every case from recon.
The reviewer checks the diff against it; deviation without a re-ruling is a REJECT.

Also write the **reviewer's** skill line (usually the reviewer's defaults cover it).

## Gotchas
- Root cause must be REPRODUCED by you, not reported. If the `file:line` is not real you have no goal.
- Name the skills. Sub-agents do not inherit them.
- Pin the AC. The builder cannot edit them to pass.
- A wrong "Reuse" is worse than none. Only name a helper you confirmed fits.
- Always cap. A goal with only a success exit never terminates on a hard case.
