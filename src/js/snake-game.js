import Game from "./scripts/game.js";

export default class SnakeGame {
    constructor(container, options) {
        this.game = new Game(container, options); // create game
    }
}

window.SnakeGame = SnakeGame;

//new SnakeGame( document.querySelector(".canvas-wrapper") );
// console.log('game load');
