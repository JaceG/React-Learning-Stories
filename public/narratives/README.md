# Runtime Narrative JSON Files

This directory contains per-chapter JSON files that are fetched at runtime by chapter components via the `useNarrative` hook. This decouples narrative text from component code, allowing story content to be updated without modifying JSX files.

## Directory Structure

```
public/narratives/
  {lpFolder}/
    {lessonFolder}/
      lesson.json        # Lesson opener text
      chapter1.json      # Chapter 1 narrative content
      chapter2.json      # Chapter 2 narrative content
      chapter3.json      # Chapter 3 narrative content
```

Currently populated: LP1 (`components-basics/`)

## JSON Schema

### lesson.json

```json
{
  "opener": "Lesson opening narrative text..."
}
```

### chapter{n}.json

```json
{
  "title": "Chapter Title",
  "bridge": "Transition text from previous chapter (null for chapter 1)",
  "storySections": [
    ["SG1 paragraph 1", "SG1 paragraph 2", "..."],
    ["SG2 paragraph 1", "SG2 paragraph 2", "..."],
    ["SG3 paragraph 1", "SG3 paragraph 2", "..."]
  ],
  "characterIntros": [
    { "name": "Character Name", "description": "Description..." }
  ],
  "lessonInsight": {
    "title": "Master's Wisdom:",
    "content": "Teaching summary..."
  },
  "reflectionQuestions": ["Question 1?", "Question 2?"],
  "journalEntry": {
    "title": "Aria's Journal - Day N",
    "day": 1,
    "content": "Journal entry text..."
  },
  "lessonEnding": ["Ending paragraph 1", "Ending paragraph 2"]
}
```

### Key details

- `storySections` always has exactly 3 inner arrays (one per Story Group)
- Each inner array contains multiple paragraph strings
- Paragraphs may contain HTML tags (`<strong>`, `<em>`) for formatting
- `characterIntros` only appears in chapter 1 of each lesson
- `lessonEnding` only appears in chapter 3 of each lesson
- `bridge` is null for chapter 1 (no previous chapter to transition from)

## How these files are generated

Run the conversion script from the project root:

```bash
node scripts/convert-phase4-to-json.js [lpNumber]
```

This parses `continuity-analysis/narrative/narrative-master-PHASE4.md` and outputs JSON files here. The `lpNumber` argument defaults to 1.

## How chapter components use these files

Chapter components call the `useNarrative` hook:

```jsx
import useNarrative from '../../../../../hooks/useNarrative';

const { narrative, loading } = useNarrative('components-basics', 'ComponentKingdom', 1);
```

The hook fetches the JSON at runtime, caches the result, and returns the parsed data. The component renders `<StorySection paragraphs={narrative.storySections[0]} />` etc.

The `StorySection` component detects HTML strings and renders them via `dangerouslySetInnerHTML` (safe because content is authored internally, not user-input).
