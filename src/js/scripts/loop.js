export default class Loop {
    constructor(update, draw, config) {
        this.update = update;
        this.draw = draw;

        this.config = config;

        this.animateSnake();


    }

    animateSnake() {
        setTimeout(() => {
            this.animateSnake();
        }, this.config.gameTimeOut);

        this.update();
        this.draw();
    }

    animateApple() {
        setTimeout(() => {
            this.animateSnake();
            }, this.config.gameAppleBlindTimeOut);

        this.update();
        this.draw();
    }
}
