# React Learning Stories - Chapter Format Standardization Guide

## Purpose
This guide helps maintain a uniform chapter format across all learning paths in the React Learning Stories project. The reference standard is based on the well-structured chapters in `/components-basics` and `/state-management` paths.

## File Structure Split

The lesson structure is split between two types of files:

### 1. index.js (Lesson Container)
Contains the wrapper structure with navigation elements:
```javascript
function LessonName() {
    return (
        <div className='lesson-container'>
            <div className='lesson-header'>
                <h1>[Lesson Title]</h1>
                <p className='lesson-subtitle'>
                    [Lesson subtitle description]
                </p>
            </div>
            
            <div className='chapter-navigation'>
                {/* Top navigation buttons */}
            </div>
            
            <Outlet context={{/* shared state */}} />
            
            <div className='chapter-navigation'>
                {/* Bottom navigation buttons */}
            </div>
            
            <LessonNavigation
                courseId='[course-id]'
                lessonId='[lesson-id]'
            />
        </div>
    );
}
```

### 2. chapterX.js (Chapter Content)
Contains only the chapter-specific content:
```javascript
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterX = () => {
    // State management for interactive elements
    const [stateVar, setStateVar] = useState(initialValue);
    const { /* shared state from context */ } = useOutletContext();
    
    return (
        <div className='chapter [specific-chapter-class]'>
            {/* 1. Chapter Title - REQUIRED */}
            <h2 className='chapter-title'>
                Chapter X: [Descriptive Title]
            </h2>
            
            {/* 5. Story Section - REQUIRED */}
            {/* Note: Can contain interactive elements mixed with narrative */}
            <div className='story-section'>
                <p className='story-paragraph'>
                    [Narrative with <strong>technical terms</strong> emphasized]
                </p>
                
                {/* Interactive elements can be interwoven here */}
                <div className='interactive-section'>
                    <h3 className='section-title'>
                        Interactive Exercise: [Exercise Name]
                    </h3>
                    <p className='instruction'>
                        <strong>👉 [Clear instruction for user action]</strong>
                    </p>
                    {/* Interactive elements */}
                </div>
                
                {/* More story paragraphs */}
                <p className='story-paragraph'>
                    [Continue narrative...]
                </p>
                
                {/* Visual illustrations can be placed within story flow */}
                <div className='[illustration-name]-illustration'>
                    {/* Visual elements specific to lesson theme */}
                </div>
                
                {/* Character introductions when needed */}
                <div className='character-intro'>
                    <h4>[Character Name / Journal Entry Title]</h4>
                    <p>[Character description or journal content]</p>
                </div>
            </div>
            
            {/* 6. Code Examples - REQUIRED (multiple allowed) */}
            {/* Note: Can be placed throughout the chapter as needed */}
            <div className='code-example'>
                <div className='scroll-header'>
                    <span>[Code Title/Purpose]</span>
                    <span className='discovered-by'>[Discovery Context]</span>
                </div>
                <pre>{`// Well-commented code example
// Showing progression of concept`}</pre>
            </div>
            
            {/* Additional story/interactive/code sections as needed... */}
            
            {/* 7. Chapter Ending - REQUIRED for chapter 3 only */}
            <div className='chapter-ending'>
                <p>[Setup for next lesson]</p>
                <p>[Final narrative closure]</p>
            </div>
            
            {/* 8. Lesson Insight - REQUIRED (always second to last) */}
            <div className='lesson-insight'>
                <h3>The [Something] Lesson:</h3>
                <p>[Key learning points explained clearly]</p>
            </div>
            
            {/* 9. Reflection Section - REQUIRED (always last before navigation) */}
            <div className='reflection-section'>
                <h3>Reflect on the Story</h3>
                <p>[Thought-provoking question 1]</p>
                <p>[Thought-provoking question 2]</p>
            </div>
            
            {/* 10. Chapter Navigation (Bottom) - REQUIRED */}
            <div className='chapter-navigation'>
                {/* Navigation buttons */}
            </div>
            
            {/* 11. Lesson Navigation - REQUIRED */}
            <div className='lesson-navigation'>
                {/* Lesson navigation elements */}
            </div>
        </div>
    );
};

export default ChapterX;
```

## Key Structural Notes

1. **Flexible Middle Section**: The story-section can contain narrative, interactive elements, code examples, and visual illustrations in any order that best serves the lesson's educational goals.

2. **Fixed Elements**:
   - Lesson title/subtitle and top chapter navigation always come first
   - Chapter ending (for chapter 3 only) comes before lesson insight
   - Lesson insight (with "The [Something] Lesson:" format) always comes second to last
   - Reflection section (with "Reflect on the Story" heading) always comes last before navigation
   - Bottom chapter navigation and lesson navigation always close the chapter

3. **Code Examples**: Multiple code examples can appear throughout the chapter, mixed with story and interactive content as needed.

4. **Chapter Ending**: Only appears in Chapter 3, positioned directly above the lesson insight to provide narrative closure before the learning summary.

## Standardization Checklist

### For Each Chapter File:
- [ ] Starts with lesson-title and lesson-subtitle (in index.js)
- [ ] Has chapter-navigation at top and bottom (in index.js)
- [ ] Includes chapter-title after top navigation
- [ ] Story section contains narrative with possible interactive elements
- [ ] Strong tags on technical terms in narrative
- [ ] Code examples have consistent scroll-header structure
- [ ] Chapter ending appears before lesson insight (chapter 3 only)
- [ ] Lesson insight uses "The [Something] Lesson:" format
- [ ] Lesson insight is second to last element
- [ ] Reflection section uses "Reflect on the Story" heading
- [ ] Reflection section is last element before navigation
- [ ] Ends with chapter-navigation and lesson-navigation (in index.js)

### CSS Classes to Use:
- `.lesson-container` - Main container
- `.lesson-title` - Main lesson heading (h1)
- `.lesson-subtitle` - Lesson description
- `.chapter-navigation` - Navigation buttons (top and bottom)
- `.chapter-title` - Chapter heading (h2)
- `.story-section` - Narrative and interactive container
- `.story-paragraph` - Individual narrative blocks
- `.character-intro` - Character/journal boxes
- `.interactive-section` - Exercise container
- `.section-title` - Section headings
- `.instruction` - Exercise instructions (with 👉)
- `.code-example` - Code block container
- `.scroll-header` - Code block header
- `.discovered-by` - Code discovery context
- `.lesson-insight` - Key learning box (always "The [X] Lesson:")
- `.reflection-section` - Reflection questions (always "Reflect on the Story")
- `.lesson-navigation` - Lesson navigation at bottom

## Common Issues to Fix

### 1. Missing or Inconsistent Structure
- Sections out of order
- Missing required sections
- Inconsistent className usage

### 2. Technical Term Formatting
- Missing strong tags on technical terms in narrative
- Check that React concepts, component names, and technical vocabulary are wrapped in `<strong>` tags

### 3. Interactive Elements
- Missing or unclear instructions
- No visual feedback for interactions
- Broken state management

### 4. Code Examples
- Missing contextual comments
- No scroll-header with discovery context
- Examples don't match narrative

## Reformatting Process

1. **Analyze Current Structure**
   - Compare against template above
   - Note missing or out-of-order sections
   - Check className consistency

2. **Preserve Unique Content**
   - Keep lesson-specific interactions
   - Maintain unique visual elements
   - Preserve custom state logic

3. **Apply Standard Format**
   - Reorder sections to match template
   - Add missing required sections
   - Update classNames to standard

4. **Validate Changes**
   - Test all interactive elements
   - Ensure narrative flow is maintained
   - Verify styling consistency

## Example Reformatting Commands

```bash
# Check current structure of a chapter
grep -n "className=" src/learning-paths/[path]/[lesson]/chapter1/chapter1.js

# Find missing standard sections
grep -L "chapter-title\|story-section\|interactive-section" src/learning-paths/*/pages/*/chapter*/chapter*.js

# Verify reflection sections exist
grep -l "reflection-section" src/learning-paths/*/pages/*/chapter*/chapter*.js
```

## CSS Guidelines

### Base Styles (CourseStyles.css)
The following selectors are defined in CourseStyles.css and should NOT be overridden in lesson-specific CSS files:
- `.lesson-container` - Main wrapper
- `.lesson-header`, `.lesson-title`, `.lesson-subtitle` - Lesson headers
- `.chapter-navigation`, `.chapter-nav-button` - Navigation elements
- `.chapter`, `.chapter-title` - Chapter structure
- `.story-section`, `.story-paragraph` - Narrative elements
- `.interactive-section`, `.section-title` - Interactive containers
- `.code-example`, `.scroll-header` - Code display
- `.lesson-insight`, `.reflection-section` - Learning elements
- `.lesson-navigation` - Bottom navigation

### Lesson-Specific CSS
Lesson CSS files should only contain:
1. **Unique visual elements** specific to that lesson's theme
   - Custom illustrations (e.g., `.kingdom-illustration`, `.forge-animation`)
   - Theme-specific decorations
   - Unique interactive component styles

2. **Extended styles** that add to (not override) base styles
   - Additional classes for lesson-specific features
   - Animation and transition effects
   - Custom component variations

### CSS Analysis Tools
Two scripts are available to check CSS consistency:

1. **analyze-css-conflicts.js** (requires postcss dependencies)
   ```bash
   npm install postcss postcss-selector-parser
   node analyze-css-conflicts.js
   ```

2. **analyze-css-simple.js** (no dependencies)
   ```bash
   node analyze-css-simple.js
   ```

Both tools will:
- Identify conflicts between CourseStyles.css and lesson CSS
- Find redundant declarations that can be removed
- Generate recommendations for cleanup

## Notes for Claude

When reformatting chapters:
1. Check for strong tags on technical terms in narrative paragraphs
2. Focus on structural consistency, not narrative content changes
3. Maintain the lesson's educational goals
4. Test interactive features after changes
5. Check for CSS conflicts and remove redundant styles

Remember: The goal is structural uniformity while preserving each lesson's unique teaching approach.