"use strict";
const grassDisplay = document.getElementById("grassDisplay");
const xpDisplay = document.getElementById("xpDisplay");
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
    game.grass += 1 * game.grassMulti;
    game.xp += 1 * game.xpMulti;
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
}
// Function to reset the interval with the updated msPerCut
setInterval(function () {
    cut();
}, 1000);
//# sourceMappingURL=main.js.map