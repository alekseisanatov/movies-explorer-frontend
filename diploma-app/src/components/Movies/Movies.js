import React, {useEffect} from "react";
import './Movies.css';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";
import {shortFilmDuration} from "../../utils/constants";

function Movies({isLoading, isSavedMoviesPage, movies, searchError, onSearch }) {
  const [isShortFilmChecked, setShortFilmChecked] = React.useState(false);

  const filterShortFilms = (moviesFilter) => {
    const moviesArr = moviesFilter.filter((item) => item.duration <= shortFilmDuration);
    return moviesArr;
  };

  const toggleCheckbox = () =>  {
    setShortFilmChecked(!isShortFilmChecked);
  }

  useEffect(() => {
    filterShortFilms(movies);
  }, [isShortFilmChecked]);

  return (
    <div className={'movies'}>
      <Header isLoggedIn={true} />
      <SearchForm toggleCheckbox={toggleCheckbox}
                  shortFilmCheckbox={isShortFilmChecked}
                  onSubmit={onSearch} />
      <MoviesCardList searchError={searchError}
                      isLoading={isLoading}
                      movies={isShortFilmChecked ? filterShortFilms(movies) : movies}
                      isSavedMoviesPage={isSavedMoviesPage} />
      <Footer />
    </div>
  );
};

export default Movies;