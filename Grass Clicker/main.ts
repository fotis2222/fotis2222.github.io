const grassDisplay = document.getElementById("grassDisplay");
const xpDisplay = document.getElementById("xpDisplay");

// upgrade skeleton
interface Upgrade {
  cost: number;
  costScaling: number;
  name: string;

  buy(game: { grass: number; grassMulti: number }): void;
}

// game data
let game = {
  grass: 0,
  grassMulti: 1,
  xp: 0,
};

// every upgrade in the game so far with its info
let upgs: { [key: string]: Upgrade } = {
  GV_1: {
    cost: 15,
    costScaling: 1.2,
    name: "Grass Value I",

    buy: function (game: { grass: number; grassMulti: number }) {
      if (game.grass >= this.cost) {
        game.grass -= this.cost;
        this.cost = Math.floor(this.cost * this.costScaling);
        game.grassMulti += 1;
      }
    },
  },
};

// self-explanatory
function cut() {
  game.grass += 1 * game.grassMulti;
  game.xp += 1;
  console.log(`Grass: ${game.grass}`);
  if (grassDisplay) grassDisplay.textContent = `${game.grass} Grass`;
  if (xpDisplay) xpDisplay.textContent = `${game.xp} XP`;
}

// QoL Buy function
function buy(upg: Upgrade) {
  console.log("Buying upgrade:", upg.name);
  upg.buy(game);
  const btn = document.getElementById("GV_1");
  if (btn) {
    console.log(
      `Updating button text to: ${upg.name}<br>Cost: ${upg.cost} Grass`
    );
    btn.innerHTML = `${upg.name}<br>Cost: ${upg.cost} Grass`;
  } else {
    console.log("Button element not found");
  }
  if (grassDisplay) {
    grassDisplay.textContent = `${game.grass} Grass`;
  }
}

// Increment grass every second
setInterval(function () {
  cut();
}, 1000);
