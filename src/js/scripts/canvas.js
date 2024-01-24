export default class Canvas {
    constructor(container) {
        this.container = container;

        this.element = document.createElement("canvas");
        this.context = this.element.getContext("2d");

        this.element.width = 320;
        this.element.height = 400;

        this.element.classList.add("ipa-snake-game-canvas");

        this.container.querySelector(".ipa-snake-game-canvas-wrapper").appendChild(this.element);
    }
}
