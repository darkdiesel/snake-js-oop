import {
    convertSpeed,
    convertVolume,
    findTargetElements
} from "./functions.js";

import {
    SELECTOR_SETTINGS_SPEED,
    SELECTOR_SETTINGS_WALLS,
    SELECTOR_SETTINGS_SOUNDS,
    SELECTOR_SETTINGS_VOLUME
} from "./constants.js";

export default class Settings {
    constructor(container, config) {
        this.config = config;

        this.speedSettingsElements = findTargetElements(container, SELECTOR_SETTINGS_SPEED);
        this.wallsSettingsElements = findTargetElements(container, SELECTOR_SETTINGS_WALLS);
        this.soundsSettingsElements = findTargetElements(container, SELECTOR_SETTINGS_SOUNDS);
        this.volumeSettingsElements = findTargetElements(container, SELECTOR_SETTINGS_VOLUME);

        this.initSettings();
    }

    initSettings() {
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
        this.config.mute = !!mute;
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