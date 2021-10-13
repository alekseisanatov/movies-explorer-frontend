import React from "react";
import './Header.css';
import HeaderLogo from '../../images/MainPageLogo.svg';
import AccountLogo from '../../images/AccountImage.svg';
import BurgerMenu from '../../images/burger-menu.svg';
import BurgerMenuClose from '../../images/burger-close.svg';
import {Link} from "react-router-dom";

function Header(props) {

  function burgerMenuToggle() {
    const burgerList = document.querySelector('.header__burger-links');
    const overlay = document.querySelector('.header__overlay');
    overlay.classList.toggle('header__overlay_active');
    burgerList.classList.toggle('header__burger-links_active');
  }

  return (
    <header className="header">
      <Link to={'/'} className="header__logo">
        <img className="header__logo-image" src={HeaderLogo} alt="лого"/>
      </Link>
      {props.isLoggedIn && (
        <ul className="header__films">
          <li className="header__film"><Link className="header__link" to='/movies'>Фильмы</Link></li>
          <li className="header__film"><Link className="header__link" to='/saved-movies'>Сохранённые фильмы</Link></li>
        </ul>
      )}
      {props.isLoggedIn ? (
        <Link className="header__account" to={'/profile'}>
          <img className="header__account-image" src={AccountLogo} alt="Иконка аккаунта"/>
          <h3 className="header__account-text">Аккаунт</h3>
        </Link>
      ) : (
        <div className="header_nav">
          <Link className="header__link" to={'/signup'}>Регистрация</Link>
          <Link className="header__link header__link_type_login" to={'/signin'}>Войти</Link>
        </div>
      )}
      <button onClick={burgerMenuToggle} className={`header__burger ${props.isLoggedIn ? 'header__burger_active' : ''}`}>
        <img src={BurgerMenu} alt="бургер-меню"/>
      </button>
      <div className="header__burger-links">
        <button onClick={burgerMenuToggle} className={'header__burger-close'}>
          <img src={BurgerMenuClose} alt="закрыть"/>
        </button>
          <div className="header__burger-main">
            <Link to={'/'} className={'header__burger-link'}>Главная</Link>
            <Link to={'/movies'} className={'header__burger-link'}>Фильмы</Link>
            <Link to={'/saved-movies'} className={'header__burger-link'}>Сохраненные фильмы</Link>
          </div>
          <Link className="header__account-burger" to={'/profile'}>
            <img className="header__account-image" src={AccountLogo} alt="Иконка аккаунта"/>
            <h3 className="header__account-text">Аккаунт</h3>
          </Link>
      </div>
      <div className="header__overlay"></div>
    </header>
  );
};

export default Header;