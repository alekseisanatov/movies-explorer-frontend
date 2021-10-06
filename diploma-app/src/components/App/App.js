import React, {useState} from "react";
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
import InfoToolTip from "../InfoToolTip/InfoToolTip";

function App() {

  const history = useHistory();
  const [isLoggedIn, setLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isToolTipAccepted, setToolTipAccepted] = useState(false);

  function handleRegister(name, email, password) {
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

  function handleLogin(email, password) {
    mainApi.authorization(email, password)
      .then(() => {
        setLoggedIn(true);
        localStorage.setItem('isAuth', 'true');
        //checkToken
        history.push('/movies');
      })
      .catch((err) => {
        setToolTipAccepted(false);
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

  // function checkToken() {
  //   mainApi.getToken()
  //     .then((res) => {
  //       setCurrentUser(res);
  //       setLoggedIn(true);
  //       history.push('/movies');
  //     })
  // }
  //
  // React.useEffect(() => { if(localStorage.getItem('isAuth') !== null) {checkToken()}}, []);

  function openAcceptedPopup() {
    setPopupOpen(true);
    setToolTipAccepted(true);
  }

  function openDeclinedPopup() {
    setPopupOpen(true);
    setToolTipAccepted(false);
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
                          component={Movies}/>
          <ProtectedRoute path={'/saved-movies'}
                          isLoggedIn={isLoggedIn}
                          component={SavedMovies}/>
          <ProtectedRoute path={'/profile'}
                          isLoggedIn={isLoggedIn}
                          onSignOut={signOut}
                          component={Profile}/>
          <Route path='/signup'>
            <Register handleSubmit={handleRegister}/>
          </Route>
          <Route path='/signin'>
            <Login/>
          </Route>
          <Route path='/404'>
            <ErrorPage404/>
          </Route>
        </Switch>
        <InfoToolTip isAcceptedPopupOpen={isPopupOpen} isAccepted={isToolTipAccepted}/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
