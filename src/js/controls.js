export default class Controls {
    constructor(container) {
        this.container = container;

        this.btnUp = this.container.querySelector(".ipa-snake-js-control-up");
        this.btnDown = this.container.querySelector(".ipa-snake-js-control-down");
        this.btnLeft = this.container.querySelector(".ipa-snake-js-control-left");
        this.btnRight = this.container.querySelector(".ipa-snake-js-control-right");
    }
}
