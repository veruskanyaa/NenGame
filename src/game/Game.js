// Controls the overall game flow and connects the other systems together.
class Game {
  constructor() {
    this.gameRunning = false;
    this.bossDefeated = false;
    this.player = null;
    this.dungeon = new Dungeon();
    this.combat = null;
  }

  start() {
    this.gameRunning = true;
    this.showWelcome();

    const playerName = this.getPlayerName();
    const nenType = this.chooseNenType();
    this.player = new Player(playerName, nenType);
    this.combat = new CombatSystem(this.player, this);

    console.log("\n========================================");
    console.log(`Welcome, ${this.player.name}!`);
    console.log(`Nen Type: ${this.player.nenType}`);
    console.log("Your Hunter Exam begins now!");
    console.log("========================================");

    this.dungeon.showRoomNames();
    console.log(`Total enemy gold available: ${this.dungeon.getTotalEnemyGold()}`);
    this.gameLoop();
  }

  showWelcome() {
    console.log("================================================");
    console.log("         HUNTER × HUNTER: NEN DUNGEON");
    console.log("================================================");
    console.log("Explore the dungeon, master your Nen,");
    console.log("defeat enemies, collect items, and escape.");
    console.log("MISSION:");
    console.log("1. Explore the dungeon.");
    console.log("2. Defeat dangerous enemies.");
    console.log("3. Collect useful items.");
    console.log("4. Obtain the Hunter License Key.");
    console.log("5. Defeat the final guardian.");
    console.log("6. Escape through the final door.");
  }

  getPlayerName() {
    const name = prompt("Enter your Hunter name:");
    return name && name.trim() ? name.trim() : "Unknown Hunter";
  }

  chooseNenType() {
    const types = [
      "Enhancement",
      "Emission",
      "Transmutation",
      "Conjuration",
      "Manipulation",
      "Specialization"
    ];

    while (true) {
      console.log("\n1. Enhancement");
      console.log("2. Emission");
      console.log("3. Transmutation");
      console.log("4. Conjuration");
      console.log("5. Manipulation");
      console.log("6. Specialization");

      const choice = prompt("Choose your Nen type (1-6):");
      if (choice === null) return "Enhancement";

      const index = Number(choice) - 1;
      if (index >= 0 && index < types.length) return types[index];
      console.log("> Invalid choice. Please choose 1-6.");
    }
  }

  showMenu() {
    console.log("\n=============== ACTIONS ===============");
    console.log("1. Explore");
    console.log("2. Fight");
    console.log("3. Defend");
    console.log("4. Use Item");
    console.log("5. Check Status");
    console.log("6. Use Nen");
    console.log("7. Check Map");
    console.log("8. Enter Next Room Portal");
    console.log("9. Exit Game");
    console.log("========================================");
  }

  gameLoop() {
    while (this.gameRunning) {
      this.dungeon.showRoom();
      this.showMenu();

      const choice = prompt("Choose an action (1-9):");
      if (choice === null) {
        this.gameRunning = false;
        break;
      }

      switch (choice.trim()) {
        case "1": this.explore(); break;
        case "2": this.combat.fight(this.dungeon.getCurrentRoom().enemy); break;
        case "3": this.defend(); break;
        case "4": this.useItem(); break;
        case "5": this.player.showStatus(); break;
        case "6": this.player.useNen(); break;
        case "7": this.dungeon.showMap(); break;
        case "8": this.useNextRoomPortal(); break;
        case "9":
          console.log("\nThanks for playing, Hunter!");
          this.gameRunning = false;
          break;
        default:
          console.log("\nInvalid choice. Please choose 1-9.");
      }

      if (this.gameRunning && this.dungeon.isAtFinalRoom()) {
        if (this.checkExit()) this.gameRunning = false;
      }

      if (this.gameRunning) this.showNextRoomPortal();
    }
  }

  explore() {
    const room = this.dungeon.getCurrentRoom();

    if (room.visited) {
      console.log("\n> You already explored this room.");
      return;
    }

    room.visited = true;

    if (room.enemy) {
      console.log("\n> ENCOUNTER!");
      console.log(`A ${room.enemy.name} appears!`);
    } else if (room.item && !room.itemCollected) {
      console.log("\n> TREASURE FOUND!");
      console.log(`You found: ${room.item.name}`);
      this.player.inventory.add(room.item);
      room.itemCollected = true;

      if (room.item.type === "heal") {
        this.player.potions++;
        console.log(`Potion count increased to ${this.player.potions}.`);
      }
    } else {
      console.log("\n> You search the room...");
      console.log("The area is empty, but the path continues.");
    }

    if (Math.floor(Math.random() * 100) < 25) {
      const bonusGold = Math.floor(Math.random() * 16) + 5;
      this.player.gold += bonusGold;
      console.log(`> Bonus discovery! You found ${bonusGold} gold.`);
    }
  }

  defend() {
    this.player.defending = true;
    console.log("\nYou are guarding yourself.");
    console.log("The next enemy attack will deal half damage.");
  }

  usePotion() {
    if (this.player.potions <= 0) {
      console.log("\nYou have no Recovery Drinks.");
      return false;
    }
    if (this.player.hp === this.player.maxHp) {
      console.log("\nYour HP is already full.");
      return false;
    }

    this.player.potions--;
    this.player.heal(30);
    this.player.inventory.removeOne("Recovery Drink");
    console.log("You used a Recovery Drink.");
    return true;
  }

  useItem() {
    const inventory = this.player.inventory;
    if (inventory.isEmpty()) {
      console.log("\nYour inventory is empty.");
      return;
    }

    console.log("\n================ INVENTORY ================");
    inventory.items.forEach((item, index) => console.log(`${index + 1}. ${item.name}`));
    console.log("===========================================");

    const raw = prompt("Choose an item number:");
    if (raw === null) return;
    const index = Number(raw) - 1;
    const item = inventory.get(index);

    if (!item) {
      console.log("Invalid item.");
      return;
    }

    if (item.name === "Recovery Drink") {
      this.usePotion();
    } else if (item.name === "Hunter Blade") {
      this.player.attack += 10;
      inventory.removeAt(index);
      console.log("\nHunter Blade equipped! Attack +10.");
    } else if (item.name === "Hunter License Key") {
      console.log("\nThis key unlocks the final exit.");
    } else {
      console.log("This item cannot be used right now.");
    }
  }

  showNextRoomPortal() {
    if (this.dungeon.portalAvailable()) {
      console.log("\n========================================");
      console.log("          PORTAL UNLOCKED!");
      console.log("========================================");
      console.log(`Next Room: ${this.dungeon.rooms[this.dungeon.currentRoom + 1].name}`);
    }
  }

  useNextRoomPortal() {
    const room = this.dungeon.getCurrentRoom();
    if (!this.dungeon.portalAvailable()) {
      if (!room.visited) console.log("\nExplore this room first.");
      else if (room.enemy && room.enemy.isAlive()) console.log(`\nDefeat ${room.enemy.name} first.`);
      else console.log("\nThere is no next-room portal here.");
      return;
    }

    console.log("\nYou step into the Nen Portal...");
    this.dungeon.moveNext();
    this.dungeon.showRoom();
  }

  checkExit() {
    if (!this.dungeon.isAtFinalRoom()) return false;

    if (!this.player.inventory.has("Hunter License Key")) {
      console.log("\nThe final door is locked. You need the Hunter License Key.");
      return false;
    }

    if (!this.bossDefeated) {
      console.log("\nThe final gate is still protected. Defeat the Elite Nen Guardian first.");
      return false;
    }

    console.log("\n==============================================");
    console.log("          HUNTER EXAM COMPLETE!");
    console.log("==============================================");
    console.log(`Congratulations, ${this.player.name}!`);
    console.log(`Final Level: ${this.player.level}`);
    console.log(`Final Gold : ${this.player.gold}`);
    console.log("==============================================");
    return true;
  }

  gameOver() {
    console.log("\n========================================");
    console.log("               GAME OVER");
    console.log("========================================");
    console.log("Your HP reached 0.");
    console.log(`Final Level: ${this.player.level}`);
    console.log(`Hunter Reward: ${this.player.gold}`);
    console.log("========================================");
    this.gameRunning = false;
  }
}
