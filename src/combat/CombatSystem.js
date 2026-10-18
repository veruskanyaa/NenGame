// Handles turn-based battles between the Player and an Enemy.
class CombatSystem {
  constructor(player, ui, game) {
    this.player = player;
    this.ui = ui;
    this.game = game;
    this.enemy = null;
    this.busy = false;
  }

  startBattle(enemy) {
    if (!enemy || !enemy.isAlive()) return;

    this.enemy = enemy;
    this.busy = false;
    this.player.defending = false;
    this.ui.lockGame(true);
    const dungeon = this.game.dungeon;
    const roomLabel = `${dungeon.getCurrentRoom().name} (Room ${dungeon.currentRoom + 1}/${dungeon.rooms.length})`;
    this.ui.showBattle(this.player, enemy, roomLabel);
    this.ui.log([
      "BATTLE START!",
      `A wild ${enemy.name} appears! (${enemy.hp}/${enemy.maxHp} HP)`
    ], "bad", "bLog");
    this.refreshControls();
  }

  refreshControls() {
    this.ui.setBattleLocked(this.busy);
    this.ui.setPotionEnabled(this.player.potions > 0 && !this.busy);
  }

  playerAction(action) {
    if (this.busy || !this.enemy || !this.enemy.isAlive()) return;

    switch (action) {
      case "normal":
        this.normalAttack();
        break;
      case "nen":
        this.nenAttack();
        break;
      case "defend":
        this.player.defending = true;
        this.ui.log("You take a defensive stance. (Half incoming damage)", "good", "bLog");
        break;
      case "potion":
        if (!this.game.usePotion()) {
          this.refreshControls();
          return;
        }
        this.ui.log(`HP now ${this.player.hp}/${this.player.maxHp}.`, "good", "bLog");
        break;
      case "run":
        this.escape();
        return;
    }

    this.ui.renderBattleStats(this.player, this.enemy);

    if (this.enemy.isAlive()) {
      this.busy = true;
      this.refreshControls();
      setTimeout(() => {
        this.enemyTurn();
        this.afterPlayerTurn();
      }, 450);
    } else {
      this.busy = false;
      this.finishBattle();
    }
  }

  normalAttack() {
    const enemy = this.enemy;
    if (Math.floor(Math.random() * 100) < 75) {
      let damage = Math.floor(Math.random() * 11) + this.player.getEffectiveAttack() - 5;
      if (damage < 1) damage = 1;
      if (Math.floor(Math.random() * 100) < 15) {
        damage *= 2;
        this.ui.log("CRITICAL HIT!", "bad", "bLog");
      }
      enemy.takeDamage(damage);
      this.ui.flash("enemy");
      this.ui.log(`You dealt ${damage} damage!`, "good", "bLog");
    } else {
      this.ui.log("MISS! Your attack missed!", "system", "bLog");
    }
  }

  nenAttack() {
    const enemy = this.enemy;
    if (Math.floor(Math.random() * 100) < 85) {
      let damage = Math.floor(this.player.getEffectiveNenPower() / 2) + Math.floor(Math.random() * 11);
      if (Math.floor(Math.random() * 100) < 20) {
        damage += Math.floor(this.player.getEffectiveNenPower() / 2);
        this.ui.log("NEN CRITICAL!", "bad", "bLog");
      }
      enemy.takeDamage(damage);
      this.ui.flash("enemy");
      this.ui.log(`Your Nen attack dealt ${damage} damage!`, "good", "bLog");
    } else {
      this.ui.log("Your Nen attack missed!", "system", "bLog");
    }
  }

  enemyTurn() {
    const enemy = this.enemy;
    let damage = enemy.attack + Math.floor(Math.random() * 6);
    if (this.player.nenType === "Manipulation" && Math.floor(Math.random() * 100) < 35) {
      damage = Math.floor(damage / 2);
      this.ui.log("Your Manipulation Nen weakens the enemy!", "good", "bLog");
    }
    this.ui.log(`${enemy.name} attacks!`, "bad", "bLog");
    const result = this.player.takeDamage(damage);
    if (result.defended) {
      this.ui.log("You defended; damage halved!", "good", "bLog");
    }
    this.ui.flash("player");
    this.ui.log(`You received ${result.damage} damage. (HP ${this.player.hp}/${this.player.maxHp})`, "bad", "bLog");
    this.ui.renderBattleStats(this.player, enemy);
  }

  afterPlayerTurn() {
    if (this.player.hp <= 0) {
      this.busy = false;
      this.game.gameOver();
      return;
    }
    this.busy = false;
    this.refreshControls();
    this.ui.renderBattleStats(this.player, this.enemy);
    if (!this.enemy.isAlive()) this.finishBattle();
  }

  finishBattle() {
    const enemy = this.enemy;
    this.ui.log("ENEMY DEFEATED!", "good", "bLog");
    this.ui.log(`You defeated ${enemy.name}!`, "good", "bLog");
    this.player.gold += enemy.gold;
    this.ui.log(`Hunter Reward: +${enemy.gold} gold`, "gold", "bLog");

    const beforeLevel = this.player.level;
    this.player.gainXP(enemy.xp);
    if (this.player.level > beforeLevel) {
      this.ui.log([
        `LEVEL UP! You are now Level ${this.player.level}!`,
        "Max HP +10 · Attack +3 · Nen Power +5 · HP fully restored!"
      ], "gold", "bLog");
    }

    if (enemy.name === "Elite Nen Guardian") {
      this.game.bossDefeated = true;
      this.ui.log("THE FINAL GUARDIAN HAS FALLEN!", "good", "bLog");
    }

    this.player.resetAura();
    this.ui.log("Your aura subsides.", "system", "bLog");

    setTimeout(() => {
      this.ui.hideBattle();
      this.ui.lockGame(false);
      this.enemy = null;
      this.busy = false;
      this.game.afterBattle();
    }, 900);
  }

  escape() {
    this.busy = false;
    this.player.resetAura();
    this.ui.log("You escaped the battle! Your aura subsides.", "system", "bLog");
    setTimeout(() => {
      this.ui.hideBattle();
      this.ui.lockGame(false);
      this.enemy = null;
      this.game.afterBattle();
    }, 500);
  }
}
