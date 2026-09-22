// Handles battles between the Player and Enemy objects.
class CombatSystem {
  constructor(player, game) {
    this.player = player;
    this.game = game;
  }

  fight(enemy) {
    if (!enemy) {
      console.log("\nThere is no enemy here.");
      return;
    }

    if (!enemy.isAlive()) {
      console.log("\n> The enemy has already been defeated.");
      return;
    }

    console.log("\n========================================");
    console.log("             BATTLE START!");
    console.log("========================================");
    console.log(`Enemy: ${enemy.name}`);

    while (enemy.isAlive() && this.player.hp > 0) {
      console.log("\n----------------------------------------");
      console.log(`YOUR HP : ${this.player.hp}/${this.player.maxHp}`);
      console.log(`ENEMY HP: ${enemy.hp}/${enemy.maxHp}`);
      console.log("----------------------------------------");
      console.log("1. Normal Attack");
      console.log("2. Nen Attack");
      console.log("3. Defend");
      console.log("4. Use Potion");
      console.log("5. Run");

      const choice = prompt("Battle action (1-5):");
      if (choice === null) return;

      let playerActed = false;

      switch (choice.trim()) {
        case "1":
          this.normalAttack(enemy);
          playerActed = true;
          break;
        case "2":
          this.nenAttack(enemy);
          playerActed = true;
          break;
        case "3":
          this.player.defending = true;
          console.log("> You take a defensive stance.");
          playerActed = true;
          break;
        case "4":
          playerActed = this.game.usePotion();
          break;
        case "5":
          console.log("> You escaped the battle!");
          return;
        default:
          console.log("> Invalid battle action.");
      }

      if (playerActed && enemy.isAlive()) {
        this.enemyTurn(enemy);
      }
    }

    if (this.player.hp <= 0) {
      this.game.gameOver();
      return;
    }

    if (!enemy.isAlive()) {
      console.log("\n========================================");
      console.log("           ENEMY DEFEATED!");
      console.log("========================================");
      console.log(`You defeated ${enemy.name}!`);
      this.player.gold += enemy.gold;
      this.player.gainXP(enemy.xp);
      console.log(`> Hunter Reward: +${enemy.gold} gold`);

      if (enemy.name === "Elite Nen Guardian") {
        this.game.bossDefeated = true;
        console.log("\n> THE FINAL GUARDIAN HAS FALLEN!");
      }
    }
  }

  normalAttack(enemy) {
    const hitChance = Math.floor(Math.random() * 100);
    if (hitChance < 75) {
      let damage = Math.floor(Math.random() * 11) + this.player.attack - 5;
      if (Math.floor(Math.random() * 100) < 15) {
        damage *= 2;
        console.log("\n> CRITICAL HIT!");
      } else {
        console.log("\n> HIT!");
      }
      enemy.takeDamage(damage);
      console.log(`You dealt ${damage} damage!`);
    } else {
      console.log("\n> MISS! Your attack missed!");
    }
  }

  nenAttack(enemy) {
    const hitChance = Math.floor(Math.random() * 100);
    if (hitChance < 85) {
      let damage = Math.floor(this.player.nenPower / 2) + Math.floor(Math.random() * 11);
      if (Math.floor(Math.random() * 100) < 20) {
        damage += Math.floor(this.player.nenPower / 2);
        console.log("\n> NEN CRITICAL!");
      } else {
        console.log("\n> NEN HIT!");
      }
      enemy.takeDamage(damage);
      console.log(`Your Nen attack dealt ${damage} damage!`);
    } else {
      console.log("\n> Your Nen attack missed!");
    }
  }

  enemyTurn(enemy) {
    let damage = enemy.attack + Math.floor(Math.random() * 6);
    if (this.player.nenType === "Manipulation" && Math.floor(Math.random() * 100) < 35) {
      damage = Math.floor(damage / 2);
      console.log("\n> Your Manipulation Nen weakens the enemy!");
    }
    console.log(`\nMonster ${enemy.name} attacks!`);
    this.player.takeDamage(damage);
  }
}
