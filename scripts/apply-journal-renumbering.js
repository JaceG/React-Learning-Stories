const fs = require('fs');
const path = require('path');

/**
 * Script to apply journal entry renumbering and identify content that needs manual review
 */

const narrativeFile = path.join(__dirname, '../continuity-analysis/narrative/narrative-master-PHASE4.md');
const planFile = path.join(__dirname, 'journal-renumbering-plan.json');

function applyRenumbering() {
  console.log('🔄 Applying Journal Entry Renumbering\n');
  console.log('=' .repeat(80));
  
  try {
    // Load the plan
    const planData = JSON.parse(fs.readFileSync(planFile, 'utf-8'));
    const { plan } = planData;
    
    // Read the narrative file
    let content = fs.readFileSync(narrativeFile, 'utf-8');
    
    console.log(`\n📝 Renumbering ${plan.length} journal entries...\n`);
    
    // Sort plan by line number in descending order to avoid offset issues
    const sortedPlan = [...plan].sort((a, b) => b.lineNumber - a.lineNumber);
    
    let changesCount = 0;
    sortedPlan.forEach((change, index) => {
      const oldPattern = new RegExp(
        `\\*\\*Aria's Journal - Day ${change.oldDay}${change.oldTimeOfDay ? ` \\(${change.oldTimeOfDay}\\)` : ''}\\*\\*`,
        'g'
      );
      
      const beforeLength = content.length;
      content = content.replace(oldPattern, change.newTitle);
      
      if (content.length !== beforeLength || oldPattern.test(content)) {
        changesCount++;
        if (index < 5) { // Show first 5 changes
          console.log(`  ✓ Line ${change.lineNumber}: Day ${change.oldDay}${change.oldTimeOfDay ? ` (${change.oldTimeOfDay})` : ''} → Day ${change.newDay}`);
        }
      }
    });
    
    console.log(`  ... and ${changesCount - 5} more changes\n`);
    
    // Save the updated file
    const backupFile = narrativeFile.replace('.md', '-backup-before-renumbering.md');
    fs.copyFileSync(narrativeFile, backupFile);
    console.log(`📦 Backup created: ${path.basename(backupFile)}`);
    
    fs.writeFileSync(narrativeFile, content);
    console.log(`✅ Updated file: ${path.basename(narrativeFile)}`);
    
    console.log('\n📋 Next steps:');
    console.log('  1. Review journal entry CONTENT for time-of-day references');
    console.log('  2. Review bridge sections for time transitions');
    console.log('  3. Update story narrative references to time of day');
    console.log('\n  Run: node scripts/identify-content-to-rewrite.js');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

applyRenumbering();
