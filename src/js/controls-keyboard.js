
export default class controlsKeyboard {
    constructor(container, moveUp, moveDown, moveLeft, moveRight) {
        this.moveUp = moveUp;
        this.moveDown = moveDown;
        this.moveLeft = moveLeft;
        this.moveRight = moveRight;

        this.initControls(container);
    }

    initControls (container){
        // keyboard controls (wasd, arrows, numpad arrows)
        document.addEventListener("keydown", (e) => {
            switch (e.code) {
                case "KeyW":
                case "ArrowUp":
                case "Numpad8":
                    e.preventDefault();
                    this.moveUp();
                    break;
                case "KeyS":
                case "ArrowDown":
                case "Numpad2":
                    e.preventDefault();
                    this.moveDown();
                    break;
                case "KeyA":
                case "ArrowLeft":
                case "Numpad4":
                    e.preventDefault();
                    this.moveLeft();
                    break;
                case "KeyD":
                case "ArrowRight":
                case "Numpad6":
                    e.preventDefault();
                    this.moveRight();
                    break;
            }
        });
    }
}