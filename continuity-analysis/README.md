# Story Continuity Analysis

This folder contains narrative source files, reference documents, and guidelines for maintaining story consistency across the React Learning Stories course.

## Course Structure

- **15 Learning Paths** (LP1-LP15)
- **4 Lessons per Learning Path** (60 total)
- **3 Chapters per Lesson** (180 total)
- **3 Story Groups per Chapter** (540 total)

Each chapter contains: Story Groups (main narrative), Bridges (chapter transitions), Reflection Questions, Journal Entries (Aria's Journal - Day 1 through Day 180), Character Introductions (chapter 1 of each lesson), and Lesson Endings (chapter 3 of each lesson).

## Narrative Source Files

### `narrative/narrative-master-PHASE4.md`
Master narrative for **LP1-LP7** (Components Basics through Performance Optimization). 84 chapters, Days 1-84. Fully expanded with 3 Story Groups per chapter at 15-25+ lines each.

### `narrative/narrative-master-PHASE5.md`
Master narrative for **LP8-LP15** (Testing & Debugging through Accessibility). 96 chapters, Days 85-180. Written fresh with consistent quality and no legacy issues.

### Key difference between files
- PHASE4 covers the "foundational" LPs written and revised over multiple editing passes
- PHASE5 covers the "advanced" LPs written from scratch with full planning

## Reference Documents

### `reference/story-bible.md`
Central source of truth for all characters, their roles, lesson assignments, and teaching specialties. Updated February 2026 to reflect all 15 LPs.

**Rules enforced:**
- Each master appears in exactly 1 lesson (3 chapters) and never returns in an active teaching role
- Aria and Binary are the only constants across all LPs
- Debuggora the Owl stays with Test Master Jasmine at LP8.1 only
- No LP1-7 masters return in LP8-15

### `reference/kingdom-geography.md`
Comprehensive geographic reference for all regions, districts, and locations in the React Kingdom. Updated February 2026 to include the Server Spires region (LP14 Full-Stack React, replacing the former Mobile Frontier).

## Guidelines

### `guides/CRITICAL-RULES.md`
Non-negotiable rules for narrative editing (character restrictions, structural requirements).

### `guides/editing-guidelines.md`
Quality standards for narrative content, including paragraph length, dialogue formatting, and concept integration.

### `guides/EXTRACTION-GUIDE.md`
How to use the extract/inject pipeline for moving narrative between markdown and code.

## LP-to-Codebase Directory Mapping

| LP | Topic | Codebase Directory |
|----|-------|--------------------|
| 1 | Components Basics | `components-basics` |
| 2 | State Management | `state-management` |
| 3 | Props & Data Flow | `props-data-flow` |
| 4 | Hooks in Action | `hooks-in-action` |
| 5 | Forms & Events | `forms-events` |
| 6 | Routing & Navigation | `routing-navigation` |
| 7 | Performance Optimization | `performance-optimization` |
| 8 | Testing & Debugging | `testing-debugging` |
| 9 | Advanced Patterns | `advanced-patterns` |
| 10 | React Ecosystem | `react-ecosystem` |
| 11 | Server & Data | `server-data` |
| 12 | TypeScript & React | `typescript-react` |
| 13 | Build & Deploy | `build-deploy` |
| 14 | Full-Stack React | `full-stack-react` |
| 15 | Accessibility | `accessibility` |

## Runtime JSON Architecture (LP1)

LP1 narrative has been decoupled from component code into runtime JSON files. Chapter components fetch narrative content at runtime from `public/narratives/` via the `useNarrative` hook, rather than having text hardcoded in JSX. See `public/narratives/README.md` and `scripts/README.md` for details.

This architecture will be extended to all LPs over time.
