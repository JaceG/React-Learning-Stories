# Copyediting Notes (GPT-5.2) — `narrative-master-PHASE6.md`

**Source**: `continuity-analysis/narrative/narrative-master-PHASE6.md` (Phase 6 unified LP1–15)  
**Date**: 2026-02-27  
**Model**: GPT-5.2  
**Scope**: Copyediting notes only (no edits applied to the source file). Notes focus on grammar, punctuation, clarity, consistency, and Markdown hygiene.

---

## Global consistency / style pass (apply across doc)

- **Dialogue formatting**: Standardize how spoken dialogue is marked. In several places, dialogue is embedded as narration without quotation marks, or bold is used as a proxy for speech.
  - Recommendation: Use quotation marks for all spoken lines; reserve bold for emphasis, not for identifying speech.

- **Dashes**: The document mixes hyphen-minus with spaces (` - `) and true em dashes (`—`) for parenthetical breaks.
  - Recommendation: Pick one convention (prefer em dash `—` for narrative breaks) and apply consistently.

- **Inline code formatting**: Many code/tech tokens appear as plain text (hooks, props, HTML attributes, routes, etc.).
  - Recommendation: Wrap code-y tokens in backticks for readability and scannability (e.g., `useCallback`, `onKeyDown`, `tabIndex`, `<label htmlFor="email">`, `/users/:id`, `createUserId`, `vite.config.ts`).

- **HTML in Markdown**: Prefer Markdown-native formatting over raw HTML tags for emphasis (e.g., `**bold**` over `<strong>...</strong>`).

- **Heading level consistency**: Some lessons use `### 📖 Lesson Opener` while others use `**Lesson Opener:**` (bold label). Consider standardizing openers/bridges across all LPs to keep the “master doc” uniform.

- **Lists inside narrative**: When the narrative describes code-like lists/steps (e.g., “6 steps: input/validate/call…”), consider formatting as Markdown lists or inline code to reduce run-on density.

---

## Line-specific / local fixes (actionable)

### Quotation marks / punctuation / formatting artifacts

- **L238**: Stray quotation mark + spacing breaks dialogue.
  - Current: `...progress with components. " You've seen our messengers...`
  - Fix: Remove the extra quote and clean the sentence break. Example: `...progress with components. You've seen our messengers...` (or split into two properly quoted sentences).

- **L311**: Raw HTML `<strong>` used inside Markdown, and the em dash is “tight” with no spaces.
  - Current: `... rule in our kingdom: <strong>Props can only travel in one direction—from parent to child</strong>.`
  - Fix: Replace with Markdown bold and standardize dash spacing. Example: `... rule in our kingdom: **Props can only travel in one direction — from parent to child**.`

- **L4121**: Stray HTML closing tag appears as a standalone line.
  - Current: `</tr>`
  - Fix: Delete this line (or, if this was meant to be a code sample, wrap the entire snippet in a fenced code block so tags don’t leak into narrative).

- **L4120–L4123**: Internal wording inconsistency within the same “first challenge” paragraph.
  - Current: Starts with “edit/delete buttons” then later says buttons are “complete/delete”.
  - Fix: Decide on one pair (`edit/delete` vs `complete/delete`) and make the whole paragraph consistent.

- **L4251**: Dialogue is formatted as bold narration; quotation marks are missing and the speaker attribution is awkward.
  - Current begins: `**Welcome, young scholar!** A figure... **Master Alchemist Formeus** at your service!...`
  - Fix: Convert to standard dialogue punctuation. Example: `"Welcome, young scholar!" ... "Master Alchemist Formeus at your service!"` and keep the rest as narration.

- **L7697**: Extra trailing space inside a closing quotation mark.
  - Current: `"Radix provides the 'what.' You provide the 'how it looks.' "`
  - Fix: Remove the trailing space: `"Radix provides the 'what.' You provide the 'how it looks.'"`

### Markdown/typography hygiene

- **L224**: Long sentence chain in the lesson opener reads slightly breathless.
  - Consider splitting: `...compose them into complex structures, and seen...` → split into two sentences for flow.

- **L311**: The doc uses both hyphen breaks and em dashes elsewhere; this line is also a “key rule” moment.
  - Consider formatting the rule as a standalone line (blockquote or bold sentence) for emphasis and visual consistency.

- **L7606**: Sentence break/punctuation makes the list of examples feel like a fragment.
  - Current: `... enhanced behavior! withAuth, withLoading, withTheme — each adds...`
  - Fix: Change to colon or new sentence: `... enhanced behavior: withAuth, withLoading, withTheme — each adds...` or `... enhanced behavior. WithAuth, withLoading...`

- **L11287**: Journal entry includes literal HTML/JSX snippets without code formatting.
  - Current: `Labels: <label htmlFor="email"> + <input id="email"> ...`
  - Fix: Wrap each snippet in backticks: `Labels: \`<label htmlFor="email">\` + \`<input id="email">\` ...`

### Consistency (structure)

- **Around L9922–L9928**: Build/Deploy section switches opener formatting style.
  - Current: `**Lesson Opener:**` (bold label)
  - Fix: Consider matching the rest of the doc’s pattern (e.g., `### 📖 Lesson Opener`) for consistency across learning paths.

---

## Optional “polish” recommendations (non-blocking)

- **Reduce repeated intensifiers**: Phrases like “incredible,” “exactly,” “perfect,” “massive,” “dramatically” appear frequently across chapters. Consider selectively trimming to keep emotional peaks meaningful.

- **Avoid mixed metaphor overload in single paragraphs**: Some passages stack multiple metaphors (orchestras + rivers + architecture + magic) quickly. Consider pruning to one dominant metaphor per beat for clarity.

- **Standardize casing for recurring terms**: Decide whether certain in-world proper nouns are always capitalized (e.g., “Communication Hub,” “Props Messenger Guild,” “App’s Tower”) and enforce consistently.

