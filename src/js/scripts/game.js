import Canvas from "./canvas.js";
import Loop from "./loop.js";
import Snake from "./snake.js";
import Score from "./score.js";
import Apple from "./apple.js";
import Config from "./config.js";

export default class Game {

    constructor(container, options = {}) {
        this.config = new Config(options);
        this.canvas = new Canvas(container); // create canvas
        this.snake = new Snake(this.config);
        this.apple = new Apple(this.canvas, this.config); // create apple
        this.score = new Score(".game-score .score-count", 0);
        new Loop(this.update.bind(this), this.draw.bind(this), this.config);
    }

    start() {

    }

    pause() {

    }

    reset() {

    }

    mute() {

    }

    update() {
        this.snake.update(this.apple, this.score, this.canvas);
    }

    draw() {
        this.snake.stopMoveSound();
        this.canvas.context.clearRect(0, 0, this.canvas.element.width, this.canvas.element.height);

        this.snake.startMoveSound();
        this.snake.draw(this.canvas.context);

        this.apple.draw(this.canvas.context);
    }
}
