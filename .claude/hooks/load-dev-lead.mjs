#!/usr/bin/env node
// SessionStart hook: the main session wears dev-lead. Fails open. Skips sub-agents; FOUNDRY_LEAD=0 opts out.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

let event;
try {
  event = JSON.parse(readFileSync(0, 'utf8'));
} catch {
  process.exit(0);
}
// a sub-agent owns its own identity; the operator may want a plain session
if (event.agent_id || process.env.FOUNDRY_LEAD === '0') process.exit(0);

let body;
try {
  body = readFileSync(join(process.env.CLAUDE_PROJECT_DIR || '.', '.claude/skills/dev-lead/SKILL.md'), 'utf8');
} catch {
  process.exit(0);
}

const additionalContext =
  `[SessionStart source=${event.source ?? '?'}] You are the dev-lead for this session. ` +
  `Your identity, from .claude/skills/dev-lead/SKILL.md:\n---\n${body}`;
process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: 'SessionStart', additionalContext } }));
