const fs = require('fs');
const path = require('path');

const narrativeFile = path.join(__dirname, '../continuity-analysis/narrative/narrative-master-PHASE4.md');
const content = fs.readFileSync(narrativeFile, 'utf-8');
const lines = content.split('\n');

const result = [];
let removed = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  // 1. Remove entire 🟦 [EXPANDED: ...] lines (standalone annotation lines)
  if (/^🟦\s*\*\*\[EXPANDED:/.test(line)) {
    removed++;
    // Also remove the blank line that typically follows
    if (i + 1 < lines.length && lines[i + 1].trim() === '') {
      i++;
    }
    continue;
  }

  // 2. Remove 💡 EDIT NOTE lines and the blank line that typically follows
  if (/^💡\s*\*\*EDIT NOTE/.test(line)) {
    removed++;
    if (i + 1 < lines.length && lines[i + 1].trim() === '') {
      i++;
    }
    continue;
  }

  // 3. Handle 🔴 ~~deleted~~ 🟢 **replacement** patterns
  // These appear inline within narrative lines. Strip the markup, keep the final text.
  let cleaned = line;

  // Pattern: 🔴 ~~old text~~ 🟢 **new text** → new text
  cleaned = cleaned.replace(/🔴\s*~~[^~]*~~\s*🟢\s*\*\*([^*]+)\*\*/g, '$1');

  // Pattern: 🔴 ~~old text~~ (no replacement - deleted content, remove entirely)
  cleaned = cleaned.replace(/🔴\s*~~[^~]*~~/g, '');

  // Pattern: 🟢 **new text** (addition without deletion marker - keep the text, drop markup)
  cleaned = cleaned.replace(/🟢\s*\*\*([^*]+)\*\*/g, '$1');

  // Clean up any double spaces left behind
  cleaned = cleaned.replace(/  +/g, ' ').trim();

  // If the line was non-empty and is now empty after stripping, skip it
  if (line.trim() !== '' && cleaned === '') {
    removed++;
    continue;
  }

  // Restore leading indentation if line was originally indented
  if (line.startsWith('  ') && !cleaned.startsWith('  ')) {
    const indent = line.match(/^(\s+)/);
    if (indent) cleaned = indent[1] + cleaned;
  }

  result.push(cleaned);
}

const output = result.join('\n');

// Verify counts
const expandedLeft = (output.match(/🟦.*\[EXPANDED/g) || []).length;
const editNoteLeft = (output.match(/💡.*EDIT NOTE/g) || []).length;
const redGreenLeft = (output.match(/🔴|🟢/g) || []).length;

console.log('Lines removed:', removed);
console.log('Remaining 🟦 [EXPANDED:]:', expandedLeft);
console.log('Remaining 💡 EDIT NOTE:', editNoteLeft);
console.log('Remaining 🔴/🟢:', redGreenLeft);
console.log('Original lines:', lines.length, '→ Result lines:', result.length);

fs.writeFileSync(narrativeFile, output);
console.log('✅ Done!');
