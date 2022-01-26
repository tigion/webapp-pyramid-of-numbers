class Pyramid {
    static minHeight = 2;
    static maxHeight = 15;
    static maxResult = 9999999;
    static negativChance = 0.25;
    static stoneWidth = 90; // must be the same in the main.css file

    constructor(height = Pyramid.minHeight) {
        this.stones = [];
        this.height = height;
        this.minStartNumber = 1;
        this.maxStartNumber = 10;
        this.mode = 1;
        this.useNegativNumbers = false;
        this.showValidation = true;
    }

    get height() { return this._height; }
    set height(value) {
        // check: min/max of height
        this._height = parseInt((value < Pyramid.minHeight) ? Pyramid.minHeight : (value > Pyramid.maxHeight) ? Pyramid.maxHeight : value);
        // recheck: max start number
        this.maxStartNumber = this.maxStartNumber;
    }

    get minStartNumber() { return this._minStartNumber; }
    set minStartNumber(value) {
        // check: min/max min start number
        this._minStartNumber = parseInt((value < 0) ? 0 : (value > this.maxStartNumber) ? this.maxStartNumber : value);
    }

    get maxStartNumber() { return this._maxStartNumber; }
    set maxStartNumber(value) {
        // check: min of max start number
        this._maxStartNumber = parseInt((value < 0) ? 0 : value);
        // check: max of max start number
        const maxStartValue = Math.floor(Pyramid.maxResult / Math.pow(2, this.height - 1));
        if (this._maxStartNumber > maxStartValue) {
            console.log('limit max start number ' + value + ' to ' + maxStartValue);
            this._maxStartNumber = parseInt(maxStartValue);
        }
        // recheck: min start number <= max start number
        if (this.minStartNumber > this.maxStartNumber) this.minStartNumber = this.maxStartNumber;
    }

    get mode() { return this._mode; }
    set mode(value) {
        this._mode = parseInt((value < 0) ? 0 : value);
    }

    get useNegativNumbers() { return this._useNegativNumbers; }
    set useNegativNumbers(value) {
        this._useNegativNumbers = (value) ? true : false;
    }

    get showValidation() { return this._showValidation; }
    set showValidation(value) {
        this._showValidation = (value) ? true : false;
        this.check();
    }

    // generate new pyramid
    initialize() {
        // set stones array
        this.stones.length = this.height;
        for (let i = 0; i < this.stones.length; i++) {
            this.stones[i] = new Array(i + 1);
        }

        // set min page width
        const minWidth = ((this.height + 1) * Pyramid.stoneWidth) + 'px';
        document.getElementsByTagName('body')[0].style.minWidth = minWidth;

        // generate stones in document
        const sectionPyramid = document.getElementById('pyramid');
        /* variant 1 */let newInnerHTML = '';
        for (let i = 0; i < this.stones.length; i++) {
            for (let j = 0; j < this.stones[i].length; j++) {
                const stone = '<input id="' + Pyramid.createStoneID(i, j) + '" class="stone" type="number" />';
                /* variant 1 */newInnerHTML += stone;
                /* variant 2 *///sectionPyramid.innerHTML += stone;
                //this.stones[i][j] = new Stone(document.getElementById(id)); // TODO: doesn't work here
            }
            /* variant 1 */newInnerHTML += '<br />';
            /* variant 2 *///sectionPyramid.innerHTML += '<br />';
        }
        /* variant 1 */sectionPyramid.innerHTML = newInnerHTML;

        // set stones element by id
        for (let i = 0; i < this.stones.length; i++) {
            for (let j = 0; j < this.stones[i].length; j++) {
                const id = Pyramid.createStoneID(i, j);
                this.stones[i][j] = new Stone(document.getElementById(id));
            }
        }
    }

    // reset pyramid (all stones)
    reset() {
        for (let i = 0; i < this.stones.length; i++) {
            for (let j = 0; j < this.stones[i].length; j++) {
                this.stones[i][j].reset();
            }
        }
    }

    // clear pyramid (all stones)
    clear() {
        for (let i = 0; i < this.stones.length; i++) {
            for (let j = 0; j < this.stones[i].length; j++) {
                this.stones[i][j].clear();
            }
        }
    }

    // generate pyramid with new start numbers
    new() {
        this.reset();
        this.calculate();
        switch(this.mode) {
            default: case 1: this.modeBuildUp(); break;
            case 2: this.modeFillUp(); break;
        }
    }

    // generate random start number
    getRandomNumber() {
        let number = randomInt(this.minStartNumber, this.maxStartNumber);
        if (this.useNegativNumbers && (Math.random() < Pyramid.negativChance))
            number = 0 - number;
        return number;
    }

    // set random start numbers and precalculate pyramid (all stones)
    calculate() {
        // set start numbers
        for (let i = this.stones.length - 1, j = 0; j < this.stones[i].length; j++) {
            this.stones[i][j].number = this.getRandomNumber();
        }

        // calculate numbers
        for (let i = this.stones.length - 2; i >= 0; i--) {
            for (let j = 0; j < this.stones[i].length; j++) {
                this.stones[i][j].number = this.stones[i + 1][j].number + this.stones[i + 1][j + 1].number;
            }
        }
    }

    // set fixed stones: bottom row
    modeBuildUp() {
        this.resetStoneStyles();
        for (let i = this.stones.length - 1, j = 0; j < this.stones[i].length; j++) {
            this.stones[i][j].showReadOnlyNumber();
        }
    }

    // set fixed stones: randomly per row
    modeFillUp() {
        this.resetStoneStyles();
        for (let i = 0; i < this.stones.length; i++) {
            const j = (i == 0) ? 0 : randomInt(0, this.stones[i].length - 1);
            this.stones[i][j].showReadOnlyNumber();
        }
    }

    // show correct results
    solve() {
        for (let i = 0; i < this.stones.length; i++) {
            for (let j = 0; j < this.stones[i].length; j++) {
                if (! this.stones[i][j].isReadOnly) {
                    this.stones[i][j].showNumber();
                    this.stones[i][j].check(this.showValidation);
                }
            }
        }
    }

    // check pyramid (all stones)
    check() {
        for (let i = 0; i < this.stones.length; i++) {
            for (let j = 0; j < this.stones[i].length; j++) {
                this.stones[i][j].check(this.showValidation);
            }
        }
    }

    // reset pyramid (all stones)
    resetStoneStyles() {
        for (let i = 0; i < this.stones.length; i++) {
            for (let j = 0; j < this.stones[i].length; j++) {
                this.stones[i][j].resetStyle();
            }
        }
    }

    // create stone id
    static createStoneID(i, j) {
        return 'stone-' + (i + 1).toString() + '-' + (j + 1).toString();
    }
}
