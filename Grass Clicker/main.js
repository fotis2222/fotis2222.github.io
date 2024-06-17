"use strict";
const grassDisplay = document.getElementById("grassDisplay");
const xpDisplay = document.getElementById("xpDisplay");
const prestigeButton = document.getElementById("presBtn");
// game data
let game = {
    grass: 0,
    grassMulti: 1,
    xp: 0,
    xpMulti: 1,
    levelReq: 30,
    level: 0,
    pp: 0,
};
// every upgrade in the game so far with its info
let upgs = {
    GV_1: {
        cost: 15,
        costScaling: 1.2,
        name: "Grass Value I",
        currency: "Grass",
        buy: function (game) {
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
        buy: function (game) {
            if (game.grass >= this.cost) {
                game.grass -= this.cost;
                this.cost = Math.floor(this.cost * this.costScaling);
                game.xpMulti += 1;
            }
        },
    },
};
// self-explanatory
function cut() {
    game.grass += game.grassMulti;
    game.xp += game.xpMulti;
    if (game.xp >= game.levelReq) {
        game.level += 1;
        game.xp -= game.levelReq;
        game.levelReq = Math.floor(game.levelReq * 1.2);
    }
    console.log(`Grass: ${game.grass}`);
    if (grassDisplay)
        grassDisplay.textContent = `${game.grass} Grass`;
    if (xpDisplay)
        xpDisplay.textContent = `Level ${game.level} (${game.xp}/${game.levelReq})`;
    updatePP(); // Ensure PP is updated after cutting grass
}
// QoL Buy function
function buy(upg, id) {
    console.log("Buying upgrade:", upg.name);
    upg.buy(game);
    const btn = document.getElementById(id);
    if (btn) {
        console.log(`Updating button text to: ${upg.name}<br>Cost: ${upg.cost} Grass`);
        btn.innerHTML = `${upg.name}<br>Cost: ${upg.cost} Grass`;
    }
    else {
        console.log("Button element not found");
    }
    if (grassDisplay) {
        grassDisplay.textContent = `${game.grass} Grass`;
    }
    updatePP(); // Ensure PP is updated after buying an upgrade
}
// Reset upgrade buttons
function resetUpgradeButtons() {
    for (const key in upgs) {
        const upg = upgs[key];
        const btn = document.getElementById(key);
        if (btn) {
            btn.innerHTML = `${upg.name}<br>Cost: ${upg.cost} Grass`;
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
        updatePP(); // Ensure PP is updated after prestige
    }
}
function updatePP() {
    console.log("updated");
    if (prestigeButton) {
        const prestigePoints = Math.floor(9 * Math.pow(1.4, game.level / 10) * Math.pow(1.15, Math.log10(game.grass + 1))); // Adding 1 to avoid log10(0)
        prestigeButton.innerHTML = `Prestige<br>Reset everything up to this point for PP<br>You will earn ${prestigePoints} PP`;
    }
}
setInterval(function () {
    cut();
}, 1000);
//# sourceMappingURL=main.js.map