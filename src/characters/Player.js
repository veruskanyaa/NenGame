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
    this.nenCharges = 1;
    this.maxCharges = 3;
    this.tempAttack = 0;
    this.tempNenPower = 0;
    this.inventory = new Inventory();
  }

  takeDamage(damage) {
    let defended = false;
    if (this.defending) {
      damage = Math.floor(damage / 2);
      this.defending = false;
      defended = true;
    }
    this.hp = Math.max(0, this.hp - damage);
    return { damage, defended };
  }

  heal(amount) {
    const oldHp = this.hp;
    this.hp = Math.min(this.maxHp, this.hp + amount);
    return this.hp - oldHp;
  }

  gainXP(amount) {
    this.xp += amount;
    let levelUps = 0;

    while (this.xp >= this.xpToNextLevel) {
      this.xp -= this.xpToNextLevel;
      this.level++;
      this.xpToNextLevel += 30;
      this.maxHp += 10;
      this.hp = this.maxHp;
      this.attack += 3;
      this.nenPower += 5;
      levelUps++;
    }

    return levelUps;
  }

  getEffectiveAttack() {
    return this.attack + this.tempAttack;
  }

  getEffectiveNenPower() {
    return this.nenPower + this.tempNenPower;
  }

  resetAura() {
    this.tempAttack = 0;
    this.tempNenPower = 0;
  }

  useNen() {
    switch (this.nenType) {
      case "Enhancement":
        this.tempAttack = 5;
        return "Ten hardens around your body! Aura: Attack +5 until this battle ends.";
      case "Emission":
        this.tempNenPower = 10;
        return "You fire a powerful aura blast! Aura: Nen Power +10 until this battle ends.";
      case "Transmutation":
        this.tempNenPower = 8;
        return "Your aura changes its properties! Aura: Nen Power +8 until this battle ends.";
      case "Conjuration":
        this.tempAttack = 7;
        return "You conjure a Nen weapon! Aura: Attack +7 until this battle ends.";
      case "Manipulation":
        this.tempNenPower = 5;
        return "You interfere with the enemy's movements! Aura: Nen Power +5 until this battle ends.";
      case "Specialization": {
        const bonus = Math.floor(Math.random() * 21) + 5;
        this.tempNenPower = bonus;
        return `A mysterious Nen effect! Random Nen Power +${bonus} until this battle ends.`;
      }
      default:
        return "Your Nen is still developing.";
    }
  }
}
