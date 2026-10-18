# Hunter × Hunter: Nen Dungeon

A web-based dungeon crawler (HTML + CSS + JavaScript, no frameworks and no databases), rebuilt from our Java console version so it has real visuals and a clear player guide for our WST-HCI & IM class.

## How to Run
1. Open `index.html` in any browser (double-click it).
2. Read **How to Play** on the title screen.
3. Click **Start Game**.

No developer console or `prompt()` needed anymore — everything happens on screen.

## What changed from the console version (teacher feedback applied)
- Full on-screen UI: title screen, Hunter creation, HUD bars, dungeon minimap, room panel, battle arena, win/lose screens.
- **How to Play** guide (rules, goal, actions) so players are never lost.
- HCI principles applied: consistent layout, clear feedback (colored event log + HP/XP bars), constraints (buttons only enable when valid), and no hidden console dependency.
- Same logic classes kept (`Player`, `Enemy`, `Room`, `Dungeon`, `Item`, `Inventory`, `CombatSystem`, `Game`) so the documentation tables still match.

## Documentation map
- `documentation/00_Team_Defense_Plan.md` — who presents what + HCI talking points
- `documentation/Master_Visuals/03_Web_UI_Overview.md` — the concept and design decisions
- `documentation/Master_Visuals/04_Code_Guide.md` — every class/file explained
- `documentation/Master_Visuals/05_Flowcharts.md` — flowcharts (mermaid, renders on GitHub)
- `documentation/Master_Visuals/06_Mechanics_Reference.md` — all formulas and balance numbers
- `documentation/Master_Visuals/07_Image_Sprites_Guide.md` — how to add portraits to characters
- Member folders (`Member1_GameFlow` .. `Member5_Items`) — per-member cheat sheets

## Assignment concepts still demonstrated
- Variables: `let` and `const`
- Conditionals: `if / else` and `switch`
- Loops: `while` and `forEach`
- Functions/methods: reusable methods across classes
- Arrays and objects: rooms, items, enemies, inventory
- Higher-order functions: `map()`, `filter()`, `reduce()`, `some()`, `findIndex()`
- OOP: classes with constructors and methods
- I/O: DOM input (buttons, text field) and on-screen output (no `prompt()`)
- Clean code: separated files, clear responsibilities
