"use strict";
/* global require, process */

const terminal = require("terminal-kit").terminal;

const printHeader = require("./printHeader.js");

const concertThis = require("./concert-this.js");

const spotifyThisSong = require("./spotify-this-song.js");

const movieThis = require("./movie-this.js");

const fs = require('fs');

const Args = require("./Args.js");

const liriCommandTXT = "./LIRICommand.txt";

function executeCommand(args) {

    switch (args.command) {

        case Args.concertThis:
            let artist = args.query;
            concertThis.getConcertThis(artist);
            break;
        case Args.spotifyThis:
            let song = args.query;
            spotifyThisSong.getSpotifyThisSong(song);
            break;
        case Args.movieThis:
            let movieTitle = args.query;
            movieThis.getMovieThis(movieTitle);
            break;
        case Args.doWhatItSays:
            readCommandFromFile();
            break;
    }
}

function readCommandFromFile() {

    if (!fs.existsSync(liriCommandTXT)) {

        terminal.white("   LIRICommand.txt").brightRed(" file is missing. Please create this file in the same directory as this application.");

        exitProcess();
    }

    const argsFromFile = fs.readFileSync(liriCommandTXT, "utf8").trim().split(",");

    let fileArgs = new Args(argsFromFile);

    fileArgs.printThisArgOBJ_Debug();

    validateArgsAndExecuteCommand(fileArgs);
}

function validateArgsAndExecuteCommand(args) {

    args.printValidationErrorMsg();

    executeCommand(args);
}

function exitProcess() {

    terminal("\n\n\n");

    terminal.hideCursor(""); //restore cursor

    process.exit(0);
}



//Start Program Here ----------------------------------------------------------
printHeader();

let args = new Args();

args.printThisArgOBJ_Debug();

setTimeout(() => {
    
    validateArgsAndExecuteCommand(args);

}, 1000);