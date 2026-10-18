# Code Guide — Every File, What It Does, Who Defends It

## File loading order (matters! `index.html` loads them in this order)
```text
items/Item.js        -> no dependencies
items/Inventory.js   -> uses Item
characters/Enemy.js  -> no dependencies
characters/Player.js -> uses Inventory
world/Room.js        -> uses Enemy + Item
world/Dungeon.js     -> uses Room (and creates Enemies/Items via it)
ui/UI.js             -> uses DOM (only file allowed to touch the page)
combat/CombatSystem.js -> uses Player + UI + Game hooks
game/Game.js         -> uses Player, Dungeon, CombatSystem, UI
main.js              -> creates UI + Game, connects every button press
```

## Global objects
`main.js` creates exactly one `UI` and one of each screen-object:
```text
const ui = new UI();
const game = new Game(ui);   // Game knows ui; CombatSystem gets player, ui, game
```

## Class reference (web version — updated from the console table)

| Class | File | Key data | Key methods | Member |
|---|---|---|---|---|
| `Item` | `src/items/Item.js` | name, type (heal/weapon/key), value | — | 5 |
| `Inventory` | `src/items/Inventory.js` | `items[]` | add, removeOne, removeAt, has, getItemsByType/filter, getItemNames/map, getTotalValue/reduce | 5 |
| `Enemy` | `src/characters/Enemy.js` | hp, maxHp, attack, gold, xp, sprite (ASCII) | isAlive, takeDamage | 3 |
| `Player` | `src/characters/Player.js` | hp/maxHp, attack, nenPower, level, xp, gold, potions, nenCharges (Focus), tempAttack/tempNenPower (aura), inventory | getEffectiveAttack, getEffectiveNenPower, resetAura, takeDamage, heal, gainXP, useNen | 2 |
| `Room` | `src/world/Room.js` | name, description, enemy, item, visited, itemCollected | — | 4 |
| `Dungeon` | `src/world/Dungeon.js` | rooms[9], currentRoom | getCurrentRoom, portalAvailable, moveNext, isAtFinalRoom | 4 |
| `UI` | `src/ui/UI.js` | screen/modal references, hunterSprite, nenDescriptions | show, renderHud, renderMinimap, renderRoom, log, showBattle, setPortrait, openItems, openStatus, showEnd | 5 (renderer) |
| `CombatSystem` | `src/combat/CombatSystem.js` | enemy, busy (locks buttons) | startBattle, playerAction, normalAttack, nenAttack, enemyTurn, finishBattle, escape | 3 |
| `Game` | `src/game/Game.js` | player, dungeon, combat, bossDefeated | start, begin, refresh, explore, useNen, useItem, usePotion, useNextRoomPortal, checkExit, gameOver | 1 |

## How a round works (event-driven, not a `while` loop!)
The console version looped with `while (gameRunning) + prompt()`. The web version
replaced the loop with **events**: the browser already runs forever; each button
click calls one Game method, which updates the model and asks UI to re-render.

```text
player clicks  ->  main.js listener  ->  Game method (changes data)
                                       ->  this.refresh()
                                            -> ui.renderHud / renderMinimap / renderRoom
```

Battle is the same idea but with a keyboard-free turn rhythm:
`playerAction()` runs your move, then locks buttons (`busy = true`) and uses
`setTimeout(..., 450)` to delay the enemy turn — that pause *is* the animation beat.

## Where each assignment concept lives (for the checklist)
- **let/const** — every class file's fields.
- **if/else + switch** — `Game.explore` (branches), `Player.useNen` (switch on nenType), `CombatSystem.playerAction` (switch on action).
- **loops** — `gainXP` while-loop over level ups, `forEach` in renderMinimap/log.
- **functions/methods** — 30+ across the classes.
- **array/object** — `Dungeon.rooms` is an array of Room objects; Inventory array of Item objects.
- **higher-order functions** — Inventory `filter/map/reduce`, Dungeon `showMap/map/reduce`.
- **class + constructor + method** — all 9 classes.
- **I/O** — DOM text input + button clicks in, rendered panels out (no `prompt()` anywhere).
- **clean code** — one responsibility per class/file; UI is the only DOM file.
