"use strict";
/* global process, module, require */

const terminal = require("terminal-kit").terminal;

let inputArgs = process.argv;
inputArgs.splice(0, 2);  //drop ['node', 'liri.js', ... ] and keep applicable arguments

let isInputArgsCountValid = true;
let inputCommand = null;
let isInputCommandValid = false;
let inputQuery = null;
let isQueryValid = false;

if (inputArgs.length === 0) {

    isInputArgsCountValid = false;
}
else {

    inputCommand = inputArgs[0].trim().toLowerCase();

    switch (inputCommand) {

        case "concert-this":
            isInputCommandValid = true;
            captureQuery();
            break;
        case "spotify-this-song":
            isInputCommandValid = true;
            captureQuery();
            break;
        case "movie-this":
            isInputCommandValid = true;
            captureQuery();
            break;
        case "do-what-it-says":
            isInputCommandValid = true;
            //No query for this command
            break;
    }
}

function captureQuery() {

    if (inputArgs.length > 1) {

        let queryArray = inputArgs;

        inputQuery = queryArray.splice(1, queryArray.length - 1).join(" ");

        if (inputQuery.length > 0) {

            isQueryValid = true;
        }
    }
    else {

        isInputArgsCountValid = false;
    }
}

function printValidationErrorMsg() {

    if (!isInputArgsCountValid && !isInputCommandValid) {

        terminal.brightRed("   Missing input arguments, please refer to usage instructions above.");
        terminal.nextLine(3);
        process.exit(0);
    }

    if (!isInputCommandValid) {

        terminal.brightRed("   Missing valid ").white("<command>").brightRed(" please refer to usage instructions above.");
        terminal.nextLine(3);
        process.exit(0);
    }

    if (!isQueryValid && inputCommand !== "do-what-it-says") {

        terminal.brightRed("   Missing valid ").white("<query>").brightRed(" please refer to usage instructions above.");
        terminal.nextLine(3);
        process.exit(0);
    }
}

module.exports = {

    isInputArgsCountValid: isInputArgsCountValid,
    inputCommand: inputCommand,
    isInputCommandValid: isInputCommandValid,
    inputQuery: inputQuery,
    isQueryValid: isQueryValid,
    printValidationErrorMsg: printValidationErrorMsg
};