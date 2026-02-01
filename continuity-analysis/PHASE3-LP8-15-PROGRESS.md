# Phase 3: LP8-15 Issues - Progress Tracker

**Started**: February 1, 2026  
**Status**: 🔄 IN PROGRESS

---

## Issues to Fix (34 total)

### Debuggora Removal (26 HIGH severity issues)
**Problem**: Debuggora (Test Master Jasmine's companion from LP8) continues appearing in LP9-15, violating "no cross-LP companions" rule.

**Progress**:
- ✅ LP8: KEEP Debuggora (appropriate - Jasmine's companion)
- ✅ LP9: 2 instances REMOVED (lines 4882, 4899)
- 🔄 LP10: 8 instances total
  - ✅ Line 5194 REMOVED
  - ⏳ Line 5320 - TODO
  - ⏳ Line 5440 - TODO
  - ⏳ Line 5475 - TODO
  - ⏳ Line 5530 - TODO
  - ⏳ Line 5554 - TODO
  - ⏳ Line 5593 - TODO
  - ⏳ Line 5627 - TODO
- ⏳ LP11: ~6 instances - TODO
- ⏳ LP12: ~18 instances - TODO
- ⏳ LP13: ~12 instances - TODO
- ⏳ LP14: ~6 instances - TODO
- ⏳ LP15: ~12 instances - TODO

### Aria Title Fixes (8 MEDIUM severity issues)
**Problem**: Aria given inappropriate titles (Guide, Ambassador, Captain) when she's a student.

**Progress**:
- ✅ Issue #23: LP8.1 "Guide Aria" - ALREADY FIXED
- ✅ Issue #24: LP9.1 "Guide Aria" - ALREADY FIXED
- ✅ Issue #28: LP10 "Ambassador Aria" (3 instances) - ALREADY FIXED
- ⏳ Issue #31: LP11.1 "Ambassador Aria" - TODO
- ⏳ Issue #38: LP12.1 "Ambassador Aria" - TODO
- ⏳ Issue #43: LP13.1 "Ambassador Aria" - TODO
- ⏳ Issue #48: LP14.1 "Captain Aria" - TODO
- ⏳ Issue #52: LP15.1 "Captain Aria" - TODO

---

## Editing Approach

Each Debuggora removal includes:
1. Strikethrough original text: 🔴 ~~text~~
2. Edit note: 💡 **EDIT NOTE (Issue #XX):** Reason
3. No replacement text - simply remove

Each Aria title fix includes:
1. Strikethrough old title: 🔴 ~~"Guide Aria"~~
2. Add correct version: 🟢 **"Aria"**
3. Edit note: 💡 **TITLE FIX:** Reason

---

## Line Numbers Reference

### LP Boundaries
- LP8: 4283-4721
- LP9: 4722-5151
- LP10: 5152-5652
- LP11: 5653-6078
- LP12: 6079-6539
- LP13: 6540-6880
- LP14: 6881-7434
- LP15: 7435-end

### Debuggora Instances by LP
(From initial grep of original file)

**LP9**: Lines 4882, 4899 ✅  
**LP10**: Lines 5194 ✅, 5320, 5440, 5475, 5530, 5554, 5593, 5627  
**LP11**: Lines ~5682, 5721, 5732, 5753, 5766, 5827, 5838  
**LP12**: Lines ~6101, 6117, 6145, 6173, 6179, 6207, 6225, 6244, 6257, 6276, 6289, 6299, 6323, 6360, 6392, 6439, 6474, 6504, 6527  
**LP13**: Lines ~6566, 6633, 6674, 6707, 6720, 6737, 6780, 6813, 6841, 6875  
**LP14**: Lines ~7040+  
**LP15**: Lines ~7600+

*Note: Line numbers shift as edits are made*

---

## Commits

**Commit 1**: Header updates + LP9 complete (2 removals)
- Updated file header with Phase 3 Round 2 info
- Removed 2 Debuggora instances from LP9
- Added edit notes

**Next**: Continue LP10 remaining 7 instances
