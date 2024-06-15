"use strict";
const grassDisplay = document.getElementById("grassDisplay");
let game = {
    grass: 0,
};
function cut() {
    game.grass += 1;
    if (grassDisplay)
        grassDisplay.innerHTML = `${game.grass} Grass`;
}
setInterval(function () {
    cut();
}, 1000);
