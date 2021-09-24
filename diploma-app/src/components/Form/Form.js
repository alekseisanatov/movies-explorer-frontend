import React from "react";
import './Form.css';
import {Link} from "react-router-dom";
import HeaderLogo from '../../images/MainPageLogo.svg';

function Form(props) {
  return (
    <div className="form">
      <div className="form__wrapper">
        <Link to={'/'} className="form__logo">
          <img className="form__logo-image" src={HeaderLogo} alt="Логотип круг"/>
        </Link>
        <h1 className="form__title">{props.title}</h1>
        <form className="form__form">
          <label className={`form__label ${props.isNameRequired ? '' : 'form__label_type_hide'}`}>
            Имя
            <input type="text" className="form__input form__input_type_name" name="name" id="name-input" required placeholder={'Введите имя'} autoComplete="off"/>
            <span className="form__error name-input_error"></span>
          </label>
          <label className={`form__label ${!(props.isRegisterPage) ? 'form__label_type_email' : ''}`}>
            E-mail
            <input type="email" className="form__input form__input_type_email" name="email" id="email-input" required placeholder={'Введите почту'} autoComplete="off"/>
            <span className="form__error email-input_error"></span>
          </label>
          <label className={`form__label form__label_type_password ${props.isRegisterPage ? 'form__label_password_active' : 'form__label_password_hide'}`}>
            Пароль
            <input type="password" className="form__input form__input_type_password" name="password" id="password-input" required placeholder={'Введите пароль'} autoComplete="off"/>
            <span className="form__error password-input_error"></span>
          </label>
          <button className="form__button">{props.buttonText}</button>
          <div className="form__lower-links">
            <span className="form__button_type_text">{props.buttonLowerText}</span>
            <span className="form__button_type_link">
          <Link className="form__link" to={props.buttonLinkPath}>{props.buttonLinkText}</Link>
        </span>
          </div>
        </form>
      </div>
    </div>
  )
};

export default Form;