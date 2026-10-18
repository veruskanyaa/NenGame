# Five-Member Defense Plan

## Member 1 — Game Flow
Files: `src/main.js`, `src/game/Game.js`, `index.html`, `style.css`
Focus: startup, screen navigation, actions, win/lose logic, UI/wiring.

## Member 2 — Player
File: `src/characters/Player.js`
Focus: player properties, constructor, HP, XP, level, Nen, methods.

## Member 3 — Combat
Files: `src/characters/Enemy.js`, `src/combat/CombatSystem.js`
Focus: attacks, enemy turns, critical hits, turn-based battle flow.

## Member 4 — Dungeon
Files: `src/world/Room.js`, `src/world/Dungeon.js`
Focus: room objects, map, room progression, portal rules.

## Member 5 — Items
Files: `src/items/Item.js`, `src/items/Inventory.js`, `src/ui/UI.js`
Focus: item objects, inventory array, add/remove, map/filter/reduce, rendering panels.

## HCI talking points (why the redesign answers the teacher's feedback)
- **Visibility:** everything a player needs is on screen — HP/XP bars, gold, potions, minimap, room info. Hidden console output is gone.
- **Feedback:** every action produces an immediate, color-coded message in the event log; HP bars animate.
- **Constraints:** buttons only work when meaningful (Fight disabled with no enemy, Next Room locked until cleared), which prevents invalid play.
- **Consistency:** one dark dungeon theme, same button style and layout across screens.
- **Minimal cognitive load:** a simple menu of 6 clear actions plus a How to Play guide replaces a 9-option numbered console menu.
