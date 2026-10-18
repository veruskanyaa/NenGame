// Entry point. Wires the UI screens to the Game object.
const ui = new UI();
const game = new Game(ui);

document.getElementById("btnStartGame").addEventListener("click", () => game.start());
document.getElementById("btnBegin").addEventListener("click", () => game.begin());

document.getElementById("btnHowToPlay").addEventListener("click", () => ui.toggleModal(ui.modalGuide, true));
document.getElementById("btnCloseGuide").addEventListener("click", () => ui.closeModals());

document.getElementById("btnExplore").addEventListener("click", () => game.explore());
document.getElementById("btnFight").addEventListener("click", () =>
  game.combat.startBattle(game.dungeon.getCurrentRoom().enemy));
document.getElementById("btnUseNen").addEventListener("click", () => game.useNen());
document.getElementById("btnUseItem").addEventListener("click", () => game.openItems());
document.getElementById("btnStatus").addEventListener("click", () => ui.openStatus(game.player));
document.getElementById("btnNextRoom").addEventListener("click", () => game.useNextRoomPortal());
document.getElementById("btnQuit").addEventListener("click", () => game.quit());

document.getElementById("btnCloseItems").addEventListener("click", () => ui.closeModals());
document.getElementById("btnCloseStatus").addEventListener("click", () => ui.closeModals());

document.getElementById("bNormal").addEventListener("click", () => game.combat.playerAction("normal"));
document.getElementById("bNen").addEventListener("click", () => game.combat.playerAction("nen"));
document.getElementById("bDefend").addEventListener("click", () => game.combat.playerAction("defend"));
document.getElementById("bPotion").addEventListener("click", () => game.combat.playerAction("potion"));
document.getElementById("bRun").addEventListener("click", () => game.combat.playerAction("run"));

document.getElementById("btnRestartWin").addEventListener("click", () => restart());
document.getElementById("btnRestartLose").addEventListener("click", () => restart());

function restart() {
  ui.screenWin.classList.add("hidden");
  ui.screenLose.classList.add("hidden");
  ui.hideBattle();
  game.start();
}
