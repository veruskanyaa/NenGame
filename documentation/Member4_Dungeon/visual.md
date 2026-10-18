# Member 4 — Dungeon Visual (web version)

```text
DUNGEON (fixed array of 9 Room objects built in the constructor)
  |
  +--> Room 1 Hunter Exam Entrance
  +--> Room 2 Chimera Ant Room    (Enemy + ASCII sprite)
  +--> Room 3 Treasure Room       (Recovery Drink)
  +--> Room 4 Phantom Beast Room  (Enemy + sprite)
  +--> Room 5 Nen Training Room   (Hunter Blade)
  +--> Room 6 Secret Corridor     (Recovery Drink)
  +--> Room 7 Hunter License Chamber (Hunter License Key)
  +--> Room 8 Final Gate          (Elite Nen Guardian, boss, 90 HP)
  +--> Room 9 Exit
  |
  v
getCurrentRoom() -> currentRoom index
  |
  +--> Enemy?   Item?   visited?   itemCollected?
  |
  v
portalAvailable()
  +--> visited AND no living enemy AND not the Exit room
  |
  yes -> moveNext(): currentRoom + 1, Nen Focus +1 (max 3)
  no  -> blocked (UI disables the Next Room button)
```

Minimap (rendered by UI.js from dungeon data): names are ALWAYS visible, the
current room is inverted, cleared rooms bright, and uncollected `[ITEM]`/alive
`[!]` tags show what is left. `showMap()` still returns the classic
filter/map/reduce results for the class demo.
