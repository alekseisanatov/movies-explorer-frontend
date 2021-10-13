import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

function FilmFilter(props) {
  return(
    <>
      {props.movies.map((movie) => {
          if (movie.nameRU.includes(props.filmInput.toString()) && (props.isShortFilmChecked ? movie.duration <= 40 : movie.duration > 0)) {
            return <MoviesCard key={movie.id} title={movie.nameRU} duration={movie.duration} image={movie.image.url} link={movie.trailerLink}/>
          } else {
            return false;
          }
        }
      )}
    </>
    )
};

export default FilmFilter;