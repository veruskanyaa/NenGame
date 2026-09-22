// Entry point. Keeps startup simple and delegates the real work to Game.
document.getElementById("startButton").addEventListener("click", () => {
  const game = new Game();
  game.start();
});
