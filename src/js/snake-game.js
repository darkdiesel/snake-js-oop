import Game from "./src/game.js";

export default class SnakeGame {
    constructor(container, options) {
        this.game = new Game(container, options); // create game
    }

    start() {
        this.game.start();
    }

    stop() {
        this.game.stop();
    }

    pause() {
        this.game.pause();
    }

    reset() {
        this.game.reset();
    }

    mute( mute = true) {
        this.game.mute(mute);
    }

    setSpeed(speed) {
        this.game.setSpeed(speed);
    }

    setVolume(volume) {
        this.game.setVolume(volume);
    }

    setWalls(walls) {
        this.game.setWalls(walls);
    }
}

window.SnakeGame = SnakeGame;

//new SnakeGame( document.querySelector(".canvas-wrapper") );
