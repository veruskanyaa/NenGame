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
        new Enemy("Chimera Ant Soldier", 45, 10, 25, 30,
          " \\/ |\n (oo)\n>-||-<\n /  \\"
        )
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
        new Enemy("Phantom Beast", 65, 15, 40, 45,
          " /\\_/\\\n( o o )\n ( ~ )\n(d) (b)"
        )
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
        new Enemy("Elite Nen Guardian", 90, 17, 100, 80,
          "  /\\n /==\\\n (##)\n={++}=\n /||\\"
        )
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
    return { name: room.name, description: room.description };
  }

  showRoomNames() {
    // Higher-order function: map()
    return this.rooms.map((room, index) => `${index + 1}. ${room.name}`);
  }

  showMap() {
    const visitedCount = this.rooms.filter(room => room.visited).length;
    // Higher-order function: map()
    return {
      rows: this.rooms.map((room, index) => ({
        index: index + 1,
        name: room.visited ? room.name : "UNKNOWN",
        marker: index === this.currentRoom ? "YOU ARE HERE" : (room.visited ? "CLEARED" : "UNKNOWN")
      })),
      visitedCount,
      total: this.rooms.length
    };
  }

  getTotalEnemyGold() {
    // Higher-order function: reduce()
    return this.rooms.reduce((total, room) => {
      return total + (room.enemy ? room.enemy.gold : 0);
    }, 0);
  }
}
