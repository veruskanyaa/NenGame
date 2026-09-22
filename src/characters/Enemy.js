// Represents an enemy that can fight the player.
class Enemy {
  constructor(name, hp, attack, gold, xp) {
    this.name = name;
    this.hp = hp;
    this.maxHp = hp;
    this.attack = attack;
    this.gold = gold;
    this.xp = xp;
  }

  isAlive() {
    return this.hp > 0;
  }

  takeDamage(amount) {
    this.hp = Math.max(0, this.hp - amount);
  }
}
