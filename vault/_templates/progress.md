# progress.md: append-only, one line per event

<timestamp> <slug> in-flight   cap: +A/-B  base: <sha>
<timestamp> <slug> gate1       {design_verdict: SKIPPED-mechanical | APPROVE-DESIGN, order_check: ORDER-OK | n/a, approver: night-self-approval | operator-live}
<timestamp> <slug> verified    sha: <commit>
<timestamp> <slug> parked      why: <one line: the fork or gate that stopped it>
