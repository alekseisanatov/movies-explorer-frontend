import React from "react";
import DeleteFilm from '../../images/delete-film.svg';

function MovieDeleteButton({removeMovie}) {
  return (
    <button onClick={removeMovie} className={'card__button'}>
      <img src={DeleteFilm} alt="Удалить фильм" className={`card__button-delete card__button-delete_active`}/>
    </button>
  )
}

export default MovieDeleteButton;