export default class Snake {

    constructor(config) {
        this.config = config;
        this.x = 160;
        this.y = 160;
        this.speedX = this.config.pointSizePx;
        this.speedY = 0;
        this.points = [];
        this.maxPoints = 3;

        this.moveAudio = new Audio();

        this.moveAudio.volume = this.config.gameVolume;
        this.moveAudio.preload = 'auto';
        this.moveAudio.src = '/audio/browser-games/snake/mr_9999_14.wav';

        this.gameOverAudio = new Audio();

        this.gameOverAudio.volume = this.config.gameVolume;
        this.gameOverAudio.preload = 'auto';
        this.gameOverAudio.src = '/audio/browser-games/snake/mr_9999_08.wav';

        this.control();
    }

    update(apple, score, canvas) {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0) {
            this.x = canvas.element.width - this.config.pointSizePx;
        } else if (this.x >= canvas.element.width) {
            this.x = 0;
        }

        if (this.y < 0) {
            this.y = canvas.element.height - this.config.pointSizePx;
        } else if (this.y >= canvas.element.height) {
            this.y = 0;
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
                if (el.x == this.points[i].x && el.y == this.points[i].y) {
                    this.startGameOverSound();
                    this.gameOver();
                    score.setToZero();
                    apple.randomPosition();
                }
            }
        });
    }

    /**
     * Draw snake by Points. First point as head draw with different collor
     *
     * @param context
     */
    draw(context) {
        this.points.forEach((el, index) => {
            // if (index == 0) {
            //     context.fillStyle = "#FA0556";
            // } else {
            //     context.fillStyle = "#A00034";
            // }

            context.fillStyle = this.config.snakeColor;

            context.strokeRect(el.x, el.y, this.config.pointSizePx, this.config.pointSizePx);
            context.fillRect(el.x + this.config.pointPadding, el.y + this.config.pointPadding, this.config.pointSizePx - this.config.pointPadding * 2, this.config.pointSizePx - this.config.pointPadding * 2);
        });
    }

    startMoveSound() {
        this.moveAudio.play().then(r => console.log('bom'));
    }

    stopMoveSound() {
        this.moveAudio.pause();
        this.moveAudio.currentTime = 0;
    }

    startGameOverSound() {
        this.gameOverAudio.play().then(r => console.log('bom'));
    }

    stopGameOverSound() {
        this.gameOverAudio.pause();
        this.gameOverAudio.currentTime = 0;
    }

    /**
     * Reset snake params in case of game over
     */
    gameOver() {
        this.x = 160;
        this.y = 160;
        this.speedX = this.config.pointSizePx;
        this.speedY = 0;
        this.points = [];
        this.maxPoints = 3;
    }

    /**
     * Check controls
     */
    control() {
        //keyUp.onClick

        document.addEventListener("keydown", (e) => {
            switch (e.code) {
                case "KeyW":
                case "ArrowUp":
                    this.moveUp();
                    break;
                case "KeyA":
                case "ArrowLeft":
                    this.moveLeft();
                    break;
                case "KeyS":
                case "ArrowDown":
                    this.moveDown();
                    break;
                case "KeyD":
                case "ArrowRight":
                    this.moveRight();
                    break;
            }
        });
    }

    moveUp() {
        if ( this.speedY !== 0) {
            return;
        }

        this.speedY = -this.config.pointSizePx;
        this.speedX = 0;
    }

    moveLeft() {
        if ( this.speedX !== 0) {
            return;
        }

        this.speedX = -this.config.pointSizePx;
        this.speedY = 0;
    }

    moveDown() {
        if ( this.speedY !== 0) {
            return;
        }

        this.speedY = this.config.pointSizePx;
        this.speedX = 0;
    }

    moveRight() {
        if ( this.speedX !== 0) {
            return;
        }

        this.speedX = this.config.pointSizePx;
        this.speedY = 0;
    }
}
