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

## Folder structure
- `src/` — JavaScript source (game logic + `src/ui/UI.js` renderer).
- `style.css` — all visuals.
- `documentation/` — explanations and visual guides for the five members.

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
