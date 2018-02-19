var movies = [];
var programs = [];

function getDOMStrings() {

    var DOMStrings = {
        titleElement: "movie-title",
        lengthElement: "movie-length",
        genreSelectElement: "movie-genre",
        movieError: ".movie-error",
        createMovieBtn: "create-movie-btn",
        movieList: "movie-list",
        programDateElement: "program-date",
        programNameElement: "program-name",
        programError: ".program-error",
        createProgramBtn: "create-program-btn",
        programList: "program-list",
        movieSelectElement: "movie-select",
        programSelectElement: "program-select",
        assignError: ".assign-error",
        addMovie: "add-movie",
        allForm: "form"

    };

    return DOMStrings;
}

function collectInputs() {

    var inputsDom = getDOMStrings();

    var inputTitle = document.getElementById(inputsDom.titleElement);
    var inputLength = document.getElementById(inputsDom.lengthElement);
    var genreSelect = document.getElementById(inputsDom.genreSelectElement);
    var genreOption = genreSelect[genreSelect.selectedIndex];
    var programDateInput = document.getElementById(inputsDom.programDateElement);
    var programNameSelect = document.getElementById(inputsDom.programNameElement);
    var programNameOption = programNameSelect[programNameSelect.selectedIndex];
    var movieSelect = document.getElementById(inputsDom.movieSelectElement);
    var movieOption = movieSelect[movieSelect.selectedIndex];
    var programSelect = document.getElementById(inputsDom.genreSelectElement);
    var programOption = programSelect[programSelect.selectedIndex];

    var result = {
        title: inputTitle.value,
        length: inputLength.value,
        genre: genreOption.value,
        programDate: programDateInput.value,
        programName: programNameOption.value,
        movieOptionList: movieOption.value,
        programOptionList: programOption.value
    };

    return result;

}

function addEventListeners() {

    var eventDOM = getDOMStrings();

    document.getElementById(eventDOM.createMovieBtn).addEventListener("click", function () {
        createMovie();
    });

    document.getElementById(eventDOM.createProgramBtn).addEventListener("click", function () {
        createProgram();
    });

    document.getElementById(eventDOM.addMovie).addEventListener("click", function () {
        addMovieToProgram();
    });
}

function clearFormInputs() {

    var clearInputsDOM = getDOMStrings();

    var clear = {
        errorMovie: document.querySelector(clearInputsDOM.movieError).textContent = "",
        errorProgram: document.querySelector(clearInputsDOM.programError).textContent = "",
        errorAssign: document.querySelector(clearInputsDOM.assignError).textContent = "",
        clearAllForm: document.querySelector(clearInputsDOM.allForm).reset()

    };

    return clear;

}

function showProgramError(programInputsError) {

    var errorDOM = getDOMStrings();
    var programErrorMessage;


    if (!programInputsError.programDate && !programInputsError.programName) {
        programErrorMessage = "Please select date and program";
    } else if (!programInputsError.programDate) {
        programErrorMessage = "Please select date";
    } else if (!programInputsError.programName) {
        programErrorMessage = "Please enter program name";
    }

    document.querySelector(errorDOM.programError).textContent = programErrorMessage;

}



function showMovieError(movieInputsError) {


    var errorDOM = getDOMStrings();
    var movieErrorMessage;

    if (!movieInputsError.title && !movieInputsError.length && !movieInputsError.genre) {
        movieErrorMessage = "Please fill all fields";
    } else if (!movieInputsError.title) {
        movieErrorMessage = "Please enter title";
    } else if (!movieInputsError.length) {
        movieErrorMessage = "Please enter length";
    } else if (!movieInputsError.genre) {
        movieErrorMessage = "Please select genre";
    }

    document.querySelector(errorDOM.movieError).textContent = movieErrorMessage;
}

function showAssignError(indexForMovie, indexForProgram) {

    var errorDOM = getDOMStrings();

    var assignErrorMessage;

    if (!indexForMovie && !indexForProgram) {
        assignErrorMessage = "Please select movie and program";
    } else if (!indexForMovie) {
        assignErrorMessage = "Please select movie";
    } else if (!indexForProgram) {
        assignErrorMessage = "Please select program";
    }

    document.querySelector(errorDOM.assignError).textContent = assignErrorMessage;

}

function createMovie() {

    var movieInputs = collectInputs();
    var DOMForMovie = getDOMStrings();

    var movie = new Movie(movieInputs.title, movieInputs.length, movieInputs.genre);

    if (!movieInputs.title || !movieInputs.length || !movieInputs.genre) {
        showMovieError(movieInputs);
        return;
    }
    
    var errorMessage;

    for (var item in movies) {
        if (movieInputs.title === movies[item].title) {
            errorMessage = "Movie already exist";
            document.querySelector(DOMForMovie.movieError).textContent = errorMessage;
            return;
        }
    }

    movies.unshift(movie);


    var movieOptionHTML = "<option value='none'>-</option>";
    var movieListHTML = "<ul>";

    for (var i = 0; i < movies.length; i++) {
        var movieOutput = movies[i];
        movieListHTML += "<li>" + movieOutput.getData() + "</li>";
        movieOptionHTML += '<option value="' + i + '">' + movieOutput.title + '</option>';
    }

    movieOptionHTML += "</ul>";

    document.getElementById(DOMForMovie.movieList).innerHTML = movieListHTML;
    document.getElementById(DOMForMovie.movieSelectElement).innerHTML = movieOptionHTML;


    clearFormInputs();

}

function createProgram() {

    var programInputs = collectInputs();

    var program = new Program(programInputs.programDate, programInputs.programName);
    
    if (!programInputs.programDate || !programInputs.programName) {
        showProgramError(programInputs);
        return;
    }

    var errorMessageProgram;
    for (var prog in programs) {
        if (programInputs.programName === programs[prog].name && programInputs.programDate === programs[prog].date) {
            errorMessageProgram = "Program already exist for this date";
            document.querySelector(".program-error").textContent = errorMessageProgram;
            return;
        }      
    }
    programs.unshift(program);
    
    refreshProgramList();
    
    clearFormInputs();

}

function addMovieToProgram() {
    var addMovieDOM = getDOMStrings();


    var movieSelectElement1 = document.getElementById(addMovieDOM.movieSelectElement);
    var movieOption1 = movieSelectElement1[movieSelectElement1.selectedIndex];

    var programSelectElement1 = document.getElementById(addMovieDOM.programSelectElement);
    var programOption1 = programSelectElement1[programSelectElement1.selectedIndex];

    var movieIndex = movieOption1.value;
    var programIndex = programOption1.value;

    var selectedMovie = movies[movieIndex];
    var selectedProgram = programs[programIndex];

    var error;

    if (!selectedMovie || !selectedProgram) {
        showAssignError(selectedMovie, selectedProgram);
        return;
    }

    var listOfPrograms = selectedProgram.listOfMovies;
    
    for (var movie in listOfPrograms) {
        if (selectedMovie.title === listOfPrograms[movie].title) {
            var errorMessage = "Movie already exist in this program";
            document.querySelector(addMovieDOM.assignError).textContent = errorMessage;
            return;
        } else if (selectedMovie.genre !== listOfPrograms[movie].genre) {
            errorMessage = "Movies in one program must have the same genre"
            document.querySelector(addMovieDOM.assignError).textContent = errorMessage;
            return;
        }
    }
    
    selectedProgram.addMovie(selectedMovie);
    
    
    refreshProgramList();

    clearFormInputs();

}

function refreshProgramList() {

    var refreshProgramDOM = getDOMStrings();

    var programListHTML = "<option value='none'>-</option>";

    var refreshProgramListHTML = "<ul>";
    
    for (var i = 0; i < programs.length; i++) {
        var programRefresh = programs[i];
        refreshProgramListHTML += "<li>" + programRefresh.getData() + "</li>";
        programListHTML += "<option value='" + i + "'>" + programRefresh.getData() + "</option>";
    }

    refreshProgramListHTML += "</ul>";


    document.getElementById(refreshProgramDOM.programList).innerHTML = refreshProgramListHTML;
    document.getElementById(refreshProgramDOM.programSelectElement).innerHTML = programListHTML;

}

addEventListeners();