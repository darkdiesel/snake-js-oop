import Config from "./config.js";

import Settings from "./settings.js";
import Actions from "./actions.js";

import Canvas from "./canvas.js";
import Controls from "./controls.js";
import Score from "./score.js";

import Snake from "./snake.js";
import Apple from "./apple.js";

import Loop from "./loop.js";

import {SELECTOR_SNAKE} from "./constants";

export default class IpaSnakeGame {
    constructor(container, options = {}) {
        if (container === null) {
            return;
        }

        // setup config
        this.config = new Config(options);

        // setup settings
        this.settings = new Settings(container, this.config);

        // create canvas and control elements
        this.canvas = new Canvas(container, this.config);
        this.controls = new Controls(container);
        this.score = new Score(container, 0);

        // game elements
        this.snake = new Snake(this.config, this.canvas, this.controls); // create snake
        this.apple = new Apple(this.config, this.canvas); // create apple

        // this.loop = undefined;
        this.loop = new Loop(this.updateSnake.bind(this), this.drawSnake.bind(this), this.drawApple.bind(this), this.config);

        this.actions = new Actions(this.start.bind(this), this.stop.bind(this), this.pause.bind(this), this.reset.bind(this), container, this.config);
    }

    start() {
        this.loop.start();
    }

    stop() {
        this.loop.stop();

        this.snake.gameOver();
        this.score.setToZero();

        this.canvas.clearFull();
    }

    pause() {
        if (this.loop.isActive()) {
            this.loop.stop();
        }
    }

    reset() {
        if (this.loop.isActive()) {
            this.loop.stop();

            this.snake.gameOver();

            this.score.setToZero();
            this.apple.randomPosition();

            this.loop.start();
        }
    }

    updateSnake() {
        if (this.config.gameOverStatus) {
            this.drawGameOver();
        } else {
            this.snake.update(this.apple, this.score);
        }

    }

    drawSnake() {
        this.snake.stopMoveSound();

        this.canvas.clearFull();

        this.snake.startMoveSound();
        this.snake.draw();

        this.apple.draw();

        if (this.config.haveWalls){
            this.canvas.drawWalls();
        }
    }

    drawApple(){
        this.apple.draw(this.canvas, true);
    }

    drawGameOver() {
        for (let y = 0; y < this.canvas.element.height; y+=this.config.pointSizePx) {
            for (let x = 0; x < this.canvas.element.width; x+=this.config.pointSizePx) {
                this.canvas.drawCell(x, y, this.config.snakeColor);
            }
        }

        this.config.gameOverStatus = false;
    }
}

new IpaSnakeGame( document.querySelector(SELECTOR_SNAKE) );