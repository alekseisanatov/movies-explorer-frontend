import React from "react";
import Header from "../Header/Header";
import {Link} from "react-router-dom";
import './Profile.css';

function Profile(props) {
  return(
    <div className={'profile'}>
      <Header isLoggedIn={true} />
      <div className="profile__wrapper">
        <h1 className="profile__title">Привет, Виталий!</h1>
        <div className="profile__info">
          <h3 className="profile__placeholder">Имя</h3>
          <h3 className="profile__text">Виталий{props.userName}</h3>
        </div>
        <div className="break-line break-line_type_dark"></div>
        <div className="profile__info">
          <h3 className="profile__placeholder">E-mail</h3>
          <h3 className="profile__text">@yach.ru{props.userEmail}</h3>
        </div>
        <button className={'profile__button'}>Редактировать</button>
        <Link className={'profile__link'}>Выйти из аккаунта</Link>
      </div>
    </div>
  )
};

export default Profile;