# Worldbuilding Deduplication — Rename Tracking

*Phase 1 complete. Use this document for Phase 2: propagating renames into narrative files.*

---

## Status

- **Phase 1**: COMPLETE — `story-bible.md` and `kingdom-geography.md` updated
- **Phase 2**: COMPLETE — `narrative-master-PHASE5.md` updated (LP8-15 renames propagated)
- **Phase 2 Note**: `narrative-master-PHASE4.md` (LP1-7) renames for LP6 (Rift Walker Lyss) and LP7 (Velocity Crucible) were completed in earlier sessions

---

## Location Renames (14 total)

Search the old name in narrative files and replace with the new name. Some locations may appear dozens of times.

| Old Name | New Name | LPs Affected | Notes |
|---|---|---|---|
| TypeScript Realm | The Great Scriptorium | LP12 | Region name, appears in LP12 and cross-LP references |
| Type Forge | Type Scriptorium | LP12.1 | Deepest hall of the Scriptorium |
| Component Armory | Component Archives | LP12.2 | Blueprints cataloged with type annotations |
| Generic Forge | Pattern Alcove | LP12.3 | Flexible template scrolls |
| Type Guard Tower | Type Guard Gatehouse | LP12.3-12.4 | Border checkpoint, not a tower |
| Testing Tower | Testing Gauntlet | LP8.1, LP15.4 | Underground trial, not a tower |
| Speed Sanctum | Velocity Crucible | LP7.4 | Experimental performance testing |
| Error Enchantments Sanctuary | Error Enchantments Grotto | LP8.4 | Underground mystical chamber |
| Cloud Citadel | Cloud Bastion | LP11.1 | Elevated fortress in Sky Realm |
| Caching Castle | Cache Vaults | LP11.3 | Already described as "Memory Vaults" |
| Culture Citadel | Culture Forum | LP15.4 | Gathering place for sustainability |
| Server Component Chamber | Server Atrium | LP14.2 | Open flowing space |
| Rendering Strategy Chamber | Rendering Observatory | LP14.3 | Viewing/selecting strategies |
| Integration Chamber | Convergence Hall | LP14.4 | Where client and server unite |

---

## Character Renames (13 total)

Search the old name in narrative files and replace with the new name. Characters appear in dialogue, descriptions, journal entries, lesson endings, and wisdom sections.

| Old Name | New Name | LP | Notes |
|---|---|---|---|
| Master Typus | Scribe Runis | LP12.1 | Head Scribe of Type Scriptorium |
| Master Forger Typhos | Archivist Lexicon | LP12.2, LP12.3 | Cataloger, generic vocabulary master |
| Commander Guardia | Sentinel Guardia | LP12.3 | Border guard at Type Guard Gatehouse |
| Forge Admiral Vex | Shipwright Vex | LP13.1 | Builds bundles like ships |
| Commander Deployment | Warden Garrison | LP13.4 | Production defense warden |
| Compliance Commander | Compliance Auditor | LP15.4 | Minor character, testing context |
| Server Sage Datum | Data Steward Datum | LP14.2 | Steward of server-side data |
| Render Sage Tempus | Chronographer Tempus | LP14.3 | Time-based rendering strategies |
| Integration Master Unitas | Bridge Warden Unitas | LP14.4 | Bridges client and server |
| Master Validator | Inspector Verificus | LP15.4 | Accessibility auditing/verification |
| Rift Weaver Lyss | Rift Walker Lyss | LP6.4 | Walks between portal dimensions |
| Design Weaver Sable | Design Artisan Sable | LP9.3 | Crafts designs |
| Federal Form Chancellor | Form Chancellor | LP10.3 | Dropped "Federal" prefix |

---

## Characters KEPT (no rename needed)

These were audited but kept as-is:

- **Architect Typewright** (LP12.4) — unique "typewriter" pun
- **Animation Abbess Motia** (LP10.4) — "Abbess" is unique
- **All tech-named characters** — Jasmine, Cypress, Axios, WebSocket, Redux, Apollo, Vercel (aid learning)
- **Effect Sage** (LP4.2) — original "Sage"
- **Portal Keeper Sage** (LP5.4) — "Sage" is the name, not title
- **Stream Sage WebSocket** (LP11.2) — tech name
- **Commander Validus** (LP5.3) — original "Commander"
- **Pattern Weaver Synthesis** (LP4.4) — original "Weaver"

---

## LP12 Metaphor Shift

The entire TypeScript Realm changed metaphor from **forges** to **scriptorium**:

| Forge Concept | Scriptorium Concept |
|---|---|
| Anvils, hammers | Lecterns, quills |
| Blue forge-flames | Blue ink-light |
| Forging/hammering contracts | Inscribing contracts on tablets |
| Underground forges | Underground library halls |
| Passages between forges | Lamplit corridors between halls |
| Forge-heat | Scholarly warmth |
| Molten type annotations | Luminous flowing ink-annotations |

---

## Phase 2 Implementation Notes

When propagating into `narrative-master-PHASE4.md` (LP1-7) and `narrative-master-PHASE5.md` (LP8-15):

1. **Simple find-replace** works for most character/location names
2. **LP12 requires creative rewriting** — forge metaphors in prose need to become scriptorium metaphors (hammering → inscribing, flames → ink-light, anvils → lecterns, etc.)
3. **Lesson endings and journal entries** reference masters by name — update all
4. **Wisdom sections** use `[Name]'s [Topic] Wisdom:` format — update the `[Name]` part
5. **Cross-LP foreshadowing** — check lesson endings that reference upcoming masters/locations
6. **LP6.4** and **LP9.3** — update Rift Weaver/Design Weaver references throughout their chapters
7. **LP7.4** — update Speed Sanctum references throughout its chapters

---

*Created: February 3, 2026*
