import React from "react";
import './Movies.css';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";

function Movies(props) {
  return (
    <div className={'movies'}>
      <Header isLoggedIn={true} />
      <SearchForm />
      <MoviesCardList isSavedMoviesPage={props.isSavedMoviesPage} />
      <Footer />
    </div>
  );
};

export default Movies;