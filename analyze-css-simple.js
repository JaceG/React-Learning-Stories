#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Simple CSS parser for basic analysis
class SimpleCSSAnalyzer {
  constructor() {
    this.baseSelectors = new Map();
    this.lessonSelectors = new Map();
    this.conflicts = [];
    this.redundancies = [];
  }

  // Extract selectors and their properties from CSS
  parseCSS(filePath, isBase = false) {
    const css = fs.readFileSync(filePath, 'utf8');
    const fileName = path.relative(process.cwd(), filePath);
    
    // Remove comments
    const cleanCSS = css.replace(/\/\*[\s\S]*?\*\//g, '');
    
    // Match CSS rules (simplified - won't catch all edge cases)
    const ruleRegex = /([^{]+)\s*{\s*([^}]+)\s*}/g;
    const selectors = new Map();
    
    let match;
    while ((match = ruleRegex.exec(cleanCSS)) !== null) {
      const selector = match[1].trim();
      const properties = match[2].trim();
      
      // Skip @media, @keyframes, etc.
      if (selector.startsWith('@')) continue;
      
      // Parse properties
      const props = new Map();
      const propRegex = /([^:]+):\s*([^;]+);?/g;
      let propMatch;
      
      while ((propMatch = propRegex.exec(properties)) !== null) {
        const prop = propMatch[1].trim();
        const value = propMatch[2].trim();
        props.set(prop, value);
      }
      
      if (props.size > 0) {
        // Handle multiple selectors separated by commas
        selector.split(',').forEach(sel => {
          sel = sel.trim();
          if (!selectors.has(sel)) {
            selectors.set(sel, {
              properties: new Map(),
              file: fileName
            });
          }
          
          // Merge properties
          props.forEach((value, prop) => {
            selectors.get(sel).properties.set(prop, value);
          });
        });
      }
    }
    
    if (isBase) {
      this.baseSelectors = selectors;
    } else {
      this.lessonSelectors.set(fileName, selectors);
    }
    
    return selectors;
  }

  // Find conflicts and redundancies
  analyze() {
    this.lessonSelectors.forEach((lessonSels, lessonFile) => {
      lessonSels.forEach((lessonData, selector) => {
        if (this.baseSelectors.has(selector)) {
          const baseData = this.baseSelectors.get(selector);
          const conflictProps = [];
          const redundantProps = [];
          
          lessonData.properties.forEach((lessonValue, prop) => {
            if (baseData.properties.has(prop)) {
              const baseValue = baseData.properties.get(prop);
              
              if (baseValue === lessonValue) {
                redundantProps.push({ prop, value: lessonValue });
              } else {
                conflictProps.push({
                  prop,
                  baseValue,
                  lessonValue
                });
              }
            }
          });
          
          if (conflictProps.length > 0) {
            this.conflicts.push({
              selector,
              lessonFile,
              conflicts: conflictProps
            });
          }
          
          if (redundantProps.length > 0) {
            this.redundancies.push({
              selector,
              lessonFile,
              redundant: redundantProps
            });
          }
        }
      });
    });
  }

  // Generate recommendations for CLAUDE.md
  generateRecommendations() {
    const recommendations = [];
    
    // Critical selectors that should be consistent
    const criticalSelectors = [
      '.lesson-container',
      '.lesson-header',
      '.lesson-title',
      '.lesson-subtitle',
      '.chapter-navigation',
      '.chapter-title',
      '.story-section',
      '.story-paragraph',
      '.interactive-section',
      '.section-title',
      '.code-example',
      '.lesson-insight',
      '.reflection-section',
      '.lesson-navigation'
    ];
    
    // Group issues by file
    const issuesByFile = new Map();
    
    this.conflicts.forEach(conflict => {
      if (!issuesByFile.has(conflict.lessonFile)) {
        issuesByFile.set(conflict.lessonFile, {
          conflicts: [],
          redundancies: []
        });
      }
      issuesByFile.get(conflict.lessonFile).conflicts.push(conflict);
    });
    
    this.redundancies.forEach(redundancy => {
      if (!issuesByFile.has(redundancy.lessonFile)) {
        issuesByFile.set(redundancy.lessonFile, {
          conflicts: [],
          redundancies: []
        });
      }
      issuesByFile.get(redundancy.lessonFile).redundancies.push(redundancy);
    });
    
    // Generate file-specific recommendations
    issuesByFile.forEach((issues, file) => {
      const rec = {
        file,
        criticalConflicts: [],
        otherConflicts: [],
        redundancies: []
      };
      
      issues.conflicts.forEach(conflict => {
        if (criticalSelectors.includes(conflict.selector)) {
          rec.criticalConflicts.push(conflict);
        } else {
          rec.otherConflicts.push(conflict);
        }
      });
      
      issues.redundancies.forEach(redundancy => {
        rec.redundancies.push(redundancy);
      });
      
      recommendations.push(rec);
    });
    
    return recommendations;
  }
}

// Main function
async function analyzeCSSSimple() {
  const analyzer = new SimpleCSSAnalyzer();
  const baseCSS = path.join(__dirname, 'src', 'learning-paths', 'CourseStyles.css');
  
  console.log('=== CSS Conflict & Redundancy Analysis (Simple) ===\n');
  
  // Parse base CSS
  console.log('Parsing CourseStyles.css...');
  analyzer.parseCSS(baseCSS, true);
  console.log(`Found ${analyzer.baseSelectors.size} selectors in base CSS\n`);
  
  // Find all CSS files
  const learningPathsDir = path.join(__dirname, 'src', 'learning-paths');
  const cssFiles = findCSSFiles(learningPathsDir);
  const lessonCSSFiles = cssFiles.filter(f => !f.includes('CourseStyles.css'));
  
  console.log(`Found ${lessonCSSFiles.length} lesson CSS files to analyze\n`);
  
  // Parse lesson CSS files
  lessonCSSFiles.forEach(cssFile => {
    analyzer.parseCSS(cssFile);
  });
  
  // Analyze
  analyzer.analyze();
  
  // Display results
  console.log('=== Summary ===');
  console.log(`Total conflicts: ${analyzer.conflicts.length}`);
  console.log(`Total redundancies: ${analyzer.redundancies.length}\n`);
  
  // Show conflicts grouped by selector
  if (analyzer.conflicts.length > 0) {
    console.log('=== Conflicts (Properties with Different Values) ===\n');
    
    const conflictsBySelector = new Map();
    analyzer.conflicts.forEach(c => {
      if (!conflictsBySelector.has(c.selector)) {
        conflictsBySelector.set(c.selector, []);
      }
      conflictsBySelector.get(c.selector).push(c);
    });
    
    conflictsBySelector.forEach((conflicts, selector) => {
      console.log(`Selector: ${selector}`);
      conflicts.forEach(c => {
        console.log(`  In ${c.lessonFile}:`);
        c.conflicts.forEach(conf => {
          console.log(`    ${conf.prop}: "${conf.baseValue}" (base) → "${conf.lessonValue}" (override)`);
        });
      });
      console.log('');
    });
  }
  
  // Show redundancies
  if (analyzer.redundancies.length > 0) {
    console.log('=== Redundancies (Duplicate Declarations) ===\n');
    
    const redundanciesByFile = new Map();
    analyzer.redundancies.forEach(r => {
      if (!redundanciesByFile.has(r.lessonFile)) {
        redundanciesByFile.set(r.lessonFile, []);
      }
      redundanciesByFile.get(r.lessonFile).push(r);
    });
    
    redundanciesByFile.forEach((redundancies, file) => {
      console.log(`File: ${file}`);
      redundancies.forEach(r => {
        console.log(`  ${r.selector}:`);
        r.redundant.forEach(red => {
          console.log(`    ${red.prop}: ${red.value} (can be removed)`);
        });
      });
      console.log('');
    });
  }
  
  // Generate recommendations
  const recommendations = analyzer.generateRecommendations();
  
  if (recommendations.length > 0) {
    console.log('=== Recommendations for CLAUDE.md ===\n');
    
    recommendations.forEach(rec => {
      if (rec.criticalConflicts.length > 0 || rec.redundancies.length > 0) {
        console.log(`File: ${rec.file}`);
        
        if (rec.criticalConflicts.length > 0) {
          console.log('  Critical conflicts (remove these overrides):');
          rec.criticalConflicts.forEach(c => {
            console.log(`    - ${c.selector}: Remove custom styles`);
          });
        }
        
        if (rec.redundancies.length > 0) {
          console.log('  Redundant declarations (safe to remove):');
          const uniqueSelectors = [...new Set(rec.redundancies.map(r => r.selector))];
          uniqueSelectors.forEach(sel => {
            console.log(`    - ${sel}: Remove duplicate properties`);
          });
        }
        
        console.log('');
      }
    });
  }
  
  // Save report
  const report = {
    summary: {
      totalConflicts: analyzer.conflicts.length,
      totalRedundancies: analyzer.redundancies.length,
      filesAnalyzed: lessonCSSFiles.length
    },
    conflicts: analyzer.conflicts,
    redundancies: analyzer.redundancies,
    recommendations
  };
  
  const reportPath = path.join(__dirname, 'css-analysis-simple-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`Detailed report saved to: ${reportPath}`);
}

// Find CSS files
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

// Run
if (require.main === module) {
  analyzeCSSSimple();
}

module.exports = { SimpleCSSAnalyzer };