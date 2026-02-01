# Story Continuity Analysis

This folder contains tools and documents for analyzing and maintaining narrative continuity across the React Learning Stories course.

## Purpose

Ensure that the main story narrative flows logically, maintains character and location consistency, and properly teaches React concepts through storytelling across all 5 learning paths and 20 lessons.

## Workflow Overview

### Phase 1: Technical Review (Current)
- **Goal**: Review Story Groups for technical accuracy and concept progression
- **Scope**: Read-only analysis of narrative content
- **Output**: Technical review notes and story bible

### Phase 2-5: Future Passes
- Detail extraction
- Story modifications
- Secondary element alignment (Bridges, Questions, Journals, Endings)
- Final verification

## Files in This Folder

### Scripts
- **`extract-story-groups.js`** - Extracts only Story Group narrative content from narrative-master.md

### Tracking Documents
- **`story-groups-only.md`** - Auto-generated, Story Groups only (no Bridges, Questions, etc.)
- **`story-bible.md`** - Cumulative registry of characters, locations, plot, and concepts
- **`kingdom-geography.md`** - World map tracking quarters, districts, locations, and travel routes
- **`technical-review-notes.md`** - Technical accuracy and concept progression notes per Learning Path
- **`continuity-issues.md`** - Running log of narrative continuity problems
- **`progress-tracker.md`** - Current status, what's done, next steps
- **`workflow-notes.md`** - Internal notes and process reminders
- **`narrative-master-EDITED.md`** - Working copy with tracked changes (Phase 3)

## How to Use

### Extract Story Groups
```bash
node continuity-analysis/extract-story-groups.js
```

This creates `story-groups-only.md` with just the narrative content, making it easier to review the core story without distraction.

## Learning Path Structure

The course contains:
- **5 Learning Paths** (Components Basics, Hooks in Action, State Management, Performance Optimization, Advanced Patterns)
- **4 Lessons per Learning Path** (20 total)
- **3 Chapters per Lesson** (60 total)

Each chapter contains:
- **Story Groups** (main narrative) ← Our current focus
- Bridges (chapter transitions)
- Questions (reflection prompts)
- Journals (character reflections)
- Endings (lesson conclusions)

## Granularity Strategy

We process **one Learning Path at a time** (4 lessons = 12 chapters) to:
- Maintain manageable context size
- Preserve natural continuity boundaries
- Enable progress tracking across context resets

## Progress Tracking

See `progress-tracker.md` for current status.
