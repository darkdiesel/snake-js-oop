export default class Canvas {
    constructor(container) {
        this.container = container;

        this.element = document.createElement("canvas");
        this.context = this.element.getContext("2d");

        this.btnUp = document.createElement("button");

        this.element.width = 320;
        this.element.height = 400;

        this.element.classList.add("snake-game-canvas");

        container.appendChild(this.element);
    }
}
