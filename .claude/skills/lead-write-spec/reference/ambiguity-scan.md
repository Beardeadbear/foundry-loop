# Ambiguity scan

> Use when: an idea or card has words that could mean two builds, before you write the spec.

Two viable readings of a task: name both, lead with your recommendation. An ambiguity resolved silently at
SPEC is approved at Gate 1 wearing the operator's authority, and found only when the reviewer rejects a
correct build of the wrong thing.

## Where it hides
| Kind | Example | Question |
|---|---|---|
| Scope word | "the reports", "clean up X", "support Y" | which ones; delete or refactor; read-only or full |
| Actor word | "the user can..." | operator, end user, or an agent |
| Success word | "faster", "reliable" | measured how; the author had exactly one in mind |
| Boundary silence | says what to add, not where to stop | does it also apply to Z |
| Term overload | a word the codebase already uses precisely | repo meaning or the idea's meaning |

## Procedure
1. Write the ask in one sentence. Cannot? It is N asks; split first.
2. For each noun and verb, look for a second referent. Most dissolve on a re-read; keep the survivors.
3. Sketch each surviving pair as two one-line specs. Different scope, AC or blast radius = a real fork.
   Same build = resolve it yourself and move on.
4. Name survivors in the spec: both readings, one line each, your recommendation and reason first.
5. Check the vault (`shared-read-vault`): a prior decision is often the answer ("settled as B in <note>").

## Do not
- Ask about forks that do not change the build; that is noise in the Gate 1 packet.
- Offer an option menu. Two readings and one recommendation; the operator answers yes/no faster than they adjudicate.
- Trust the loudest word. When the ask and the stated problem disagree, that disagreement is the fork.
