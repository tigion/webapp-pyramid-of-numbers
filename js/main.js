
function setDefaultSettings() {
    document.getElementById('pyramidModeBuildUp').checked = true;
    document.getElementById('pyramidHeight').value = 5;
    document.getElementById('minStartNumber').value = 1;
    document.getElementById('maxStartNumber').value = 20;
    document.getElementById('useNegativNumbers').checked = false;
    document.getElementById('showValidation').checked = true;
    updatePyramidSettings(true);
}

function addEventFunctions() {
    for (let i = 0; i < pyramid.stones.length; i++) {
        for (let j = 0; j < pyramid.stones[i].length; j++) {
            if (pyramid.stones[i][j].hasElement) {
                pyramid.stones[i][j].element.oninput = function (eve) { pyramid.check(); }
            }
        }
    }
}

function updatePyramidSettings(isInit = false) {
    let isInitPyramid = false;
    let isNewPyramid = false;

    const mode = (document.getElementById('pyramidModeBuildUp').checked) ? 1 : 2;
    if (pyramid.mode != mode) {
        pyramid.mode = mode;
        isNewPyramid = true;
    }

    const height = document.getElementById('pyramidHeight').value;
    if (pyramid.height != height) {
        pyramid.height = height;
        isInitPyramid = true;
        isNewPyramid = true;
    }

    const minStartNumber = document.getElementById('minStartNumber').value;
    if (pyramid.minStartNumber != minStartNumber) {
        pyramid.minStartNumber = minStartNumber;
        isNewPyramid = true;
    }

    const maxStartNumber = document.getElementById('maxStartNumber').value;
    if (pyramid.maxStartNumber != maxStartNumber) {
        pyramid.maxStartNumber = maxStartNumber;
        isNewPyramid = true;
    }

    const useNegativNumbers = document.getElementById('useNegativNumbers').checked;
    if (pyramid.useNegativNumbers != useNegativNumbers) {
        pyramid.useNegativNumbers = useNegativNumbers;
        isNewPyramid = true;
    }

    const showValidation = document.getElementById('showValidation').checked;
    if (pyramid.showValidation != showValidation) {
        pyramid.showValidation = showValidation;
    }

    if (isInit || isInitPyramid) {
        pyramid.initialize();
        addEventFunctions();
    }
    if (isInit || isNewPyramid) {
        pyramid.new();
    }
}

function init() {
    // set default settings
    setDefaultSettings();
}

/* main */

let pyramid = new Pyramid();
init();
