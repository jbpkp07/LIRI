"use strict";
/* global require, process */


//Begin Required Node Modules--------------------------------------------------
const printHeader = require("./printHeader.js");

const inputArgs = require("./gatherArguments.js");

const concertThis = require("./concert-this.js");

const spotifyThisSong = require("./spotify-this-song.js");
//End Required Node Modules----------------------------------------------------

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
    
            break;
        case "do-what-it-says":
    
            break;
    }
}

printHeader();

inputArgs.printValidationErrorMsg();

setTimeout(executeCommand, 1);






