// Stores and manages the player's Item objects.
class Inventory {
  constructor() {
    this.items = [];
  }

  add(item) {
    this.items.push(item);
  }

  isEmpty() {
    return this.items.length === 0;
  }

  has(name) {
    return this.items.some(item => item.name === name);
  }

  removeOne(name) {
    const index = this.items.findIndex(item => item.name === name);
    if (index >= 0) {
      return this.items.splice(index, 1)[0];
    }
    return null;
  }

  get(index) {
    return this.items[index];
  }

  removeAt(index) {
    if (index < 0 || index >= this.items.length) return null;
    return this.items.splice(index, 1)[0];
  }

  // Higher-order function: filter()
  getItemsByType(type) {
    return this.items.filter(item => item.type === type);
  }

  // Higher-order function: map()
  getItemNames() {
    return this.items.map(item => item.name);
  }

  // Higher-order function: reduce()
  getTotalValue() {
    return this.items.reduce((total, item) => total + item.value, 0);
  }
}
