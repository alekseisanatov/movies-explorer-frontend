import React from "react";
import Movies from "../Movies/Movies";

function SavedMovies({movies, isLoading, searchError, onSearch, onMovieClick, isMovieAdded}) {
  return <Movies isSavedMoviesPage={true}
                 onSearch={onSearch}
                 isLoading={isLoading}
                 onMovieClick={onMovieClick}
                 isMovieAdded={isMovieAdded}
                 searchError={searchError}
                 movies={movies}/>
}

export default SavedMovies;