"use strict";
/* global require, module, exports */

const terminal = require("terminal-kit").terminal;

function printHeader() {

    terminal.reset();
    terminal.clear();
    terminal.hideCursor();
    terminal.nextLine(1);
    terminal.brightBlue(" ===============================================================================\n");
    terminal.brightCyan(" |                            LIRI Node Application                            |\n");
    terminal.brightCyan(" |                                    v1.0                                     |\n");
    terminal.brightCyan(" |                          written by: Jeremy Barnes                          |\n");
    terminal.brightCyan(" |_____________________________________________________________________________|\n");
    terminal.brightCyan(" |                                                                             |\n");
    terminal.brightCyan(" |   Usage    : ").white("node liri.js <command> <query>").brightCyan("                                 |\n");
    terminal.brightCyan(" |                                                                             |\n");
    terminal.brightCyan(" |   Commands :                                                                |\n");
    terminal.brightCyan(" |           -> ").white("concert-this <query>      ").gray("(query=artist/band name)").brightCyan("             |\n");
    terminal.brightCyan(" |           -> ").white("spotify-this-song <query> ").gray("(query=song name)").brightCyan("                    |\n");
    terminal.brightCyan(" |           -> ").white("movie-this <query>        ").gray("(query=movie name)").brightCyan("                   |\n");
    terminal.brightCyan(" |           -> ").white("do-what-it-says           ").gray("(reads command from LIRICommand.txt) ").brightCyan("|\n");
    terminal.brightCyan(" |                                                                             |\n");
    terminal.brightCyan(" |   Example 1: ").white("node liri.js concert-this Lady Gaga").brightCyan("                            |\n");
    terminal.brightCyan(" |   Example 2: ").white("node liri.js spotify-this-song \"I Want it That Way\"").brightCyan("            |\n");
    terminal.brightCyan(" |   Example 3: ").white("node liri.js spotify-this-song  I Want it That Way").brightCyan("             |\n");
    terminal.brightCyan(" |                                                                             |\n");
    terminal.brightCyan(" |   LIRICommand.txt Example: ").white("movie-this,Top Gun").brightCyan("                               |\n");
    terminal.brightCyan(" |                                                                             |\n");
    terminal.brightBlue(" ===============================================================================");
    terminal.nextLine(4);
}

module.exports = printHeader;