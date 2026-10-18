<div align="center">

# HUNTER × HUNTER: NEN DUNGEON

```
 ╔══════════════════════════════════════════╗
 ║   . . .  THE HUNTER EXAM BEGINS . . .    ║
 ║   8 ROOMS · 1 LICENSE · 1 GUARDIAN       ║
 ╚══════════════════════════════════════════╝
```

**A turn-based dungeon crawler in pure HTML + CSS + JavaScript.**
**No frameworks. No database. No game engine. Just the browser.**

` retro ` ` 3 colors only ` ` no prompts ` ` HCI-designed UI `

Based on the **Nen system** from Hunter × Hunter — rebuild of our original
Java console version, upgraded with a full visual interface for our
**WST-HCI & IM** class.

</div>

---

## The Mission

Clear every dungeon room, claim the **Hunter License Key**, defeat the
**Elite Nen Guardian**, and escape alive. HP 0 = exam failed.

- Choose 1 of 6 Nen types (Enhancement, Emission, Transmutation, Conjuration, Manipulation, Specialization)
- Explore rooms for enemies, treasure and hidden bonus gold
- Turn-based combat: Normal Attack / Nen Attack / Defend / Potion / Run
- Nen Focus system: activating Nen costs charges, and its boost fades when the battle ends — no infinite buff stacking
- 9 hand-made dungeon rooms with a live minimap

## Run it (0 setup)

1. Clone or download this repo
2. Double-click `index.html`
3. Read **How to Play** on the title screen, then start

## What's inside

```text
index.html   -> all screens (title, guide, setup, dungeon, battle, endings)
style.css    -> the whole 3-color Game Boy theme
src/
  ui/UI.js              -> the only file allowed to touch the DOM
  game/Game.js          -> overall flow, exploration, portals, win/lose
  combat/CombatSystem.js-> turn-based battle engine
  characters/Player.js  -> hunter stats, XP/levels, Nen aura
  characters/Enemy.js   -> enemies (+ ASCII portraits)
  world/Room.js  world/Dungeon.js -> the 9-stage dungeon
  items/Item.js  items/Inventory.js -> loot system
documentation/          -> concept, flowcharts (mermaid), formulas, defense plans
```

## Team

| Member | Focus |
|---|---|
| Veruska Inot | Game flow & screens (`Game.js`, `main.js`) |
| Kheara Larisma | Player system (`Player.js`) |
| Yasmin Alimoren | Combat engine (`Enemy.js`, `CombatSystem.js`) |
| Raven Berrame | Dungeon & rooms (`Room.js`, `Dungeon.js`) |
| James Paran | Items + UI renderer (`Item.js`, `Inventory.js`, `UI.js`) |

> Cebu Eastern College · College of Information Technology · 2nd year Sec 6

---

<div align="center">
<em>Built for the class project. The Hunter License is earned in code.</em>
</div>
