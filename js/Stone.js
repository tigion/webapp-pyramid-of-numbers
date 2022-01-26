class Stone {
    constructor(element = null) {
        this.element = element;
        this.number = null;
        this.reset();
    }

    get hasElement() { return (this.element != null) ? true : false; }
    get isReadOnly() { return this.element.readOnly; }
    get isEmpty() { return (this.element.value == '') ? true : false; }
    get isCorrect() { return (this.element.value == this.number) ? true : false; }

    // reset stone values, style and behavior
    reset() {
        this.number = null;
        if (! this.hasElement) return;
        this.element.value = '';
        this.resetStyle();
    }

    // clear input value and style
    clear() {
        if (this.hasElement && !this.isReadOnly) {
            this.element.value = '';
            this.resetStyle();
        }
    }

    // show number (replace input value)
    showNumber() {
        if (! this.hasElement) return;
        this.element.value = this.number;
    }

    // show fixed number (replace input value)
    showReadOnlyNumber() {
        if (! this.hasElement) return;
        this.setStyleReadOnly();
        this.showNumber();
    }

    // check input value vs number (set validation style)
    check(showValidation = false) {
        if (! this.hasElement) return;
        if (this.isReadOnly) return;
        if (this.isEmpty) { this.setStyleEmpty(); return; }
        this.setStyleNotEmpty();
        if (showValidation) {
            (this.isCorrect) ? this.setStyleRight() : this.setStyleWrong();
        } else this.clearStyleValidation();
    }

    // reset stone to default style and behavior
    resetStyle() {
        this.clearStyleValidation();
        this.setStyleEmpty();
        this.element.classList.remove('readOnly');
        this.element.readOnly = false;
    }

    // clear validation styles
    clearStyleValidation() {
        this.element.classList.remove('right');
        this.element.classList.remove('wrong');
    }

    // set style for empty input value
    setStyleEmpty() {
        this.clearStyleValidation();
        this.element.classList.remove('notEmpty');
        this.element.classList.add('empty');
    }

    // set style for not empty input value
    setStyleNotEmpty() {
        this.element.classList.remove('empty');
        this.element.classList.add('notEmpty');
    }

    // set style for right number validation
    setStyleRight() {
        this.element.classList.remove('wrong');
        this.element.classList.add('right');
    }

    // set style for wrong number validation
    setStyleWrong() {
        this.element.classList.remove('right');
        this.element.classList.add('wrong');
    }

    // set style and behavior for fixed number
    setStyleReadOnly() {
        this.resetStyle();
        this.element.classList.add('readOnly');
        this.element.readOnly = true;
    }
}
