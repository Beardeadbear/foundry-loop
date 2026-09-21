# Client and vendor token scan

> Use when: running reviewer-check-agnostic on a diff and you need the token classes, the scan commands, or the dependency-versus-accelerator test.

Product logic, tests and docs must not name a specific client, tenant or vendor tool outside designated
data locations. Client tools may accelerate a flow; they must never be required by it.

## Token classes

| Class | Where it hides |
|---|---|
| Client or company names | Prose, comments, test titles, fixture data, commit text |
| Vendor CLI binaries | Shell snippets, scripts, hook or CI commands |
| Tool-server names and literals (`mcp__<vendor>__<tool>`) | Allow-lists, dispatch prose, matchers |
| App, workspace, tenant identifiers | Examples, defaults, fixtures, paths |
| Client URLs and hosts | Config defaults, smoke tests, docs |
| Client-shaped artifacts | Selectors, payload shapes, timeouts tuned to one client |

The last class is the semantic leak: no name appears, but the code only works for one client. Only your
read catches it.

## Designated homes (the only legal ones)

Instance config that is gitignored and generated per deployment; rendered client blocks that a template step
fills per instance; per-run output artifacts. Everything else is product code and must scan clean.

## Commands

```bash
# diff-scoped grep; build the pattern per campaign from real instance config, not from memory
git diff <range> -U0 | grep -inE '<client-names|vendor-bins|tenant-ids|client-hosts>'
# tool-server literals outside designated blocks
git diff <range> -U0 | grep -inE 'mcp__[a-z0-9-]+__'
```

Save long output to a file. The list of client names is itself instance data; do not hardcode it here.

## Accelerator test

For each client or vendor tool the diff touches:
1. Does the flow still complete if the tool is absent? No: dependency, a leak.
2. Is it reached by detection or explicit operator config? A hardcoded call is a leak, even inside try/catch.
3. Is the default empty or neutral? A vendor value as the default is a dependency in disguise.

Pass means it accelerates when present and degrades to a generic path when absent.

## Verdict shape

`REJECT: agnostic: <file:line> hardcodes <token class>` plus the rewrite: parameterize (config key),
generalize (detection), or relocate (designated location). One leak per verdict, the first and worst.
