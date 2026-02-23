const fs = require('fs');
const path = require('path');

const narrativeFile = path.join(__dirname, '../continuity-analysis/narrative/narrative-master-PHASE4.md');

const content = fs.readFileSync(narrativeFile, 'utf-8');
const lines = content.split('\n');

// Find lesson section boundaries
let lp62Start = -1, lp62End = -1;
let lp63Start = -1, lp63End = -1;
let lp64Start = -1, lp64End = -1;
let lp7Start = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i] === '## 6.2 WaypointWizardry') lp62Start = i;
  if (lines[i] === '## 6.3 GuardianGates') { lp62End = i - 1; lp63Start = i; }
  if (lines[i] === '## 6.4 PortalPassages') { lp63End = i - 1; lp64Start = i; }
  if (lines[i] === '# 7. Performance Optimization') { lp64End = i - 1; lp7Start = i; }
}

console.log(`LP6.2: lines ${lp62Start+1}-${lp62End+1}`);
console.log(`LP6.3: lines ${lp63Start+1}-${lp63End+1}`);
console.log(`LP6.4: lines ${lp64Start+1}-${lp64End+1}`);
console.log(`LP7 starts: line ${lp7Start+1}`);

// Count Marina references in each section
function countMarina(start, end) {
  let count = 0;
  for (let i = start; i <= end; i++) {
    const matches = (lines[i].match(/Marina/g) || []).length;
    count += matches;
  }
  return count;
}

console.log(`\nMarina refs in LP6.2: ${countMarina(lp62Start, lp62End)}`);
console.log(`Marina refs in LP6.3: ${countMarina(lp63Start, lp63End)}`);
console.log(`Marina refs in LP6.4: ${countMarina(lp64Start, lp64End)}`);
console.log(`Marina refs in LP7.1 opener: ${countMarina(lp7Start, lp7Start + 10)}`);

// Replacements to apply per section:
// LP6.2: Marina -> Wayfinder Solara (she/her - no pronoun change needed)
//   But need to handle "Marina" as a name: "Marina said", "Marina smiled", etc.
//   Simple name replacements:
//   "Marina" -> "Solara" (and titles like "Captain Marina" -> "Wayfinder Solara")

// LP6.3: Marina -> Warden Aldric (he/him - need pronoun changes too)
//   "Marina" -> "Aldric"
//   " she " -> " he ", " her " -> " him ", " her " -> " his " (possessive)
//   " She " -> " He ", " Her " -> " His "

// LP6.4: Marina -> Rift Weaver Lyss (she/her - no pronoun change needed)
//   "Marina" -> "Lyss"

function replaceInRange(lines, start, end, replacements) {
  const modified = [...lines];
  for (let i = start; i <= end; i++) {
    let line = modified[i];
    for (const [from, to] of replacements) {
      line = line.split(from).join(to);
    }
    modified[i] = line;
  }
  return modified;
}

let modified = [...lines];

// LP6.2: Replace Marina with Solara (preserve she/her pronouns)
modified = replaceInRange(modified, lp62Start, lp62End, [
  ['Captain Marina', 'Wayfinder Solara'],
  ['Marina', 'Solara'],
]);

// LP6.3: Replace Marina with Aldric (change she/her to he/him/his)
// Do Marina name first, then pronouns
modified = replaceInRange(modified, lp63Start, lp63End, [
  ['Captain Marina', 'Warden Aldric'],
  ['Marina', 'Aldric'],
  [' she ', ' he '],
  [' her ', ' him '],
  ['her voice', 'his voice'],
  ['her tone', 'his tone'],
  ['her eyes', 'his eyes'],
  ['her hand', 'his hand'],
  ['her form', 'his form'],
  ['her expression', 'his expression'],
  ['her movements', 'his movements'],
  [' She ', ' He '],
  ['"She ', '"He '],
  ["she'd", "he'd"],
  ["she's", "he's"],
  ["She's", "He's"],
  ["She'd", "He'd"],
]);

// LP6.4: Replace Marina with Lyss (preserve she/her pronouns)
modified = replaceInRange(modified, lp64Start, lp64End, [
  ['Captain Marina', 'Rift Weaver Lyss'],
  ['Marina', 'Lyss'],
]);

// LP7.1 opener: Fix the Marina reference
if (lp7Start >= 0) {
  for (let i = lp7Start; i < Math.min(lp7Start + 15, modified.length); i++) {
    modified[i] = modified[i].split('Word reached her from Marina of Brother Memor').join('Word reached her of Brother Memor');
    modified[i] = modified[i].split('from Marina of Brother').join('of Brother');
  }
}

const result = modified.join('\n');

// Verify counts after replacement
const resultLines = result.split('\n');
function countInRange(lines, start, end, term) {
  let count = 0;
  for (let i = start; i <= end; i++) {
    count += (lines[i].match(new RegExp(term, 'g')) || []).length;
  }
  return count;
}

console.log('\nAfter replacement:');
console.log(`Marina refs in LP6.2: ${countInRange(resultLines, lp62Start, lp62End, 'Marina')}`);
console.log(`Marina refs in LP6.3: ${countInRange(resultLines, lp63Start, lp63End, 'Marina')}`);
console.log(`Marina refs in LP6.4: ${countInRange(resultLines, lp64Start, lp64End, 'Marina')}`);
console.log(`Solara refs in LP6.2: ${countInRange(resultLines, lp62Start, lp62End, 'Solara')}`);
console.log(`Aldric refs in LP6.3: ${countInRange(resultLines, lp63Start, lp63End, 'Aldric')}`);
console.log(`Lyss refs in LP6.4: ${countInRange(resultLines, lp64Start, lp64End, 'Lyss')}`);

fs.writeFileSync(narrativeFile, result);
console.log('\n✅ File updated!');
