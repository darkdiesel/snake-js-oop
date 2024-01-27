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

    return (501 - (50 * speed));
}

export function isNullOrUndefined(value) {
    return value === undefined || value === null;
}

// DOM

export function findTargetElements(container, selector) {
    return findElements(container.getAttribute(selector))
}

export function findElements(selector) {
    if (selector) {
        return document.querySelectorAll(parseSelector(selector));
    } else {
        return [];
    }
}

export function parseSelector(selector) {
    return selector.replace(/#([^\s"#']+)/g, (match, id) => `#${CSS.escape(id)}`)
}

export function filterElements(elements, container, attribute){
    let _elements = [];

    for (const elem of elements) {
        let selector = elem.getAttribute(attribute);

        let snakeElements = findElements(selector);

        let addElement = false;

        for (const snakeElement of snakeElements) {
            if (snakeElement.isEqualNode(container)) {
                addElement = true;
                break;
            }
        }

        if (addElement) {
            _elements.push(elem);
        }
    }

    return _elements;
}