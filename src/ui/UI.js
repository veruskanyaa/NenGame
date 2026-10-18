// Central renderer that owns all DOM output so classes never touch the page directly.
class UI {
  constructor() {
    this.screens = {
      title: document.getElementById("screen-title"),
      setup: document.getElementById("screen-setup"),
      game: document.getElementById("screen-game")
    };
    this.modalGuide = document.getElementById("modal-guide");
    this.modalItems = document.getElementById("modal-items");
    this.modalStatus = document.getElementById("modal-status");
    this.screenBattle = document.getElementById("screen-battle");
    this.screenWin = document.getElementById("screen-win");
    this.screenLose = document.getElementById("screen-lose");
    this.nenDescriptions = {
      Enhancement: "Strong physical attacks",
      Emission: "Powerful aura attacks",
      Transmutation: "Flexible aura power",
      Conjuration: "Creates powerful weapons",
      Manipulation: "Weakens enemy actions",
      Specialization: "Random unique effects"
    };
    this.hunterSprite = "  o\n /|\\\n/ | \\\n / \\";
  }

  show(screenName) {
    Object.values(this.screens).forEach(screen => screen.classList.remove("active"));
    this.screens[screenName].classList.add("active");
  }

  closeModals() {
    [this.modalGuide, this.modalItems, this.modalStatus].forEach(el => el.classList.add("hidden"));
  }

  toggleModal(modal, show) {
    modal.classList.toggle("hidden", !show);
  }

  getName() {
    const input = document.getElementById("inputName");
    const name = input.value.trim();
    if (name) return name;
    input.value = "Unknown Hunter";
    return "Unknown Hunter";
  }

  buildNenCards(onSelect) {
    const grid = document.getElementById("nenTypes");
    grid.innerHTML = "";
    Object.entries(this.nenDescriptions).forEach(([name, desc]) => {
      const card = document.createElement("div");
      card.className = "nen-card";
      card.innerHTML = `<b>${name}</b><small>${desc}</small>`;
      card.addEventListener("click", () => {
        grid.querySelectorAll(".nen-card").forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
        onSelect(name);
      });
      grid.appendChild(card);
    });
  }

  renderHud(player) {
    document.getElementById("hudName").textContent = player.name;
    document.getElementById("hudNen").textContent = player.nenType;
    document.getElementById("hudLevel").textContent = `Lv ${player.level}`;
    this.setBarHp(player.hp, player.maxHp);
    this.setBarXp(player.xp, player.xpToNextLevel);
    document.getElementById("hudGold").textContent = player.gold;
    document.getElementById("hudPotions").textContent = player.potions;
    document.getElementById("hudAttack").textContent = player.tempAttack > 0
      ? `${player.attack}+${player.tempAttack}`
      : player.attack;
    document.getElementById("hudNenPower").textContent = player.tempNenPower > 0
      ? `${player.nenPower}+${player.tempNenPower}`
      : player.nenPower;
    document.getElementById("hudNenCharge").textContent = `${player.nenCharges}/${player.maxCharges}`;
  }

  setBarHp(hp, max) {
    const pct = Math.round((hp / max) * 100);
    document.getElementById("barHp").style.width = `${pct}%`;
    document.getElementById("barHpText").textContent = `${hp}/${max}`;
    document.getElementById("barHp").classList.toggle("low", pct <= 25 && pct > 0);
  }

  setBarXp(xp, next) {
    document.getElementById("barXp").style.width = `${Math.round((xp / next) * 100)}%`;
    document.getElementById("barXpText").textContent = `XP ${xp}/${next}`;
  }

  renderMinimap(dungeon) {
    const map = document.getElementById("minimap");
    map.innerHTML = "";
    dungeon.rooms.forEach((room, index) => {
      const cell = document.createElement("div");
      cell.className = "map-room";
      cell.textContent = `${index + 1}. ${room.name}`;
      if (room.visited) cell.classList.add("cleared");
      if (room.item && !room.itemCollected) cell.classList.add("has-item");
      if (room.enemy && room.enemy.isAlive()) cell.classList.add("has-enemy");
      if (index === dungeon.currentRoom) cell.classList.add("current");
      map.appendChild(cell);
    });
  }

  renderRoom(dungeon, player) {
    const room = dungeon.getCurrentRoom();
    document.getElementById("roomName").textContent = room.name;
    document.getElementById("roomDesc").textContent = room.description;

    const status = document.getElementById("roomStatus");
    status.innerHTML = "";
    if (room.enemy && room.enemy.isAlive()) {
      status.innerHTML = `<span class="enemy-alert">! ${room.enemy.name} blocks the path! (HP ${room.enemy.hp}/${room.enemy.maxHp})</span>`;
    } else if (room.item && !room.itemCollected) {
      status.innerHTML = `<span class="item-hint">> Something shiny hides here...</span>`;
    } else if (room.visited) {
      status.innerHTML = `<span class="cleared-hint">[OK] Room cleared. The portal is ${dungeon.portalAvailable() ? "open" : "closed"}.</span>`;
    }
  }

  setActionsLocked(locked) {
    document.querySelectorAll("#screen-game .action-btn").forEach(btn => btn.disabled = locked);
  }

  log(messages, cls = "system", panel = "gameLog") {
    const box = document.getElementById(panel);
    const arr = Array.isArray(messages) ? messages : [messages];
    arr.forEach(text => {
      const line = document.createElement("div");
      line.className = `log-line ${cls}`;
      line.textContent = text;
      box.appendChild(line);
    });
    box.scrollTop = box.scrollHeight;
  }

  clearLog(panel = "gameLog") {
    document.getElementById(panel).innerHTML = "";
  }

  makeSlug(name) {
    return name.toLowerCase().replace(/\s+/g, "-");
  }

  setPortrait(portraitEl, slug, artFallback) {
    portraitEl.innerHTML = artFallback;
    const img = new Image();
    img.className = "portrait-img";
    img.alt = portraitEl.id;
    img.onload = () => {
      portraitEl.innerHTML = "";
      portraitEl.appendChild(img);
    };
    img.onerror = () => {
      portraitEl.innerHTML = artFallback;
    };
    img.src = `images/sprites/${slug}.png`;
  }

  showBattle(player, enemy, roomLabel) {
    document.getElementById("bPlayerName").textContent = player.name;
    document.getElementById("bEnemyName").textContent = enemy.name;
    this.setPortrait(
      document.getElementById("portraitPlayer"),
      this.makeSlug(player.name) || "hunter",
      `<pre class="sprite">${this.hunterSprite}</pre>`
    );
    this.setPortrait(
      document.getElementById("portraitEnemy"),
      this.makeSlug(enemy.name),
      enemy.sprite ? `<pre class="sprite">${enemy.sprite}</pre>` : "???"
    );
    document.getElementById("bRoomName").textContent = roomLabel;
    this.renderBattleStats(player, enemy);
    this.clearLog("bLog");
    this.screenBattle.classList.remove("hidden");
  }

  hideBattle() {
    this.screenBattle.classList.add("hidden");
  }

  renderBattleStats(player, enemy) {
    const hpPct = Math.round((player.hp / player.maxHp) * 100);
    const enemyPct = Math.round((enemy.hp / enemy.maxHp) * 100);
    document.getElementById("bBarHp").style.width = `${hpPct}%`;
    document.getElementById("bBarHpText").textContent = `${player.hp}/${player.maxHp}`;
    document.getElementById("bBarEnemy").style.width = `${enemyPct}%`;
    document.getElementById("bBarEnemyText").textContent = `${enemy.hp}/${enemy.maxHp}`;
    document.getElementById("bBarHp").classList.toggle("low", hpPct <= 25 && hpPct > 0);
  }

  flash(who) {
    const el = document.getElementById(who === "player" ? "portraitPlayer" : "portraitEnemy");
    el.classList.remove("hit");
    void el.offsetWidth;
    el.classList.add("hit");
  }

  setBattleLocked(locked) {
    document.querySelectorAll(".battle-actions .action-btn").forEach(btn => btn.disabled = locked);
  }

  lockGame(locked) {
    this.setActionsLocked(locked);
  }

  setPotionEnabled(enabled) {
    document.getElementById("bPotion").disabled = !enabled;
  }

  openItems(inventory, onUse) {
    const list = document.getElementById("itemList");
    list.innerHTML = "";
    if (inventory.isEmpty()) {
      list.innerHTML = `<li class="empty-note">Your bag is empty.</li>`;
    } else {
      inventory.items.forEach((item, index) => {
        const li = document.createElement("li");
        const label = document.createElement("span");
        label.textContent = item.name;
        const useBtn = document.createElement("button");
        useBtn.className = "btn";
        useBtn.textContent = "Use";
        useBtn.addEventListener("click", () => {
          onUse(item, index);
          this.toggleModal(this.modalItems, false);
        });
        li.append(label, useBtn);
        list.appendChild(li);
      });
    }
    this.toggleModal(this.modalItems, true);
  }

  openStatus(player) {
    const inventoryLabel = player.inventory.isEmpty()
      ? "Empty"
      : player.inventory.getItemNames().join(", ");
    const rows = [
      ["Hunter", player.name],
      ["Nen Type", player.nenType],
      ["Level", player.level],
      ["XP", `${player.xp}/${player.xpToNextLevel}`],
      ["HP", `${player.hp}/${player.maxHp}`],
      ["Attack", player.attack],
      ["Nen Power", player.nenPower],
      ["Gold", player.gold],
      ["Potions", player.potions],
      ["Inventory", inventoryLabel],
      ["Item Value", player.inventory.getTotalValue()]
    ];
    document.getElementById("statusBody").innerHTML = rows
      .map(([label, value]) => `<span class="label">${label}</span><span class="value">${value}</span>`)
      .join("");
    this.toggleModal(this.modalStatus, true);
  }

  showEnd(win, player) {
    const tail = `Final Level: ${player.level} · Final Gold: ${player.gold}`;
    if (win) {
      document.getElementById("winText").textContent =
        `Congratulations, ${player.name}! You survived the Nen Dungeon and are now a licensed Hunter. ${tail}`;
      this.screenWin.classList.remove("hidden");
    } else {
      document.getElementById("loseText").textContent =
        `Your HP reached 0. The dungeon claims another Hunter... ${tail}`;
      this.screenLose.classList.remove("hidden");
    }
  }
}
