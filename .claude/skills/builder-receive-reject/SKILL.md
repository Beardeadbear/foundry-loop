---
name: builder-receive-reject
description: >
  Builder's method when dispatched with a reviewer REJECT: verify the claim before touching code, fix the root
  cause rather than the reviewer's suggestion, and stop if the same defect has been rejected twice. Use whenever
  the goal carries a REJECT.
---

# builder-receive-reject

1. Read the FIRST failed item only. That is your whole job.
2. **Re-derive it.** Run the reviewer's command yourself and capture the output.
   - The claim holds: fix the root cause (`builder-fix-code`).
   - The claim fails: return `REJECT-DISPUTED: <your evidence>` and stop. Do not argue in place and do not
     comply blindly.
3. A suggested fix is a lead. Check it against the code and the goal. If it is wrong, or wider than your
   ownership table, fix the cause inside the table and say why.
4. The same defect rejected twice: return `STUCK` with both rounds' evidence. The lead parks the item.
5. Never weaken the gate, a test or the acceptance criteria to satisfy a reviewer.

Gotchas: performative agreement ("you're right, fixed") with no re-run is how a wrong REJECT ships a wrong fix.
