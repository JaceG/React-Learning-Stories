# Phase 6 Narrative Remediation Plan

*Compiled from three independent reviews:*
- *Claude 4.6 Opus copyediting pass (21 items)*
- *Claude 4.6 Opus consistency/continuity pass (20 items)*
- *GPT-5.2 copyediting pass (30+ items)*

*Source of truth: The narrative (`narrative-master-PHASE6.md`) is canonical. The `story-bible.md` and `kingdom-geography.md` are out of date and should be updated to match the narrative after all phases are complete.*

*Rule: Characters referenced as prior learning ("as Chronos taught me") are fine. Characters physically reappearing in scenes where they don't belong is not.*

---

## Overview

The remediation is organized into 6 phases, from most mechanical/safe to most judgment-intensive. Each phase can be executed as a single direction file. Phases 1-3 are low-risk find-and-fix operations. Phases 4-5 require careful reading and rewriting. Phase 6 is polish.

| Phase | Scope | Risk | Estimated Changes |
|-------|-------|------|-------------------|
| 1 | Critical mechanical fixes | Very low | ~25 point fixes |
| 2 | Naming & terminology consistency | Low | ~20 search-and-replace |
| 3 | Dialogue & structural formatting | Low-Medium | ~30 formatting fixes |
| 4 | Content coherence & factual fixes | Medium | ~15 paragraph-level edits |
| 5 | Narrative & learning progression | Medium-High | ~10 section-level rewrites |
| 6 | Global polish pass | Low | Broad but shallow |

---

## Phase 1: Critical Mechanical Fixes

*Safe, unambiguous, one-line fixes. Can be executed with high confidence.*

### 1.1 Pronoun Fixes

| Line | Character | Current | Fix |
|------|-----------|---------|-----|
| 2418 | Master Cargo | "she says" | → "he says" |
| ~9009 | Stream Sage WebSocket (LP11.2 Lesson Ending) | switches to "his form" | → match "she/her" used throughout lesson |
| ~10524 | Warden Garrison (LP13.4 Lesson Ending) | "He pointed" | → match "she/her" used throughout lesson |

### 1.2 Spelling Fixes

| Line | Current | Fix |
|------|---------|-----|
| 3651 | "Dan Abramakov" | → "Dan Abramov" |
| 2510 | "timber" (wood) | → "timbre" (sound quality) |
| 814 | "component DidUpdate" | → "componentDidUpdate" |

### 1.3 Punctuation & Spacing Fixes

| Line | Issue | Fix |
|------|-------|-----|
| 238 | Stray space before closing quote: `components. " You've` | Remove space, join or split dialogue properly |
| 2982 | Same pattern: `State Sorcerers. " Today` | Remove space, join or split properly |
| 1371 | Extra space before comma: `Kingdom , in` | → `Kingdom, in` |
| 1120 | Missing space after period: `architecture."She` | → `architecture." She` |
| 7697 | Trailing space inside closing quote: `'how it looks.' "` | → `'how it looks.'"` |

### 1.4 Stray HTML & Artifact Removal

| Line | Issue | Fix |
|------|-------|-----|
| 311 | `<strong>...</strong>` | → `**...**` (Markdown bold) |
| 4121 | Bare `</tr>` tag on its own line | Delete line entirely |
| 3403-3406 | Raw JS code block (`// Solution 2...const filter = useMemo(...)`) | Replace with prose: "She used `useMemo` to create a stable filter object with `category` and `minPrice` as dependencies." |

### 1.5 Empty / Incomplete Content

| Line | Issue | Fix |
|------|-------|-----|
| 1132-1133 | Two empty reflection question bullets (just `-`) | Delete the two empty bullets, keeping the two populated questions |
| 1087 | Stray blank line | Delete |
| 2085 | Extra blank line in lesson opener | Delete |

### 1.6 Missing Blank Lines

| Line | Issue | Fix |
|------|-------|-----|
| 6514-6515 | No blank line between character block and Reflection Questions | Add blank line |
| 5698-5699 | Same issue | Add blank line |

---

## Phase 2: Naming & Terminology Consistency

*Search-and-replace operations within the narrative. Each item has a clear "pick one" resolution.*

### 2.1 Props Messenger Guild: Singular vs. Plural

The narrative uses both "Props Messengers Guild" (lines 125, 130, 138, 214, 224) and "Props Messenger Guild" (lines 232, 234, 281, and most other occurrences).

**Decision needed:** Pick one canonical name. "Props Messenger Guild" (singular) is more common in the narrative.

**Action:** Search for "Props Messengers Guild" → replace all with "Props Messenger Guild"

### 2.2 Location Name in LP1.4 Lesson Opener

Line 697 says "Lifecycle Observatory" but every other reference says "Lifecycle Sanctum."

**Action:** Replace "Lifecycle Observatory" → "Lifecycle Sanctum"

### 2.3 Section Headers vs. Narrative Names

Several section headers don't match the names used in the narrative body:

| Section Header | Narrative Uses | Action |
|----------------|---------------|--------|
| `## 7.4 SpeedSanctum` | "Velocity Crucible" throughout | Rename header to `## 7.4 VelocityCrucible` |
| `## 8.1 TestingTower` | "Testing Gauntlet" throughout | Rename header to `## 8.1 TestingGauntlet` |

*Note: If these slugs are used by code/tooling, check dependencies before renaming.*

### 2.4 Em Dash Standardization

The document mixes:
- True em dash: `—` (predominant in LP8-LP15)
- Spaced hyphen: ` - ` (common in LP1-LP7)
- Double hyphen: `--` (rare)

**Decision needed:** Pick one convention. Recommend `—` (em dash, no spaces) for narrative prose, ` - ` for Markdown list items.

**Action:** Global pass to standardize. This is a large number of changes so should be done carefully.

### 2.5 LP8.1 Opener: "Lag Monster" vs. "Performance Plague"

Line 6640 says "defeating the Lag Monster in the Velocity Crucible." The LP7.4 narrative uses both "Lag Monster" and "Performance Plague" / "Performance anomalies." The story-bible uses "Lag Monster."

**Decision needed:** Which term does the narrative actually use in LP7.4? Check and align the LP8.1 opener to match.

---

## Phase 3: Dialogue & Structural Formatting

*Requires reading surrounding context but follows clear rules.*

### 3.1 Unquoted Dialogue → Add Quotation Marks

Four character introductions in LP5-LP6 use bold text without quotation marks for spoken dialogue:

| Line | Character | Fix |
|------|-----------|-----|
| 4000 | Conductor Eventus | Wrap spoken text in quotes |
| 4251 | Master Alchemist Formeus | Wrap spoken text in quotes |
| 4748 | Portal Keeper Sage | Wrap spoken text in quotes |
| 4991 | Captain Marina | Wrap spoken text in quotes |

**Pattern to follow:** Match LP1-LP4 convention where dialogue uses quotes and character names are bold within narration, e.g.: `"Welcome!" **Hermes** called out.`

### 3.2 Unclosed Quotation (LP5.2 Ch1 Story Group 2)

Around line 4285, Formeus begins a long speech with an opening quotation mark that is never properly closed. The text transitions from dialogue to narration without a closing quote.

**Action:** Read the full passage (lines 4285-4302) and insert closing quotation marks at the appropriate boundaries between Formeus's speech and narrative description.

### 3.3 Heading Level Consistency: Lesson Openers

LP1-LP9 use `### 📖 Lesson Opener` (H3 with emoji). LP10-LP15 use `**Lesson Opener:**` (bold label).

**Decision needed:** Pick one format.

**Action:** Standardize all to the chosen format. If `### 📖 Lesson Opener` is the standard (used in the majority of the doc), update LP10-LP15 to match.

### 3.4 Wisdom Section Misattribution (LP12.3)

LP12.3 GenericForge Chapters 1 and 2 are taught by Archivist Lexicon, but the Wisdom sections are labeled with Guardia's name. Guardia doesn't appear until Chapter 3.

**Action:** Rename the Ch1 and Ch2 Wisdom headers to use Lexicon's name.

### 3.5 Inline Code Formatting (Global)

Many code/tech tokens appear as plain text throughout. GPT-5.2 recommends backticks for readability.

**Action:** Global pass to wrap the following in backticks where they appear in wisdom blocks, reflection questions, and journal entries:
- Hook names: `useState`, `useEffect`, `useRef`, `useMemo`, `useCallback`, `useReducer`, `useContext`
- APIs: `React.memo`, `React.lazy`, `createPortal`, `createContext`, `React.Children`
- JSX attributes: `className`, `htmlFor`, `onClick`, `onChange`, `tabIndex`
- Patterns: `props.children`, `event.target`, `event.preventDefault()`

*Note: Within narrative prose/dialogue, plain text is acceptable for readability. Backticks are most valuable in wisdom blocks and journal entries where a learner would reference them.*

### 3.6 Journal Entry with Literal HTML (LP15, Line 11287)

Aria's journal entry contains raw HTML/JSX: `Labels: <label htmlFor="email"> + <input id="email">`

**Action:** Wrap in backticks: `` Labels: `<label htmlFor="email">` + `<input id="email">` ``

---

## Phase 4: Content Coherence Fixes

*Requires reading the surrounding paragraphs and making judgment calls about what to keep, remove, or rewrite.*

### 4.1 Duplicate Passages

| Location | Issue | Action |
|----------|-------|--------|
| LP2.4 lines 1768 + 1782 | Grand Reducer's farewell delivered twice | Delete the first occurrence (line 1768), keep the more complete version at 1782 |
| LP10.3 ~lines 8498-8500 | "Perfect scaling" said twice consecutively | Delete the duplicate sentence |

### 4.2 LP5.1 Lines 4120-4123: Overlapping/Contradictory Text

This passage has three problems in close proximity:
1. A stray `</tr>` tag (line 4121) — fixed in Phase 1
2. The DataTable challenge describes buttons as "edit" and "delete" in one paragraph, then "complete" and "delete" in the next
3. The two paragraphs appear to be duplicate drafts of the same challenge

**Action:** Merge into one clean paragraph. Pick one button pair ("edit" and "delete" matches the challenge description better). Remove the duplicate.

### 4.3 LP5.2 Line ~5844: "Southern Quarter's Context Hall"

The recap references "the Southern Quarter's Context Hall." Context was taught in the Central Nexus / Grand Context Hall (LP2.3). There is no Southern Quarter.

**Action:** Change "the Southern Quarter's Context Hall" → "the Grand Context Hall in the Central Nexus"

### 4.4 LP11.2 Ending: Overstated Accomplishment

The lesson ending claims Aria built a "collaborative editor with multiple cursors" when the chapter content describes a collaborative task board.

**Action:** Change to match what was actually described in the chapter.

### 4.5 LP13.2: Vitest vs. Jest Inconsistency

Chapter 1 uses Vitest as the test runner, but the Lesson Ending switches to Jest.

**Action:** Pick one (Vitest is more modern and aligns with the Vite-focused LP13.1). Standardize throughout LP13.2.

### 4.6 "LP" Meta-References in Narrative

Six instances in LP10-LP15 where characters or narration reference learning paths by number ("LP8," "LP9," etc.) instead of in-world names.

**Action:** Replace each with the in-world location or teacher name. E.g., "LP8" → "the Testing Gauntlet" or "Test Master Jasmine's training."

### 4.7 LP6.3 Forward Reference to LP8

Around line 5164, there's a reference to "Testing Gauntlet patterns" while Aria hasn't visited the Testing Gauntlet yet (that's LP8).

**Action:** Remove or reword to reference something Aria has already learned. Could reference "Validation Fortress patterns" (LP5.3) instead if contextually appropriate.

---

## Phase 5: Narrative & Learning Progression Improvements

*These require careful rewriting of paragraph-level or section-level content. Higher judgment required.*

### 5.1 LP1.4 → LP2 Bridge: Class Lifecycle → Hooks

LP1.4 teaches class lifecycle methods deeply (3 chapters). LP2.2 introduces hooks as the modern replacement. There is no bridging language telling the reader that class lifecycle methods are the "traditional approach" being superseded.

**Action options (pick one):**
- **Option A:** Add 2-3 sentences to LP1.4's Lesson Ending where Chronos hints that "newer patterns have emerged" or "the functional approach simplifies these rituals"
- **Option B:** Add framing to LP2.2's opener where the Effect Sage explicitly says "Chronos taught you the classical lifecycle methods — I will show you how one hook replaces them all"
- **Option C:** Both — gentle foreshadowing in LP1.4 and explicit bridge in LP2.2

### 5.2 LP3 Overlap Acknowledgment

LP3 re-teaches concepts from LP1-LP2 (unidirectional flow, callbacks, lifting state, Context) often without acknowledging the reader already knows them.

**Action:** Add "remember when..." framing at key points:
- LP3.3 Ch1: When Callback introduces callbacks, have Aria say something like "Hermes showed me this pattern at the Props Messenger Guild! But he said there was more depth to discover..."
- LP3.4 Ch1: When Flux introduces one-way flow, have Aria recognize it: "This is the same law Hermes taught me on the Grand Thoroughfare — but seeing it as rivers makes the pattern even clearer."
- LP3.4 Ch3: Already done well (line 2899 references Contextia) — use this as the model for the above

### 5.3 LP5 Sanctuary Back-Reference Reduction

LP5 mentions the "Advanced Hooks Sanctuary" or "Sanctuary training" excessively. Every character introduction defers to Aria's LP4 credentials.

**Action:** Reduce by ~50%. Specific cuts:
- Remove "Academy graduate Aria!" greeting at line 4000 — have Eventus welcome her normally
- Reduce Binary's "Sanctuary patterns detected!" interjections (keep 1-2, remove the rest)
- Let LP5 teachers speak with their own authority rather than constantly praising Aria's Sanctuary training
- Keep 2-3 meaningful cross-references per lesson (especially where the connection is pedagogically valuable), remove purely decorative ones

### 5.4 Code-Heavy Sections: Prose-ify

Several passages read more like implementation walkthroughs than narrative prose. The user has specified: only prose, minimal code references for necessary syntax.

**Priority sections to slim down:**

| Location | Issue | Action |
|----------|-------|--------|
| LP5.1 Ch2 SG3 (~line 4126) | Keyboard navigation challenge reads like an implementation spec (specific handler names, dependency lists) | Compress to concept-level: what pattern is, why it matters, what behavior it produces |
| LP6.4 Ch1 (~line 5674) | Modal/accessibility paragraphs list full ARIA attributes and focus-trapping mechanics | Reduce to "must-haves" with 1-2 essential syntax references |
| LP12 (~lines 9404-9666) | TypeScript sections include explicit type signatures and type-level examples | Keep at "why/what it prevents" level, reduce concrete syntax |

---

## Phase 6: Global Polish Pass

*Non-blocking improvements. Can be done last or skipped if time-constrained.*

### 6.1 Repeated Intensifiers

Words like "incredible," "exactly," "perfect," "massive," "dramatically," "brilliant" appear very frequently. Consider selectively trimming to keep emotional peaks meaningful.

### 6.2 Mixed Metaphor Overload

Some paragraphs stack orchestras + rivers + architecture + magic in quick succession. Prune to one dominant metaphor per beat.

### 6.3 Proper Noun Casing Consistency

Decide whether terms like "Communication Hub," "Props Messenger Guild," "App's Tower," "Grand Thoroughfare" are always capitalized and enforce consistently.

### 6.4 Long Journal Entries

Several journal entries are 500+ word single paragraphs. Consider paragraph breaks for readability in the longest ones (Days 57, 59, 69, 84).

### 6.5 Lesson Opener Line 224

Long breathless sentence chain. Consider splitting: "...compose them into complex structures, and seen..." → two sentences.

---

## Post-Remediation: Reference Document Updates

After all narrative fixes are complete, update:
- `story-bible.md` — align character details, location names, lesson slugs with narrative
- `kingdom-geography.md` — align region names, location descriptions, "First Mentioned" fields with narrative

These are separate tasks from the narrative remediation.

---

## Execution Order

```
Phase 1 (mechanical) → commit & push
Phase 2 (naming) → commit & push  
Phase 3 (formatting) → commit & push
Phase 4 (content) → commit & push
Phase 5 (narrative) → commit & push
Phase 6 (polish) → commit & push
Reference doc updates → separate branch/task
```

Each phase should be a separate commit for easy review and rollback.
