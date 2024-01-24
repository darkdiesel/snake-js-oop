import Config from "./config.js";

import Canvas from "./canvas.js";
import Controls from "./controls.js";
import Score from "./score.js";

import Snake from "./snake.js";
import Apple from "./apple.js";

import Loop from "./loop.js";

import {convertVolume, convertSpeed, drawCell} from "./functions.js"

export default class Game {
    constructor(container, options = {}) {
        // setup config
        this.config = new Config(options);

        // create canvas and control elements
        this.canvas = new Canvas(container, this.config);
        this.controls = new Controls(container);
        this.score = new Score(container, 0);

        // game elements
        this.snake = new Snake(this.config, this.controls);
        this.apple = new Apple(this.canvas, this.config); // create apple

        // this.loop = undefined;
        this.loop = new Loop(this.updateSnake.bind(this), this.drawSnake.bind(this), this.drawApple.bind(this), this.config);
    }

    start() {
        this.clearCanvas();
        this.loop.start();
    }

    stop() {
        this.loop.stop();

        this.snake.gameOver();
        this.score.setToZero();

        this.clearCanvas();
    }

    pause() {
        this.loop.stop();
    }

    reset() {
        this.loop.stop();

        this.snake.gameOver();

        this.score.setToZero();
        this.apple.randomPosition();

        this.loop.start();
    }

    mute(mute) {
        if (mute) {
            this.config.mute = true;
        } else {
            this.config.mute = false;
        }
    }

    setSpeed(speed) {
        this.config.snakeTick = convertSpeed(speed);
    }

    setVolume(volume) {
        this.config.gameVolume = convertVolume(volume);
    }

    setWalls(walls) {
        this.config.haveWalls = walls;
    }

    updateSnake() {
        if (this.config.gameOverStatus) {
            this.drawGameOver();
        } else {
            this.snake.update(this.apple, this.score, this.canvas);
        }

    }

    drawSnake() {
        this.snake.stopMoveSound();

        this.clearCanvas();

        this.snake.startMoveSound();
        this.snake.draw(this.canvas.context);

        this.apple.draw(this.canvas.context);
    }

    drawApple(){
        this.apple.draw(this.canvas.context, true);
    }

    clearCanvas() {
        this.canvas.context.clearRect(0, 0, this.canvas.element.width, this.canvas.element.height);
    }

    drawGameOver() {
        for (let y = 0; y < this.canvas.element.height; y+=this.config.pointSizePx) {
            for (let x = 0; x < this.canvas.element.width; x+=this.config.pointSizePx) {
                drawCell(x, y, this.canvas.context, this.config.snakeColor, this.config);
            }
        }

        this.config.gameOverStatus = false;
    }
}
