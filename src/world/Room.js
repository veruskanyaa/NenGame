// Represents one location in the dungeon.
class Room {
  constructor(name, description, enemy = null, item = null) {
    this.name = name;
    this.description = description;
    this.enemy = enemy;
    this.item = item;
    this.visited = false;
    this.itemCollected = false;
  }
}
