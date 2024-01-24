export default class Loop {
    constructor(snakeUpdate, snakeDraw, appleDraw, config) {
        this.snakeUpdate = snakeUpdate;
        this.snakeDraw = snakeDraw;

        this.appleDraw = appleDraw;

        this.config = config;

        this.gameTime = Date.now();
        this.snakeTime = Date.now();
        this.appleTime = Date.now();

        this.gameTickTimer = undefined;
    }

    startGameTick() {
        this.gameTickTimer = setTimeout(() => {
            this.startGameTick();
        }, this.config.gameTick);

        this.gameTime = Date.now();

        console.log('tick');

        if (this.gameTime - this.snakeTime > this.config.snakeTick) {
            this.snakeTime = Date.now();

            console.log('snake');

            this.snakeUpdate();
            this.snakeDraw();
        }

        if (this.gameTime - this.appleTime > this.config.appleTick) {
            this.appleTime = Date.now();

            this.appleDraw();
        }
    }

    stop() {
        clearTimeout(this.gameTickTimer);
        this.gameTickTimer = 0;
    }
}
