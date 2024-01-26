import {getRandomInt} from "./functions.js";

export default class Apple {
    constructor(config, canvas) {
        this.config = config;
        this.canvas = canvas;

        this.x = 0;
        this.y = 0;

        this.show = true;

        this.eatAudio = new Audio();
        this.eatAudio.preload = 'auto';
        this.eatAudio.src = '../audio/browser-games/snake/mr_9999_05.wav';

        this.randomPosition();
    }

    draw(canvas, changeVisibility = false) {
        if (changeVisibility) {
            this.show = !this.show;
        }

        // remove apple from canvas
        canvas.clearCell(this.x, this.y, this.config.pointSizePx, this.config.pointSizePx);

        // if apple visible draw it
        if (this.show) {
            canvas.drawCell(this.x, this.y, this.config.appleColor);
        }
    }

    randomPosition() {
        this.x = getRandomInt(0, this.canvas.element.width / this.config.pointSizePx) * this.config.pointSizePx;
        this.y = getRandomInt(0, this.canvas.element.height / this.config.pointSizePx) * this.config.pointSizePx;
    }

    startEatSound() {
        if (!this.config.mute) {
            this.eatAudio.volume = this.config.gameVolume;
            this.eatAudio.play().then(r => {});
        }
    }

    stopEatSound() {
        if (!this.config.mute) {
            this.eatAudio.pause();
            this.eatAudio.currentTime = 0;
        }
    }
}
