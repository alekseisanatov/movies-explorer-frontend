import React from "react";
import Movies from "../Movies/Movies";

function SavedMovies({movies, isLoading, searchError, onSearch}) {
  return <Movies isSavedMoviesPage={true}
                 onSearch={onSearch}
                 isLoading={isLoading}
                 searchError={searchError}
                 movies={movies}/>
}

export default SavedMovies;