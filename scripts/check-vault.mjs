#!/usr/bin/env node
// Workspace gate: cards (schema, status, evidence), links, index, shift lock, skill ownership, routing and references, hook size.
// Node 20+, standard library only. Exit 1 on any error.
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { basename, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(import.meta.url), '..', '..');
const VAULT = join(ROOT, 'vault');
const CLAUDE = join(ROOT, '.claude');
const STATUS = /^(ready|in-flight|parked|done|gated-on\([a-z0-9][a-z0-9-]*\))$/;
const ENUMS = {
  risk: ['full', 'light'], kind: ['defect', 'feature', 'gate-defect', 'chore'], priority: ['high', 'med', 'low'],
  effort: ['XS', 'S', 'M', 'L', 'XL'], blocks: ['loop', 'release', 'none'], premise: ['holds', 'dead', 'unverified'],
};
const STALE_DAYS = 3;
const REQUIRED = ['title', 'status', 'status_note', 'priority', 'effort', 'risk', 'kind', 'updated'];
const OWNERS = ['lead', 'builder', 'reviewer', 'control', 'shared'];
const HOOK_CAP = 9000; // SessionStart output is capped at 10,000 chars; dev-lead is injected whole
const errors = [];
const warnings = [];

const err = (p, msg) => errors.push(`${relative(ROOT, p)}: ${msg}`);
const list = (dir, ok = () => true) => (existsSync(dir) ? readdirSync(dir).filter(ok).sort() : []);
const read = (p) => readFileSync(p, 'utf8');

function front(path) {
  const text = read(path);
  if (!text.startsWith('---\n')) return null;
  const end = text.indexOf('\n---', 4);
  return end < 0 ? null : text.slice(4, end).split('\n');
}

function parse(lines, path) {
  const keys = {};
  for (const ln of lines) {
    const m = ln.match(/^([a-z_]+):\s*(.*)$/);
    if (!m) continue;
    const [, k] = m;
    let v = m[2];
    if (v[0] === '"' || v[0] === "'") {
      const end = v.indexOf(v[0], 1);
      if (end < 0) { err(path, `${k}: unterminated quote`); continue; }
      v = v.slice(1, end);
    } else {
      v = v.split(/\s+#/)[0].trim();
      if (v.includes(': ')) err(path, `${k}: unquoted value contains ': ' (quote it, or two keys share a line)`);
    }
    if (k === 'status_note' && k in keys) err(path, 'duplicate status_note key');
    keys[k] = v;
  }
  return keys;
}

// ---- cards
const cards = [];
for (const [dir, done] of [[join(VAULT, 'backlog'), false], [join(VAULT, 'backlog', 'done'), true]]) {
  for (const f of list(dir, (n) => n.endsWith('.md') && !n.startsWith('_'))) cards.push({ path: join(dir, f), done });
}
const slugs = new Set(cards.map((c) => basename(c.path, '.md')));
const cardStatus = {};
const checksDir = join(VAULT, 'control', 'checks');
for (const { path, done } of cards) {
  const fm = front(path);
  if (!fm) { err(path, 'missing front matter'); continue; }
  const k = parse(fm, path);
  for (const r of REQUIRED) if (!(r in k)) err(path, `missing key: ${r}`);
  const st = k.status ?? '';
  const slug = basename(path, '.md');
  cardStatus[slug] = st;
  if (st && !STATUS.test(st)) err(path, `status '${st}' not in ready|in-flight|done|gated-on(<slug>)`);
  if (done && st !== 'done') err(path, 'in backlog/done/ but status is not done');
  if (!done && st === 'done') err(path, 'status done but not moved to backlog/done/');
  for (const [field, allowed] of Object.entries(ENUMS)) {
    if (k[field] && !allowed.includes(k[field])) err(path, `${field} '${k[field]}' not in ${JSON.stringify(allowed)}`);
  }
  if (st === 'parked' && !k.parked_reason) err(path, 'status parked requires parked_reason: the fork or gate that stopped it');
  if (st === 'in-flight' && /^\d{4}-\d{2}-\d{2}$/.test(k.updated ?? '')) {
    const age = Math.floor((Date.now() - Date.parse(k.updated)) / 864e5);
    if (age > STALE_DAYS) warnings.push(`${basename(path)}: in-flight for ${age} days; continue it, or set it parked with a parked_reason`);
  }
  if (done && k.risk === 'full') {
    if (k.waive_evidence) warnings.push(`${basename(path)}: evidence waived (${k.waive_evidence})`);
    else {
      if (!existsSync(join(VAULT, 'control', 'orders', `${slug}.md`))) err(path, 'FULL card is done but vault/control/orders/' + slug + '.md is missing (or set waive_evidence)');
      const ok = list(checksDir, (n) => n.startsWith(`${slug}-`) && n.endsWith('.md')).some((n) => read(join(checksDir, n)).includes('ORDER-OK'));
      if (!ok) err(path, 'FULL card is done but has no vault/control/checks/' + slug + '-*.md containing ORDER-OK (or set waive_evidence)');
    }
  }
  const g = st.match(/^gated-on\((.+)\)$/);
  if (g) {
    if (!slugs.has(g[1])) err(path, `gated-on(${g[1]}): no such card (a gate must be checkable)`);
    else if (existsSync(join(VAULT, 'backlog', 'done', `${g[1]}.md`))) warnings.push(`${basename(path)}: gate cleared (${g[1]} is done); update status`);
  }
}

// ---- notes: links and index coverage
const notes = readdirSync(VAULT, { recursive: true })
  .map((p) => p.split('\\').join('/'))
  .filter((p) => p.endsWith('.md') && !p.split('/').includes('_templates') && basename(p) !== 'README.md')
  .map((p) => join(VAULT, p));
const names = new Set(notes.flatMap((p) => [basename(p, '.md'), relative(VAULT, p).split('\\').join('/').replace(/\.md$/, '')]));
const indexPath = join(VAULT, 'index.md');
const index = existsSync(indexPath) ? read(indexPath) : '';
for (const p of notes) {
  for (const m of read(p).matchAll(/\[\[([^\]|#]+)/g)) if (!names.has(m[1].trim())) err(p, `broken link [[${m[1]}]]`);
}
for (const sub of ['decisions', 'plans', 'lessons']) {
  for (const f of list(join(VAULT, sub), (n) => n.endsWith('.md'))) {
    const stem = basename(f, '.md');
    if (!index.includes(`[[${sub}/${stem}`) && !index.includes(`[[${stem}`)) err(join(VAULT, sub, f), 'not listed in vault/index.md');
  }
}

// ---- shift lock
const scope = join(VAULT, 'shift', 'scope.md');
if (existsSync(scope)) {
  for (const m of read(scope).matchAll(/slug:\s*([a-z0-9-]+)/g)) {
    if (!slugs.has(m[1])) err(scope, `task '${m[1]}' has no card`);
    else if (['parked', 'done'].includes(cardStatus[m[1]])) err(scope, `task '${m[1]}' is ${cardStatus[m[1]]}: rule it and set it ready first`);
  }
}

// ---- skill ownership: the prefix is the owner; an agent loads only its own or shared-
const skillNames = new Set();
const skillsDir = join(CLAUDE, 'skills');
for (const d of list(skillsDir, (n) => existsSync(join(skillsDir, n, 'SKILL.md')) || !n.startsWith('.'))) {
  const f = join(skillsDir, d, 'SKILL.md');
  if (!existsSync(f)) { err(join(skillsDir, d), 'no SKILL.md'); continue; }
  skillNames.add(d);
  const fm = front(f);
  const name = fm ? parse(fm, f).name ?? '' : '';
  if (name !== d) err(f, `name '${name}' must equal the directory '${d}'`);
  if (d !== 'dev-lead' && !OWNERS.includes(d.split('-')[0])) err(f, `skill '${d}' must be prefixed with its owner: ${OWNERS.join(', ')}`);
}
// ---- references: linked from the skill, resolvable, and each opens with a 'Use when' line
for (const d of skillNames) {
  const refDir = join(skillsDir, d, 'reference');
  const body = read(join(skillsDir, d, 'SKILL.md'));
  const files = list(refDir, (n) => n.endsWith('.md'));
  for (const f of files) {
    if (!body.includes(`reference/${f}`)) err(join(refDir, f), `not linked from ${d}/SKILL.md: add it to the "Reference (use when)" table`);
    if (!/^> Use when:/m.test(read(join(refDir, f)).split('\n').slice(0, 5).join('\n'))) err(join(refDir, f), 'must open with a "> Use when:" line so the router can say when to read it');
  }
  for (const m of body.matchAll(/`reference\/([\w.-]+\.md)`/g)) {
    if (!existsSync(join(refDir, m[1]))) err(join(skillsDir, d, 'SKILL.md'), `links reference/${m[1]} which does not exist`);
  }
}
const agentsDir = join(CLAUDE, 'agents');
for (const f of list(agentsDir, (n) => n.endsWith('.md'))) {
  const path = join(agentsDir, f);
  const fm = front(path);
  if (!fm) { err(path, 'missing front matter'); continue; }
  const agent = basename(f, '.md');
  let on = false;
  for (const ln of fm) {
    if (/^skills:/.test(ln)) { on = true; continue; }
    if (on && /^\s+- /.test(ln)) {
      const sk = ln.replace(/^\s+- /, '').trim();
      const owner = sk.split('-')[0];
      if (!skillNames.has(sk)) err(path, `skill '${sk}' does not exist`);
      else if (owner !== agent && owner !== 'shared') err(path, `skill '${sk}' belongs to '${owner}', not '${agent}': one agent, one identity`);
    } else if (on && !ln.startsWith(' ')) on = false;
  }
}

// ---- routing: every skill is preloaded by an agent, or named in dev-lead or a command
const commandsDir = join(CLAUDE, 'commands');
const leadText = [join(skillsDir, 'dev-lead', 'SKILL.md'), ...list(commandsDir, (n) => n.endsWith('.md')).map((n) => join(commandsDir, n))]
  .filter((f) => existsSync(f)).map(read).join('\n');
const preloaded = new Set();
for (const f of list(agentsDir, (n) => n.endsWith('.md'))) {
  const fm = front(join(agentsDir, f)) ?? [];
  let on = false;
  for (const ln of fm) {
    if (/^skills:/.test(ln)) { on = true; continue; }
    if (on && /^\s+- /.test(ln)) preloaded.add(ln.replace(/^\s+- /, '').trim());
    else if (on && !ln.startsWith(' ')) on = false;
  }
}
for (const sk of skillNames) {
  if (sk !== 'dev-lead' && !preloaded.has(sk) && !leadText.includes(sk)) {
    err(join(skillsDir, sk, 'SKILL.md'), `skill '${sk}' is unrouted: list it in an agent's skills: or name it in dev-lead or a command`);
  }
}

// ---- CLAUDE.md: a gate that covers only the vault, and unfilled placeholders
const manual = join(ROOT, 'CLAUDE.md');
if (existsSync(manual)) {
  const t = read(manual);
  const gate = (t.match(/GATE_CMD\s*=\s*(.*)/) ?? [])[1] ?? '';
  if (gate.includes('check-vault') && !/&&|;|\|/.test(gate)) warnings.push('CLAUDE.md: GATE_CMD covers the vault only; add your project tests, lint and build, or green means the notes are tidy, not that the code works');
  if (/## Operator\n[^\n]*<name>/.test(t)) warnings.push('CLAUDE.md: the operator is not named; nobody rules on forks or covers when away');
  const mode = (t.match(/mode:\s*(\w+)/) ?? [])[1];
  const epic = ((t.match(/active_epic:[ \t]*([^#\n]*)/) ?? [])[1] ?? '').trim();
  if ((mode === 'jira' || mode === 'backlog') && !epic) warnings.push('CLAUDE.md: work source is ' + mode + ' but active_epic is empty; there is no epic plan to scope against');
}

// ---- session-start hook: dev-lead is injected whole, so it must fit under the output cap
const lead = join(skillsDir, 'dev-lead', 'SKILL.md');
if (existsSync(lead) && read(lead).length > HOOK_CAP) {
  err(lead, `${read(lead).length} chars > ${HOOK_CAP}: the SessionStart hook would be truncated at 10,000. Move detail out of the skill`);
}
const settings = join(CLAUDE, 'settings.json');
if (existsSync(settings) && read(settings).includes('load-dev-lead.mjs') && !existsSync(join(CLAUDE, 'hooks', 'load-dev-lead.mjs'))) {
  err(settings, 'registers hooks/load-dev-lead.mjs but the file is missing');
}

for (const w of warnings) console.log('warn:', w);
for (const e of errors) console.log('ERROR:', e);
console.log(`vault check: ${errors.length} error(s), ${warnings.length} warning(s), ${cards.length} card(s), ${notes.length} note(s)`);
process.exit(errors.length ? 1 : 0);
