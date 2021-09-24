import React from "react";
import '../../vendor/normalize.css';
import '../../vendor/fonts/fonts.css';
import {Route, Switch} from "react-router-dom";
import Main from '../Main/Main';
import ErrorPage404 from "../404/404";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";

function App() {

  const [isLoggedIn, setLoggedIn] = React.useState(null);

  return (
    <div className="page">
      <Switch>
        <Route exact path='/'>
          <Main loggedIn={isLoggedIn}/>
        </Route>
        <Route path='/movies'>
          <Movies />
        </Route>
        <Route path='/saved-movies'>
          <SavedMovies />
        </Route>
        <Route path='/profile'>
          <Profile loggedIn={isLoggedIn} />
        </Route>
        <Route path='/signup'>
          <Register/>
        </Route>
        <Route path='/signin'>
          <Login/>
        </Route>
        <Route path='/404'>
          <ErrorPage404/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
