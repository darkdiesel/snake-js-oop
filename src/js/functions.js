export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Convert 0 - 100 to Audio().volume = 0 - 1
 *
 * @param volume
 */
export function convertVolume(volume) {
    if (volume >= 100) {
        return 1;
    } else if (volume < 0) {
        return 0;
    }  else {
        return volume / 100;
    }
}

/**
 * Convert speed. spped = 0 - 10
 *
 * @param speed
 */
export function convertSpeed(speed) {
    if (speed >= 10) {
        speed = 10;
    }

    if (speed < 0) {
        speed = 1;
    }

    return (501 - (50 * speed));;
}

export function isNullOrUndefined(value) {
    return value === undefined || value === null;
}

// DOM

export function findElements(container, selector) {
    let target = container.getAttribute(selector);

    if (target) {
        return document.querySelectorAll(parseSelector(target));
    } else {
        return [];
    }
}

export function parseSelector(selector) {
    return selector.replace(/#([^\s"#']+)/g, (match, id) => `#${CSS.escape(id)}`)
}