var assert = require('assert');
var util = require('util');

module.exports = braceCompress;

var numRe = /^([^1-9]*)([1-9][0-9]*)(.*)$/;

function braceCompress(arr) {
    var out = [];
    var state = {};

    checkAndResetState();
    arr.forEach(function (line) {
        var m = line.match(numRe);

        // no numbers found
        if (!m) {
            checkAndResetState();
            out.push(line);
            return;
        }

        // numbers found
        var prefix = m[1];
        var num = parseInt(m[2], 10);
        var suffix = m[3];

        assert(!isNaN(num));

        // we are currently processing a number and this new line has the same
        // suffix, prefix, and a number one higher than the last
        if (state.inNumber &&
            state.prefix === prefix &&
            state.suffix === suffix &&
            state.lastNum + 1 === num) {

            state.records++;
            state.lastNum = num;
            state.lastLine = line;
            return;
        }

        // begin a new number
        checkAndResetState();

        // set state to new number
        state.inNumber = true;
        state.records++;
        state.prefix = prefix;
        state.suffix = suffix;
        state.startNum = num;
        state.lastNum = num;
        state.origLine = line;
        state.lastLine = line;
    });
    checkAndResetState();

    // process any numbers currently waiting, and reset the state variable
    function checkAndResetState() {
        var s;

        if (state.inNumber) {
            assert(state.records >= 1);

            if (state.records === 1) {
                s = state.lastLine;
            } else {
                s = util.format('%s{%d..%d}%s', state.prefix, state.startNum,
                    state.lastNum, state.suffix);
            }

            out.push(s);
        }

        state.inNumber = false;
        state.records = 0;
        state.prefix = null;
        state.suffix = null;
        state.startNum = 0;
        state.lastNum = 0;
        state.origLine = null;
        state.lastLine = null;
    }

    return out;

}
