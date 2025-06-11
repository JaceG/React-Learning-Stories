#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Common problematic color combinations to check for
const contrastIssues = {
  darkOnDark: [
    { text: '#444', bg: '#2d3436', issue: 'Dark gray text on dark background' },
    { text: '#666', bg: '#34495e', issue: 'Gray text on dark gray background' },
    { text: '#2c3e50', bg: '#34495e', issue: 'Dark blue on dark gray' },
    { text: '#333', bg: '#555', issue: 'Very dark text on dark background' },
  ],
  lightOnLight: [
    { text: '#ddd', bg: '#f8f9fa', issue: 'Light gray text on light background' },
    { text: '#ecf0f1', bg: '#fff', issue: 'Very light gray on white' },
    { text: '#f5f5f5', bg: '#fafafa', issue: 'Off-white on light gray' },
    { text: '#e8e8e8', bg: '#f0f0f0', issue: 'Light gray on light gray' },
  ],
  lowContrast: [
    { text: '#95a5a6', bg: '#bdc3c7', issue: 'Medium gray on light gray' },
    { text: '#7f8c8d', bg: '#95a5a6', issue: 'Gray on gray' },
    { text: '#e67e22', bg: '#f39c12', issue: 'Orange on yellow-orange' },
    { text: '#3498db', bg: '#5dade2', issue: 'Blue on light blue' },
  ]
};

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

// Check CSS file for potential contrast issues
function checkContrastInCSS(filePath) {
  const css = fs.readFileSync(filePath, 'utf8');
  const fileName = path.relative(process.cwd(), filePath);
  const issues = [];
  
  // Check for color declarations
  const colorRegex = /color\s*:\s*([^;]+);/g;
  const bgRegex = /background(?:-color)?\s*:\s*([^;]+);/g;
  
  const colors = [];
  const backgrounds = [];
  
  let match;
  while ((match = colorRegex.exec(css)) !== null) {
    colors.push({ value: match[1].trim(), line: getLineNumber(css, match.index) });
  }
  
  while ((match = bgRegex.exec(css)) !== null) {
    backgrounds.push({ value: match[1].trim(), line: getLineNumber(css, match.index) });
  }
  
  // Simple heuristic checks
  colors.forEach(color => {
    // Check for specific problematic colors
    if (color.value.includes('#444') || color.value.includes('#333') || color.value.includes('#666')) {
      issues.push({
        type: 'dark-text',
        line: color.line,
        value: color.value,
        suggestion: 'Ensure this dark text is not on a dark background'
      });
    }
    
    if (color.value.includes('#ddd') || color.value.includes('#eee') || color.value.includes('#f5f5f5')) {
      issues.push({
        type: 'light-text',
        line: color.line,
        value: color.value,
        suggestion: 'Ensure this light text is not on a light background'
      });
    }
  });
  
  return { fileName, issues };
}

// Check for incomplete interactive CSS
function checkInteractiveCSS(filePath) {
  const css = fs.readFileSync(filePath, 'utf8');
  const fileName = path.relative(process.cwd(), filePath);
  const issues = [];
  
  // Find interactive selectors
  const interactiveSelectors = [];
  const selectorRegex = /([^{]+)\s*{/g;
  
  let match;
  while ((match = selectorRegex.exec(css)) !== null) {
    const selector = match[1].trim();
    if (selector.includes('button') || selector.includes('input') || 
        selector.includes('interactive') || selector.includes('click')) {
      interactiveSelectors.push(selector);
    }
  }
  
  // Check if interactive elements have hover/active states
  interactiveSelectors.forEach(selector => {
    const baseSelector = selector.replace(/:hover|:active|:focus|:disabled/g, '');
    
    if (!selector.includes(':')) {
      // This is a base selector, check if it has states
      const hasHover = css.includes(`${baseSelector}:hover`);
      const hasActive = css.includes(`${baseSelector}:active`);
      const hasFocus = css.includes(`${baseSelector}:focus`);
      
      if (!hasHover && (selector.includes('button') || selector.includes('clickable'))) {
        issues.push({
          selector: baseSelector,
          missing: 'hover state',
          suggestion: 'Add :hover state for better interactivity'
        });
      }
      
      if (!hasActive && selector.includes('button')) {
        issues.push({
          selector: baseSelector,
          missing: 'active state',
          suggestion: 'Add :active state for click feedback'
        });
      }
    }
  });
  
  // Check for transitions
  const hasTransitions = css.includes('transition:') || css.includes('transition ');
  if (interactiveSelectors.length > 0 && !hasTransitions) {
    issues.push({
      type: 'general',
      missing: 'transitions',
      suggestion: 'Consider adding CSS transitions for smooth interactions'
    });
  }
  
  return { fileName, issues };
}

// Helper to get line number
function getLineNumber(text, index) {
  const lines = text.substring(0, index).split('\n');
  return lines.length;
}

// Main function
function main() {
  const learningPathsDir = path.join(__dirname, 'src', 'learning-paths');
  const cssFiles = findCSSFiles(learningPathsDir);
  
  console.log('=== CSS Contrast & Interactive State Analysis ===\n');
  console.log(`Analyzing ${cssFiles.length} CSS files...\n`);
  
  const contrastResults = [];
  const interactiveResults = [];
  
  cssFiles.forEach(file => {
    const contrastCheck = checkContrastInCSS(file);
    const interactiveCheck = checkInteractiveCSS(file);
    
    if (contrastCheck.issues.length > 0) {
      contrastResults.push(contrastCheck);
    }
    
    if (interactiveCheck.issues.length > 0) {
      interactiveResults.push(interactiveCheck);
    }
  });
  
  // Report contrast issues
  if (contrastResults.length > 0) {
    console.log('## Potential Contrast Issues\n');
    contrastResults.forEach(result => {
      console.log(`${result.fileName}:`);
      result.issues.forEach(issue => {
        console.log(`  Line ${issue.line}: ${issue.value}`);
        console.log(`  → ${issue.suggestion}\n`);
      });
    });
  }
  
  // Report interactive CSS issues
  if (interactiveResults.length > 0) {
    console.log('\n## Incomplete Interactive CSS\n');
    interactiveResults.forEach(result => {
      console.log(`${result.fileName}:`);
      result.issues.forEach(issue => {
        if (issue.selector) {
          console.log(`  ${issue.selector}: Missing ${issue.missing}`);
        } else {
          console.log(`  Missing ${issue.missing}`);
        }
        console.log(`  → ${issue.suggestion}\n`);
      });
    });
  }
  
  if (contrastResults.length === 0 && interactiveResults.length === 0) {
    console.log('No obvious contrast or interactive CSS issues detected.');
    console.log('Note: This is a basic check. Manual review is still recommended.');
  }
  
  // Summary
  console.log('\n=== Summary ===');
  console.log(`Files with potential contrast issues: ${contrastResults.length}`);
  console.log(`Files with incomplete interactive CSS: ${interactiveResults.length}`);
  console.log('\nNote: This tool provides basic checks. Always manually verify:');
  console.log('- Actual color combinations in context');
  console.log('- WCAG contrast ratios (4.5:1 for normal text, 3:1 for large text)');
  console.log('- Interactive states work properly with the JavaScript');
}

if (require.main === module) {
  main();
}

module.exports = { checkContrastInCSS, checkInteractiveCSS };