# Markdown to HTML Converter

A flexible Node.js script that converts any Markdown file to a beautifully styled HTML document.

## Features

- 🎨 Beautiful, responsive styling optimized for reading
- 📱 Mobile-friendly layout
- 🎯 Automatic title extraction from first H1 heading
- 🔄 Auto-generates output filename if not specified
- 📂 Works with files in any directory
- ✨ Supports custom diff markers (🔴/🟢) and edit notes
- 🔗 Preserves links, formatting, and structure

## Usage

### Basic Usage

```bash
# Convert default file (narrative-master-EDITED.md)
node convert-to-html.js

# Convert any markdown file (auto-generates output name)
node convert-to-html.js my-document.md

# Specify both input and output
node convert-to-html.js my-document.md my-output.html

# Convert file from another directory
node convert-to-html.js ../docs/README.md
```

### Get Help

```bash
node convert-to-html.js --help
```

## Examples

```bash
# Convert narrative-master-EDITED.md → narrative-master-EDITED.html
node convert-to-html.js

# Convert README.md → README.html
node convert-to-html.js README.md

# Convert story.md to custom output name
node convert-to-html.js story.md my-beautiful-story.html

# Convert from parent directory
node convert-to-html.js ../project-overview.md
```

## Output

The script generates a self-contained HTML file with:
- Embedded CSS styling (no external dependencies)
- Responsive design (works on phones, tablets, desktops)
- Clean typography optimized for long-form reading
- Support for diff markers (🔴 deletions, 🟢 additions)
- Highlighted edit notes (💡 EDIT NOTE:)
- Proper heading hierarchy (H1-H4)
- Styled blockquotes, lists, and emphasis

## Title Extraction

The document title is determined by:
1. First H1 heading in the markdown (e.g., `# My Title` → "My Title")
2. Input filename if no H1 found (e.g., `my-story.md` → "My Story")

## Styling Features

The converted HTML includes:
- **Max width**: 1000px for comfortable reading
- **Line height**: 1.8 for readability
- **Font**: System font stack (optimal across all devices)
- **Colors**: Professional blue/gray palette
- **Spacing**: Generous margins and padding
- **Diff markers**: Red for deletions, green for additions
- **Edit notes**: Blue highlighted boxes
- **Links**: Blue underlined, hover effects

## Requirements

- Node.js (any recent version)
- No external dependencies (uses only built-in `fs` and `path` modules)

## Error Handling

The script will:
- Show an error if the input file doesn't exist
- Display usage information with `--help`
- Auto-create output file (overwrites if exists)
- Provide clear feedback during conversion

## Technical Details

- Converts markdown headers (# ## ### ####)
- Preserves bold (**text**) and italic (*text*)
- Converts links [text](url)
- Handles paragraphs with proper spacing
- Supports blockquotes (> text)
- Converts bullet lists (-, *)
- Preserves horizontal rules (---)
- Special handling for diff markers (🔴 ~~ / 🟢 **)
- Highlights edit notes (💡 **EDIT NOTE:**)

## Notes

- The script does NOT support:
  - Inline code or code blocks (these are converted to plain text)
  - Tables
  - Images (paths are preserved but not rendered)
  - Nested lists beyond basic level
  
- For the React Learning Stories project, code snippets have been intentionally removed and converted to descriptive prose for better narrative flow.
