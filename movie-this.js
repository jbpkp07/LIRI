"use strict";
/* global require, module */

const terminal = require("terminal-kit").terminal;
// @ts-ignore
const moment = require('moment');
// @ts-ignore
const axios = require('axios');

class Movie {

    constructor(title, year, ratings, country, lang, plot, actors) {

        this.title = title;
        this.year = year;
        this.ratings = ratings;
        this.imdbRating = "none";
        this.rottenRating = "none";
        this.country = country;
        this.lang = lang;
        this.plot = plot;
        this.actors = actors;

        this.setRatings();
    }

    setRatings() {

        for (let rating of this.ratings) {

            if (rating.Source === "Internet Movie Database") {

                this.imdbRating = rating.Value;
            } 
            else if (rating.Source === "Rotten Tomatoes") {

                this.rottenRating = rating.Value;
            }
        }
    }

    printMovie() {

        terminal.brightCyan("   Title       :  ").brightYellow(this.title + "\n");
        terminal.brightCyan("   Year        :  ").brightYellow(this.year + "\n");
        terminal.brightCyan("   IMDB Rating :  ").brightYellow(this.imdbRating + "\n");
        terminal.brightCyan("   R.T. Rating :  ").brightYellow(this.rottenRating + "\n");
        terminal.brightCyan("   Country     :  ").brightYellow(this.country + "\n");
        terminal.brightCyan("   Language    :  ").brightYellow(this.lang + "\n");
        terminal.brightCyan("   Actors      :  ").brightYellow(this.actors + "\n");
        terminal.brightCyan("   Plot        :  ").brightYellow(this.plot + "\n");
        terminal("\n\n\n");
    }
}

function getMovieThis(movieTitle) {

    const connectionURL = "https://www.omdbapi.com/?apikey=trilogy&t=" + movieTitle + "&type=movie";

    axios.get(connectionURL)

        .then((response) => {

            if (response.data.Error === "Movie not found!" || response.data.Response === "False") {

                terminal.brightRed("   Sorry, OMDB was unable to find the movie title: ").white(movieTitle);
                terminal("\n\n\n");
                terminal.hideCursor(""); //restore cursor

                return;
            }

            const title = response.data.Title;
            const year = response.data.Year;
            const ratings = response.data.Ratings;
            const country = response.data.Country;
            const lang = response.data.Language;
            const plot = response.data.Plot;
            const actors = response.data.Actors;

            let movie = new Movie(title, year, ratings, country, lang, plot, actors);

            movie.printMovie();

            terminal.hideCursor(""); //restore cursor
        })
        .catch((error) => {
   
            terminal.brightRed("   OMDB API did not respond correctly. Try again later.");
            terminal("\n\n\n");

            terminal.hideCursor(""); //restore cursor
        });
}

module.exports = {

    getMovieThis: getMovieThis
};