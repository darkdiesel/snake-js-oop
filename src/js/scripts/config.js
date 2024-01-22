//const STEP = 0;
export default class Config {
    constructor(options = {}) {
        this.snakeColor = options.snakeColor || "#2e3434";
        this.appleColor = options.appleColor || "#A00034";

        this.gameVolume = 0.001;

        this.pointPadding = options.pointPadding || 4; // padding for points
        this.pointSizePx = options.pointSizePx || 16; // size 1 point of snake in pixels

        this.gameTimeOut = options.gameTimeOut || 300; // time out between game animation steps
        this.gameSnakeTimeOut = options.gameAppleBlindTimeOut || 300; // time out between snake steps
        this.gameAppleBlindTimeOut = options.gameAppleBlindTimeOut || 20; // time out between apple blinding
    }
}
