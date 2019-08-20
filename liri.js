"use strict";
/* global require, process */

const terminal = require("terminal-kit").terminal;

const printHeader = require("./printHeader.js");

const inputArgs = require("./gatherArguments.js");

const concertThis = require("./concert-this.js");

const spotifyThisSong = require("./spotify-this-song.js");

const movieThis = require("./movie-this.js");

const fs = require('fs');

const liriCommandTXT = "./LIRICommand.txt";

function executeCommand() {

    switch (inputArgs.inputCommand) {

        case "concert-this":
            let artist = inputArgs.inputQuery;
            concertThis.getConcertThis(artist);
            break;
        case "spotify-this-song":
            let song = inputArgs.inputQuery;
            spotifyThisSong.getSpotifyThisSong(song);
            break;
        case "movie-this":
            let movieTitle = inputArgs.inputQuery;
            movieThis.getMovieThis(movieTitle);
            break;
        case "do-what-it-says":
            readCommandFromFile();
            break;
    }
}

function readCommandFromFile() {

    if (!fs.existsSync(liriCommandTXT)) {

        terminal.white("   LIRICommand.txt").brightRed(" file is missing. Please create this file in the same directory as this application.");
        inputArgs.exitProcess();
    }

    const command = fs.readFileSync(liriCommandTXT, "utf8");

    console.log(command);
}

printHeader();

inputArgs.printValidationErrorMsg();

setTimeout(executeCommand, 1000);