const fs = require('fs');
const path = require('path');

/**
 * Script to analyze and help renumber journal entries from time-of-day format to sequential day format
 * Example: Day 6 (Morning), Day 6 (Afternoon), Day 6 (Evening) → Day 6, Day 7, Day 8
 */

const narrativeFile = path.join(__dirname, '../continuity-analysis/narrative/narrative-master-PHASE4.md');

function extractJournalEntries(content) {
  const lines = content.split('\n');
  const entries = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = line.match(/\*\*Aria's Journal - Day (\d+)(?:\s*\((.*?)\))?\*\*/);
    
    if (match) {
      const dayNumber = parseInt(match[1]);
      const timeOfDay = match[2] || null;
      
      // Extract the journal content (next line should be the italic text)
      let journalContent = '';
      if (i + 1 < lines.length && lines[i + 1].startsWith('*')) {
        journalContent = lines[i + 1];
      }
      
      entries.push({
        lineNumber: i + 1, // 1-indexed for editor
        originalDay: dayNumber,
        timeOfDay: timeOfDay,
        fullTitle: line,
        content: journalContent,
        originalText: `${line}\n${journalContent}`
      });
    }
  }
  
  return entries;
}

function analyzeTimeOfDayReferences(content) {
  const timeReferences = [];
  const lines = content.split('\n');
  
  // Patterns to search for
  const patterns = [
    /\b(morning|afternoon|evening|midday|noon|midnight|dawn|dusk)\b/gi,
    /\b(today|tonight|this morning|this afternoon|this evening)\b/gi,
    /\b(later that day|earlier that day|as the day wore on)\b/gi,
    /\*\*Bridge:\*\*[\s\S]*?(morning|afternoon|evening|As the.*?(sun|day))/gi,
    /sun (rose|set|cast)/gi
  ];
  
  patterns.forEach(pattern => {
    let match;
    const regex = new RegExp(pattern.source, pattern.flags);
    while ((match = regex.exec(content)) !== null) {
      const lineNumber = content.substring(0, match.index).split('\n').length;
      timeReferences.push({
        lineNumber,
        match: match[0],
        context: lines[lineNumber - 1]
      });
    }
  });
  
  // Remove duplicates
  return timeReferences.filter((ref, index, self) =>
    index === self.findIndex(r => r.lineNumber === ref.lineNumber && r.match === ref.match)
  );
}

function generateRenumberingPlan(entries) {
  let sequentialDay = 1;
  const plan = [];
  
  entries.forEach((entry, index) => {
    plan.push({
      lineNumber: entry.lineNumber,
      oldTitle: entry.fullTitle,
      newTitle: `**Aria's Journal - Day ${sequentialDay}**`,
      oldDay: entry.originalDay,
      oldTimeOfDay: entry.timeOfDay,
      newDay: sequentialDay,
      content: entry.content
    });
    
    sequentialDay++;
  });
  
  return plan;
}

function main() {
  console.log('📖 Journal Entry Renumbering Analysis\n');
  console.log('=' .repeat(80));
  
  try {
    const content = fs.readFileSync(narrativeFile, 'utf-8');
    
    // Extract all journal entries
    console.log('\n1️⃣  Extracting journal entries...\n');
    const entries = extractJournalEntries(content);
    console.log(`Found ${entries.length} journal entries\n`);
    
    // Show first few entries as examples
    console.log('Current format (first 10 entries):');
    entries.slice(0, 10).forEach(entry => {
      console.log(`  Line ${entry.lineNumber}: Day ${entry.originalDay}${entry.timeOfDay ? ` (${entry.timeOfDay})` : ''}`);
    });
    
    // Generate renumbering plan
    console.log('\n2️⃣  Generating renumbering plan...\n');
    const plan = generateRenumberingPlan(entries);
    
    console.log('Proposed changes (first 10):');
    plan.slice(0, 10).forEach(change => {
      console.log(`  Line ${change.lineNumber}:`);
      console.log(`    OLD: Day ${change.oldDay}${change.oldTimeOfDay ? ` (${change.oldTimeOfDay})` : ''}`);
      console.log(`    NEW: Day ${change.newDay}`);
    });
    
    console.log(`\n  ... and ${plan.length - 10} more entries`);
    
    // Analyze time-of-day references
    console.log('\n3️⃣  Analyzing time-of-day references in content...\n');
    const timeRefs = analyzeTimeOfDayReferences(content);
    
    console.log(`Found ${timeRefs.length} potential time-of-day references`);
    console.log('\nSample references (first 15):');
    timeRefs.slice(0, 15).forEach(ref => {
      console.log(`  Line ${ref.lineNumber}: "${ref.match}"`);
      console.log(`    Context: ${ref.context.substring(0, 80)}...`);
    });
    
    // Save the plan to a file
    const outputPath = path.join(__dirname, 'journal-renumbering-plan.json');
    fs.writeFileSync(outputPath, JSON.stringify({ plan, entries, timeRefs }, null, 2));
    
    console.log('\n✅ Analysis complete!');
    console.log(`\nDetailed plan saved to: ${outputPath}`);
    console.log('\nSummary:');
    console.log(`  - ${entries.length} journal entries to renumber`);
    console.log(`  - ${timeRefs.length} time-of-day references to review`);
    console.log(`  - Final day number will be: Day ${plan.length}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
