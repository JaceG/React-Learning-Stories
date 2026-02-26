# LP1-5 Worldbuilding Deduplication Plan

*Created: February 3, 2026*
*Status: DRAFT — Awaiting user review before implementation*

This plan addresses remaining duplicate location names and character titles in LP1-5 that overlap with each other or with LP6-15. It continues the work from the Phase 1 Worldbuilding Deduplication (which covered LP6-15).

---

## Files in Scope

- `continuity-analysis/narrative/narrative-master-PHASE4.md` (LP1-5 narrative)
- `continuity-analysis/narrative/narrative-master-PHASE5.md` (LP9 Enhancement Forge only)
- `continuity-analysis/reference/story-bible.md`
- `continuity-analysis/reference/kingdom-geography.md`

---

## 1. FORGE Deduplication (3 locations → keep 1)

**Problem**: Three "Forges" in the kingdom after we specifically eliminated the LP12 forge theme. Hook Forge is the most iconic and should own the word.

### Keep

| Location | LP | Character | Why Keep |
|---|---|---|---|
| **Hook Forge** | LP2.2 | Forge Master Hooke | Original forge, character identity built around it, "Hooke" puns on hooks + smithing |

### Rename

| Old Name | New Name | LP | Occurrences (narrative) | Rationale |
|---|---|---|---|---|
| **Prop Forge** | **Prop Workbench** | LP3.1 | ~9 in PHASE4 | Destructo *shapes* and *deconstructs* props — a workbench fits better than a forge. He's a craftsman, not a smith. The "Industrial Quarter" setting still works. |
| **Enhancement Forge** | **Enhancement Gallery** | LP9.2 | 2 in PHASE5 (lines 929, 935) | Matches LP9's existing "Pattern Evolution Gallery" theme in the sky-realm Architect's Academy. Components are *exhibited and enhanced*, not smelted. |

### Also Rename

| Old Name | New Name | File | Occurrences | Notes |
|---|---|---|---|---|
| References to "Prop Forge" | "Prop Workbench" | kingdom-geography.md | ~4 | Location description |
| References to "Prop Forge" | "Prop Workbench" | story-bible.md | ~2 | Character location |
| "Enhancement Forge" | "Enhancement Gallery" | kingdom-geography.md | ~3 | Location description |
| "Forge Master Enhance" | Remove or rename | kingdom-geography.md | 1 | Phantom character — doesn't appear in narrative. Renderius teaches this lesson. Remove the entry or note "(taught by Renderius)" |

### Metaphor Notes for Prop Workbench

The Prop Forge sections in LP3.1 use forge-adjacent language ("forge walls," "forge heat," descriptive "the forge"). These need a light rewrite pass to use workbench/workshop language instead:
- "forge walls" → "workshop walls"
- "forge heat" → "workshop energy"  
- "the forge" (when referring to the location) → "the workbench" or "the workshop"
- Keep industrial/crafting language — Destructo is still a hands-on builder

### Line Ranges (PHASE4.md)

- LP3.1 PropForge content: approximately lines 1804-2100
- "Prop Forge" appears as both a bold location name and in descriptive text
- "Hook Forge" references in LP2 should NOT be changed

### Line Ranges (PHASE5.md)

- Enhancement Forge: lines 929 and 935 (LP9.2, Chapter 2 HOC section)
- Also line 929 has "gesturing to a forge deeper in the gallery" — change to "gesturing to a gallery deeper in the academy"

---

## 2. HALL Deduplication (6 locations → rename 4)

**Problem**: Six "Halls" across LP1-6, three of which are "Grand [X] Hall." A reader cannot distinguish Grand Assembly Hall from Grand Hall from Grand Symphony Hall from Grand Hall of Authority.

### Keep

| Location | LP | Why Keep |
|---|---|---|
| **Hall of Sacred Rules** | LP1.3 | Unique name — "Sacred Rules" is distinctive, not "Grand [X]" |
| **Grand Hall** (Context Keepers) | LP2.3 | The original "Grand Hall" at the Central Plaza. Deeply embedded (~8 occurrences). Keep as the ONE Grand Hall. |

### Rename

| Old Name | New Name | LP | Occurrences | Rationale |
|---|---|---|---|---|
| **Grand Assembly Hall** | **Composition Pavilion** | LP1.4 | ~5 | Where Aurelius teaches component composition. A pavilion is an open exhibition space — fits the "demonstrations floating like constellations" description. |
| **Grand Symphony Hall** | **Echo Amphitheater** | LP3.3 | ~3 | Located inside the Echo Caves (Callback's domain). Natural amphitheater with stalactite organ. "Amphitheater" matches the existing description of "natural amphitheater" on line 2570. |
| **Event Symphony Hall** | **Event Orchestrium** | LP5.1 | ~8 | Conductor Eventus's domain in the Western Quarter. "Orchestrium" = place of orchestration, unique word, fits the conductor/symphony theme without reusing "Hall" or "Symphony Hall." |
| **Grand Hall of Authority** | **Authority Tribunal** | LP6.3 | ~3 | Warden Aldric's authorization teaching space. "Tribunal" = place of judgment/authority, fits the authorization/permission theme. |

### Cascade Effects

- "Event Symphony Hall" also appears in journal entries and lesson endings within LP5 — all instances need updating
- The LP15 series finale references some of these locations — check for any "Grand Hall" or "Symphony Hall" mentions there

### Line Ranges (PHASE4.md)

- Grand Assembly Hall (LP1.4): lines ~144-180
- Grand Hall / Context Keepers (LP2.3): lines ~1358-1510 (KEEP)
- Grand Symphony Hall (LP3.3): lines ~2570-2660
- Event Symphony Hall (LP5.1): lines ~3989-4242
- Grand Hall of Authority (LP6.3): lines ~5559-5621

---

## 3. KEEPER Deduplication (6 characters → rename 2)

**Problem**: Six "Keepers" across the kingdom. The title makes thematic sense (each keeps/maintains something) but 6 is stale. Reducing to 4 keeps the pattern meaningful without overuse.

### Keep (4)

| Character | LP | Why Keep |
|---|---|---|
| **Contextia** (Keeper of Grand Context) | LP2.3 | "Keeper" is part of her role description, not her title prefix. She's introduced as "Contextia" not "Keeper Contextia." |
| **Dungeon Keeper Logsworth** | LP8.1 | Evocative, iconic title. "Dungeon Keeper" is a distinct compound. |
| **Keeper Libris** | LP7.3 | Clean, literary name. Only 1 Keeper with this format. |
| **Portal Keeper Sage** | LP5.4 | "Sage" is the name, "Portal Keeper" is the role. Unique compound. |

### Rename (2)

| Old Name | New Name | LP | Occurrences | Rationale |
|---|---|---|---|---|
| **Echo Keeper Callback** | **Echo Warden Callback** | LP3.3 | ~8 in PHASE4 | "Warden" fits — she *guards* the echo caves and event propagation paths. Distinguishes from the other Keepers. Note: Warden Aldric is in LP6.3 — but "Echo Warden" is a compound title distinct from "Warden Aldric." |
| **Ref Keeper Escapius** | **Ref Anchor Escapius** | LP9.4 | ~5 in PHASE5 | Refs "anchor" to the DOM. "Anchor" is unique in the kingdom. Escapius teaches refs and portals — anchoring to specific DOM nodes. |

### Alternative for Echo Keeper

If "Echo Warden" feels too close to "Warden Aldric" (LP6.3), alternatives:
- **Echo Herald Callback** — heralds/announces events as they propagate
- **Echo Caller Callback** — plays on "Callback" + calling/echoing

### Line Ranges

- Echo Keeper Callback (PHASE4.md LP3.3): search for "Echo Keeper" — ~8 occurrences across lesson opener, story groups, journal, lesson ending
- Ref Keeper Escapius (PHASE5.md LP9.4): search for "Ref Keeper" — ~5 occurrences

---

## 4. Summary of All Changes

### Locations (4 renames)

| # | Old Name | New Name | LP | File |
|---|---|---|---|---|
| 1 | Prop Forge | Prop Workbench | LP3.1 | PHASE4 + refs |
| 2 | Enhancement Forge | Enhancement Gallery | LP9.2 | PHASE5 + refs |
| 3 | Grand Assembly Hall | Composition Pavilion | LP1.4 | PHASE4 + refs |
| 4 | Grand Symphony Hall | Echo Amphitheater | LP3.3 | PHASE4 + refs |
| 5 | Event Symphony Hall | Event Orchestrium | LP5.1 | PHASE4 + refs |
| 6 | Grand Hall of Authority | Authority Tribunal | LP6.3 | PHASE4 + refs |

### Characters (2 renames)

| # | Old Name | New Name | LP | File |
|---|---|---|---|---|
| 7 | Echo Keeper Callback | Echo Warden Callback | LP3.3 | PHASE4 + refs |
| 8 | Ref Keeper Escapius | Ref Anchor Escapius | LP9.4 | PHASE5 + refs |

### Reference File Updates

Both `story-bible.md` and `kingdom-geography.md` need updating for all 8 renames. Also:
- Remove phantom "Forge Master Enhance" character from `kingdom-geography.md` LP9 section
- Update any cross-references (e.g., "beyond Prop Forge's reach" → "beyond the Prop Workbench")

---

## 5. Implementation Order

1. **User reviews** all 8 proposed renames and approves/modifies
2. **Reference files first**: Apply renames to `story-bible.md` and `kingdom-geography.md`
3. **PHASE4 narrative**: Apply renames LP-by-LP (LP1 → LP3 → LP5 → LP6)
4. **PHASE5 narrative**: Apply LP9 renames (Enhancement Forge + Ref Keeper)
5. **Metaphor pass**: Light rewrite of LP3.1 forge-adjacent language to workbench/workshop
6. **LP15 finale check**: Verify the series finale doesn't reference any old names
7. **Cross-reference**: Verify consistency across all four files
8. **Update RENAME-TRACKING.md** with new entries
9. **Folder name audit**: Check every LP lesson folder name in `src/learning-paths/` against the actual lesson content/topic. Rename any mismatched folders to match the current lesson content (e.g., LP12 folders should reflect Scriptorium theme, LP14 should reflect Full-Stack React renames, etc.)

---

## 6. Folder Name Audit (Post-Rename)

After all narrative and reference file renames are complete, audit every lesson folder in `src/learning-paths/` to ensure folder names match current lesson content. Known mismatches from previous rename work:

- **LP12**: `TypeForge/` → `TypeScriptorium/`, `ComponentArmory/` → `ComponentArchives/`, `GenericForge/` → `PatternAlcove/`
- **LP3.1**: `PropForge/` → `PropWorkbench/` (if this rename is approved)
- **LP9, LP13, LP14**: Check if lesson folder names still match after character/location renames
- **All LPs**: Systematically compare each `## X.Y LessonName` heading in the narrative against the corresponding folder name in `src/learning-paths/`

This step requires reading the `src/learning-paths/` directory structure and cross-referencing with the narrative section headings.

---

## 7. Estimated Effort

| Task | Occurrences | Difficulty |
|---|---|---|
| Prop Forge → Prop Workbench | ~15 (narrative + refs) | Medium — needs metaphor rewrite in LP3.1 |
| Enhancement Forge → Enhancement Gallery | ~6 (narrative + refs) | Easy — 2 narrative + refs |
| Hall renames (4) | ~22 (narrative + refs) | Easy — mechanical find-replace |
| Echo Keeper → Echo Warden | ~10 (narrative + refs) | Easy — find-replace |
| Ref Keeper → Ref Anchor | ~7 (narrative + refs) | Easy — find-replace |
| LP3.1 metaphor pass | ~10-15 descriptive uses | Medium — creative rewrite of forge language |
| LP15 finale check | 1 pass | Easy — read and verify |

**Total: ~70 replacements + LP3.1 metaphor pass**

---

## 8. What We're NOT Changing

These were audited and deemed acceptable:

- **"Master" title** (10+ characters) — too generic/ubiquitous to deduplicate; functions like "Professor" in academia
- **"Guardian" title** (4 characters) — thematically coherent protector role; compound names differentiate them
- **"Tower" locations** (3 in LP1-5) — LP1-5 now *owns* "Tower" after LP8/LP12 deduplication; 3 is acceptable
- **"Sanctum" locations** (3 across LP1-6) — each is in a different region with a distinct compound name
- **"Chamber" locations** (8+ minor rooms) — these are interior rooms, not primary locations; readers don't need to track them
- **Hook Forge** (LP2.2) — the ONE forge in the kingdom; Forge Master Hooke's identity
- **Grand Hall** (LP2.3) — the ONE "Grand Hall" at the Central Plaza; Contextia's domain
- **4 remaining Keepers** — Contextia, Dungeon Keeper, Keeper Libris, Portal Keeper Sage — distinct enough at 4
