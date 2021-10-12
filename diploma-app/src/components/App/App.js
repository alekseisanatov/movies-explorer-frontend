import React, {useEffect, useState} from "react";
import './App.css';
import '../../vendor/normalize.css';
import '../../vendor/fonts/fonts.css';
import {Route, Switch, useHistory} from "react-router-dom";
import Main from '../Main/Main';
import ErrorPage404 from "../404/404";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import * as mainApi from '../../utils/MainApi';
import {getFilms} from "../../utils/MoviesApi";

function App() {

  const history = useHistory();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isToolTipAccepted, setToolTipAccepted] = useState(false);
  const [allFilms, setAllFilms] = useState([]);
  const [fetchError, setFetchError] = useState('');
  const [searchError, setSearchError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filteredFilms, setFilteredFilms] = useState([]);
  const [savedFilms, setSavedFilms] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleRegister({ name, email, password }) {
    mainApi.register(name, email, password).then((res) => {
      if(res) {
        openAcceptedPopup();
        history.push('/signin');
      }
    })
      .catch((err) => {
        openDeclinedPopup();
        console.log(err);
      })
  }


  function handleLogin({ email, password }) {
    mainApi.authorization(email, password)
      .then(() => {
        setLoggedIn(true);
        localStorage.setItem('isAuth', 'true');
        checkToken();
        getSavedFilms();
        history.push('/movies');
      })
      .catch((err) => {
        openDeclinedPopup();
        console.log(err);
      })
  }

  function signOut() {
    mainApi.logout()
      .then(() => {
        localStorage.removeItem('isAuth');
        localStorage.removeItem('filteredMovies');
        localStorage.removeItem('allMovies');
        setLoggedIn(false);
        setCurrentUser(null);
        setAllFilms([]);
        setFilteredFilms([]);
        setPopupOpen(false);
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function checkToken() {
    mainApi.getToken()
      .then((res) => {
        setCurrentUser(res);
        setLoggedIn(true);
        history.push('/movies');
      })
  }

  useEffect(() => {
    if(localStorage.getItem('isAuth') !== null) {checkToken()}
    }, []);

  function handleEditProfile({ name, email }, {resetForm}) {
    mainApi.updateUser(name, email)
      .then((res) => {
        setIsSubmitted(true);
        setCurrentUser(res);
        openAcceptedPopup();
        resetForm();
      })
      .catch((err) => {
        openDeclinedPopup();
        setIsSubmitted(false);
        console.log(err);
      })
  }

  function closePopup() {
    setPopupOpen(false);
  }

  function openAcceptedPopup() {
    setPopupOpen(true);
    setToolTipAccepted(true);
  }

  function openDeclinedPopup() {
    setPopupOpen(true);
    setToolTipAccepted(false);
  }

  const getAllFilms = () => {
    getFilms()
      .then((res) => {
        const allFilmsInfo = res.map((movie) => {
          return {
            ...movie,
          };
        });
        localStorage.setItem('allMovies', JSON.stringify(allFilmsInfo));
        setAllFilms(allFilmsInfo);
      })
      .catch((err) => {
        localStorage.removeItem('allMovies');
        console.log(err);
      })
  };

  const getSavedFilms = () => {
    mainApi.getSavedFilms()
      .then((res) => {
        const savedMovies = res.filter((movie) => {
          if(movie.owner === currentUser._id) {
            return {
              ...movie,
              id: movie.movieId
            };
          }
        })
        setSavedFilms(savedMovies);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
      if(isLoggedIn) {
        getAllFilms();
        getSavedFilms();
      }
  }, [currentUser]);

  useEffect(() => {
    getAllFilms();
  }, [])

  const filterFilms = (movies, searchInput) => {
    if (searchInput) {
      const regex = new RegExp(searchInput, 'gi');
      const filterData = movies.filter((item) => regex.test(item.nameRU) || regex.test(item.nameEN));
      if (filterData.length === 0) {
        setSearchError(' Ничего не найдено');
        localStorage.removeItem('filteredMovies');
      } else {
        setSearchError('');
        localStorage.setItem('filteredMovies', JSON.stringify(filterData));
      }
      return filterData;
    }
    return [];
  }

  useEffect(() => {
    if(localStorage.getItem('filteredMovies')) {
      setFilteredFilms(JSON.parse(localStorage.getItem('filteredMovies')));
    } else {
      return;
    }
  }, [isLoading]);


  const handleSearch = (searchInput) => {
    setIsLoading(true);
    setTimeout(() => {
      setFilteredFilms(filterFilms(allFilms, searchInput));
      setIsLoading(false);
    }, 1000);
  }

  const addFilmToFavorite = (movie) => {
    const oldSavedFilms = savedFilms;

    const filmToSave = {
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `https://api.nomoreparties.co${movie.image.url}`,
      trailer: movie.trailerLink,
      thumbnail: 'https://api.nomoreparties.co/beatfilm-movies/thumbnail',
      movieId: String(movie.id),
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    };

    mainApi.addMovie(filmToSave)
      .then((film) => {
        setSavedFilms([film, ...savedFilms]);
        console.log('created');
      })
      .catch(() => {
        setSavedFilms(oldSavedFilms);
    })
  }

  const removeFilmFromFavorites = (movie, isSavedPage) => {
    const oldSavedFilms = savedFilms;
    console.log(movie);
    console.log(savedFilms);
    const movieToDelete = savedFilms.find((m) => m.movieId === String(isSavedPage ? movie.movieId : movie.id));


    mainApi.deleteMovie(movieToDelete._id)
      .then(() => {
        console.log('deleted');
        setSavedFilms(savedFilms.filter((m) => m.movieId !== String(isSavedPage ? movie.movieId : movie.id)));
      })
      .catch((err) => {
        setSavedFilms(oldSavedFilms);
        console.log(err);
      })
  }

  const handleMovieClick = (movie, isLiked, isSavedPage) => {
    {isLiked ? addFilmToFavorite(movie) : removeFilmFromFavorites(movie, isSavedPage)}
  }

  const checkIsMovieAdded = (movie) => savedFilms.some((item) => item.movieId === String(movie.id));

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <ProtectedRoute path={'/movies'}
                          isLoggedIn={isLoggedIn}
                          onSearch={handleSearch}
                          isLoading={isLoading}
                          searchError={searchError}
                          movies={filteredFilms}
                          fetchError={fetchError}
                          isMovieAdded={checkIsMovieAdded}
                          onMovieClick={handleMovieClick}
                          component={Movies}/>
          <ProtectedRoute path={'/saved-movies'}
                          isLoggedIn={isLoggedIn}
                          onSearch={handleSearch}
                          isLoading={isLoading}
                          searchError={searchError}
                          fetchError={fetchError}
                          movies={savedFilms}
                          isMovieAdded={checkIsMovieAdded}
                          onMovieClick={handleMovieClick}
                          component={SavedMovies}/>
          <ProtectedRoute path={'/profile'}
                          isAccepted={isToolTipAccepted}
                          isAcceptedPopupOpen={isPopupOpen}
                          onClosePopup={closePopup}
                          isSubmitted={isSubmitted}
                          isLoggedIn={isLoggedIn}
                          onSignOut={signOut}
                          onEditProfile={handleEditProfile}
                          component={Profile}/>
          <Route path='/signup'>
            <Register handleSubmit={handleRegister}
                      isAccepted={isToolTipAccepted}
                      isAcceptedPopupOpen={isPopupOpen}
                      onClosePopup={closePopup}/>
          </Route>
          <Route path='/signin'>
            <Login onLogin={handleLogin}
                   isAcceptedPopupOpen={isPopupOpen}
                   isAccepted={isToolTipAccepted}
                   onClosePopup={closePopup}/>
          </Route>
          <Route >
            <Main exact
                  path={'/'}
                  isLoggedIn={isLoggedIn}/>
          </Route>
          <Route component={ErrorPage404} />
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
