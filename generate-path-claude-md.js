#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Load the analysis report
const reportPath = path.join(__dirname, 'chapter-structure-report.json');
const cssReportPath = path.join(__dirname, 'css-analysis-simple-report.json');

if (!fs.existsSync(reportPath)) {
  console.error('Please run analyze-chapter-structure.js first to generate the report');
  process.exit(1);
}

const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
const cssReport = fs.existsSync(cssReportPath) 
  ? JSON.parse(fs.readFileSync(cssReportPath, 'utf8'))
  : null;

// Function to generate CLAUDE.md for a specific learning path
function generatePathClaudeMd(learningPath) {
  const pathData = report.byLearningPath[learningPath];
  if (!pathData) {
    console.error(`No data found for learning path: ${learningPath}`);
    return;
  }

  let content = `# ${formatPathName(learningPath)} Learning Path - Formatting Issues\n\n`;
  content += `## Overview\n`;
  content += `This document lists all structural formatting issues found in the ${formatPathName(learningPath)} learning path.\n\n`;

  // Check for potentially redundant elements
  const customElements = detectCustomElements(pathData);
  if (customElements.length > 0) {
    content += `## Potential CSS Redundancies\n`;
    customElements.forEach(element => {
      content += `- ${element}\n`;
    });
    content += `\n`;
  }

  // Index file issues
  if (pathData.nonCompliantIndexes.length > 0) {
    content += `## Index File Issues\n\n`;
    pathData.nonCompliantIndexes.forEach(file => {
      const lessonName = extractLessonName(file.fileName);
      content += `### ${lessonName}\n`;
      file.issues.forEach(issue => {
        content += `- ${issue}\n`;
      });
      content += `\n`;
    });
  }

  // Chapter file issues grouped by lesson
  if (pathData.nonCompliantChapters.length > 0) {
    content += `## Chapter Issues by Lesson\n\n`;
    
    const issuesByLesson = groupByLesson(pathData.nonCompliantChapters);
    
    Object.keys(issuesByLesson).forEach(lesson => {
      content += `### ${lesson}\n\n`;
      
      issuesByLesson[lesson].forEach(chapterData => {
        const chapterNum = extractChapterNumber(chapterData.fileName);
        content += `#### Chapter ${chapterNum}\n`;
        chapterData.issues.forEach(issue => {
          content += `- ${issue}\n`;
        });
        content += `\n`;
      });
    });
  }

  // CSS issues if available
  if (cssReport) {
    const cssIssues = findCssIssues(learningPath, cssReport);
    if (cssIssues.conflicts.length > 0 || cssIssues.redundancies.length > 0) {
      content += `## CSS Issues\n\n`;
      
      if (cssIssues.conflicts.length > 0) {
        content += `### Conflicts with CourseStyles.css\n`;
        cssIssues.conflicts.forEach(file => {
          content += `\n**${path.basename(file.file)}**\n`;
          file.criticalConflicts.forEach(conflict => {
            content += `- Remove overrides for \`.${conflict.selector}\`\n`;
          });
        });
        content += `\n`;
      }
      
      if (cssIssues.redundancies.length > 0) {
        content += `### Redundant CSS (can be removed)\n`;
        cssIssues.redundancies.forEach(file => {
          content += `\n**${path.basename(file.file)}**\n`;
          file.redundancies.forEach(redundancy => {
            content += `- Remove duplicate properties in \`.${redundancy.selector}\`\n`;
          });
        });
        content += `\n`;
      }
    }
  }

  // Common issues summary
  const commonIssues = findCommonIssues(pathData.nonCompliantChapters);
  if (commonIssues.length > 0) {
    content += `## Common Issues Summary\n\n`;
    commonIssues.forEach(issue => {
      content += `- ${issue.type}: ${issue.count} occurrences\n`;
    });
    content += `\n`;
  }

  // Technical terms reminder
  content += `## Technical Terms to Emphasize\n`;
  content += `Terms that should be wrapped in \`<strong>\` tags based on the learning path topic:\n`;
  content += generateTechnicalTermsList(learningPath);
  content += `\n`;

  // CSS guidance
  content += `## CSS Standardization Rules\n`;
  content += `1. **Use CourseStyles.css classes first** - Check if a standard class exists before creating custom ones\n`;
  content += `2. **Replace redundant custom classes** - If \`.magical-code\` does the same as \`.code-example\`, use the standard\n`;
  content += `3. **Keep truly unique styles** - Preserve lesson-specific visual elements that don't duplicate base functionality\n`;
  content += `4. **Extend rather than override** - Use modifier classes instead of overriding base styles\n\n`;
  
  // Visual quality checks
  content += `## Visual Quality Checks\n`;
  content += `1. **Text Contrast** - Verify all text has sufficient contrast against backgrounds\n`;
  content += `   - Dark text should be on light backgrounds\n`;
  content += `   - Light text should be on dark backgrounds\n`;
  content += `   - Check interactive elements in all states (hover, active, disabled)\n`;
  content += `2. **Interactive CSS Completeness** - Ensure all interactive features have:\n`;
  content += `   - Hover states\n`;
  content += `   - Active/clicked states\n`;
  content += `   - Smooth transitions\n`;
  content += `   - Clear visual feedback\n\n`;
  
  // Bridge element placement rules
  content += `## Bridge Element Placement Rules\n`;
  content += `1. **lesson-opener** elements:\n`;
  content += `   - Should ONLY be in index.js files\n`;
  content += `   - Bridges from previous lesson in the learning path\n`;
  content += `   - Optional for lessons 2+ in a path\n`;
  content += `2. **chapter-bridge** elements:\n`;
  content += `   - Should ONLY be in chapter files (chapters 2 & 3)\n`;
  content += `   - Bridges from previous chapter within the same lesson\n`;
  content += `   - Required for chapters 2 and 3, not allowed in chapter 1\n\n`;
  
  // Notes
  content += `## Notes\n`;
  content += `- The narrative content is correct (generated from MD scripts)\n`;
  content += `- Focus only on structural formatting issues\n`;
  content += `- Replace redundant custom classes with standard ones from CourseStyles.css\n`;
  content += `- Keep lesson-specific visual styles that add unique value\n`;
  content += `- Test interactive features after making changes\n`;
  content += `- Ensure bridge elements follow placement rules above\n`;

  return content;
}

// Helper functions
function formatPathName(pathName) {
  return pathName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function extractLessonName(fileName) {
  const match = fileName.match(/pages\/([^\/]+)\/index\.js$/);
  return match ? formatLessonName(match[1]) : 'Unknown';
}

function formatLessonName(name) {
  return name.replace(/([A-Z])/g, ' $1').trim();
}

function extractChapterNumber(fileName) {
  const match = fileName.match(/chapter(\d)/);
  return match ? match[1] : '?';
}

function groupByLesson(chapters) {
  const groups = {};
  chapters.forEach(chapter => {
    const lesson = extractLessonName(chapter.fileName.replace(/chapter\d\/chapter\d\.js$/, 'index.js'));
    if (!groups[lesson]) {
      groups[lesson] = [];
    }
    groups[lesson].push(chapter);
  });
  return groups;
}

function detectCustomElements(pathData) {
  const customElements = [];
  
  // Check for non-standard class names in issues
  pathData.nonCompliantChapters.forEach(chapter => {
    chapter.issues.forEach(issue => {
      if (issue.includes('Missing required element: code-example')) {
        // Flag potential redundant custom code element names
        customElements.push('Check for redundant code block classes (e.g., `.magical-code`) that duplicate `.code-example` functionality');
      }
    });
  });
  
  return [...new Set(customElements)];
}

function findCommonIssues(chapters) {
  const issueCounts = {};
  
  chapters.forEach(chapter => {
    chapter.issues.forEach(issue => {
      const issueType = categorizeIssue(issue);
      issueCounts[issueType] = (issueCounts[issueType] || 0) + 1;
    });
  });
  
  return Object.entries(issueCounts)
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count);
}

function categorizeIssue(issue) {
  if (issue.includes('lesson insight')) return 'Incorrect lesson insight format';
  if (issue.includes('Reflect on the Story')) return 'Incorrect reflection section heading';
  if (issue.includes('lack <strong> tags')) return 'Missing strong tags for technical terms';
  if (issue.includes('Missing required element')) return `Missing ${issue.split(': ')[1]}`;
  return issue;
}

function findCssIssues(learningPath, cssReport) {
  const conflicts = [];
  const redundancies = [];
  
  if (cssReport.recommendations) {
    cssReport.recommendations.forEach(rec => {
      if (rec.file.includes(learningPath)) {
        if (rec.criticalConflicts.length > 0 || rec.otherConflicts.length > 0) {
          conflicts.push(rec);
        }
        if (rec.redundancies.length > 0) {
          redundancies.push(rec);
        }
      }
    });
  }
  
  return { conflicts, redundancies };
}

function generateTechnicalTermsList(learningPath) {
  const termsByPath = {
    'components-basics': '- Component names: `Component`, `Props`, `State`\n- JSX terms: `JSX`, `React elements`, `rendering`\n- Lifecycle methods and hooks\n',
    'state-management': '- State concepts: `state`, `setState`, `useState`, `useReducer`\n- Context API: `Context`, `Provider`, `Consumer`\n- State patterns and best practices\n',
    'forms-events': '- Event types: `onClick`, `onChange`, `onSubmit`\n- Form concepts: `controlled components`, `validation`\n- Input types and form elements\n',
    'props-data-flow': '- Props concepts: `props`, `prop drilling`, `prop types`\n- Data flow patterns: `one-way data flow`, `lifting state up`\n- Component communication\n',
    'hooks-in-action': '- Hook names: `useState`, `useEffect`, `useContext`, etc.\n- Hook concepts: `dependencies`, `cleanup`, `custom hooks`\n- Hook rules and patterns\n',
    'routing-navigation': '- Router concepts: `Route`, `Link`, `Navigate`\n- Navigation patterns: `nested routes`, `route guards`\n- URL parameters and query strings\n',
    'accessibility': '- ARIA attributes: `aria-label`, `aria-describedby`\n- Semantic HTML elements\n- Screen reader concepts\n',
    'performance-optimization': '- Performance concepts: `memoization`, `lazy loading`\n- Optimization techniques: `React.memo`, `useMemo`, `useCallback`\n- Bundle splitting and code splitting\n',
    'testing-debugging': '- Testing terms: `unit test`, `integration test`, `mock`\n- Debugging tools: `React DevTools`, `console methods`\n- Testing libraries and patterns\n',
    'react-ecosystem': '- Library names and concepts\n- Integration patterns\n- Third-party tools\n',
    'advanced-patterns': '- Pattern names: `HOC`, `render props`, `compound components`\n- Advanced React concepts\n- Component composition\n',
    'build-deploy': '- Build tools: `webpack`, `babel`, `build optimization`\n- Deployment concepts: `CI/CD`, `environment variables`\n- Production best practices\n',
    'server-data': '- Data fetching: `fetch`, `async/await`, `loading states`\n- API concepts: `REST`, `GraphQL`, `WebSockets`\n- Caching and data management\n',
    'react-native': '- Mobile concepts: `View`, `Text`, `StyleSheet`\n- Platform-specific code\n- Native modules and APIs\n',
    'typescript-react': '- TypeScript concepts: `types`, `interfaces`, `generics`\n- Type annotations for React\n- Type safety patterns\n'
  };
  
  return termsByPath[learningPath] || '- React concepts and technical terms relevant to the topic\n';
}

// Main execution
function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage: node generate-path-claude-md.js <learning-path-name>');
    console.log('       node generate-path-claude-md.js all');
    console.log('\nAvailable learning paths:');
    Object.keys(report.byLearningPath).forEach(path => {
      console.log(`  - ${path}`);
    });
    return;
  }
  
  if (args[0] === 'all') {
    // Generate for all paths
    Object.keys(report.byLearningPath).forEach(learningPath => {
      const content = generatePathClaudeMd(learningPath);
      const outputPath = path.join(__dirname, 'src', 'learning-paths', learningPath, 'CLAUDE.md');
      fs.writeFileSync(outputPath, content);
      console.log(`Generated ${outputPath}`);
    });
  } else {
    // Generate for specific path
    const learningPath = args[0];
    const content = generatePathClaudeMd(learningPath);
    
    if (content) {
      const outputPath = path.join(__dirname, 'src', 'learning-paths', learningPath, 'CLAUDE.md');
      fs.writeFileSync(outputPath, content);
      console.log(`Generated ${outputPath}`);
    }
  }
}

if (require.main === module) {
  main();
}

module.exports = { generatePathClaudeMd };