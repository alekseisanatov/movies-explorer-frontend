import React from "react";
import './MoviesCard.css';
import DeleteFilm from '../../../images/delete-film.svg';
import SavedFilm from '../../../images/film-saved.svg';
import FilmImage from '../../../images/film-url.jpg';

function MoviesCard(props) {
  function toggleFilmSave(e) {
    const button = e.currentTarget;
    const buttonText = button.querySelector('.card__button-text');
    const buttonSaveLogo = button.querySelector('.card__button-save');
    buttonSaveLogo.classList.toggle('card__button-save_active');
    buttonText.classList.toggle('card__button-text_hide');
    button.classList.toggle('card__button_active');
  }

  return(
    <div className={'card'}>
      <div className="card__header">
        <h2 className={'card__title'}>В погоне за Бенкси</h2>
        <p className="card__duration">27 минут</p>
      </div>
      <div className="card__image">
        <img className={'card__image-img'} src={FilmImage} alt='Превью фильма'/>
      </div>
      <button onClick={toggleFilmSave} className={`card__button`}>
        <p className={`card__button-text ${props.isSavedMoviesPage ? 'card__button-text_hide' : ''}`}>Сохранить</p>
        <img src={SavedFilm} alt="Фильм сохранен" className="card__button-save"/>
        <img src={DeleteFilm} alt="Удалить фильм" className={`card__button-delete ${props.isSavedMoviesPage ? 'card__button-delete_active' : ''}`}/>
      </button>
    </div>
  );
};

export default MoviesCard;