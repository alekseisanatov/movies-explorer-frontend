import React, {useState} from "react";
import './SearchForm.css';
import SearchLogo from '../../../images/seacrh-icon.svg';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({onSubmit, toggleCheckbox, shortFilmCheckbox, fetchError}) {
  const [searchInput, setSearchInput] = useState('');
  const [inputError, setInputError] = useState('');
  const isFilmsAreInLocalStorage = JSON.parse(localStorage.getItem('filteredMovies'));

  const handleInput = (e) => {
    setSearchInput(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!searchInput && !isFilmsAreInLocalStorage) {
      console.log(isFilmsAreInLocalStorage);
      setInputError('Нужно ввести ключевое слово');
      setTimeout(() => {
        setInputError('');
      }, 5000);
    } else {
      onSubmit(searchInput);
    }
  }

  return(
    <form onSubmit={handleSubmit} className={'search'} noValidate>
      <div className="search__left">
        <img src={SearchLogo} alt="Лупа" className={'search__logo'}/>
        <div className="search__wrapper">
          <input onChange={handleInput} value={searchInput} type="text" className={'search__input'} placeholder={'Фильм'} required/>
          <span className={'search__error'}>{inputError}</span>
        </div>
        <button className={'search__button'}>Найти</button>
      </div>
      <div className="search__line"></div>
      <div className="search__right">
        <FilterCheckbox isChecked={shortFilmCheckbox} toggleCheckbox={toggleCheckbox} />
      </div>
    </form>
  );
};

export default SearchForm;