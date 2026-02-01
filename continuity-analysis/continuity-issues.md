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

### Hooks in Action (Learning Path 2)
[To be filled during review]

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
