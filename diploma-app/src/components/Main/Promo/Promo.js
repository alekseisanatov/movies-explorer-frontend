import React from "react";
import './Promo.css';
import PromoImg from '../../../images/HeaderImage.svg';
import Header from "../../Header/Header";

function Promo(props) {
  return (
    <div className="promo">
      <Header isLoggedIn={props.isLoggedIn}/>
      <h1 className="promo__header">Учебный проект студента факультета Веб-разработки.</h1>
      <div className="promo__wrapper">
        <img className="promo__image" src={PromoImg} alt="спираль"/>
      </div>
    </div>
  )
};

export default Promo;