import React from "react";
import './MoviesCardList.css';
import Preloader from "../Preloader/Preloader";
import FilmFilter from "../FilmFilter/FilmFilter";


function MoviesCardList(props) {
  const [notFoundText, setNotFoundText] = React.useState(false);

  return (
    <>
      <div className={'card-list__line'}>
        <div className="break-line_type_dark"></div>
      </div>
        <div className={'card-list'}>
          <Preloader isActive={props.isPreloaderActive}/>
          <h2 className={`card-list__empty ${props.isFilmTextActive ? 'card-list__empty_active' : ''}`}>Введите название фильма</h2>
          <h2 className={`card-list__not-found ${notFoundText ? 'card-list__not-found_active' : ''}`}>По данному запросу фильмов не найдено</h2>
          <div className="card-list__movies">
            <FilmFilter movies={props.movies} filmInput={props.filmInput} isShortFilmChecked={props.isShortFilmChecked}/>
          </div>
        </div>
        <button className={`card-list__button ${props.isSavedMoviesPage ? 'card-list__button_hide' : ''}`}>Ещё</button>
    </>
  );
};

export default MoviesCardList;