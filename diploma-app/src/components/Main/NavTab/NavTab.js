import React from "react";
import './NavTab.css';
import {Link} from "react-router-dom";
import HeaderLogo from '../../../images/MainPageLogo.svg';

function NavTab() {
  return(
    <header className="navtab">
      <Link className="navtab__logo">
        <img className="navtab__image" src={HeaderLogo} alt="лого"/>
      </Link>

    </header>
  );
}

export default NavTab;