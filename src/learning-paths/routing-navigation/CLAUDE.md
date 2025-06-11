# Routing Navigation Learning Path - Formatting Issues

## Overview
This document lists all structural formatting issues found in the Routing Navigation learning path.

## Potential CSS Redundancies
- Check for redundant code block classes (e.g., `.magical-code`) that duplicate `.code-example` functionality

## Chapter Issues by Lesson

### Guardian Gates

#### Chapter 1
- Chapter 1 should not have a chapter-bridge element
- 11 story paragraphs lack <strong> tags for technical terms

#### Chapter 2
- Lesson insight heading not in correct format: "The [Something] Lesson:"
- 11 story paragraphs lack <strong> tags for technical terms

#### Chapter 3
- 15 story paragraphs lack <strong> tags for technical terms

### Navigation Compass

#### Chapter 1
- Chapter 1 should not have a chapter-bridge element
- 10 story paragraphs lack <strong> tags for technical terms

#### Chapter 2
- Missing required element: code-example
- 6 story paragraphs lack <strong> tags for technical terms

#### Chapter 3
- Missing required element: code-example
- Reflection section heading should be "Reflect on the Story"
- 9 story paragraphs lack <strong> tags for technical terms

### Portal Passages

#### Chapter 1
- Missing required element: lesson-insight
- Reflection section heading should be "Reflect on the Story"

#### Chapter 2
- Missing required element: lesson-insight
- Chapter 2 should have a chapter-bridge element
- Reflection section heading should be "Reflect on the Story"

#### Chapter 3
- Missing required element: lesson-insight
- Chapter 3 should have a chapter-bridge element
- Reflection section heading should be "Reflect on the Story"

### Waypoint Wizardry

#### Chapter 1
- Chapter 1 should not have a chapter-bridge element
- 13 story paragraphs lack <strong> tags for technical terms

#### Chapter 2
- Missing required element: lesson-insight
- Chapter 2 should have a chapter-bridge element
- Reflection section heading should be "Reflect on the Story"

#### Chapter 3
- Missing required element: lesson-insight
- Missing required element: reflection-section
- Chapter 3 should have a chapter-bridge element

## Common Issues Summary

- Missing strong tags for technical terms: 7 occurrences
- Incorrect reflection section heading: 5 occurrences
- Missing lesson-insight: 5 occurrences
- Chapter 1 should not have a chapter-bridge element: 3 occurrences
- Missing code-example: 2 occurrences
- Chapter 2 should have a chapter-bridge element: 2 occurrences
- Chapter 3 should have a chapter-bridge element: 2 occurrences
- Lesson insight heading not in correct format: "The [Something] Lesson:": 1 occurrences
- Missing reflection-section: 1 occurrences

## Technical Terms to Emphasize
Terms that should be wrapped in `<strong>` tags based on the learning path topic:
- Router concepts: `Route`, `Link`, `Navigate`
- Navigation patterns: `nested routes`, `route guards`
- URL parameters and query strings

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
