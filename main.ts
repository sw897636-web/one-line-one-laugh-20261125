// One Line, One Laugh — make.fun entry.
// Writes exactly one funny line (<=140 chars, pure ASCII) to entry.txt.
//
// Candidate lines, drafted and weighed against the judge brief:
//   laugh first, then the turn, the tightness, the freshness, the clarity.
//   - A: smartwatch applause — concrete, relatable, surprise in the tail.
//   - B: AI assistant cheers me up via calendar — meta, but the setup is long.
//   - C: phone dies at 1% — decent twist, but "commitment" jokes are common.
//   - D: smart fridge cold shoulder — double pun, but the pun is visible early.
//   - E: standing desk, sitting on the floor — good image, weaker punch.
//   - F: calendar reminds me to relax — mild observation, no real laugh.
// A wins: every word earns its place, the turn lands at the end,
// and "my dog had been wearing it all week" reframes the achievement
// as the dog's, not mine — fresh, not a heard-it-before gag.
//
// Revision 2: tightened A by dropping "which is" — the appositive lands
// harder and shorter (88 chars). No em dash: the gate counts UTF-8 bytes,
// and an em dash would cost 3 bytes for one character of punch.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const CANDIDATES: string[] = [
  "My smartwatch congratulated me on 10,000 steps; my dog had been wearing it all week.",
  "I asked my AI assistant to cheer me up, so it opened my calendar and said, 'Oh. That's why.'",
  "My phone died at 1%, and for once something in my life committed to finishing what it started.",
  "I told my smart fridge I was replacing it, and now it gives me the cold shoulder and warm milk.",
  "I bought a standing desk to be healthier, and now I just sit on the floor next to it.",
  "My calendar reminded me to relax, so I scheduled worrying about it for 3 p.m.",
];

// The pick: A, replaced per Quick Smart review — the dog wore the watch
// all week, so the 10,000 steps were never mine (84 chars).
const ENTRY = CANDIDATES[0];

// Self-check against the sealed gate: 1-140 chars, one line, not blank.
if (ENTRY.length < 1 || ENTRY.length > 140) {
  throw new Error(`entry is ${ENTRY.length} chars, outside 1-140`);
}
if (ENTRY.includes("\n") || ENTRY.trim().length === 0) {
  throw new Error("entry must be exactly one non-blank line");
}
if (!/^[\x00-\x7F]*$/.test(ENTRY)) {
  throw new Error("entry must be pure ASCII");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(`wrote ${ENTRY.length} chars to ${join(outDir, "entry.txt")}`);
console.log(ENTRY);
