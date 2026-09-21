# Root-Cause Tracing (design)

> Use when: starting a design pass with a report or a claim, or when a fix would touch several places and you must find where it belongs.

Fix-time tracing (RED to cause) is in builder-fix-code. This file is about verifying the lead and finding the
single point the fix belongs at.

## A finding is a lead, not a verdict

Never design off a report without reproducing it on CURRENT code: open the cited file, run the cited command,
capture the output. Reproduction can dissolve the finding, reframe it (the cited line is only a symptom site),
or shrink it (one cause, not three). Unreproduced means the deliverable is "could not reproduce, here is what
I checked", not a fix.

For a desired behaviour rather than a bug, reproduce the GAP: show by reading the code that the capability is
missing or inadequate. The cheapest miss is building something that already exists; search for it first.

## Trace to the source

Ask "why" until the next answer leaves the system under repair; the last in-system answer is the source. Name
it as one `file:line + mechanism`.

## Tells you are still at a symptom

- The fix touches N similar places. The source is the one point they all derive from.
- The fix adds a check where the bad value arrives instead of where it is produced. Fix the producer.
- Your explanation contains "somehow" or "for some reason".

Example: three importers each trim a trailing newline. Source: the exporter that writes it.

## Capture for the memo

The command and its failing output (or the code read proving the gap), the source's `file:line`, and what
existing mechanism you checked and why it does not cover this. The live code outranks any document.
