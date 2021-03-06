"use strict";
/* global require, module, process */

const terminal = require("terminal-kit").terminal;
// @ts-ignore
const moment = require('moment');
// @ts-ignore
const axios = require('axios');

class Show {

    constructor(venue, city, region, country, eventDate) {

        this.venue = venue;

        this.venueLocation = "";

        this.buildVenueLocationSTR(city, region, country);
      
        this.eventDate = moment(eventDate).format("MM/DD/YYYY");
    }

    buildVenueLocationSTR(city, region, country) {

        if (city.length > 0) {

            this.venueLocation += city;
        }

        if (region.length > 0) {

            if (this.venueLocation.length > 0) {

                this.venueLocation += ", ";
            }

            this.venueLocation += region;
        }

        if (country.length > 0) {

            if (this.venueLocation.length > 0) {

                this.venueLocation += ", ";
            }

            this.venueLocation += country;
        }
    }

    printShow() {

        terminal.brightCyan("   Venue    :  ").brightYellow(this.venue + "\n");
        terminal.brightCyan("   Location :  ").brightYellow(this.venueLocation + "\n");
        terminal.brightCyan("   Date     :  ").brightYellow(this.eventDate + "\n");
        terminal("\n\n\n");
    }
}

function getConcertThis(artist) {

    const connectionURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(connectionURL)

        .then((response) => {

            if (response.data.length === 0) {

                terminal.brightRed("   Sorry, there are no concerts for the artist: ").white(artist);

                exitProcess();
            }

            terminal.white("   Results:\n");
            terminal.white("   -----------------------------------------------------------------------------\n");

            for (let show of response.data) {

                let nextShow = new Show(show.venue.name, show.venue.city, show.venue.region, show.venue.country, show.datetime);

                nextShow.printShow();
            }

            exitProcess();
        })
        .catch((error) => {

            terminal.brightRed("   Sorry, there are no concerts for the artist: ").white(artist + "\n\n");
            terminal.brightRed("   OR...  Bands In Town API did not respond correctly. Try again later.");
          
            exitProcess();
        });
}

function exitProcess() {

    terminal("\n\n\n");

    terminal.hideCursor(""); //restore cursor

    process.exit(0);
}

module.exports = {

    getConcertThis: getConcertThis
};