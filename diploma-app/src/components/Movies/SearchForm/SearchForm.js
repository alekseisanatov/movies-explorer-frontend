import React from "react";
import './SearchForm.css';
import SearchLogo from '../../../images/seacrh-icon.svg';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm(props) {
  return(
    <form onSubmit={props.onSubmit} className={'search'}>
      <div className="search__left">
        <img src={SearchLogo} alt="Лупа" className={'search__logo'}/>
        <input onChange={props.onInputChange} value={props.filmsInputValue} type="text" className={'search__input'} placeholder={'Фильм'} required/>
        <button className={'search__button'}>Найти</button>
      </div>
      <div className="search__line"></div>
      <div className="search__right">
        <FilterCheckbox isChecked={props.shortFilmCheckbox} toggleCheckbox={props.toggleCheckbox} />
      </div>
    </form>
  );
};

export default SearchForm;