# Member 3 — Combat Visual (web version)

```text
GAME SCREEN (btnFight enabled only when an enemy is alive)
  |
  v
CombatSystem.startBattle(enemy)
  |   shows battle overlay: portraits + HP bars + room badge
  |   lockGame(true) -> world buttons frozen, battle buttons live
  v
playerAction(action)  [busy = false; buttons unlocked]
  |
  +--> normalAttack  75% hit, 15% crit x2, dmg = effATK-5..effATK+5
  +--> nenAttack     85% hit, 20% crit,  dmg = effNEN/2 + 0..10
  +--> defend        defending = true (next hit halved)
  +--> potion        uses game.usePotion -> heal 30
  +--> run           escape; aura fades; overlay closes
  |
  v
enemy alive? --yes--> busy = true (buttons lock)
  |                      |  450ms pause = attack animation beat
  |                      v
  |                  enemyTurn(enemy) -> player.takeDamage
  |                      |
  |                      +--> player HP 0 -> gameOver
  |                      +--> busy = false, back to playerAction
  |
  no --> finishBattle: gold += enemy.gold, gainXP(enemy.xp)
         (LEVEL UP messages), boss flag if Elite Nen Guardian,
         resetAura(), close overlay after 900ms -> afterBattle()
```
