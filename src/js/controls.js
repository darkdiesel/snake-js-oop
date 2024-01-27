export default class Controls {
    constructor(container) {
        this.container = container;

        this.btnUp = this.container.querySelector(".ipa-snake-game-control-up");
        this.btnDown = this.container.querySelector(".ipa-snake-game-control-down");
        this.btnLeft = this.container.querySelector(".ipa-snake-game-control-left");
        this.btnRight = this.container.querySelector(".ipa-snake-game-control-right");
    }
}
