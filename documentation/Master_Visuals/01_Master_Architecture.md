# Master OOP Architecture

```text
                         MAIN
                          |
                          v
                        GAME
              ____________|____________
             |            |            |
             v            v            v
          PLAYER       DUNGEON     COMBAT SYSTEM
             |            |            |
             |            v            |
             |           ROOM          |
             |        ____|____        |
             |       |         |       |
             |       v         v       |
             |     ENEMY      ITEM     |
             |                 |       |
             |                 v       |
             |              INVENTORY  |
             |_________________________|
```

## One-sentence explanation
`Game` coordinates the program, `Player` stores the hunter, `Dungeon` manages `Room` objects, each room can contain an `Enemy` or `Item`, and `CombatSystem` handles battles.
