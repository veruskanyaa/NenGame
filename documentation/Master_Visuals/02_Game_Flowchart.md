# Game Flowchart

```text
START
  |
  v
Show Welcome
  |
  v
Enter Hunter Name
  |
  v
Choose Nen Type
  |
  v
Create Player
  |
  v
GAME LOOP
  |
  v
Show Current Room
  |
  v
Show Menu
  |
  +--> Explore ------> enemy/item/empty room
  |
  +--> Fight --------> attack / nen / defend / potion / run
  |
  +--> Defend -------> reduce next damage
  |
  +--> Use Item -----> potion / blade / key
  |
  +--> Status -------> show player information
  |
  +--> Use Nen ------> Nen effect based on type
  |
  +--> Map ----------> show room progress
  |
  +--> Portal -------> next room if unlocked
  |
  +--> Exit Game
  |
  v
Final Room?
  |
  +-- No --> back to GAME LOOP
  |
  +-- Yes --> Has Key? --> Boss Defeated?
                         |
                         +-- Yes --> HUNTER EXAM COMPLETE
```
