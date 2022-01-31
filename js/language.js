// set initial document language
function initLanguage() {
    // get browser/system language setting
    let language = window.navigator.language || window.navigator.userLanguage;
    // limit language code (2 chars, lower case)
    language = language.slice(0, 2).toLowerCase();
    // set language
    setLanguage(language)
}

// set document language
function setLanguage(language) {
    // check supported languages (lower case)
    switch (language.toLowerCase()) {
        case 'en': case 'de': break;
        default: language = 'en';
    }
    // set document language
    document.documentElement.lang = language;
}
