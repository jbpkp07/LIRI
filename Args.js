"use strict";
/* global process, module, require */

const terminal = require("terminal-kit").terminal;

class Args {

    constructor(args) {

        if (typeof args === 'undefined') {

            this.inputArgs = process.argv;

            this.inputArgs.splice(0, 2);  //drop ['node', 'liri.js', ... ] and keep applicable arguments
        }
        else {

            this.inputArgs = args;
        }

        this.isArgsCountValid = false;

        this.command = null;
        this.isCommandValid = false;

        this.query = null;
        this.isQueryValid = false;
        this.requiresQuery = false;

        this.continueValidation = true;

        this.startValidation();
    }

    static get concertThis() { return "concert-this"; }

    static get spotifyThis() { return "spotify-this-song"; }
    
    static get movieThis() { return "movie-this"; }

    static get doWhatItSays() { return "do-what-it-says"; }

    startValidation() {

        this.checkIfArgsCountValid(1);

        if (this.continueValidation) {

            this.command = this.inputArgs[0].trim().toLowerCase();

            this.checkIfCommandIsValid();
        }

        if (this.continueValidation) {

            if (this.requiresQuery) {

                this.checkIfArgsCountValid(2);
            }
            else {

                this.continueValidation = false;
            }
        }

        if (this.continueValidation && this.requiresQuery) {

            this.query = "";

            for (let i = 1; i < this.inputArgs.length; i++) {

                if (this.query !== "") {

                    this.query += " " + this.inputArgs[i].trim();
                }
                else {

                    this.query += this.inputArgs[i].trim();
                }
            }

            this.query = this.query.split(/\s+/).join(" ");

            this.inputArgs = [];
            
            this.inputArgs.push(this.command);

            this.inputArgs.push(this.query);

            this.checkIfQueryIsValid();
        }
    }

    checkIfArgsCountValid(count) {

        if (this.inputArgs.length < count) {

            this.isArgsCountValid = false;

            this.continueValidation = false;
        }
        else {

            this.isArgsCountValid = true;
        }
    }

    checkIfCommandIsValid() {

        switch (this.command) {

            case Args.concertThis:
                this.isCommandValid = true;
                this.requiresQuery = true;
                break;
            case Args.spotifyThis:
                this.isCommandValid = true;
                this.requiresQuery = true;
                break;
            case Args.movieThis:
                this.isCommandValid = true;
                this.requiresQuery = true;
                break;
            case Args.doWhatItSays:
                this.isCommandValid = true;
                this.requiresQuery = false;  //no required query for this command
                this.inputArgs = this.inputArgs.splice(0, 1);  //drop any query arguments
                break;
            default:
                this.continueValidation = false;
                break;
        }
    }

    checkIfQueryIsValid() {

        if (this.query.length > 0) {

            this.isQueryValid = true;
        }
        else {

            this.continueValidation = false;
        }
    }

    printValidationErrorMsg() {

        if (!this.isArgsCountValid && !this.isCommandValid) {
    
            terminal.brightRed("   Missing input arguments, please refer to usage instructions above.");

            this.exitProcess();
        }
    
        if (!this.isCommandValid) {
    
            terminal.brightRed("   Missing valid ").white("<command>").brightRed(" please refer to usage instructions above.");

            this.exitProcess();
        }
    
        if (!this.isQueryValid && this.command !== Args.doWhatItSays) {
    
            terminal.brightRed("   Missing valid ").white("<query>").brightRed(" please refer to usage instructions above.");

            this.exitProcess();
        }
    }

    printThisArgOBJ_Debug() {

        terminal.white("   Debug Info:\n");
        terminal.white("   -----------------------------------------------------------------------------\n");
        terminal.brightCyan("   InputArgs          :  ").gray(JSON.stringify(this.inputArgs) + "\n");
        terminal.brightCyan("   IsArgsCountValid   :  ").gray(this.isArgsCountValid + "\n");
        terminal.brightCyan("   Command            :  ").gray(this.command + "\n");
        terminal.brightCyan("   IsCommandValid     :  ").gray(this.isCommandValid + "\n");
        terminal.brightCyan("   Query              :  ").gray(this.query + "\n");
        terminal.brightCyan("   IsQueryValid       :  ").gray(this.isQueryValid + "\n");
        terminal.brightCyan("   RequiresQuery      :  ").gray(this.requiresQuery + "\n");
        terminal.brightCyan("   ContinueValidation :  ").gray(this.continueValidation + "\n");
        terminal("\n\n\n");
    }

    exitProcess() {

        terminal("\n\n\n");

        terminal.hideCursor(""); //restore cursor

        process.exit(0);
    }
}

module.exports = Args;