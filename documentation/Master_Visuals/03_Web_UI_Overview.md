# The Concept — What We Built and Why

## 1. The game in one paragraph
**Hunter × Hunter: Nen Dungeon** is a turn-based dungeon crawler. You create a Hunter,
choose one of six Nen types, fight through 8 dungeon rooms (+ Exit), collect the
**Hunter License Key** in the Hunter License Chamber, defeat the **Elite Nen Guardian**
at the Final Gate, and escape through the Exit. If your HP hits 0, you lose.

## 2. Why it looks the way it does (design decisions)
| Decision | Reason |
|---|---|
| Web page instead of console | The teacher's feedback: "no visuals, no player guide". A screen-sided UI is visible to the player without opening DevTools. |
| Only 3 colors (`#0f380f`, `#306230`, `#9bbc0f`) | Classic Game Boy palette. Fewer colors = consistent look, less visual noise, easy to defend in HCI. |
| Monospace (Courier) font + ASCII "pixel" portraits | 90s retro feel; no image files required, portraits render as text but are read as characters. |
| `src/ui/UI.js` owns all rendering | Game logic classes never touch the DOM — logic is reusable and easy to explain separately from looks. |
| Buttons disable themselves | HCI *constraints*: you can only press actions that are valid right now. |

## 3. The HCI choices (your talking points)
- **Visibility** — HP/XP bars, gold, potions, attack/nen power, minimap and room name are always on screen.
- **Feedback** — every action writes to an event log with a fixed "`> `" prefix; danger messages are *inverted* (light box). Low HP blinks. Portraits flash on hit.
- **Constraints** — buttons only enable when meaningful (Fight needs a live enemy, Next Room needs a cleared room, Use Nen needs Focus charges).
- **Consistency** — same frame, same button style, same palette everywhere.
- **How to Play** screen — the player never has to guess the rules.

## 4. The room list (fixed dungeon)
| # | Room | Contents |
|---|---|---|
| 1 | Hunter Exam Entrance | empty |
| 2 | Chimera Ant Room | enemy (45 HP) |
| 3 | Treasure Room | Recovery Drink |
| 4 | Phantom Beast Room | enemy (65 HP) |
| 5 | Nen Training Room | Hunter Blade (+10 permanent ATK) |
| 6 | Secret Corridor | Recovery Drink |
| 7 | Hunter License Chamber | Hunter License Key (win requirement) |
| 8 | Final Gate | Elite Nen Guardian (boss, 90 HP) |
| 9 | Exit | door — needs Key + boss defeated |

## 5. Chapter index
- `00_Team_Defense_Plan.md` — who presents what
- `Master_Visuals/01` — OOP architecture map
- `Master_Visuals/02` — old console flowchart (kept for history)
- `Master_Visuals/03_Web_UI_Overview.md` — the screens and how the UI is wired
- `Master_Visuals/04_Code_Guide.md` — every class, method and file explained
- `Master_Visuals/05_Flowcharts.md` — updated flowcharts for the web version
- `Master_Visuals/06_Mechanics_Reference.md` — all combat formulas and balance numbers
- `Master_Visuals/07_Image_Sprites_Guide.md` — how to put actual pictures on monsters
