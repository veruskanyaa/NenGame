# Mechanics Reference — Numbers and Formulas (for balancing your defs)

All randomness is `Math.floor(Math.random() * N)`, i.e. 0..N-1.

## Player
| Start value | Notes |
|---|---|
| HP 100 / maxHp 100 | Level up: maxHp +10, HP fully restored |
| Attack 20 | Level up +3 |
| Nen Power 30 | Level up +5 |
| XP curve | level 1 needs 50 XP, then each level needs +30 more |
| Potions start 1 | heal 30, capped at maxHp |
| Nen Focus (charges) | start 1, max 3, +1 whenever you enter a room through the portal |
| Permanent ATK/NEN growth | ONLY level ups and the Hunter Blade item |

## Damage formulas
| Attack | Chance | Damage |
|---|---|---|
| Normal Attack | 75% hit | `0..10 + effective ATK - 5` (min 1), 15% chance crit = x2 |
| Nen Attack | 85% hit | `effective NEN/2 + 0..10`, 20% chance +extra `effective NEN/2` |
| Miss | normal 25% / nen 15% | 0 |
| Enemy turn | always | `enemy ATK + 0..5` |
| Your Defend | — | enemy damage halved for that turn |
| Manipulation Nen | 35% per enemy turn | enemy damage halved |

`effective` = base stat + temporary aura (`getEffectiveAttack()` in Player.js).

## Nen system (the two "fixes for being OP")
1. **Focus charges** — you can only *activate* Nen 1 time at start; each cleared
   portal entry restores +1 (max 3). Prevents unlimited activations.
2. **Temporary aura** — activating Nen sets `tempAttack`/`tempNenPower` (one aura
   active at a time; a new use replaces it). The buff disappears when the battle
   ends or you Run (`resetAura()`). Prevents permanent stacking before every fight.

| Nen type | Aura value |
|---|---|
| Enhancement | ATK +5 |
| Emission | NEN +10 |
| Transmutation | NEN +8 |
| Conjuration | ATK +7 |
| Manipulation | NEN +5 (+35% damage halve per enemy turn passive) |
| Specialization | NEN +5..25 random |

HUD shows buffs as `20+5`; it clears after battle.

## Enemies (as built in Dungeon.js constructor)
| Enemy | HP | ATK | Gold | XP |
|---|---|---|---|---|
| Chimera Ant Soldier | 45 | 10 | 25 | 30 |
| Phantom Beast | 65 | 15 | 40 | 45 |
| Elite Nen Guardian (boss) | 90 | 17 | 100 | 80 |

Level curve by design: two minions (75 XP total) put you around level 3 at the boss
with roughly 120 max HP and 26 ATK — boss takes ~5 turns with Nen aura; total XP on
the map is 155.

## Gold
- Defeat reward: enemy gold (see table).
- Explore bonus: 25% chance of +5..+20.

Win requirement: be at Exit room + have Hunter License Key (Hunter License Chamber)
+ `bossDefeated` flag (killing Elite Nen Guardian sets it, in `finishBattle`).

## Want to change the difficulty? One file: `src/world/Dungeon.js`
Enemy tuples are `new Enemy(name, hp, attack, gold, xp)`. Since portraits use
`name.toLowerCase().replace(/ /g, "-")` + `.png`, renaming an enemy silently moves
its picture — that's intentional, documented in 07.
