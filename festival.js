function Movie(title, length, genre) {
    this.title = title;
    this.length = length;
    this.genre = genre;
}
Movie.prototype.getData = function () {
    return "You created movie: " + this.title.toUpperCase() + ", duration: " + this.length + "min, genre: " + getGenreAbbreviation(this.genre);
};

function getGenreAbbreviation(genreStr) {
    var firstLetter = genreStr.charAt(0);
    var lastLetter = genreStr.charAt(genreStr.length - 1);
    var outputGenre = firstLetter + lastLetter;

    return outputGenre.toUpperCase();
}

function Program(date, name) {
    this.date = date;
    this.name = name;
    this.listOfMovies = [];
}

Program.prototype.addMovie = function (movie) {
    this.listOfMovies.push(movie);
};

Program.prototype.getProgramDuration = function () {
    var programDuration = 0;
    var movies = this.listOfMovies;

    movies.forEach(function (movie) {
        programDuration += parseInt(movie.length);
    });

    return programDuration;
};

Program.prototype.getData = function () {
    var programDate = new Date(this.date);
    var programName = this.name.toUpperCase();
    var duration = this.getProgramDuration();
    var programMovies = this.listOfMovies;
    var outputProgram;

    if (programMovies.length === 0) {
        outputProgram = programName + " program, for " + programDate.toDateString() + ", program duration: To be announced";
    } else {
        outputProgram = programName + " program, for " + programDate.toDateString() + " has: " + programMovies.length + " movie(s), program duration: " + this.getProgramDuration() + "min.";

    }

    return outputProgram;

};






