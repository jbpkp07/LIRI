# LIRI

This is a command-line application that runs a javascript program in the Node.js environment. It provides command line access to the Bands In Town, Spotify, and OMDB APIs to return information.

**Bands In Town:**  Get latest concert information for your favorite music artist(s).
**Spotify:**        Get information for song title searchs.
**OMDB:**           Get information about a movie title search.

You can clone this repository via command line (if you have Git installed) by typing:  **git clone https://github.com/jbpkp07/LIRI**

If you already have Node.js installed, open your terminal, and browse to where you have cloned this Git repository and type:  **node liri.js**

If there are Node module dependencies that you are missing, please type `npm install` and it will reference the package.json file in this repository to automatically resolve those missing dependencies.

The main entry point for the application is liri.js, and the other auxillary files are used to provide Node modules that it will use to accomplish the API retrieval based on your command and search query.

**Technologies used:**  Node, Javascript, Axios, Spotify API, OMDB API, Bands In Town API, NPM, terminal-kit

There is also strict validation for the commands and queries entered, with appropriate error messages if the input is invalid.

I am the sole developer of this application.



### commands:

node liri.js concert-this <query>
  
node liri.js spotify-this-song <query>
  
node liri.js movie-this <query>
  
node liri.js do-what-it-says



### Screenshots:

![concert-this](https://github.com/jbpkp07/LIRI/blob/master/images/concert-this.png)

![spotify-this-song](https://github.com/jbpkp07/LIRI/blob/master/images/spotify-this-song.png)

![movie-this](https://github.com/jbpkp07/LIRI/blob/master/images/movie-this.png)

![do-what-it-says](https://github.com/jbpkp07/LIRI/blob/master/images/do-what-it-says.png)

