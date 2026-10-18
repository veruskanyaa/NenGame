# Flowcharts — Web Version

(GitHub and VS Code render the `mermaid` blocks; the ASCII version stays in `02_Game_Flowchart.md`.)

## 1. Screen flow
```mermaid
flowchart TD
    A[Title screen] -->|How to Play| G[Guide modal]
    G --> A
    A -->|Start Game| B[Setup screen]
    B -->|Enter name + pick Nen card| T[Game.begin creates Player CombatSystem]
    T --> E[Game screen: HUD + Minimap + Room panel + Log]
    E -->|Fight| K[Battle overlay]
    K -->|Win / Run| E
    K -->|HP = 0| LLOSE[Game Over screen]
    E -->|Quit| Q[Log only, buttons locked]
    E -->|Exit cleared + Key + Boss down| W[Win screen]
    W -->|Play Again| A
    LLOSE -->|Try Again| A
```

## 2. Refresh cycle — what happens after ANY action
```mermaid
flowchart LR
    X[Button click] --> Y[Game method updates data]
    Y --> R[Game.refresh]
    R --> H[renderHud: bars, gold, charges]
    R --> M[renderMinimap: names, current room, item/enemy tags]
    R --> O[renderRoom: name, desc, status line]
    R --> D[re-enable/disable action buttons]
```

## 3. Explore logic (Game.explore)
```mermaid
flowchart TD
    S[Explore pressed] --> V{Room already visited?}
    V -->|yes| A1[Log: already explored - free action]
    V -->|no| NM[Set visited = true]
    NM --> E{Enemy alive here?}
    E -->|yes| AW[Log ENCOUNTER - go fight]
    E -->|no| I{Item here and uncollected?}
    I -->|yes| G[Add item to inventory<br>heal item: potions +1]
    I -->|no| EM[Log: empty room]
    G --> B{25% chance?}
    EM --> B
    B -->|yes| BG[+5..20 bonus gold]
    B -->|no| R[Refresh]
    BG --> R
```

## 4. Battle turn sequence (CombatSystem)
```mermaid
flowchart TD
    ST[startBattle] --> CH[show battle overlay + portraits + room badge]
    CH --> W1[unlock battle buttons]
    W1 --> P{player presses action}
    P -->|Normal Attack| NA[75% hit, dmg = ATK-5..ATK+5<br>15% crit x2]
    P -->|Nen Attack| NE[85% hit, dmg = NEN/2 + 0..10<br>20% bonus +NEN/2]
    P -->|Defend| DF[defending = true<br>next hit halved]
    P -->|Potion| PO{potions > 0 and HP < max?}
    PO -->|no| P
    PO -->|yes| PH[heal 30, potions -1]
    P -->|Run| RU[escape: aura fades, close overlay]
    NA --> EV{enemy alive?}
    NE --> EV
    DF --> EV
    PH --> EV
    EV -->|yes| LOCK[busy = true, lock buttons]
    LOCK --> T[wait 450ms]
    T --> EN[enemy attack + 0..5<br>Manipulation: 35% halved<br>defending: halved]
    EN --> PU{player HP = 0?}
    PU -->|yes| GO[GameOver screen]
    PU -->|no| W1b[busy = false, unlock buttons]
    W1b --> P
    EV -->|no: dead| FIN[finishBattle: gold + XP<br>maybe LEVEL UP, aura fades<br>900ms then close overlay]
    FIN --> AB[Game.afterBattle</br>refresh + checkExit]
```

## 5. Portal / room progression rules (Dungeon.portalAvailable)
```mermaid
flowchart TD
    PT[Next Room pressed] --> PV{room visited?}
    PV -->|no| L1[Log: explore first]
    PV -->|yes| PE{enemy alive?}
    PE -->|yes| L2[Log: defeat enemy first]
    PE -->|no| PF{currentRoom < 8?}
    PF -->|no: at Exit| L3[no portal here]
    PF -->|yes| MV[currentRoom + 1<br>Nen Focus +1 max 3<br>refresh]
```

## 6. Win / lose condition (Game.checkExit)
```mermaid
flowchart TD
    CE[Check exit - runs at Exit room after every action] --> K{License Key in inventory?}
    K -->|no| LK[Log: door is locked]
    K -->|yes| BD{bossDefeated flag?}
    BD -->|no| LB[Log: guardian still alive]
    BD -->|yes| WIN[showWin: congratulations + final level + gold]
```
