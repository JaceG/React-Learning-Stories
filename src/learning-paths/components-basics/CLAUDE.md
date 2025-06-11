# Components Basics Learning Path - Formatting Issues

## Overview
This document lists all structural formatting issues found in the Components Basics learning path.

## Potential CSS Redundancies
- Check for redundant code block classes (e.g., `.magical-code`) that duplicate `.code-example` functionality

## Chapter Issues by Lesson

### Component Kingdom

#### Chapter 3
- 3 story paragraphs lack <strong> tags for technical terms

### Component Lifecycle

#### Chapter 1
- Missing required element: code-example
- Chapter 1 should not have a chapter-bridge element
- Lesson insight heading not in correct format: "The [Something] Lesson:"
- 3 story paragraphs lack <strong> tags for technical terms

#### Chapter 2
- Lesson insight heading not in correct format: "The [Something] Lesson:"
- 3 story paragraphs lack <strong> tags for technical terms

#### Chapter 3
- Lesson insight heading not in correct format: "The [Something] Lesson:"

### Jsx Magic

#### Chapter 1
- Chapter 1 should not have a chapter-bridge element
- Lesson insight heading not in correct format: "The [Something] Lesson:"
- 3 story paragraphs lack <strong> tags for technical terms

#### Chapter 2
- Lesson insight heading not in correct format: "The [Something] Lesson:"
- 3 story paragraphs lack <strong> tags for technical terms

#### Chapter 3
- Missing required element: code-example
- Lesson insight heading not in correct format: "The [Something] Lesson:"
- 3 story paragraphs lack <strong> tags for technical terms

### Props Messengers

#### Chapter 1
- lesson-opener should only be in index.js files, not in chapter files

#### Chapter 2
- Lesson insight heading not in correct format: "The [Something] Lesson:"
- 3 story paragraphs lack <strong> tags for technical terms

#### Chapter 3
- 3 story paragraphs lack <strong> tags for technical terms

## CSS Issues

### Conflicts with CourseStyles.css

**JsxMagic.css**

**PropsMessengers.css**
- Remove overrides for `..reflection-section`

### Redundant CSS (can be removed)

**JsxMagic.css**
- Remove duplicate properties in `..reset-button`

**PropsMessengers.css**
- Remove duplicate properties in `..reset-button`
- Remove duplicate properties in `..reset-button:hover`
- Remove duplicate properties in `..reflection-section`
- Remove duplicate properties in `..reflection-section h3`

**ComponentLifecycle.css**
- Remove duplicate properties in `..reset-button`
- Remove duplicate properties in `..reset-button:hover`

## Common Issues Summary

- Missing strong tags for technical terms: 8 occurrences
- Lesson insight heading not in correct format: "The [Something] Lesson:": 7 occurrences
- Missing code-example: 2 occurrences
- Chapter 1 should not have a chapter-bridge element: 2 occurrences
- lesson-opener should only be in index.js files, not in chapter files: 1 occurrences

## Technical Terms to Emphasize
Terms that should be wrapped in `<strong>` tags based on the learning path topic:
- Component names: `Component`, `Props`, `State`
- JSX terms: `JSX`, `React elements`, `rendering`
- Lifecycle methods and hooks

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
