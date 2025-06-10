#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Define the expected structure based on CLAUDE.md
const EXPECTED_STRUCTURE = {
  container: 'lesson-container',
  requiredElements: [
    { name: 'lesson-title', tag: 'h1', required: true, position: 'start' },
    { name: 'lesson-subtitle', tag: 'p', required: true, position: 'start' },
    { name: 'chapter-navigation', tag: 'div', required: true, position: 'both' },
    { name: 'chapter-title', tag: 'h2', required: true, position: 'after-nav' },
    { name: 'story-section', tag: 'div', required: true, position: 'middle' },
    { name: 'code-example', tag: 'div', required: true, position: 'middle' },
    { name: 'lesson-insight', tag: 'div', required: true, position: 'second-last' },
    { name: 'reflection-section', tag: 'div', required: true, position: 'last-before-nav' },
    { name: 'lesson-navigation', tag: 'div', required: true, position: 'end' }
  ],
  insightFormat: /The\s+\w+\s+Lesson:/,
  reflectionFormat: /Reflect on the Story/
};

// Expected structure for chapter files only (index.js handles navigation)
const CHAPTER_STRUCTURE = {
  requiredElements: [
    { name: 'chapter', tag: 'div', required: true },
    { name: 'chapter-title', tag: 'h2', required: true },
    { name: 'story-section', tag: 'div', required: true },
    { name: 'code-example', tag: 'div', required: true },
    { name: 'lesson-insight', tag: 'div', required: true },
    { name: 'reflection-section', tag: 'div', required: true }
  ],
  insightFormat: /The\s+\w+\s+Lesson:/,
  reflectionFormat: /Reflect on the Story/
};

// Function to analyze lesson index.js structure
function analyzeLessonIndex(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const fileName = path.relative(process.cwd(), filePath);
  
  const issues = [];
  const findings = {
    fileName,
    type: 'index',
    elements: {},
    issues: []
  };
  
  // Check for required index elements
  const indexElements = [
    { name: 'lesson-container', required: true },
    { name: 'lesson-header', required: true },
    { name: 'lesson-subtitle', required: true },
    { name: 'chapter-navigation', required: true },
    { name: 'LessonNavigation', required: true }
  ];
  
  indexElements.forEach(element => {
    const found = content.includes(element.name);
    findings.elements[element.name] = found;
    
    if (!found && element.required) {
      issues.push(`Missing required element: ${element.name}`);
    }
  });
  
  findings.issues = issues;
  return findings;
}

// Function to analyze a single chapter file
function analyzeChapter(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const fileName = path.relative(process.cwd(), filePath);
  
  const issues = [];
  const findings = {
    fileName,
    type: 'chapter',
    elements: {},
    issues: []
  };
  
  // Check for required chapter elements
  CHAPTER_STRUCTURE.requiredElements.forEach(element => {
    const classPattern = new RegExp(`className=['"\`]${element.name}['"\`]`);
    const found = classPattern.test(content);
    findings.elements[element.name] = found;
    
    if (!found && element.required) {
      issues.push(`Missing required element: ${element.name}`);
    }
  });
  
  // Check lesson insight format
  if (content.includes('lesson-insight')) {
    const insightMatch = content.match(/<h3[^>]*>([^<]+)<\/h3>/g);
    if (insightMatch) {
      const insightText = insightMatch.find(match => match.includes('Lesson:'));
      if (insightText && !CHAPTER_STRUCTURE.insightFormat.test(insightText)) {
        issues.push('Lesson insight heading not in correct format: "The [Something] Lesson:"');
      }
    }
  }
  
  // Check reflection section format
  if (content.includes('reflection-section')) {
    if (!content.includes('Reflect on the Story')) {
      issues.push('Reflection section heading should be "Reflect on the Story"');
    }
  }
  
  // Check for strong tags in story paragraphs
  const storyParagraphs = content.match(/<p\s+className=['"`]story-paragraph['"`][^>]*>[\s\S]*?<\/p>/g);
  if (storyParagraphs) {
    let paragraphsWithoutStrong = 0;
    storyParagraphs.forEach(paragraph => {
      // Skip paragraphs that are mostly dialogue or very short
      const textOnly = paragraph.replace(/<[^>]+>/g, '').trim();
      if (textOnly.length > 100 && !paragraph.includes('<strong>')) {
        paragraphsWithoutStrong++;
      }
    });
    
    if (paragraphsWithoutStrong > 2) {
      issues.push(`${paragraphsWithoutStrong} story paragraphs lack <strong> tags for technical terms`);
    }
  }
  
  // Check element order
  const elementPositions = {};
  CHAPTER_STRUCTURE.requiredElements.forEach(element => {
    const regex = new RegExp(`className=['"\`]${element.name}['"\`]`);
    const match = content.match(regex);
    if (match) {
      elementPositions[element.name] = match.index;
    }
  });
  
  // Verify lesson-insight is second to last
  if (elementPositions['lesson-insight'] && elementPositions['reflection-section']) {
    const afterInsight = content.substring(elementPositions['lesson-insight']);
    const reflectionInAfter = afterInsight.indexOf('reflection-section');
    
    if (reflectionInAfter === -1) {
      issues.push('Reflection section should come after lesson insight');
    }
  }
  
  findings.issues = issues;
  return findings;
}

// Function to find all chapter files
function findChapterFiles(dir) {
  const chapterFiles = [];
  
  function traverse(currentDir) {
    const files = fs.readdirSync(currentDir);
    
    files.forEach(file => {
      const filePath = path.join(currentDir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        traverse(filePath);
      } else if (file.match(/chapter\d\.js$/)) {
        chapterFiles.push(filePath);
      }
    });
  }
  
  traverse(dir);
  return chapterFiles;
}

// Function to find all lesson files (both index.js and chapter files)
function findLessonFiles(dir) {
  const lessonFiles = {
    indexes: [],
    chapters: []
  };
  
  function traverse(currentDir) {
    const files = fs.readdirSync(currentDir);
    
    files.forEach(file => {
      const filePath = path.join(currentDir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        traverse(filePath);
      } else if (file === 'index.js' && filePath.includes('/pages/')) {
        lessonFiles.indexes.push(filePath);
      } else if (file.match(/chapter\d\.js$/)) {
        lessonFiles.chapters.push(filePath);
      }
    });
  }
  
  traverse(dir);
  return lessonFiles;
}

// Main analysis function
function analyzeAllChapters() {
  const learningPathsDir = path.join(__dirname, 'src', 'learning-paths');
  const lessonFiles = findLessonFiles(learningPathsDir);
  
  console.log(`Found ${lessonFiles.indexes.length} lesson index files`);
  console.log(`Found ${lessonFiles.chapters.length} chapter files\n`);
  
  const results = {
    totalIndexes: lessonFiles.indexes.length,
    totalChapters: lessonFiles.chapters.length,
    compliantIndexes: [],
    nonCompliantIndexes: [],
    compliantChapters: [],
    nonCompliantChapters: [],
    byLearningPath: {}
  };
  
  // Analyze index files
  lessonFiles.indexes.forEach(file => {
    const analysis = analyzeLessonIndex(file);
    const learningPath = file.split(path.sep).find(part => part.includes('-'));
    
    if (!results.byLearningPath[learningPath]) {
      results.byLearningPath[learningPath] = {
        compliantIndexes: [],
        nonCompliantIndexes: [],
        compliantChapters: [],
        nonCompliantChapters: []
      };
    }
    
    if (analysis.issues.length === 0) {
      results.compliantIndexes.push(analysis);
      results.byLearningPath[learningPath].compliantIndexes.push(analysis);
    } else {
      results.nonCompliantIndexes.push(analysis);
      results.byLearningPath[learningPath].nonCompliantIndexes.push(analysis);
    }
  });
  
  // Analyze chapter files
  lessonFiles.chapters.forEach(file => {
    const analysis = analyzeChapter(file);
    const learningPath = file.split(path.sep).find(part => part.includes('-'));
    
    if (!results.byLearningPath[learningPath]) {
      results.byLearningPath[learningPath] = {
        compliantIndexes: [],
        nonCompliantIndexes: [],
        compliantChapters: [],
        nonCompliantChapters: []
      };
    }
    
    if (analysis.issues.length === 0) {
      results.compliantChapters.push(analysis);
      results.byLearningPath[learningPath].compliantChapters.push(analysis);
    } else {
      results.nonCompliantChapters.push(analysis);
      results.byLearningPath[learningPath].nonCompliantChapters.push(analysis);
    }
  });
  
  // Generate report
  console.log('=== Chapter Structure Analysis Report ===\n');
  console.log('Index Files:');
  console.log(`  Total: ${results.totalIndexes}`);
  console.log(`  Compliant: ${results.compliantIndexes.length}`);
  console.log(`  Non-Compliant: ${results.nonCompliantIndexes.length}\n`);
  
  console.log('Chapter Files:');
  console.log(`  Total: ${results.totalChapters}`);
  console.log(`  Compliant: ${results.compliantChapters.length}`);
  console.log(`  Non-Compliant: ${results.nonCompliantChapters.length}\n`);
  
  // Report by learning path
  Object.keys(results.byLearningPath).sort().forEach(path => {
    const pathResults = results.byLearningPath[path];
    console.log(`\n${path}:`);
    
    if (pathResults.nonCompliantIndexes.length > 0) {
      console.log('  Non-Compliant Index Files:');
      pathResults.nonCompliantIndexes.forEach(file => {
        console.log(`    ${file.fileName}:`);
        file.issues.forEach(issue => {
          console.log(`      - ${issue}`);
        });
      });
    }
    
    if (pathResults.nonCompliantChapters.length > 0) {
      console.log('  Non-Compliant Chapter Files:');
      pathResults.nonCompliantChapters.forEach(chapter => {
        console.log(`    ${chapter.fileName}:`);
        chapter.issues.forEach(issue => {
          console.log(`      - ${issue}`);
        });
      });
    }
    
    if (pathResults.nonCompliantIndexes.length === 0 && pathResults.nonCompliantChapters.length === 0) {
      console.log('  ✅ All files compliant!');
    }
  });
  
  // Save detailed report
  const reportPath = path.join(__dirname, 'chapter-structure-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`\nDetailed report saved to: ${reportPath}`);
}

// Run the analysis
if (require.main === module) {
  analyzeAllChapters();
}

module.exports = { analyzeChapter, findChapterFiles };