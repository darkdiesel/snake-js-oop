export default class Canvas {
    constructor(container, config) {
        this.container = container;
        this.config = config;

        //@TODO: Check if exist and don't create
        this.element = document.createElement("canvas");
        this.context = this.element.getContext("2d");

        this.element.width = config.pointSizePx * 20; // 10 points original = 16 * 10
        this.element.height = config.pointSizePx * 26; //20 points original = 16 * 20

        this.element.classList.add("ipa-snake-game-canvas");

        this.container.querySelector(".ipa-snake-game-canvas-wrapper").appendChild(this.element);

        // set start position
        this.config.centerX = this.getCenterX();
        this.config.centerY = this.getCenterY();
    }

    getCenterX(){
        return Math.floor((this.element.width / this.config.pointSizePx)  / 2) * this.config.pointSizePx;
    }

    getCenterY(){
        return Math.floor((this.element.height / this.config.pointSizePx)  / 2) * this.config.pointSizePx;
    }

    drawCell(x, y, color){
        this.context.fillStyle = color;
        this.context.strokeStyle = color;

        this.context.strokeRect(x, y, this.config.pointSizePx, this.config.pointSizePx);
        this.context.fillRect(x + this.config.pointPadding, y + this.config.pointPadding, this.config.pointSizePx - this.config.pointPadding * 2, this.config.pointSizePx - this.config.pointPadding * 2);
    }

    drawWalls(color){
        this.context.strokeStyle = color;

        this.context.strokeRect(0, 0, this.element.width, this.element.height);
    }

    clearFull(){
        this.clearCell(0, 0, this.element.width, this.element.height);
    }

    clearCell(x, y, width, height) {
        this.context.clearRect(x, y, width, height);
    }
}
