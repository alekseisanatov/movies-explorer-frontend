import React from "react";
import './Movies.css';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";
import * as apiMovies from "../../utils/MoviesApi";

function Movies(props) {
  const [movies, setMovies] = React.useState([]);
  const [preloaderActive, setPreloaderActive] = React.useState(false);
  const [filmTextActive, setFilmTextActive] = React.useState(true);
  const [filmsInput, setFilmInput] = React.useState('');
  const [filmsInputToSearch, setFilmsInputToSearch] = React.useState('');
  const [isShortFilmChecked, setShortFilmChecked] = React.useState(false);

  function getCards() {
    apiMovies.getFilms()
      .then((res) => {
        setMovies(res);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setPreloaderActive(false)
      })
  };

   function handleSubmit(e) {
     setMovies([]);
    e.preventDefault();
    setFilmTextActive(false);
    setPreloaderActive(true);
    setFilmsInputToSearch(filmsInput);
    getCards();
  }

  function handleInput(e) {
    setFilmInput(e.target.value);
  }

  function toggleCheckbox() {
    if(isShortFilmChecked === true) {
      setShortFilmChecked(false);
    } else {
      setShortFilmChecked(true);
    }
  }

  return (
    <div className={'movies'}>
      <Header isLoggedIn={true} />
      <SearchForm toggleCheckbox={toggleCheckbox} shortFilmCheckbox={isShortFilmChecked} filmsInputValue={filmsInput} onInputChange={handleInput} onSubmit={handleSubmit} />
      <MoviesCardList isShortFilmChecked={isShortFilmChecked} filmInput={filmsInputToSearch} isPreloaderActive={preloaderActive} isFilmTextActive={filmTextActive} movies={movies} isSavedMoviesPage={props.isSavedMoviesPage} />
      <Footer />
    </div>
  );
};

export default Movies;