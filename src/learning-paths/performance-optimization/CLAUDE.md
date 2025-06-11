# Performance Optimization Learning Path - Formatting Issues

## Overview
This document lists all structural formatting issues found in the Performance Optimization learning path.

## Chapter Issues by Lesson

### Lazy Library

#### Chapter 2
- Chapter 2 should have a chapter-bridge element
- Lesson insight heading not in correct format: "The [Something] Lesson:"

#### Chapter 3
- Chapter 3 should have a chapter-bridge element

### Memory Monastery

#### Chapter 2
- Chapter 2 should have a chapter-bridge element

#### Chapter 3
- Chapter 3 should have a chapter-bridge element

### Speed Sanctum

#### Chapter 2
- Chapter 2 should have a chapter-bridge element

#### Chapter 3
- Chapter 3 should have a chapter-bridge element

### Virtualization Vault

#### Chapter 2
- Chapter 2 should have a chapter-bridge element

#### Chapter 3
- Chapter 3 should have a chapter-bridge element

## CSS Issues

### Conflicts with CourseStyles.css

**SpeedSanctum 2.css**
- Remove overrides for `..story-paragraph`
- Remove overrides for `..chapter-navigation`
- Remove overrides for `..code-example`
- Remove overrides for `..chapter-title`

### Redundant CSS (can be removed)

**SpeedSanctum 2.css**
- Remove duplicate properties in `..code-example`
- Remove duplicate properties in `..code-example pre`

## Common Issues Summary

- Chapter 2 should have a chapter-bridge element: 4 occurrences
- Chapter 3 should have a chapter-bridge element: 4 occurrences
- Lesson insight heading not in correct format: "The [Something] Lesson:": 1 occurrences

## Technical Terms to Emphasize
Terms that should be wrapped in `<strong>` tags based on the learning path topic:
- Performance concepts: `memoization`, `lazy loading`
- Optimization techniques: `React.memo`, `useMemo`, `useCallback`
- Bundle splitting and code splitting

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
