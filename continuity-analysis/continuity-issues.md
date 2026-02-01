# Continuity Issues Log

*Running log of narrative continuity problems found during review*

---

## Categories

### Character Issues
- Characters appearing without introduction
- Inconsistent character traits or behavior
- Character relationships that don't match previous interactions

### Location Issues
- Locations mentioned without description
- Inconsistent location descriptions
- Unclear travel/transitions between locations

### Plot Issues
- Events referenced that haven't happened yet
- Missing setup for important plot points
- Inconsistent timeline

### Concept Issues
- React concepts introduced without proper story setup
- Technical metaphors that don't match the story world
- Confusing or contradictory explanations

---

## Issues Found

### Components Basics (Learning Path 1)

#### 1.1 ComponentKingdom
**Issue #1: Early Props Introduction**
- **Severity**: Medium
- **Type**: Concept Issues
- **Description**: ComponentKingdom Ch2-3 introduce Props concept when the lesson is supposed to focus on components. Props are then re-introduced in lesson 1.2 (PropsMessengers), creating redundancy.
- **Location**: ComponentKingdom Ch2 Story Group 1
- **Recommendation**: Keep ComponentKingdom focused on pure component concepts (structure, nesting, composition, single responsibility) without mentioning Props. Save all Props discussion for PropsMessengers.

#### 1.2 PropsMessengers
**Issue #2: Props Redundancy**
- **Severity**: Medium
- **Type**: Plot Issues
- **Description**: Hermes introduces Props as if they're new ("Now you'll learn how we enable communication"), but Aria already learned about Props from Aurelius in ComponentKingdom Ch2-3. This creates confusion about what's new.
- **Location**: PropsMessengers Ch1 Story Group 1
- **Recommendation**: Either remove Props from ComponentKingdom OR adjust Hermes's introduction to acknowledge Aria's basic knowledge and frame this as "deeper learning" about Props.

**Issue #3: Guardian TypeCheck Introduction**
- **Severity**: Minor
- **Type**: Character Issues
- **Description**: Guardian TypeCheck appears suddenly in Ch3 without setup or prior mention. Feels jarring.
- **Location**: PropsMessengers Ch3 Story Group 1
- **Recommendation**: Add a brief mention of the PropTypes Guardians earlier (maybe in Ch1 or Ch2) to foreshadow their introduction.

#### 1.3 JsxMagic
**Issue #4: Incomplete Story Group**
- **Severity**: Medium
- **Type**: Plot Issues
- **Description**: Ch3 Story Group 1 ends with Aria ready to learn JSX rules, but no rules are actually presented in Story Groups. The teaching likely happens in non-Story sections.
- **Location**: JsxMagic Ch3 Story Groups
- **Recommendation**: Add at least 1-2 key JSX rules to Story Group content (e.g., "Every element must be closed" or "className instead of class"). Or adjust the ending to acknowledge the rules are demonstrated in practice.

**Issue #5: Binary's Journey Unclear**
- **Severity**: Minor
- **Type**: Character Issues
- **Description**: Binary sprite is introduced in JsxMagic Ch2, but by LifecycleChronicles, Binary appears with Aria as if they're traveling companions. The transition isn't explained.
- **Location**: LifecycleChronicles Ch1
- **Recommendation**: Add a line in JsxMagic Ch3 or LifecycleChronicles Ch1 explaining that Binary has decided to accompany Aria on her journey as a guide/companion.

#### 1.4 LifecycleChronicles
**Issue #6: Binary Companion Status**
- **Severity**: Minor
- **Type**: Character Issues
- **Description**: Same as Issue #5 - Binary's presence with Aria isn't explained.
- **Location**: LifecycleChronicles Ch1-3
- **Related**: Issue #5

---

### Props Data Flow (Learning Path 3)

**Issue #14: Character Name Inconsistency**
- **Severity**: Medium
- **Type**: Character Issues
- **Description**: DataRivers Ch2 mentions "Contextus Magnus" but the Context teacher in LP2 was named "Contextia."
- **Location**: DataRivers Ch2
- **Recommendation**: Change to "Contextia" for consistency.

**Issue #15: Reference to Unknown Character**
- **Severity**: Minor
- **Type**: Character Issues
- **Description**: PropForge Ch1 mentions "River Master Flux sent word" before Flux is introduced. Works if we assume word travels ahead, but slightly confusing.
- **Location**: PropForge Ch1  
- **Recommendation**: Either introduce Flux earlier or change to a character already met.

**Issue #16: Propius Returns Across Learning Paths**
- **Severity**: Medium
- **Type**: Character Issues
- **Description**: Propius (from LP1 PropsMessengers) returns as an active character in LP3 PropsCaravans. Per user requirements, characters should only be MENTIONED across Learning Paths, not return as active participants. Each LP should have its own cast.
- **Location**: PropsCaravans Ch1-3
- **Recommendation**: Replace Propius with a new Caravan Master character. Can mention that "Propius from the Props Messenger Guild recommended you" but shouldn't have him actively teaching again.

---

### State Management (Learning Path 2)

#### 2.1 StateSorcerers
**Issue #7: useEffect Introduced Too Early**
- **Severity**: Medium
- **Type**: Concept Issues
- **Description**: StateSorcerers Ch3 introduces useEffect, but lesson 2.2 (MagicalHooks) also teaches useEffect. This creates the same redundancy problem as Props in LP1.
- **Location**: StateSorcerers Ch3 Story Group 1
- **Recommendation**: Either keep useEffect entirely in 2.2, or make 2.1 Ch3 a brief introduction and 2.2 the deep dive.

**Issue #8: Minimal Story Group Content in Ch3**
- **Severity**: Minor
- **Type**: Plot Issues
- **Description**: StateSorcerers Ch3 Story Group 1 is very brief (2 sentences), then jumps to "Memnon's Final Wisdom" which isn't Story Group content. The actual narrative is minimal.
- **Location**: StateSorcerers Ch3
- **Recommendation**: Add more narrative content to Story Groups showing Aria learning useEffect through story, not just wisdom sections.

#### 2.2 MagicalHooks
**Issue #9: Major Hook Redundancy**
- **Severity**: High
- **Type**: Concept Issues
- **Description**: MagicalHooks re-teaches useState and useEffect which were already covered in StateSorcerers. This is confusing and wastes lesson time.
- **Location**: MagicalHooks Ch1-2
- **Recommendation**: Either:
  - Focus 2.1 only on useState basics, move ALL useEffect to 2.2
  - OR acknowledge in 2.2 that Aria learned basics and frame this as "mastering" hooks
  - OR make 2.2 about performance hooks only (useRef, useMemo, useCallback) and move useState/useEffect content elsewhere

**Issue #10: Hook Creation Attribution Confusion**
- **Severity**: Minor
- **Type**: Character Issues
- **Description**: Forge Master Hooke claims useState is "my most popular creation" that Aria has "already met," but Aria learned useState from Memnon, not Hooke. Creates confusion about who created/teaches what.
- **Location**: MagicalHooks Ch1 Story Group 1
- **Recommendation**: Clarify that Hooke forges/creates the hooks, but various masters teach how to use them. Or have Hooke acknowledge Memnon taught Aria the basics.

#### 2.3 GrandContext
**Issue #11: Location Quarter Unspecified**
- **Severity**: Minor
- **Type**: Location Issues
- **Description**: Grand Context Hall's quarter not specified. Makes world geography unclear.
- **Location**: GrandContext Ch1
- **Recommendation**: Assign Grand Context Hall to a specific quarter for better world coherence.

#### 2.4 StateManagementAdventures
**Issue #12: Modern Tools Not Named in Story**
- **Severity**: Minor
- **Type**: Plot Issues
- **Description**: Ch3 mentions "modern frontiers" and "portals" to different state management approaches but doesn't name any specific tools in Story Groups. Likely covered only in interactive content.
- **Location**: StateManagementAdventures Ch3
- **Recommendation**: Add at least 1-2 specific modern state management library names (Zustand, Jotai, Recoil) in Story Groups for narrative completeness.

**Issue #13: Location Quarter Unspecified**
- **Severity**: Minor
- **Type**: Location Issues
- **Description**: State Management Citadel quarter not specified.
- **Location**: StateManagementAdventures Ch1
- **Recommendation**: Assign to a specific quarter.

---

### State Management (Learning Path 3)
[To be filled during review]

---

### Performance Optimization (Learning Path 4)
[To be filled during review]

---

### Advanced Patterns (Learning Path 5)
[To be filled during review]

---

## Resolved Issues

[Issues will be moved here once fixed in Phase 3]
