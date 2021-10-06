import React from "react";
import './Form.css';
import {Link} from "react-router-dom";
import HeaderLogo from '../../images/MainPageLogo.svg';
import InfoToolTip from "../InfoToolTip/InfoToolTip";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const formRegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Минимальное кол-во символов 2')
    .required('Необходимо заполнить поле')
    .matches(/^[а-яА-Яa-zA-Z0-9_.-]*$/, 'Не корректные символы'),
  email: Yup.string()
    .email('Некорректная почта')
    .min(4, 'Минимальное кол-во символов 2')
    .required('Необходимо заполнить поле'),
  password: Yup.string()
    .min(6, 'Минимальное кол-во символов 6')
    .required('Необходимо заполнить поле'),
});

const formLoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Некорректная почта')
    .min(4, 'Минимальное кол-во символов 2')
    .required('Необходимо заполнить поле'),
  password: Yup.string()
    .min(6, 'Минимальное кол-во символов 6')
    .required('Необходимо заполнить поле'),
});

function FormLoginOrRegister(props) {
    return (
    <div className="form">
      <div className="form__wrapper">
        <Link to={'/'} className="form__logo">
          <img className="form__logo-image" src={HeaderLogo} alt="Логотип круг"/>
        </Link>
        <h1 className="form__title">{props.title}</h1>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
          }}
          validationSchema={props.isRegisterPage ? formRegisterSchema : formLoginSchema}
          onSubmit={props.isRegisterPage ? props.onRegister : props.onLogin}
        >
          {({dirty, isValid}) => (
            <Form className={'form__form'}>
              {props.isRegisterPage && (
                <>
                  <span className={'form__input-text'}>Имя</span>
                  <Field className={'form__input'} name={'name'} type={'text'}/>
                  <ErrorMessage name={'name'}>
                    {msg => <div className={'form__error'}>{msg}</div>}
                  </ErrorMessage>
                </>
              )}
              <span className={'form__input-text'}>Email</span>
              <Field className={'form__input'} name={'email'} type={'email'}/>
              <ErrorMessage name={'email'}>
                {msg => <div className={'form__error'}>{msg}</div>}
              </ErrorMessage>
              <span className={'form__input-text'}>Пароль</span>
              <Field className={'form__input'} name={'password'} type={'password'}/>
              <ErrorMessage name={'password'}>
                {msg => <div className={'form__error'}>{msg}</div>}
              </ErrorMessage>
              <button className="form__button" disabled={!isValid || !dirty}>{props.buttonText}</button>
              <div className="form__lower-links">
                <span className="form__button_type_text">{props.buttonLowerText}</span>
                <span className="form__button_type_link">
                  <Link className="form__link" to={props.buttonLinkPath}>{props.buttonLinkText}</Link>
                 </span>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <InfoToolTip isAccepted={props.isAccepted} isAcceptedPopupOpen={props.isAcceptedPopupOpen} onClosePopup={props.onClosePopup}/>
    </div>
  )
}


export default FormLoginOrRegister;