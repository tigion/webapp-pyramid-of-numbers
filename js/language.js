// set initial document language
function initLanguage() {
    // get browser/system language setting
    let language = window.navigator.language || window.navigator.userLanguage;
    // set language
    setLanguage(language)
}

// set document language
function setLanguage(language) {
    // check supported languages
    switch (language) {
        case 'en': case 'de': break;
        default: language = 'en';
    }
    // set document language
    document.documentElement.lang = language;
}
