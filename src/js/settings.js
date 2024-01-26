import {convertSpeed, convertVolume, findElements} from "./functions.js";

import {SELECTOR_SETTINGS_SPEED, SELECTOR_SETTINGS_WALLS, SELECTOR_SETTINGS_SOUNDS, SELECTOR_SETTINGS_VOLUME} from "./constants.js";

export default class Settings {
    constructor(container, config) {
        this.config = config;

        this.speedSettingsElements = findElements(container, SELECTOR_SETTINGS_SPEED);
        this.wallsSettingsElements = findElements(container, SELECTOR_SETTINGS_WALLS);
        this.soundsSettingsElements = findElements(container, SELECTOR_SETTINGS_SOUNDS);
        this.volumeSettingsElements = findElements(container, SELECTOR_SETTINGS_VOLUME);

        this.settings();
    }

    settings() {
        // init speed settings controls
        for (const elem of this.speedSettingsElements) {
            this.setSpeed(elem.value)

            elem.addEventListener('input', event => {
                this.setSpeed(event.target.value);
            });
        }

        // init walls settings controls
        for (const elem of this.wallsSettingsElements) {
            this.setWalls(elem.checked)

            elem.addEventListener('click', event => {
                this.setWalls(event.target.checked);
            });
        }

        // init walls settings controls
        for (const elem of this.soundsSettingsElements) {
            this.mute(!elem.checked)

            elem.addEventListener('click', event => {
                this.mute(!event.target.checked);
            });
        }

        // init volume settings controls
        for (const elem of this.volumeSettingsElements) {
            this.setVolume(elem.value)

            elem.addEventListener('input', event => {
                this.setVolume(event.target.value);
            });
        }
    }

    mute(mute) {
        if (mute) {
            this.config.mute = true;
        } else {
            this.config.mute = false;
        }
    }

    setSpeed(speed) {
        this.config.snakeTick = convertSpeed(speed);
    }

    setVolume(volume) {
        this.config.gameVolume = convertVolume(volume);
    }

    setWalls(walls) {
        this.config.haveWalls = walls;
    }
}