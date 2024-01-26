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

    gameTick() {
        if (this.config.gameOverStatus) {
            this.stop();
            this.snakeUpdate();
            return;
        }

        this.gameTime = Date.now();

        if (this.gameTime - this.snakeTime > this.config.snakeTick) {
            this.snakeTime = Date.now();

            this.snakeUpdate();
            this.snakeDraw();
        }

        if (this.gameTime - this.appleTime > this.config.appleTick) {
            this.appleTime = Date.now();

            this.appleDraw();
        }
    }

    start() {
        if (this.gameTickTimer === undefined) {
            this.gameTickTimer = setInterval(() => {
                this.gameTick();
            }, this.config.gameTick);
        }
    }

    stop() {
        if (this.gameTickTimer !== undefined) {
            clearInterval(this.gameTickTimer);

            this.gameTickTimer = undefined;
        }
    }
}
