# Member 1 — Game Flow Visual (web version)

```text
main.js  (creates UI + Game, connects EVERY button press)
  |
  v
Game
  |
  +--> start()        -> Setup screen (name + 6 Nen cards)
  +--> begin()        -> creates Player + CombatSystem, enters game screen
  |
  v
refresh()  <-- called after every action
  |
  +--> renderHud / renderMinimap / renderRoom / button lock states
  |
  +--> explore()            -> discover enemy / item / nothing
  +--> useNen()             -> spends Nen Focus charge, grants temporary aura
  +--> openItems()          -> item modal (uses useItem/usePotion)
  +--> useNextRoomPortal()  -> cleared-room gate; +1 Focus on enter
  +--> checkExit()          -> at Exit: needs License Key + boss down -> Win
  |
  v
win / game over / quit
```

Key switch from the console version: no `while (gameRunning)` + `prompt()` loop —
the browser event loop replaces it; every click runs exactly one Game method.
