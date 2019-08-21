"use strict";
/* global require, module, process */

const terminal = require("terminal-kit").terminal;

require("dotenv").config();

const keys = require("./keys.js");
// @ts-ignore
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);

class Song {

    constructor(artists, track, previewURL, album) {

        this.artists = "";

        this.buildArtistsSTR(artists);

        this.track = track;

        this.previewURL = previewURL;

        this.album = album;
    }

    buildArtistsSTR(artists) {

        for (let artist of artists) {

            if (this.artists.length !== 0) {

                this.artists += ", ";
            }

            this.artists += artist.name;
        }
    }

    printSong() {

        terminal.brightCyan("   Artist(s)   :  ").brightYellow(this.artists + "\n");
        terminal.brightCyan("   Album       :  ").brightYellow(this.album + "\n");
        terminal.brightCyan("   Track       :  ").brightYellow(this.track + "\n");

        if (this.previewURL !== null) {

            terminal.brightCyan("   Preview URL :  ").brightYellow(this.previewURL + "\n");
        }
        else {

            terminal.brightCyan("   Preview URL :  ").gray("No preview available\n");
        }

        terminal("\n\n\n");
    }
}

function getSpotifyThisSong(song) {

    const connectionOBJ = {

        type: 'track',
        query: song
    };

    spotify.search(connectionOBJ, (error, data) => {

        if (error) {

            terminal.brightRed("   Spotify API did not respond correctly. Try again later.");
           
            exitProcess();
        }

        if (data.tracks.items.length === 0) {

            terminal.brightRed("   Sorry, there are no tracks found for: ").white(song);

            exitProcess();
        }

        terminal.white("   Results:\n");
        terminal.white("   -----------------------------------------------------------------------------\n");

        for (let track of data.tracks.items) {

            let nextSong = new Song(track.artists, track.name, track.preview_url, track.album.name);

            nextSong.printSong();
        }

        exitProcess();
    });
}

function exitProcess() {

    terminal("\n\n\n");

    terminal.hideCursor(""); //restore cursor

    process.exit(0);
}

module.exports = {

    getSpotifyThisSong: getSpotifyThisSong
};