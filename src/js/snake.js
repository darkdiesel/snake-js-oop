import {isNullOrUndefined} from "./functions";
import controlsTouch from "./control-touch";

export default class Snake {

    constructor(config, canvas, controls) {
        this.config = config;
        this.canvas = canvas;

        this.x = this.config.centerX;
        this.y = this.config.centerY;

        this.speedX = this.config.pointSizePx;
        this.speedY = 0;

        this.points = [];
        this.maxPoints = this.config.snakeStartSize;

        // snake 1 step move audio
        this.moveAudio = new Audio();
        this.moveAudio.preload = 'auto';
        this.moveAudio.src = '../audio/mr_9999_14.wav';

        // snake crashed move audio
        this.gameOverAudio = new Audio();
        this.gameOverAudio.preload = 'auto';
        this.gameOverAudio.src = '../audio/mr_9999_08.wav';

        this.config.gameOverStatus = false;

        // init controls
        this.control(controls);
    }

    /**
     * Move snake to direction. Check that the apple has been eaten. Check if snake crashed
     *
     * @param apple
     * @param score
     */
    update(apple, score) {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0) {
            if (this.config.haveWalls) {
                this.config.gameOverStatus = true;
            } else {
                this.x = this.canvas.element.width - this.config.pointSizePx;
            }
        } else if (this.x >= this.canvas.element.width) {
            if (this.config.haveWalls) {
                this.config.gameOverStatus = true;
            } else {
                this.x = 0;
            }
        }

        if (this.y < 0) {
            if (this.config.haveWalls) {
                this.config.gameOverStatus = true;
            } else {
                this.y = this.canvas.element.height - this.config.pointSizePx;
            }
        } else if (this.y >= this.canvas.element.height) {
            if (this.config.haveWalls) {
                this.config.gameOverStatus = true;
            } else {
                this.y = 0;
            }
        }

        this.points.unshift({x: this.x, y: this.y});

        if (this.points.length > this.maxPoints) {
            this.points.pop();
        }

        this.points.forEach((el, index) => {
            if (el.x === apple.x && el.y === apple.y) {
                apple.startEatSound();
                this.maxPoints++;
                score.incScore();
                apple.randomPosition();
            }

            for (let i = index + 1; i < this.points.length; i++) {
                if (el.x === this.points[i].x && el.y === this.points[i].y) {
                    this.config.gameOverStatus = true;
                }
            }
        });

        if (this.config.gameOverStatus) {
            this.gameOver();
            score.setToZero();
            apple.randomPosition();
        }
    }

    /**
     * Check if snake not rotated back while standing on one cell
     * @param speedX
     * @param speedY
     * @returns {boolean}
     */
    checkIfTurnBack(speedX, speedY) {
        if (typeof this.points[1] === 'undefined') {
            return false;
        }

        let x = this.x + speedX;
        let y = this.y + speedY;

        return (this.points[1].x === x) && (this.points[1].y === y);
    }

    /**
     * Draw snake by Points. First point as head draw with different color
     */
    draw() {
        this.points.forEach((el) => {
            this.canvas.drawCell(el.x, el.y, this.config.snakeColor);
        });
    }

    /**
     * Play move sound when snake is moving
     */
    startMoveSound() {
        if (!this.config.mute) {
            this.moveAudio.volume = this.config.gameVolume;
            this.moveAudio.play().then(() => {
            });
        }
    }

    /**
     * Stop playing move sound when snake is moving
     */
    stopMoveSound() {
        if (!this.config.mute) {
            this.moveAudio.pause();
            this.moveAudio.currentTime = 0;
        }
    }

    /**
     * Play boom sound when snake is crashed
     */
    startGameOverSound() {
        if (!this.config.mute) {
            this.gameOverAudio.volume = this.config.gameVolume;
            this.gameOverAudio.play().then(() => {
            });
        }
    }

    /**
     * Stop playing boom sound when snake is crashed
     */
    stopGameOverSound() {
        if (!this.config.mute) {
            this.gameOverAudio.pause();
            this.gameOverAudio.currentTime = 0;
        }
    }

    /**
     * Reset snake params in case of game over
     */
    gameOver() {
        this.startGameOverSound();

        this.x = this.config.centerX;
        this.y = this.config.centerY;

        this.speedX = this.config.pointSizePx;
        this.speedY = 0;

        this.points = [];
        this.maxPoints = this.config.snakeStartSize;

        // this.config.gameOverStatus = false;
    }

    /**
     * Check controls
     */
    control(controls) {
        // html buttons controls
        if (!isNullOrUndefined(controls.btnUp)) {
            controls.btnUp.addEventListener("click", async () => {
                this.moveUp();
            });
        }

        if (!isNullOrUndefined(controls.btnDown)) {
            controls.btnDown.addEventListener("click", async () => {
                this.moveDown();
            });
        }

        if (!isNullOrUndefined(controls.btnDown)) {
            controls.btnLeft.addEventListener("click", async () => {
                this.moveLeft();
            });
        }

        if (!isNullOrUndefined(controls.btnDown)) {
            controls.btnRight.addEventListener("click", async () => {
                this.moveRight();
            });
        }

        // touch swipe controls
        new controlsTouch(this.canvas, () => {this.moveUp();}, () => {this.moveDown();}, () => {this.moveLeft();}, () => {this.moveRight();});

        // keyboard controls (wasd, arrows, numpad arrows)
        document.addEventListener("keydown", (e) => {
            switch (e.code) {
                case "KeyW":
                case "ArrowUp":
                case "Numpad8":
                    e.preventDefault();
                    this.moveUp();
                    break;
                case "KeyS":
                case "ArrowDown":
                case "Numpad2":
                    e.preventDefault();
                    this.moveDown();
                    break;
                case "KeyA":
                case "ArrowLeft":
                case "Numpad4":
                    e.preventDefault();
                    this.moveLeft();
                    break;
                case "KeyD":
                case "ArrowRight":
                case "Numpad6":
                    e.preventDefault();
                    this.moveRight();
                    break;
            }
        });
    }

    moveUp() {
        if (!this.checkIfTurnBack(0, -this.config.pointSizePx)) {
            this.speedX = 0;
            this.speedY = -this.config.pointSizePx;
        }
    }

    moveDown() {
        if (!this.checkIfTurnBack(0, this.config.pointSizePx)) {
            this.speedX = 0;
            this.speedY = this.config.pointSizePx;
        }
    }

    moveLeft() {
        if (!this.checkIfTurnBack(-this.config.pointSizePx, 0)) {
            this.speedX = -this.config.pointSizePx;
            this.speedY = 0;
        }
    }

    moveRight() {
        if (!this.checkIfTurnBack(this.config.pointSizePx, 0)) {
            this.speedX = this.config.pointSizePx;
            this.speedY = 0;
        }
    }
}
