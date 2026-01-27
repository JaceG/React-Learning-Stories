# Narrative Content Scripts

These scripts allow you to extract all narrative content from the React Learning Stories codebase into a single JSON file, edit it, and inject the changes back into the component files.

## Why Use These Scripts?

- **Centralized Editing**: Edit all narrative content in one place instead of jumping between files
- **Continuity Checking**: Easily review story flow across all learning paths
- **Bulk Updates**: Make consistent changes across multiple lessons
- **Content Review**: Share narrative with editors/reviewers without exposing code

## Workflow

### 1. Extract Narrative

Extract all narrative content from component files into JSON and Markdown:

```bash
npm run extract-narrative
npm run export-markdown
```

This creates:
- `scripts/narrative-master.json` - Structured JSON data
- `scripts/narrative-master.md` - Beautiful, readable markdown

The JSON contains:
- Lesson openers
- Chapter bridges
- Story sections (narrative paragraphs)
- Lesson insights
- Reflection questions
- Journal entries
- Chapter endings
- Character introductions

**Output**: `scripts/narrative-master.json` (3800+ lines, ~180 chapters)

### 2. Edit the Content

**Option A: Edit JSON (for injection)**
Open `scripts/narrative-master.json` and edit any narrative content you want to change.

**Option B: Read Markdown (for review)**
Open `scripts/narrative-master.md` for a beautifully formatted, easy-to-read version. Great for:
- Reviewing story continuity
- Sharing with editors/reviewers
- Checking character consistency
- Reading the full narrative flow

**Note:** Only JSON edits can be injected back. Markdown is read-only for review purposes.

**Structure**:
```json
{
  "learning-path-name": {
    "LessonName": {
      "opener": "Lesson opening narrative...",
      "chapter1": {
        "bridge": "Chapter transition...",
        "storySections": [
          ["paragraph 1", "paragraph 2"],
          ["paragraph 3"]
        ],
        "lessonInsight": {
          "title": "The Lesson:",
          "content": "What was learned..."
        },
        "reflectionQuestions": ["Question 1?", "Question 2?"],
        "journalEntry": {
          "title": "Aria's Journal - Day X",
          "content": "Journal entry..."
        },
        "chapterEnding": ["Ending paragraph 1", "Ending paragraph 2"],
        "characterIntros": [
          {
            "name": "Character Name",
            "description": "Character description..."
          }
        ]
      }
    }
  }
}
```

**Tips**:
- Preserve JSX tags like `<strong>` and `<em>` in the text
- Keep array structures intact (storySections, reflectionQuestions, etc.)
- Use `{' '}` for spaces when needed in JSX

### 3. Inject Changes

Inject your edited content back into the component files:

```bash
npm run inject-narrative
```

This updates all component files with your changes.

**Output**: Updates 200+ component files

### 4. Review & Test

- Check `git diff` to see what changed
- Test the app to ensure everything renders correctly
- Commit your changes

## What Gets Extracted/Injected?

### ✅ Extracted Content
- `LessonHeader` → `opener` prop
- `ChapterIntro` → `bridge` prop
- `StorySection` → `paragraphs` array
- `ChapterSummary` → `lessonInsight`, `reflectionQuestions`, `journalEntry`, `chapterEnding`, `characterIntros`

### ❌ NOT Extracted
- Interactive code examples
- Component logic/state
- CSS/styling
- InstructionBox content (these are instructions, not narrative)
- Interactive elements (buttons, forms, etc.)

## Example Use Cases

### Fix a Typo Across Multiple Chapters
1. Extract → Search JSON for the typo → Fix all instances → Inject

### Check Character Consistency
1. Extract → Export markdown → Search for character name → Review all mentions

### Review Story Arc
1. Extract → Export markdown → Read the full narrative → Check continuity

### Share with Editor
1. Extract → Export markdown → Share the `.md` file for review

### Update Reflection Questions
1. Extract → Find all `reflectionQuestions` in JSON → Improve wording → Inject

## Safety Notes

- ⚠️ Always commit your work before running inject
- ⚠️ Review `git diff` after injection to verify changes
- ⚠️ Test the app after injection
- ⚠️ The JSON file is gitignored - don't commit it

## Technical Details

- **Extract**: Parses React component files using regex to find narrative props
- **Inject**: Replaces prop values in component files while preserving structure
- **Format**: Maintains JSX formatting, indentation, and code structure
- **Safety**: Only modifies specific narrative props, leaves other code untouched
- **Order**: Uses `story-order.json` to maintain the correct story sequence (matching your app's navigation)

### Story Order Configuration

The `story-order.json` file defines the correct order of learning paths and lessons, matching how they appear in your app's navigation. This ensures the extracted narrative follows the actual story progression, not alphabetical order.

If you add/reorder learning paths or lessons in the app, update `story-order.json` accordingly.

## Troubleshooting

**"narrative-master.json not found"**
- Run `npm run extract-narrative` first

**Changes didn't apply**
- Check JSON syntax is valid
- Ensure you didn't break array/object structure
- Review console output for errors

**App broke after injection**
- Check for syntax errors in the JSON (missing quotes, commas)
- Verify JSX tags are properly formatted
- Run `git diff` to see what changed
- Revert with `git checkout .` if needed

## Future Enhancements

Potential improvements:
- Markdown output format (easier to read/edit)
- Validation before injection
- Backup/restore functionality
- Diff preview before injection
- Extract only specific learning paths
