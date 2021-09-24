import React from "react";
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
  return (
    <>
      <div className={'card-list__line'}>
        <div className="break-line_type_dark"></div>
      </div>
        <div className={'card-list'}>
          <MoviesCard isSavedMoviesPage={props.isSavedMoviesPage}/>
          <MoviesCard isSavedMoviesPage={props.isSavedMoviesPage} />
          <MoviesCard isSavedMoviesPage={props.isSavedMoviesPage} />
          <MoviesCard isSavedMoviesPage={props.isSavedMoviesPage} />
          <MoviesCard isSavedMoviesPage={props.isSavedMoviesPage} />
          <MoviesCard isSavedMoviesPage={props.isSavedMoviesPage} />
        </div>
        <button className={`card-list__button ${props.isSavedMoviesPage ? 'card-list__button_hide' : ''}`}>Ещё</button>
    </>
  );
};

export default MoviesCardList;