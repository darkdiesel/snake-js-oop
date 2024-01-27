
export default class controlsTouch {
    constructor(container, moveUp, moveDown, moveLeft, moveRight) {
        // touch start coordinates
        this.tXStart = null;
        this.tYStart = null;

        this.moveUp = moveUp;
        this.moveDown = moveDown;
        this.moveLeft = moveLeft;
        this.moveRight = moveRight;

        this.initControls(container);
    }

    initControls (container){
        container.element.addEventListener("touchstart", async (e) => {
            this.tXStart = e.touches[0].clientX;
            this.tYStart = e.touches[0].clientY;
        });

        container.element.addEventListener('touchmove', async (e) => {
            e.preventDefault();

            if ( ! this.tXStart || ! this.tYStart ) {
                return;
            }

            let tXNow = e.touches[0].clientX;
            let tYNow = e.touches[0].clientY;

            let tXDiff = this.tXStart - tXNow;
            let tYDiff = this.tYStart - tYNow;

            if ( Math.abs( tXDiff ) > Math.abs( tYDiff ) ) {/*most significant*/
                if ( tXDiff > 0 ) {
                    this.moveLeft();
                } else {
                    this.moveRight();
                }
            } else {
                if ( tYDiff > 0 ) {
                    this.moveUp();
                } else {
                    this.moveDown();
                }
            }

            this.tXStart = null;
            this.tYStart = null;
        });

        container.element.addEventListener("touchend", async () => {
            this.tXStart = null;
            this.tYStart = null;
        });

        container.element.addEventListener("touchcancel", async () => {
            this.tXStart = null;
            this.tYStart = null;
        });
    }
}