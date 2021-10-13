import React from "react";
import SavedFilm from '../../images/film-saved.svg';

function MovieButton({isAdded, onClick, onClickRemove}) {

  return (
    <button  className={'card__button'}>
      <p onClick={onClick} className={`card__button-text ${isAdded ? 'card__button-text_hide' : ''}`}>Сохранить</p>
      <img onClick={onClickRemove} src={SavedFilm} alt="Фильм сохранен" className={`card__button-save ${isAdded ? 'card__button-save_active' : ''}`}/>
    </button>
  )
}

export default MovieButton;