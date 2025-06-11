# React Native Learning Path - Formatting Issues

## Overview
This document lists all structural formatting issues found in the React Native learning path.

## Index File Issues

### App Distribution
- Missing required element: lesson-title

### Mobile Foundations
- Missing required element: lesson-title

### Native Powers
- Missing required element: lesson-title

### Navigation Trails
- Missing required element: lesson-title

## Chapter Issues by Lesson

### App Distribution

#### Chapter 1
- Missing required element: chapter
- 3 story paragraphs lack <strong> tags for technical terms

#### Chapter 2
- Missing required element: chapter
- Chapter 2 should have a chapter-bridge element
- 3 story paragraphs lack <strong> tags for technical terms

#### Chapter 3
- Missing required element: chapter
- Chapter 3 should have a chapter-bridge element
- Lesson insight heading not in correct format: "The [Something] Lesson:"
- 5 story paragraphs lack <strong> tags for technical terms

### Mobile Foundations

#### Chapter 1
- 4 story paragraphs lack <strong> tags for technical terms

#### Chapter 2
- Chapter 2 should have a chapter-bridge element
- Lesson insight heading not in correct format: "The [Something] Lesson:"
- 5 story paragraphs lack <strong> tags for technical terms

#### Chapter 3
- Chapter 3 should have a chapter-bridge element
- Lesson insight heading not in correct format: "The [Something] Lesson:"
- 4 story paragraphs lack <strong> tags for technical terms

### Native Powers

#### Chapter 1
- Missing required element: chapter
- 3 story paragraphs lack <strong> tags for technical terms

#### Chapter 2
- Missing required element: chapter
- Chapter 2 should have a chapter-bridge element
- 5 story paragraphs lack <strong> tags for technical terms

#### Chapter 3
- Missing required element: chapter
- Chapter 3 should have a chapter-bridge element
- 5 story paragraphs lack <strong> tags for technical terms

### Navigation Trails

#### Chapter 1
- 3 story paragraphs lack <strong> tags for technical terms

#### Chapter 2
- Chapter 2 should have a chapter-bridge element
- Lesson insight heading not in correct format: "The [Something] Lesson:"
- 3 story paragraphs lack <strong> tags for technical terms

#### Chapter 3
- Chapter 3 should have a chapter-bridge element
- Lesson insight heading not in correct format: "The [Something] Lesson:"
- 5 story paragraphs lack <strong> tags for technical terms

## Common Issues Summary

- Missing strong tags for technical terms: 12 occurrences
- Missing chapter: 6 occurrences
- Lesson insight heading not in correct format: "The [Something] Lesson:": 5 occurrences
- Chapter 2 should have a chapter-bridge element: 4 occurrences
- Chapter 3 should have a chapter-bridge element: 4 occurrences

## Technical Terms to Emphasize
Terms that should be wrapped in `<strong>` tags based on the learning path topic:
- Mobile concepts: `View`, `Text`, `StyleSheet`
- Platform-specific code
- Native modules and APIs

## CSS Standardization Rules
1. **Use CourseStyles.css classes first** - Check if a standard class exists before creating custom ones
2. **Replace redundant custom classes** - If `.magical-code` does the same as `.code-example`, use the standard
3. **Keep truly unique styles** - Preserve lesson-specific visual elements that don't duplicate base functionality
4. **Extend rather than override** - Use modifier classes instead of overriding base styles

## Visual Quality Checks
1. **Text Contrast** - Verify all text has sufficient contrast against backgrounds
   - Dark text should be on light backgrounds
   - Light text should be on dark backgrounds
   - Check interactive elements in all states (hover, active, disabled)
2. **Interactive CSS Completeness** - Ensure all interactive features have:
   - Hover states
   - Active/clicked states
   - Smooth transitions
   - Clear visual feedback

## Bridge Element Placement Rules
1. **lesson-opener** elements:
   - Should ONLY be in index.js files
   - Bridges from previous lesson in the learning path
   - Optional for lessons 2+ in a path
2. **chapter-bridge** elements:
   - Should ONLY be in chapter files (chapters 2 & 3)
   - Bridges from previous chapter within the same lesson
   - Required for chapters 2 and 3, not allowed in chapter 1

## Notes
- The narrative content is correct (generated from MD scripts)
- Focus only on structural formatting issues
- Replace redundant custom classes with standard ones from CourseStyles.css
- Keep lesson-specific visual styles that add unique value
- Test interactive features after making changes
- Ensure bridge elements follow placement rules above
