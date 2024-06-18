const grassDisplay = document.getElementById("grassDisplay");
const xpDisplay = document.getElementById("xpDisplay");
const prestigeButton = document.getElementById("presBtn");
const ppDisplay = document.getElementById("PPDisp");

// upgrade skeleton
interface Upgrade {
  cost: number;
  costScaling: number;
  name: string;
  currency: string;

  buy(game: {
    grass: number;
    grassMulti: number;
    pp: number;
    xp: number;
    xpMulti: number;
    ppGrassMulti: number;
    ppXPMulti: number;
  }): void;
}

// game data
let game = {
  grass: 0,
  grassMulti: 1,
  xp: 0,
  xpMulti: 1,
  levelReq: 30,
  level: 0,
  pp: 0,
  ppGrassMulti: 1,
  ppXPMulti: 1,
};

// every upgrade in the game so far with its info
let upgs: { [key: string]: Upgrade } = {
  GV_1: {
    cost: 15,
    costScaling: 1.2,
    name: "Grass Value I",
    currency: "Grass",

    buy: function (game: { grass: number; grassMulti: number }) {
      if (game.grass >= this.cost) {
        game.grass -= this.cost;
        this.cost = Math.floor(this.cost * this.costScaling);
        game.grassMulti += 1;
      }
    },
  },

  XP_1: {
    cost: 100,
    costScaling: 1.1,
    name: "XP I",
    currency: "Grass",

    buy: function (game: { grass: number; xpMulti: number }) {
      if (game.grass >= this.cost) {
        game.grass -= this.cost;
        this.cost = Math.floor(this.cost * this.costScaling);
        game.xpMulti += 1;
      }
    },
  },

  GV_2: {
    cost: 10,
    costScaling: 1.2,
    name: "Grass Value II",
    currency: "PP",

    buy: function (game: { pp: number; ppGrassMulti: number }) {
      if (game.pp >= this.cost) {
        game.pp -= this.cost;
        this.cost = Math.floor(this.cost * this.costScaling);
        game.ppGrassMulti += 1;
      }
    },
  },

  XP_2: {
    cost: 20,
    costScaling: 1.1,
    name: "XP II",
    currency: "PP",

    buy: function (game: { pp: number; ppXPMulti: number }) {
      if (game.pp >= this.cost) {
        game.pp -= this.cost;
        this.cost = Math.floor(this.cost * this.costScaling);
        game.ppXPMulti += 1;
      }
    },
  },
};

// Reattach methods after loading upgrades from storage
function reattachMethods() {
  for (const key in upgs) {
    const upg = upgs[key];
    if (upg.name === "Grass Value I") {
      upg.buy = function (game: { grass: number; grassMulti: number }) {
        if (game.grass >= this.cost) {
          game.grass -= this.cost;
          this.cost = Math.floor(this.cost * this.costScaling);
          game.grassMulti += 1;
        }
      };
    } else if (upg.name === "XP I") {
      upg.buy = function (game: { grass: number; xpMulti: number }) {
        if (game.grass >= this.cost) {
          game.grass -= this.cost;
          this.cost = Math.floor(this.cost * this.costScaling);
          game.xpMulti += 1;
        }
      };
    } else if (upg.name === "Grass Value II") {
      upg.buy = function (game: { pp: number; ppGrassMulti: number }) {
        if (game.pp >= this.cost) {
          game.pp -= this.cost;
          this.cost = Math.floor(this.cost * this.costScaling);
          game.ppGrassMulti += 1;
        }
      };
    } else if (upg.name === "XP II") {
      upg.buy = function (game: { pp: number; ppXPMulti: number }) {
        if (game.pp >= this.cost) {
          game.pp -= this.cost;
          this.cost = Math.floor(this.cost * this.costScaling);
          game.ppXPMulti += 1;
        }
      };
    }
  }
}

// Save and Load functions
function saveGame() {
  localStorage.setItem('gameState', JSON.stringify(game));
  localStorage.setItem('upgrades', JSON.stringify(upgs));
  console.log('Game saved');
}

function loadGame() {
  const savedGame = localStorage.getItem('gameState');
  const savedUpgs = localStorage.getItem('upgrades');

  if (savedGame) {
    game = JSON.parse(savedGame);
  }

  if (savedUpgs) {
    upgs = JSON.parse(savedUpgs);
    reattachMethods(); // Reattach methods to upgrades
  }

  resetUpgradeButtons(); // Ensure buttons are updated with loaded data
  updateDisplays(); // Update UI with loaded data
  console.log('Game loaded');
}

function updateDisplays() {
  if (grassDisplay) {
    grassDisplay.textContent = `${game.grass} Grass`;
  }
  if (xpDisplay) {
    xpDisplay.textContent = `Level ${game.level} (${game.xp}/${game.levelReq})`;
  }
  if (ppDisplay) {
    ppDisplay.textContent = `${game.pp} PP`;
  }
  updatePP();
}

// self-explanatory
function cut() {
  game.grass += game.grassMulti * game.ppGrassMulti;
  game.xp += game.xpMulti * game.ppXPMulti;
  if (game.xp >= game.levelReq) {
    game.level += 1;
    game.xp -= game.levelReq;
    game.levelReq = Math.floor(game.levelReq * 1.2);
  }
  console.log(`Grass: ${game.grass}`);
  if (grassDisplay) grassDisplay.textContent = `${game.grass} Grass`;
  if (xpDisplay)
    xpDisplay.textContent = `Level ${game.level} (${game.xp}/${game.levelReq})`;
  updatePP();
  saveGame(); // Save game after cutting grass
}

// QoL Buy function
function buy(upg: Upgrade, id: string) {
  console.log("Buying upgrade:", upg.name);
  upg.buy(game);
  const btn = document.getElementById(id);
  if (btn) {
    console.log(
      `Updating button text to: ${upg.name}<br>Cost: ${upg.cost} ${upg.currency}`
    );
    btn.innerHTML = `${upg.name}<br>Cost: ${upg.cost} ${upg.currency}`;
  } else {
    console.log("Button element not found");
  }
  if (grassDisplay) {
    grassDisplay.textContent = `${game.grass} Grass`;
  }
  if (ppDisplay) {
    ppDisplay.textContent = `${game.pp} PP`;
  }
  updatePP();
  saveGame(); // Save game after buying an upgrade
}

// Reset upgrade buttons
function resetUpgradeButtons() {
  for (const key in upgs) {
    const upg = upgs[key];
    const btn = document.getElementById(key);
    if (btn) {
      btn.innerHTML = `${upg.name}<br>Cost: ${upg.cost} ${upg.currency}`;
    }
  }
}

// 1st reset layer
function prestige() {
  const prestigePoints = Math.floor(9 * Math.pow(1.4, game.level / 10) * Math.pow(1.15, Math.log10(game.grass + 1))); // Adding 1 to avoid log10(0)
  if (prestigePoints > 0) {
    game.grass = 0;
    game.grassMulti = 1;
    game.level = 0;
    game.levelReq = 30;
    game.xp = 0;
    game.pp += prestigePoints;
    upgs.GV_1.cost = 15;
    upgs.XP_1.cost = 100;
    resetUpgradeButtons();
    updatePP();
    if (ppDisplay) {
      ppDisplay.textContent = `${game.pp} PP`;
    }
    saveGame(); // Save game after prestige
  }
}

function updatePP() {
  console.log("updated");
  if (prestigeButton) {
    const prestigePoints = Math.floor(9 * Math.pow(1.4, game.level / 10) * Math.pow(1.15, Math.log10(game.grass + 1))); // Adding 1 to avoid log10(0)
    prestigeButton.innerHTML = `Prestige<br>Reset everything* up to this point for PP<br>You will earn ${prestigePoints} PP`;
  }
}

// Load game on start
window.onload = function () {
  loadGame();
  resetUpgradeButtons();
  updateDisplays();
};

setInterval(function () {
  cut();
  updatePP();
  saveGame(); // Save game periodically
}, 1000);
