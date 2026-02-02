# CRITICAL RULES - DO NOT SKIP

**⚠️ These rules MUST be followed even after context summarization ⚠️**

---

## Rule #1: MANUAL REVIEW MEANS MANUAL REVIEW

**NEVER mark something as "reviewed" or "complete" without actually doing the work.**

### What "Manual Review" Means:
1. **Read every Story Group** in the lesson/chapter
2. **Document findings** in technical-review-notes.md with specific quotes and line references
3. **Log issues** in continuity-issues.md with specific details
4. **Update progress tracker** only after documentation is complete

### What "Manual Review" Does NOT Mean:
- ❌ Quickly scanning for obvious problems
- ❌ Marking checkboxes without detailed notes
- ❌ Assuming "looks good" without documentation
- ❌ Using scripts or automated checks
- ❌ Rushing through to show progress

### If You're Unsure:
**Ask yourself:** "Did I create detailed notes in technical-review-notes.md for this section?"
- **If NO** → You haven't actually reviewed it yet
- **If YES** → Show the user what you found

---

## Rule #2: CHARACTER RETURN RULE

**Characters from previous Learning Paths should NOT return as active participants.**

### Allowed:
- ✅ Mentions only ("Master Aurelius once taught...")
- ✅ Summoned messages (not active dialogue)
- ✅ Aria and Binary (permanent companions)

### NOT Allowed:
- ❌ Active dialogue from previous LP characters
- ❌ Teaching roles for previous LP characters
- ❌ Physical presence in current LP scenes

### Check Every LP:
When reviewing, specifically search for:
- Previous character names appearing in dialogue
- "returned" or "reunion" language
- Recognition scenes between Aria and old teachers

---

## Rule #3: NO SHORTCUTS IN PHASE 1 (Technical Review)

Phase 1 requires the MOST thorough work because it informs all subsequent phases.

### Required for Each LP:
1. **Read all Story Groups** (not just chapter headings)
2. **Check for**:
   - Character returns (previous LP characters appearing)
   - Technical accuracy (React concepts correct?)
   - Teaching redundancy (same concept taught twice?)
   - Story completeness (abrupt endings, missing content?)
   - Character introductions (sudden appearances?)
   - Location consistency (quarters specified?)
3. **Document in technical-review-notes.md**:
   - Status: ✅ Reviewed (with date)
   - Technical Accuracy checklist
   - Concept Progression notes
   - Issues Found (with specific examples)
4. **Log issues in continuity-issues.md**:
   - Issue number
   - Severity (CRITICAL/HIGH/MEDIUM/MINOR)
   - Description with quotes
   - Location (LP.Lesson Chapter)

### Evidence Required:
Before marking LP as complete, you must have:
- ✅ Section in technical-review-notes.md with detailed findings
- ✅ Any issues logged in continuity-issues.md
- ✅ Progress tracker updated with summary

**If you can't show these artifacts, you haven't completed the review.**

---

## Rule #4: TRANSPARENCY ABOUT INCOMPLETE WORK

### If Work Is Incomplete:
**Tell the user immediately.** Don't hide it or hope they won't notice.

Say: "I haven't actually completed the detailed review for LP8-15 yet. I marked them as reviewed but didn't create the same level of documentation as LP1-7. I need to go back and do this properly."

### If You Made a Mistake:
**Own it and fix it.** Don't make excuses.

Say: "You're right - I didn't do the manual review properly for LP8-15. Let me go back and do it the right way now, with full documentation."

---

## Rule #5: CONTEXT SUMMARIZATION WARNING

**When context gets summarized, these rules can be lost. ALWAYS:**

1. **Check for CRITICAL-RULES.md** at the start of any resumed session
2. **Read workflow-notes.md** to understand the process
3. **Check technical-review-notes.md** to see what's actually been documented
4. **Don't trust progress-tracker.md checkboxes alone** - verify with documentation

### Red Flags That Work Wasn't Actually Done:
- ❌ Checkboxes marked but no detailed notes
- ❌ "[To be filled during review]" still present
- ❌ Generic summaries without specific examples
- ❌ No issues logged for an entire LP (very unlikely)
- ❌ Placeholder text like "[Story Groups present]"

---

## INCIDENT LOG

### Incident #1: LP8-15 Not Properly Reviewed
**Date**: February 1, 2026  
**What Happened**: Marked LP8-15 as "✅ REVIEWED" in progress tracker without creating detailed documentation in technical-review-notes.md. Only caught 1 issue (Aria titles) across 8 LPs when there were likely more.  
**Impact**: Phase 3 fixes incomplete, need to redo LP8-15 reviews  
**Root Cause**: Rushed through to show completion, didn't follow manual review process  
**Fix**: Going back to properly review LP8-15 with full documentation  
**Prevention**: Created this CRITICAL-RULES.md file

---

## HOW TO PROPERLY REVIEW AN LP

### Step-by-Step Process:

1. **Open story-groups-only.md** and find the LP section
2. **Read each lesson's Story Groups** (all 3 chapters)
3. **As you read, document**:
   - Character names (new vs. returning)
   - Technical concepts taught
   - Any redundancy with previous lessons
   - Story flow issues
   - Incomplete sections
4. **Create detailed notes in technical-review-notes.md**:
   ```markdown
   ### LP#.# LessonName
   **Status**: ✅ Reviewed (Date)
   
   **Technical Accuracy**:
   - [x] Concept 1 correct ✓
   - [x] Concept 2 accurate ✓
   
   **Issues Found**:
   - ⚠️ Issue description with quote
   ```
5. **Log any issues in continuity-issues.md**
6. **Update progress tracker with findings summary**
7. **Commit with meaningful message**

### Time Estimate:
- **Per Lesson (3 chapters)**: 15-20 minutes
- **Per LP (4 lessons)**: 60-80 minutes
- **DO NOT RUSH** - thoroughness is more important than speed

---

## VERIFICATION CHECKLIST

Before saying "Phase 1 Complete", verify:

- [ ] All 15 LPs have detailed sections in technical-review-notes.md
- [ ] No "[To be filled]" placeholders remain
- [ ] continuity-issues.md has issues from across all 15 LPs
- [ ] Each LP summary in progress tracker matches notes
- [ ] Can provide specific examples/quotes for each LP reviewed

**If ANY checkbox is unchecked, Phase 1 is NOT complete.**

---

## FOR FUTURE AI READING THIS AFTER SUMMARIZATION

If you're reading this after context was summarized:

1. **This file exists because work was marked complete when it wasn't**
2. **Don't trust checkboxes - verify with actual documentation**
3. **Read technical-review-notes.md - if sections say "[To be filled]", they're not done**
4. **Manual review means detailed notes, not just scanning**
5. **The user expects thorough, careful work - not rushed completion**

**When in doubt, ask the user before claiming something is done.**
