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
  const [currentUser, setCurrentUser] = useState({name: '', email: ''});
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isToolTipAccepted, setToolTipAccepted] = useState(false);
  const [allFilms, setAllFilms] = useState([]);
  const [fetchError, setFetchError] = useState('');
  const [searchError, setSearchError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filteredFilms, setFilteredFilms] = useState([]);
  const [savedFilms, setSavedFilms] = useState([]);

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
        setLoggedIn(false);
        setCurrentUser(null);
        history.push('/signin');
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

  React.useEffect(() => { if(localStorage.getItem('isAuth') !== null) {checkToken()}}, []);

  function handleEditProfile({ name, email }) {
    mainApi.updateUser(name, email)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
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
        setFetchError('При запросе произошла ошибка, повторите позже.');
        console.log(err);
      })
  };

  const getSavedFilms = () => {
    mainApi.getSavedFilms()
      .then((res) => {
        const savedFilms = res.map((movie) => {
          return {
            ...movie,
          };
        });
        localStorage.setItem('savedMovies', JSON.stringify(savedFilms));
        setSavedFilms(savedFilms);
      })
      .catch((err) => {
        localStorage.removeItem('savedMovies');
        setFetchError('Во время запроса произошла ошибка, попробуйте позже');
      })
  }

  useEffect(() => {
      getAllFilms();
  }, [allFilms]);

  const filterFilms = (movies, searchInput) => {
    if (searchInput) {
      const regex = new RegExp(searchInput, 'gi');
      const filterData = movies.filter((item) => regex.test(item.nameRU) || regex.test(item.nameEN));
      if (filterData.length === 0) {
        setSearchError(' Ничего не найдено');
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
    if(localStorage.getItem('savedFilms')) {
      setSavedFilms(JSON.parse(localStorage.getItem('savedFilms')));
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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <ProtectedRoute exact
                          path={'/'}
                          isLoggedIn={isLoggedIn}
                          component={Main}/>
          <ProtectedRoute path={'/movies'}
                          isLoggedIn={isLoggedIn}
                          onSearch={handleSearch}
                          isLoading={isLoading}
                          searchError={searchError}
                          movies={filteredFilms}
                          component={Movies}/>
          <ProtectedRoute path={'/saved-movies'}
                          isLoggedIn={isLoggedIn}
                          onSearch={handleSearch}
                          isLoading={isLoading}
                          searchError={searchError}
                          movies={savedFilms}
                          component={SavedMovies}/>
          <ProtectedRoute path={'/profile'}
                          isLoggedIn={isLoggedIn}
                          onSignOut={signOut}
                          onEditProfile={handleEditProfile}
                          component={Profile}/>
          <Route path='/signup'>
            <Register handleSubmit={handleRegister}/>
          </Route>
          <Route path='/signin'>
            <Login onLogin={handleLogin}
                   isAcceptedPopupOpen={isPopupOpen}
                   isAccepted={isToolTipAccepted}
                   onClosePopup={closePopup}/>
          </Route>
          <Route path='/404'>
            <ErrorPage404/>
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
