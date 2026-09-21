---
name: builder-make-fixture
description: >
  Builder's fixture method: create a redacted REAL fixture when none exists. Capture a real input, redact it
  without changing its shape, record provenance, and prove the defect still reproduces on the copy. Use when the
  goal says CREATE-FIXTURE, as step 1 of an item that has no real fixture.
---

# builder-make-fixture

1. **Capture** a real input (export, payload, record) from the environment the order names, read-only. Keep the
   raw capture in scratch, never in the repo.
2. **Redact.** Replace secrets, personal data, customer and tenant identifiers, tokens, hostnames. Keep the
   structure, types, sizes and the edge cases (empty, unicode, maximum length, nulls). Replace consistently:
   the same id becomes the same placeholder everywhere, so relations survive.
3. **Provenance.** Write `<fixture>.provenance.md` beside it: source, date captured, what was redacted and how,
   what was deliberately preserved.
4. **Prove.** The reported defect must reproduce (RED) on the redacted copy. If it does not, the redaction
   changed the shape: redact less and try again.
5. **Store** in the fixtures directory named in `CLAUDE.md` (`fixtures_dir`), then delete the raw capture.

Gotchas: a redaction that changes shape makes a test fail or pass for the wrong reason. A fixture that still
holds a real secret is a security incident (`.claude/rules/security.md`): stop and report it.
