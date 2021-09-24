import React from "react";
import './SearchForm.css';
import SearchLogo from '../../../images/seacrh-icon.svg';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
  function submit(e) {
    e.preventDefault();
  }

  return(
    <form onSubmit={submit} className={'search'}>
      <div className="search__left">
        <img src={SearchLogo} alt="Лупа" className={'search__logo'}/>
        <input type="text" className={'search__input'} placeholder={'Фильм'} required/>
        <button className={'search__button'}>Найти</button>
      </div>
      <div className="search__line"></div>
      <div className="search__right">
        <FilterCheckbox />
      </div>
    </form>
  );
};

export default SearchForm;