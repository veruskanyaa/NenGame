// Controls the overall game flow and connects the other systems together.
class Game {
  constructor(ui) {
    this.gameRunning = false;
    this.bossDefeated = false;
    this.player = null;
    this.dungeon = new Dungeon();
    this.combat = null;
    this.ui = ui;
    this.selectedNen = "Enhancement";
  }

  start() {
    this.gameRunning = true;
    this.bossDefeated = false;
    this.dungeon = new Dungeon();
    this.ui.show("setup");
    this.ui.buildNenCards(name => this.selectedNen = name);
    document.getElementById("btnBegin").disabled = false;
    document.getElementById("btnBegin").textContent = "Begin the Hunter Exam";
  }

  begin() {
    const name = this.ui.getName();
    this.player = new Player(name, this.selectedNen);
    this.combat = new CombatSystem(this.player, this.ui, this);
    this.ui.closeModals();
    this.ui.show("game");
    this.ui.clearLog();

    this.ui.log([
      `Welcome, ${this.player.name}! Nen Type: ${this.player.nenType}.`,
      "Your Hunter Exam begins now!",
      "MISSION: clear every room, claim the Hunter License Key, defeat the Elite Nen Guardian, and escape."
    ], "system");

    this.refresh();
  }

  refresh() {
    this.ui.renderHud(this.player);
    this.ui.renderMinimap(this.dungeon);
    this.ui.renderRoom(this.dungeon, this.player);

    const room = this.dungeon.getCurrentRoom();
    const portalReady = this.dungeon.portalAvailable();
    document.getElementById("btnFight").disabled = !(room.enemy && room.enemy.isAlive());
    document.getElementById("btnExplore").disabled = room.visited;
    document.getElementById("btnUseNen").disabled = this.player.nenCharges <= 0;
    document.getElementById("btnNextRoom").disabled = !portalReady;
  }

  explore() {
    this.ui.setActionsLocked(true);
    const room = this.dungeon.getCurrentRoom();

    if (room.visited) {
      this.ui.log("You already explored this room.", "system");
      this.ui.setActionsLocked(false);
      return;
    }
    room.visited = true;

    if (room.enemy && room.enemy.isAlive()) {
      this.ui.log([`ENCOUNTER! A ${room.enemy.name} appears!`], "bad");
    } else if (room.item) {
      this.ui.log([`TREASURE FOUND! You obtained: ${room.item.name}`], "gold");
      this.player.inventory.add(room.item);
      room.itemCollected = true;
      if (room.item.type === "heal") {
        this.player.potions++;
        this.ui.log("Potion count increased.", "good");
      }
    } else {
      this.ui.log(["You search the room... The area is empty, but the path continues."], "system");
    }

    this.maybeBonusGold();
    this.ui.setActionsLocked(false);
    this.refresh();
  }

  maybeBonusGold() {
    if (Math.floor(Math.random() * 100) < 25) {
      const bonusGold = Math.floor(Math.random() * 16) + 5;
      this.player.gold += bonusGold;
      this.ui.log(`Bonus discovery! You found ${bonusGold} gold.`, "gold");
    }
  }

  useItem(item, index) {
    if (item.name === "Recovery Drink") {
      if (!this.usePotion()) return;
    } else if (item.name === "Hunter Blade") {
      this.player.attack += 10;
      this.player.inventory.removeAt(index);
      this.ui.log("Hunter Blade equipped! Attack +10.", "good");
    } else if (item.name === "Hunter License Key") {
      this.ui.log("This key unlocks the final exit.", "system");
    } else {
      return;
    }
    this.refresh();
  }

  usePotion() {
    if (this.player.potions <= 0) {
      this.ui.log("You have no Recovery Drinks.", "bad");
      return false;
    }
    if (this.player.hp === this.player.maxHp) {
      this.ui.log("Your HP is already full.", "system");
      return false;
    }

    this.player.potions--;
    this.player.heal(30);
    this.player.inventory.removeOne("Recovery Drink");
    this.ui.log("You used a Recovery Drink.", "good");
    return true;
  }

  useNen() {
    if (this.player.nenCharges <= 0) {
      this.ui.log("Your Nen Focus is spent. Clear rooms to restore it.", "bad");
      return;
    }
    this.ui.setActionsLocked(true);
    this.player.nenCharges--;
    const before = { attack: this.player.attack, nenPower: this.player.nenPower };
    const message = this.player.useNen();
    const dA = this.player.attack - before.attack;
    const dN = this.player.nenPower - before.nenPower;
    const parts = [];
    if (dA > 0) parts.push(`Attack +${dA}`);
    if (dN > 0) parts.push(`Nen Power +${dN}`);
    this.ui.log([message, `Nen Focus: ${this.player.nenCharges}/${this.player.maxCharges}`], "system");
    this.ui.setActionsLocked(false);
    this.refresh();
  }

  openItems() {
    this.ui.openItems(this.player.inventory, (item, index) => this.useItem(item, index));
  }

  useNextRoomPortal() {
    const room = this.dungeon.getCurrentRoom();
    if (this.dungeon.portalAvailable()) {
      this.dungeon.moveNext();
      this.ui.log(`You step into the Nen Portal and arrive at ${this.dungeon.getCurrentRoom().name}.`, "enter");
      if (this.player.nenCharges < this.player.maxCharges) {
        this.player.nenCharges++;
        this.ui.log(`Nen Focus restored: ${this.player.nenCharges}/${this.player.maxCharges}.`, "good");
      }
      this.refresh();
      return;
    }

    if (!room.visited) this.ui.log("Explore this room first.", "system");
    else if (room.enemy && room.enemy.isAlive()) this.ui.log(`Defeat ${room.enemy.name} first.`, "bad");
    else this.ui.log("There is no next-room portal here.", "system");
  }

  afterBattle() {
    this.refresh();
    if (this.dungeon.isAtFinalRoom()) this.checkExit();
  }

  checkExit() {
    if (!this.dungeon.isAtFinalRoom()) return;

    if (!this.player.inventory.has("Hunter License Key")) {
      this.ui.log("The final door is locked. You need the Hunter License Key.", "bad");
      return;
    }
    if (!this.bossDefeated) {
      this.ui.log("The final gate is still protected. Defeat the Elite Nen Guardian first.", "bad");
      return;
    }
    this.ui.showEnd(true, this.player);
  }

  gameOver() {
    this.ui.hideBattle();
    this.ui.showEnd(false, this.player);
  }

  quit() {
    this.ui.log("Thanks for playing, Hunter!", "system");
    this.ui.setActionsLocked(true);
  }
}
