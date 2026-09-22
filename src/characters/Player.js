// Represents the Hunter controlled by the player.
class Player {
  constructor(name, nenType) {
    this.name = name;
    this.nenType = nenType;
    this.hp = 100;
    this.maxHp = 100;
    this.attack = 20;
    this.nenPower = 30;
    this.gold = 0;
    this.level = 1;
    this.xp = 0;
    this.xpToNextLevel = 50;
    this.potions = 1;
    this.defending = false;
    this.inventory = new Inventory();
  }

  showStatus() {
    console.log("\n========================================");
    console.log("             HUNTER STATUS");
    console.log("========================================");
    console.log(`Name        : ${this.name}`);
    console.log(`Nen Type    : ${this.nenType}`);
    console.log(`Level       : ${this.level}`);
    console.log(`XP          : ${this.xp}/${this.xpToNextLevel}`);
    console.log(`HP          : ${this.hp}/${this.maxHp}`);
    console.log(`Attack      : ${this.attack}`);
    console.log(`Nen Power   : ${this.nenPower}`);
    console.log(`Hunter Gold : ${this.gold}`);
    console.log(`Potions     : ${this.potions}`);
    console.log(`Inventory   : ${this.inventory.isEmpty() ? "Empty" : this.inventory.getItemNames().join(", ")}`);
    console.log(`Item Value  : ${this.inventory.getTotalValue()}`);
    console.log("========================================");
  }

  takeDamage(damage) {
    if (this.defending) {
      damage = Math.floor(damage / 2);
      console.log("You defended! Damage was reduced by half.");
      this.defending = false;
    }

    this.hp = Math.max(0, this.hp - damage);
    console.log(`You received ${damage} damage!`);
    console.log(`Current HP: ${this.hp}/${this.maxHp}`);
  }

  heal(amount) {
    const oldHp = this.hp;
    this.hp = Math.min(this.maxHp, this.hp + amount);
    console.log(`You recovered ${this.hp - oldHp} HP!`);
    console.log(`Current HP: ${this.hp}/${this.maxHp}`);
  }

  gainXP(amount) {
    this.xp += amount;
    console.log(`XP +${amount}!`);

    while (this.xp >= this.xpToNextLevel) {
      this.xp -= this.xpToNextLevel;
      this.level++;
      this.xpToNextLevel += 30;
      this.maxHp += 10;
      this.hp = this.maxHp;
      this.attack += 3;
      this.nenPower += 5;

      console.log("\nLEVEL UP!");
      console.log(`You are now Level ${this.level}!`);
      console.log("Max HP +10");
      console.log("Attack +3");
      console.log("Nen Power +5");
      console.log("HP fully restored!");
    }
  }

  useNen() {
    console.log("\n========================================");
    console.log("              NEN ABILITY");
    console.log("========================================");

    switch (this.nenType) {
      case "Enhancement":
        this.attack += 5;
        console.log("Ten becomes stronger around your body!");
        console.log("Attack increased by 5.");
        break;
      case "Emission":
        this.nenPower += 10;
        console.log("You fire a powerful aura blast!");
        console.log("Nen Power increased by 10.");
        break;
      case "Transmutation":
        this.nenPower += 8;
        console.log("Your aura changes its properties!");
        console.log("Nen Power increased by 8.");
        break;
      case "Conjuration":
        this.attack += 7;
        console.log("You conjure a Nen weapon!");
        console.log("Attack increased by 7.");
        break;
      case "Manipulation":
        this.nenPower += 5;
        console.log("You interfere with the enemy's movement!");
        console.log("Nen Power increased by 5.");
        break;
      case "Specialization": {
        const bonus = Math.floor(Math.random() * 21) + 5;
        this.nenPower += bonus;
        console.log("A mysterious Nen effect activates!");
        console.log(`Random Nen Power bonus: +${bonus}`);
        break;
      }
      default:
        console.log("Your Nen is still developing.");
    }

    console.log("========================================");
  }
}
