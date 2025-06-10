#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const postcss = require('postcss');

// CSS parser helper to extract rules
class CSSAnalyzer {
  constructor() {
    this.baseStyles = new Map();
    this.lessonStyles = new Map();
    this.conflicts = [];
    this.redundancies = [];
  }

  // Parse CSS file and extract rules
  async parseCSS(filePath, isBase = false) {
    const css = fs.readFileSync(filePath, 'utf8');
    const result = await postcss().process(css, { from: filePath });
    
    const styles = new Map();
    
    result.root.walkRules(rule => {
      const selectors = rule.selector.split(',').map(s => s.trim());
      
      selectors.forEach(selector => {
        if (!styles.has(selector)) {
          styles.set(selector, {
            rules: [],
            file: filePath,
            line: rule.source.start.line
          });
        }
        
        rule.walkDecls(decl => {
          styles.get(selector).rules.push({
            property: decl.prop,
            value: decl.value,
            important: decl.important,
            line: decl.source.start.line
          });
        });
      });
    });
    
    if (isBase) {
      this.baseStyles = styles;
    } else {
      this.lessonStyles.set(filePath, styles);
    }
    
    return styles;
  }

  // Check for conflicts between lesson CSS and base CSS
  findConflicts() {
    this.lessonStyles.forEach((lessonStyle, lessonFile) => {
      lessonStyle.forEach((styleInfo, selector) => {
        if (this.baseStyles.has(selector)) {
          const baseInfo = this.baseStyles.get(selector);
          const conflicts = this.compareRules(
            baseInfo.rules,
            styleInfo.rules
          );
          
          if (conflicts.length > 0) {
            this.conflicts.push({
              selector,
              baseFile: baseInfo.file,
              lessonFile: styleInfo.file,
              conflicts
            });
          }
        }
      });
    });
  }

  // Compare rule sets for conflicts
  compareRules(baseRules, lessonRules) {
    const conflicts = [];
    const baseProps = new Map(baseRules.map(r => [r.property, r]));
    
    lessonRules.forEach(lessonRule => {
      if (baseProps.has(lessonRule.property)) {
        const baseRule = baseProps.get(lessonRule.property);
        
        // Check if values are different (conflict)
        if (baseRule.value !== lessonRule.value) {
          conflicts.push({
            property: lessonRule.property,
            baseValue: baseRule.value,
            lessonValue: lessonRule.value,
            baseLine: baseRule.line,
            lessonLine: lessonRule.line
          });
        }
      }
    });
    
    return conflicts;
  }

  // Find redundant styles (exact duplicates)
  findRedundancies() {
    this.lessonStyles.forEach((lessonStyle, lessonFile) => {
      lessonStyle.forEach((styleInfo, selector) => {
        if (this.baseStyles.has(selector)) {
          const baseInfo = this.baseStyles.get(selector);
          const redundant = this.findDuplicateRules(
            baseInfo.rules,
            styleInfo.rules
          );
          
          if (redundant.length > 0) {
            this.redundancies.push({
              selector,
              baseFile: baseInfo.file,
              lessonFile,
              redundantRules: redundant
            });
          }
        }
      });
    });
  }

  // Find duplicate rules
  findDuplicateRules(baseRules, lessonRules) {
    const redundant = [];
    const baseMap = new Map(baseRules.map(r => [`${r.property}:${r.value}`, r]));
    
    lessonRules.forEach(lessonRule => {
      const key = `${lessonRule.property}:${lessonRule.value}`;
      if (baseMap.has(key)) {
        redundant.push({
          property: lessonRule.property,
          value: lessonRule.value,
          line: lessonRule.line
        });
      }
    });
    
    return redundant;
  }

  // Generate report
  generateReport() {
    const report = {
      summary: {
        totalLessonFiles: this.lessonStyles.size,
        totalConflicts: this.conflicts.length,
        totalRedundancies: this.redundancies.length,
        conflictingSelectors: [...new Set(this.conflicts.map(c => c.selector))].length,
        redundantSelectors: [...new Set(this.redundancies.map(r => r.selector))].length
      },
      conflicts: this.conflicts,
      redundancies: this.redundancies,
      recommendations: this.generateRecommendations()
    };
    
    return report;
  }

  // Generate recommendations
  generateRecommendations() {
    const recommendations = [];
    
    // Group conflicts by selector for better recommendations
    const conflictsBySelector = new Map();
    this.conflicts.forEach(conflict => {
      if (!conflictsBySelector.has(conflict.selector)) {
        conflictsBySelector.set(conflict.selector, []);
      }
      conflictsBySelector.set(conflict.selector, conflict);
    });
    
    // High-priority selectors that should be consistent
    const criticalSelectors = [
      '.lesson-container',
      '.lesson-title',
      '.lesson-subtitle',
      '.chapter-navigation',
      '.chapter-title',
      '.story-section',
      '.code-example',
      '.lesson-insight',
      '.reflection-section'
    ];
    
    conflictsBySelector.forEach((conflict, selector) => {
      if (criticalSelectors.includes(selector)) {
        recommendations.push({
          type: 'critical',
          selector,
          message: `Critical selector "${selector}" has conflicts. This should use CourseStyles.css values consistently.`,
          action: 'Remove conflicting styles from lesson CSS files'
        });
      }
    });
    
    // Check for redundancies in critical selectors
    this.redundancies.forEach(redundancy => {
      if (criticalSelectors.includes(redundancy.selector)) {
        recommendations.push({
          type: 'redundancy',
          selector: redundancy.selector,
          message: `Redundant styles for "${redundancy.selector}" can be removed from lesson CSS`,
          action: 'Delete duplicate rules from lesson-specific CSS'
        });
      }
    });
    
    return recommendations;
  }
}

// Main analysis function
async function analyzeCSSConflicts() {
  const analyzer = new CSSAnalyzer();
  const baseCSS = path.join(__dirname, 'src', 'learning-paths', 'CourseStyles.css');
  
  console.log('=== CSS Conflict & Redundancy Analysis ===\n');
  console.log('Parsing base CourseStyles.css...');
  
  try {
    await analyzer.parseCSS(baseCSS, true);
  } catch (error) {
    console.error('Error parsing CourseStyles.css:', error.message);
    console.error('\nPlease install required dependencies:');
    console.error('npm install postcss postcss-selector-parser');
    process.exit(1);
  }
  
  // Find all lesson CSS files
  const learningPathsDir = path.join(__dirname, 'src', 'learning-paths');
  const cssFiles = findCSSFiles(learningPathsDir);
  
  console.log(`Found ${cssFiles.length} lesson CSS files to analyze\n`);
  
  // Parse each lesson CSS file
  for (const cssFile of cssFiles) {
    if (!cssFile.includes('CourseStyles.css')) {
      console.log(`Analyzing: ${path.relative(__dirname, cssFile)}`);
      await analyzer.parseCSS(cssFile);
    }
  }
  
  // Run analysis
  console.log('\nChecking for conflicts...');
  analyzer.findConflicts();
  
  console.log('Checking for redundancies...');
  analyzer.findRedundancies();
  
  // Generate and display report
  const report = analyzer.generateReport();
  
  console.log('\n=== Analysis Summary ===');
  console.log(`Total lesson CSS files analyzed: ${report.summary.totalLessonFiles}`);
  console.log(`Total conflicts found: ${report.summary.totalConflicts}`);
  console.log(`Total redundancies found: ${report.summary.totalRedundancies}`);
  console.log(`Conflicting selectors: ${report.summary.conflictingSelectors}`);
  console.log(`Redundant selectors: ${report.summary.redundantSelectors}`);
  
  // Display conflicts
  if (report.conflicts.length > 0) {
    console.log('\n=== Conflicts ===');
    report.conflicts.forEach(conflict => {
      console.log(`\nSelector: ${conflict.selector}`);
      console.log(`  Base: ${path.relative(__dirname, conflict.baseFile)}`);
      console.log(`  Lesson: ${path.relative(__dirname, conflict.lessonFile)}`);
      conflict.conflicts.forEach(c => {
        console.log(`  - ${c.property}: "${c.baseValue}" (base) vs "${c.lessonValue}" (lesson)`);
      });
    });
  }
  
  // Display redundancies
  if (report.redundancies.length > 0) {
    console.log('\n=== Redundancies ===');
    report.redundancies.forEach(redundancy => {
      console.log(`\nSelector: ${redundancy.selector}`);
      console.log(`  Lesson: ${path.relative(__dirname, redundancy.lessonFile)}`);
      console.log(`  Redundant rules:`);
      redundancy.redundantRules.forEach(r => {
        console.log(`  - ${r.property}: ${r.value} (line ${r.line})`);
      });
    });
  }
  
  // Display recommendations
  if (report.recommendations.length > 0) {
    console.log('\n=== Recommendations ===');
    report.recommendations.forEach((rec, i) => {
      console.log(`\n${i + 1}. [${rec.type.toUpperCase()}] ${rec.selector}`);
      console.log(`   ${rec.message}`);
      console.log(`   Action: ${rec.action}`);
    });
  }
  
  // Save detailed report
  const reportPath = path.join(__dirname, 'css-analysis-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\nDetailed report saved to: ${reportPath}`);
}

// Find all CSS files
function findCSSFiles(dir) {
  const cssFiles = [];
  
  function traverse(currentDir) {
    const files = fs.readdirSync(currentDir);
    
    files.forEach(file => {
      const filePath = path.join(currentDir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
        traverse(filePath);
      } else if (file.endsWith('.css')) {
        cssFiles.push(filePath);
      }
    });
  }
  
  traverse(dir);
  return cssFiles;
}

// Run if called directly
if (require.main === module) {
  analyzeCSSConflicts().catch(error => {
    console.error('Error:', error);
    process.exit(1);
  });
}

module.exports = { CSSAnalyzer };