import {
    filterElements,
    findElements
} from "./functions";

import {
    SELECTOR_CONTROL_DOWN,
    SELECTOR_CONTROL_UP,
    SELECTOR_CONTROL_LEFT,
    SELECTOR_CONTROL_RIGHT,
    SELECTOR_SNAKE_ELEMENT
} from "./constants";

export default class ControlsButtons {
    constructor(container, moveUp, moveDown, moveLeft, moveRight) {
        this.container = container;

        this.moveUp = moveUp;
        this.moveDown = moveDown;
        this.moveLeft = moveLeft;
        this.moveRight = moveRight;

        this.controlUpElements = filterElements(findElements(SELECTOR_CONTROL_UP), this.container, SELECTOR_SNAKE_ELEMENT);
        this.controlDownElements = filterElements(findElements(SELECTOR_CONTROL_DOWN), this.container, SELECTOR_SNAKE_ELEMENT);
        this.controlLeftElements = filterElements(findElements(SELECTOR_CONTROL_LEFT), this.container, SELECTOR_SNAKE_ELEMENT);
        this.controlRightElements = filterElements(findElements(SELECTOR_CONTROL_RIGHT), this.container, SELECTOR_SNAKE_ELEMENT);

        this.initControls();
    }

    initControls() {
        for (const elem of this.controlUpElements) {
            elem.addEventListener('click', async () => {
                this.moveUp();
            });
        }

        for (const elem of this.controlDownElements) {
            elem.addEventListener('click', async () => {
                this.moveDown();
            });
        }

        for (const elem of this.controlLeftElements) {
            elem.addEventListener('click', async () => {
                this.moveLeft();
            });
        }

        for (const elem of this.controlRightElements) {
            elem.addEventListener('click', async () => {
                this.moveRight();
            });
        }
    }
}
