const fs = require('fs');
const path = require('path');

/**
 * Script to identify journal entries, bridges, and story sections that contain
 * time-of-day references and need content rewriting
 */

const narrativeFile = path.join(__dirname, '../continuity-analysis/narrative/narrative-master-PHASE4.md');

function extractSections(content) {
  const lines = content.split('\n');
  const sections = {
    journals: [],
    bridges: [],
    storyGroups: []
  };
  
  let currentSection = null;
  let currentContent = [];
  let startLine = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Journal entries
    if (line.match(/\*\*Aria's Journal - Day \d+\*\*/)) {
      if (currentSection) {
        saveSection(sections, currentSection, currentContent, startLine, i - 1);
      }
      currentSection = {
        type: 'journal',
        title: line.match(/Day (\d+)/)[1],
        fullTitle: line
      };
      currentContent = [line];
      startLine = i + 1;
    }
    // Bridge sections
    else if (line.match(/^\*\*Bridge:\*\*/)) {
      if (currentSection) {
        saveSection(sections, currentSection, currentContent, startLine, i - 1);
      }
      currentSection = {
        type: 'bridge'
      };
      currentContent = [line];
      startLine = i + 1;
    }
    // Story group sections
    else if (line.match(/^\*\*Story Group \d+:\*\*/)) {
      if (currentSection) {
        saveSection(sections, currentSection, currentContent, startLine, i - 1);
      }
      currentSection = {
        type: 'storyGroup',
        number: line.match(/Story Group (\d+)/)[1]
      };
      currentContent = [line];
      startLine = i + 1;
    }
    // Chapter endings
    else if (line.match(/^\*\*Chapter Ending:\*\*/)) {
      if (currentSection) {
        saveSection(sections, currentSection, currentContent, startLine, i - 1);
      }
      currentSection = {
        type: 'chapterEnding'
      };
      currentContent = [line];
      startLine = i + 1;
    }
    // Narrative sections
    else if (line.match(/^\*\*Narrative:\*\*/)) {
      if (currentSection) {
        saveSection(sections, currentSection, currentContent, startLine, i - 1);
      }
      currentSection = null;
      currentContent = [];
    }
    // Accumulate content
    else if (currentSection) {
      currentContent.push(line);
    }
  }
  
  // Save last section
  if (currentSection) {
    saveSection(sections, currentSection, currentContent, startLine, lines.length - 1);
  }
  
  return sections;
}

function saveSection(sections, section, content, startLine, endLine) {
  const contentText = content.join('\n');
  section.content = contentText;
  section.startLine = startLine;
  section.endLine = endLine;
  
  if (section.type === 'journal') {
    sections.journals.push(section);
  } else if (section.type === 'bridge') {
    sections.bridges.push(section);
  } else if (section.type === 'storyGroup') {
    sections.storyGroups.push(section);
  }
}

function hasTimeReferences(text) {
  const timePatterns = [
    /\b(morning|afternoon|evening|midday|noon|midnight|dawn|dusk|sunrise|sunset)\b/gi,
    /\b(today|tonight|this morning|this afternoon|this evening)\b/gi,
    /\b(later that day|earlier that day|as the day wore on)\b/gi,
    /\b(sun rose|sun set|sun cast)\b/gi,
    /\b(early|late) in the (day|morning|afternoon|evening)\b/gi
  ];
  
  return timePatterns.some(pattern => pattern.test(text));
}

function analyzeContent() {
  console.log('🔍 Identifying Content That Needs Rewriting\n');
  console.log('=' .repeat(80));
  
  try {
    const content = fs.readFileSync(narrativeFile, 'utf-8');
    const sections = extractSections(content);
    
    // Analyze journals
    console.log('\n📖 Journal Entries with Time References:\n');
    const journalsNeedingRewrite = sections.journals.filter(j => hasTimeReferences(j.content));
    console.log(`Found ${journalsNeedingRewrite.length} of ${sections.journals.length} journal entries with time references\n`);
    
    journalsNeedingRewrite.slice(0, 10).forEach(journal => {
      console.log(`  Day ${journal.title} (Lines ${journal.startLine}-${journal.endLine})`);
      const excerpt = journal.content.substring(0, 100).replace(/\n/g, ' ');
      console.log(`    "${excerpt}..."`);
    });
    
    if (journalsNeedingRewrite.length > 10) {
      console.log(`  ... and ${journalsNeedingRewrite.length - 10} more`);
    }
    
    // Analyze bridges
    console.log('\n🌉 Bridge Sections with Time References:\n');
    const bridgesNeedingRewrite = sections.bridges.filter(b => hasTimeReferences(b.content));
    console.log(`Found ${bridgesNeedingRewrite.length} of ${sections.bridges.length} bridge sections with time references\n`);
    
    bridgesNeedingRewrite.slice(0, 10).forEach(bridge => {
      console.log(`  Lines ${bridge.startLine}-${bridge.endLine}`);
      const excerpt = bridge.content.substring(0, 120).replace(/\n/g, ' ');
      console.log(`    "${excerpt}..."`);
    });
    
    if (bridgesNeedingRewrite.length > 10) {
      console.log(`  ... and ${bridgesNeedingRewrite.length - 10} more`);
    }
    
    // Analyze story groups
    console.log('\n📚 Story Groups with Time References:\n');
    const storyGroupsNeedingReview = sections.storyGroups.filter(sg => hasTimeReferences(sg.content));
    console.log(`Found ${storyGroupsNeedingReview.length} of ${sections.storyGroups.length} story groups with time references\n`);
    
    if (storyGroupsNeedingReview.length > 0) {
      storyGroupsNeedingReview.slice(0, 5).forEach(sg => {
        console.log(`  Story Group ${sg.number} (Lines ${sg.startLine}-${sg.endLine})`);
      });
      if (storyGroupsNeedingReview.length > 5) {
        console.log(`  ... and ${storyGroupsNeedingReview.length - 5} more`);
      }
    }
    
    // Save detailed report
    const report = {
      journals: journalsNeedingRewrite.map(j => ({
        day: j.title,
        startLine: j.startLine,
        endLine: j.endLine,
        content: j.content.substring(0, 500)
      })),
      bridges: bridgesNeedingRewrite.map(b => ({
        startLine: b.startLine,
        endLine: b.endLine,
        content: b.content
      })),
      storyGroups: storyGroupsNeedingReview.map(sg => ({
        number: sg.number,
        startLine: sg.startLine,
        endLine: sg.endLine
      }))
    };
    
    const reportPath = path.join(__dirname, 'content-rewrite-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    console.log('\n✅ Analysis complete!');
    console.log(`\nDetailed report saved to: ${reportPath}`);
    console.log('\n📊 Summary:');
    console.log(`  - ${journalsNeedingRewrite.length} journal entries need content review`);
    console.log(`  - ${bridgesNeedingRewrite.length} bridge sections need content review`);
    console.log(`  - ${storyGroupsNeedingReview.length} story groups need content review`);
    console.log(`\n💡 Next step: Review and rewrite time-of-day references to day-to-day progression`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

analyzeContent();
