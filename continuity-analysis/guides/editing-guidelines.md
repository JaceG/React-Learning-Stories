# Editing Guidelines - Extracted from Manual Review
*Derived from manual editing notes (pages 21-103)*  
*Created: February 1, 2026*

---

## Overview

These guidelines are extracted from patterns identified during manual review of LP2-LP5 and LP7 (pages 21-103 of original narrative-master.md). They should be applied when editing the remaining content and used as a quality checklist.

---

## 1. Character Continuity Rules

### ✅ DO:
- **Only Aria and Binary travel across all Learning Paths** as main characters
- Each LP should introduce **new teachers/masters** specific to that LP
- Previous teachers can be **mentioned** in passing (e.g., "Master Aurelius taught you...")
- Keep character names **unique and memorable** (avoid confusing similar names)

### ❌ DON'T:
- Introduce characters that don't exist in the story-bible
- Have characters appear before they're properly introduced
- Let Aria "teach" - she's always the student learning
- Have teachers return as active participants in later LPs
- Create character name conflicts (e.g., "Brother Binary" vs Binary the companion)

### 🔍 Check For:
- "**River Master Flux**" type errors - characters referenced but never introduced
- "**Not the previous teacher**" - wrong character teaching in wrong place
- "**No she didn't, that was [X]**" - attribution errors

**Example Issues Found:**
- Page 10: Character attribution error (Hermes vs another character)
- Page 13: "River Master Flux does not exist"
- Page 14: "Not the previous teacher"
- Page 49, 68, 75: "Aria is teaching" (should be learning)
- Page 71: "Binary the companion is nowhere to be found" / "should there be two characters named Binary?"

---

## 2. Lesson Order & Chronology

### ✅ DO:
- Ensure events happen in **chronological order**
- Reference only what has **already been taught**
- Make "next lesson" statements **accurate**
- Build on **previously established knowledge**
- Track what Aria has learned at each point

### ❌ DON'T:
- Reference concepts before they're introduced
- Say "as you learned" when it hasn't been covered yet
- Have "next lesson" point to something that already happened
- Create circular references or time paradoxes

### 🔍 Check For:
- "**She hasn't learned about that**" - premature concept introduction
- "**Never brought up [X] yet**" - referencing untaught concepts
- "**Not the next lesson! [X] already happened!**" - incorrect sequencing
- "**That's already happened**" - events out of order

**Example Issues Found:**
- Page 5: "Never talked about these"
- Page 17: "She hasn't learned about that"
- Page 18: Lesson order confusion (Data Rivers vs Hooks)
- Page 23: "Hooks are next; that's already happened"
- Page 26: "Never brought up useReducer yet"
- Page 46: "Not the next lesson! Eventus already happened!"
- Page 47: "Conductor Eventus happened a long time ago"
- Page 79: "Out of order?" affecting entire lesson

---

## 3. Lesson Redundancy

### ✅ DO:
- Each lesson should teach **unique concepts**
- Build on previous knowledge without **re-teaching**
- Frame callbacks as "remember" or "building on" if reviewing
- Ensure each LP has **distinct value**

### ❌ DON'T:
- Teach the same concept in multiple lessons
- Create lessons that feel unnecessary
- Have overlapping content without clear progression

### 🔍 Check For:
- "**Is this lesson content redundant?**"
- "**I really think this whole lesson is redundant**"
- "**Might replace redundant [X]**"
- Same concepts taught multiple times without advancement

**Example Issues Found:**
- Page 19: "Is this lesson content redundant?"
- Page 22-23: "I really think this whole lesson is redundant" (Data Rivers - LP3.2)
- Page 39: "Might replace redundant Data Rivers"

**Action:** Consider removing or significantly rewriting LP3.2 (Data Rivers)

---

## 4. Wisdom Section Format

### ✅ DO:
- Write as **practical advice** and teaching tips
- Focus on **technical concepts** and best practices
- Use **imperative voice** (e.g., "Use this when...", "Remember to...")
- Provide **actionable guidance** developers can apply
- Match the **format and tone** of earlier wisdoms in the course

### ❌ DON'T:
- Write wisdom as story continuation or narrative
- Use as character monologues or conclusions
- Write as quotes or philosophical musings
- Make it feel like plot exposition

### 🔍 Check For:
- "**Not wisdom, just a story continuation**"
- "**More like a quote or story continuation than wisdom**"
- "**Conclusion monologue, not advice**"
- "**Needs to be wisdom instead**"
- "**This doesn't feel like it reads like earlier wisdoms**"

**Example Issues Found:**
- Page 51: "Needs to be wisdom instead"
- Page 55: "Not really an intro, just facts we already know / Needs to be wisdom / Not really like the others in the course"
- Page 58: "More like the story than a Wisdom tip"
- Page 62: "Not wisdom, just a story continuation / Short. But also doesn't take the rest of the course into account"
- Page 67: "More like a quote or story continuation than wisdom"
- Page 68: "Not wisdom / Another story continuation"
- Page 70: "Not wisdom / Conclusion monologue, not advice"
- Page 78: "Needs to be wisdom, but the content is actually good"

**Pattern:** This is a PERVASIVE issue across multiple lessons. Wisdom sections need systematic rewrite.

---

## 5. Story Group Structure

### ✅ DO:
- Include **Story Group 1** and **Story Group 2** in every chapter (when appropriate)
- Make story groups **substantial** with enough narrative content
- Ensure story groups **demonstrate concepts** being taught
- Keep lengths **relatively balanced** within a lesson

### ❌ DON'T:
- Leave chapters with only Story Group 1 when 2 is expected
- Make story groups too short or sparse
- Create wildly uneven lengths between chapters in same lesson
- Skip story content in favor of just technical exposition

### 🔍 Check For:
- "**Should there be a Story Group 2?**"
- "**Too short**"
- "**This is way too short**"
- "**Story groups for this lesson seem different lengths**"

**Example Issues Found:**
- Page 35: "Should there be a Story Group 2?"
- Page 36: "Should there be a Story Group 2?"
- Page 37: "Should there be a Story Group 2?"
- Page 67: "Story groups for this lesson seem different lengths"
- Page 76: "Too short / And just wrong"
- Page 82: "This is way too short"
- Page 84: "Too short"
- Page 90: "Too short"

---

## 6. Metaphor & Location Consistency

### ✅ DO:
- Create **unique, memorable locations** for each concept
- Use metaphors **consistently** within a lesson
- Check **kingdom-geography.md** for location availability
- Make metaphors **meaningful to the concept** being taught

### ❌ DON'T:
- Reuse the same location type (e.g., multiple Symphony Halls)
- Use metaphors that don't make sense in Aria's world
- Reference metaphors as if Aria should understand them from outside context
- Create location conflicts with existing geography

### 🔍 Check For:
- "**Too many symphony halls**" - location reuse
- "**Not a metaphor to her**" - inappropriate metaphor usage
- "**Metaphor already used**" - reused metaphors
- "**This chapter barely uses metaphors**" - missing metaphorical framework

**Example Issues Found:**
- Page 32: "Not a metaphor to her"
- Page 38: "Too many symphony halls; make it the Form Citadel"
- Page 52: "This chapter barely uses metaphors…"
- Page 54: "Metaphor already used"

**Action:** Rename Event Symphony → Form Citadel to avoid duplication

---

## 7. Questions Section Format

### ✅ DO:
- Write as actual **questions** (ending with ?)
- Make questions **reflective** about story content
- Tie questions to **concepts taught** in Story Groups
- Encourage **critical thinking** about React concepts

### ❌ DON'T:
- Write statements instead of questions
- Make questions generic or unrelated to story
- Ask about things not covered in the narrative

### 🔍 Check For:
- "**These are not questions**"
- "**Not questions**"
- "**Not a question**"
- Statements without question marks in Questions section

**Example Issues Found:**
- Page 75: "These are not questions"
- Page 78: "Not questions"
- Page 81: "Not a question"

---

## 8. Chapter Endings Quality

### ✅ DO:
- Provide **closure** for the current lesson
- **Set up** the next lesson appropriately
- Match the **emotional tone** of the story
- Include **Aria's reflection** on what she learned
- Be **substantial** (not too brief)

### ❌ DON'T:
- Make endings too abrupt or short
- Reference wrong next lesson
- End without proper resolution
- Make endings feel tacked on

### 🔍 Check For:
- "**That's not next**" - wrong next lesson referenced
- "**This chapter ending sucks**"
- "**Too short**"
- "**Not next**"

**Example Issues Found:**
- Page 67: "That's not next / This chapter ending sucks"
- Page 70: "Not next / Too short"
- Page 82: "That's not next / Too short"

---

## 9. Technical Content Accuracy

### ✅ DO:
- Verify technical concepts are **correct**
- Check code examples if present
- Ensure terminology is **React-standard**
- Make sure concepts are taught at **appropriate depth**

### 🔍 Check For:
- "**Check this for correctness**"
- Technical terms used incorrectly
- Code examples that don't work
- Concepts oversimplified or overcomplicated

**Example Issues Found:**
- Page 59: "Check this for correctness"
- Page 65: "Check this for correctness" (with code examples)

---

## 10. Content Completeness

### ✅ DO:
- **Fully develop** concepts introduced
- Provide **enough detail** in story to understand concept
- "**Go into these more**" - expand shallow content
- Cover what the lesson promises to teach

### ❌ DON'T:
- Introduce concepts without explanation
- Leave story threads unresolved
- Skim over important concepts
- Promise content that isn't delivered

### 🔍 Check For:
- "**Where?**" - promised content missing
- "**What?**" - unclear or missing explanations
- "**Go into these more**" - needs expansion
- "**Where the rest?**" - incomplete content

**Example Issues Found:**
- Page 2: "Where the rest?"
- Page 27: "What?"
- Page 33: "Where?"
- Page 38: "What?"
- Page 66: "What are those?"
- Page 71-72: "Go into these more" (multiple instances)
- Page 76: "Go over these more in the story"

---

## Application Checklist

When editing any section, verify:

### Character/Continuity
- [ ] All characters exist in story-bible
- [ ] Characters appear in correct chronological order
- [ ] Aria is learning, not teaching
- [ ] Binary companion is present when expected
- [ ] No name conflicts

### Lesson Flow
- [ ] Events in chronological order
- [ ] Only references previously taught concepts
- [ ] "Next lesson" statements are accurate
- [ ] No redundancy with other lessons

### Format/Structure
- [ ] Story Group 1 and 2 present (when appropriate)
- [ ] Story groups substantial and balanced
- [ ] Wisdom section is practical advice (not story)
- [ ] Questions are actual questions
- [ ] Chapter ending is substantial and correct

### Content
- [ ] Metaphors are unique and appropriate
- [ ] Locations checked against geography
- [ ] Technical content accurate
- [ ] Concepts fully developed
- [ ] No missing or unclear explanations

### Polish
- [ ] Length appropriate (not too short)
- [ ] Tone consistent with course
- [ ] Grammar and formatting correct

---

## Priority Levels for Issues

### 🔴 CRITICAL (Fix First)
- Character continuity breaks
- Lesson order/chronology errors
- Major redundancy (entire lessons)
- Aria teaching instead of learning

### 🟡 HIGH (Fix Soon)
- Wisdom sections as story continuations
- Missing Story Group 2
- Wrong "next lesson" references
- Location/metaphor conflicts

### 🟢 MEDIUM (Polish Pass)
- Chapter endings too short
- Questions not formatted correctly
- Content needs expansion
- Minor technical corrections

---

## Known Issues Requiring Major Rewrites

Based on manual review, these sections need significant work:

1. **LP3.2 (PropsCaravans / Data Rivers)** - Possibly redundant entire lesson
2. **LP3.4 Chapter 3 (DataRivers)** - "Just rewrite entire chapter" / Form Citadel rename
3. **LP4.1 (UseStateSpells)** - "Maybe rewrite entire Lesson"
4. **LP4.2 (UseEffectEnchantments)** - Conductor Eventus chronology issues
5. **LP7.2 (LazyLibrary)** - "This affects everything and I probably need to rewrite everything in this lesson"

---

## Coverage Map

### Reviewed (Manual Notes Available):
- LP2.3 GrandContext (end) - Pages 1-2
- LP2.4 StateManagementAdventures - Pages 2-5
- LP3.1 PropForge - Pages 5-9
- LP3.2 PropsCaravans - Pages 9-13 (FLAGGED: possibly redundant)
- LP3.3 EventEchoes - Pages 13-17
- LP3.4 DataRivers - Pages 17-20 (FLAGGED: rewrite needed)
- LP4.1 UseStateSpells - Pages 20-24 (FLAGGED: maybe rewrite entire lesson)
- LP4.2 UseEffectEnchantments - Pages 24-28 (FLAGGED: chronology issues)
- LP4.3 CustomHookCrafting - Pages 28-32
- LP4.4 HookPatternMastery - Pages 32-36
- LP5.1 EventSymphony - Pages 36-40
- LP5.2 FormAlchemy - Pages 40-44
- LP5.3 ValidationGuardians - Pages 44-48
- LP5.4 SubmissionPortals - Pages 48-52
- LP7.1 MemoryMonastery - Pages 52-56
- LP7.2 LazyLibrary - Pages 56-60 (FLAGGED: affects everything, needs rewrite)
- LP7.3 VirtualizationVault - Pages 60-63

### NOT Reviewed Yet (Need Manual Review):
- LP1.1-1.4 (Components Basics) - Already fixed in Phase 3
- LP6.1-6.4 (Routing Navigation) - Need review
- LP7.4 (SpeedSanctum) - Need review
- LP8.1-8.4 (Testing Debugging) - Need review
- LP9.1-9.4 (Advanced Patterns) - Need review
- LP10.1-10.4 (React Ecosystem) - Need review
- LP11.1-11.4 (Server Data) - Need review
- LP12.1-12.4 (TypeScript React) - Need review
- LP13.1-13.4 (Build Deploy) - Need review
- LP14.1-14.4 (React Native) - Need review
- LP15.1-15.4 (Accessibility) - Need review

---

## Next Steps

1. **Apply these guidelines** to review remaining unreviewed sections (LP6, LP7.4, LP8-15)
2. **Cross-reference** with Phase 3 fixes to see which issues were already addressed
3. **Create new issues list** for problems not yet fixed
4. **Systematic rewrite** of flagged lessons (LP3.2, LP3.4 Ch3, LP4.1, LP4.2, LP7.2)
5. **Wisdom section pass** - rewrite all wisdoms to match format guidelines
6. **Story Group 2 pass** - add missing Story Group 2 sections
7. **Questions pass** - reformat all questions sections
8. **Final polish pass** - length, endings, technical accuracy

---

## Notes

- These guidelines are derived from real editing feedback, not theoretical
- Patterns repeated across multiple pages indicate systematic issues
- Wisdom section format is the most pervasive issue (needs full pass)
- Character continuity issues are high-impact but less frequent
- Lesson order/redundancy issues require structural changes
