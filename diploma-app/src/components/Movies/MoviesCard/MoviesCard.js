import React, {useEffect} from "react";
import './MoviesCard.css';
import MovieButton from "../../Buttons/MovieButton";
import MovieDeleteButton from "../../Buttons/MovieDeleteButton";

function MoviesCard({movie, isMovieAdded, onMovieClick, isSavedMoviesPage}) {
  const {nameRU, duration, trailerLink, trailer, image} = movie;

  let isAdded;

  if(!isSavedMoviesPage) {
    isAdded = isMovieAdded(movie);
  } else {
    isAdded = false;
  }

  const handleMovieClick = (e) => {
    e.preventDefault();
    onMovieClick(movie, !isAdded, isSavedMoviesPage);
  }

  const removeMovie = () => {
    onMovieClick(movie, false, isSavedMoviesPage);
  }

  return(
    <div className={'card'}>
      <div className="card__header">
        <h2 className={'card__title'}>{nameRU}</h2>
        <p className="card__duration">{duration} минуты</p>
      </div>
      <a href={isSavedMoviesPage ? trailer : trailerLink} target="_blank" rel="noreferrer" className="card__image">
        <img className={'card__image-img'} src={isSavedMoviesPage ? `${String(image)}` : `https://api.nomoreparties.co${image.url}`} alt={nameRU}/>
      </a>
      {isSavedMoviesPage
        ? <MovieDeleteButton removeMovie={removeMovie}/>
        : <MovieButton isAdded={isAdded} onClick={handleMovieClick} onClickRemove={removeMovie}/>
      }
    </div>
  );
};

export default MoviesCard;