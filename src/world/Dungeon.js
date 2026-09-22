// Creates and manages all dungeon rooms.
class Dungeon {
  constructor() {
    this.currentRoom = 0;
    this.rooms = [
      new Room(
        "Hunter Exam Entrance",
        "The Hunter Exam begins here. A mysterious dungeon lies ahead."
      ),
      new Room(
        "Chimera Ant Room",
        "A Chimera Ant Soldier blocks the path.",
        new Enemy("Chimera Ant Soldier", 45, 10, 25, 30)
      ),
      new Room(
        "Treasure Room",
        "An old chest is hidden behind a broken stone wall.",
        null,
        new Item("Recovery Drink", "heal", 30)
      ),
      new Room(
        "Phantom Beast Room",
        "A powerful Phantom Beast watches you from the shadows.",
        new Enemy("Phantom Beast", 65, 15, 40, 45)
      ),
      new Room(
        "Nen Training Room",
        "Ancient Nen symbols cover the walls. Your aura reacts to them.",
        null,
        new Item("Hunter Blade", "weapon", 10)
      ),
      new Room(
        "Secret Corridor",
        "A narrow corridor contains a mysterious Hunter supply box.",
        null,
        new Item("Recovery Drink", "heal", 30)
      ),
      new Room(
        "Hunter License Chamber",
        "The Hunter License Key rests on a glowing stone table.",
        null,
        new Item("Hunter License Key", "key", 1)
      ),
      new Room(
        "Final Gate",
        "A giant gate stands before you. Something powerful guards it.",
        new Enemy("Elite Nen Guardian", 100, 20, 100, 80)
      ),
      new Room(
        "Exit",
        "The final door waits beyond the dungeon."
      )
    ];
  }

  getCurrentRoom() {
    return this.rooms[this.currentRoom];
  }

  isAtFinalRoom() {
    return this.currentRoom === this.rooms.length - 1;
  }

  moveNext() {
    if (!this.isAtFinalRoom()) {
      this.currentRoom++;
      return true;
    }
    return false;
  }

  portalAvailable() {
    const room = this.getCurrentRoom();
    if (!room.visited) return false;
    if (room.enemy && room.enemy.isAlive()) return false;
    return !this.isAtFinalRoom();
  }

  showRoom() {
    const room = this.getCurrentRoom();
    console.log("\n========================================");
    console.log("             CURRENT ROOM");
    console.log("========================================");
    console.log(`Location: ${room.name}`);
    console.log(room.description);
    if (room.enemy && room.enemy.isAlive()) {
      console.log(`> Enemy detected: ${room.enemy.name}`);
    }
    console.log("========================================");
  }

  showRoomNames() {
    // Higher-order function: map()
    const names = this.rooms.map((room, index) => `${index + 1}. ${room.name}`);
    console.log("\n============== DUNGEON ROOMS ==============");
    names.forEach(name => console.log(name));
    console.log("============================================");
  }

  showMap() {
    // filter() is used to count cleared/visited rooms.
    const visitedCount = this.rooms.filter(room => room.visited).length;

    console.log("\n================ DUNGEON MAP ================");
    this.rooms.forEach((room, index) => {
      let marker = " ? UNKNOWN";
      if (index === this.currentRoom) marker = " ← YOU ARE HERE";
      else if (room.visited) marker = " ✓ CLEARED";
      console.log(`${index + 1}. ${room.name}${marker}`);
    });
    console.log(`Visited rooms: ${visitedCount}/${this.rooms.length}`);
    console.log("==============================================");
  }

  getTotalEnemyGold() {
    // Higher-order function: reduce()
    return this.rooms.reduce((total, room) => {
      return total + (room.enemy ? room.enemy.gold : 0);
    }, 0);
  }
}
