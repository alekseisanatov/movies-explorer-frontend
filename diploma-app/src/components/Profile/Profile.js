import React, {useState} from "react";
import Header from "../Header/Header";
import './Profile.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import InfoToolTip from "../InfoToolTip/InfoToolTip";

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const profileSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Минимальное кол-во символов 2')
      .required('Необходимо заполнить поле')
      .matches(/^[а-яА-Яa-zA-Z0-9_.-]*$/, 'Не корректные символы'),
    email: Yup.string()
      .email('Некорректная почта')
      .min(4, 'Минимальное кол-во символов 2')
      .required('Необходимо заполнить поле'),
  });

  return(
    <div className={'profile'}>
      <Header isLoggedIn={true} />
      <div className="profile__wrapper">
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
        <Formik initialValues={{
          name: currentUser.name,
          email: currentUser.email,
        }}
          validationSchema={profileSchema}
          onSubmit={props.onEditProfile}
        >
          {({dirty, isValid}) => (
            <Form className={'profile__form'}>
              <div className="profile__info">
                <span className={'profile__placeholder'}>Имя</span>
                <Field name={'name'} className={'profile__text'} type={'text'}/>
                <ErrorMessage name={'name'}>
                  {msg => <div className={'profile__error'}>{msg}</div>}
                </ErrorMessage>
              </div>
              <div className="break-line break-line_type_dark"></div>
              <div className="profile__info">
                <span className={'profile__placeholder'}>E-mail</span>
                <Field name={'email'} className={'profile__text'} type={'email'}/>
                <ErrorMessage name={'email'}>
                  {msg => <div className={'profile__error'}>{msg}</div>}
                </ErrorMessage>
              </div>
              <button type={'submit'} className={'profile__button'} disabled={!isValid || !dirty}>Редактировать</button>
              <button onClick={props.onSignOut} className={'profile__link'}>Выйти из аккаунта</button>
            </Form>
          )}
        </Formik>
      </div>
      <InfoToolTip isAccepted={props.isAccepted} isAcceptedPopupOpen={props.isAcceptedPopupOpen} onClosePopup={props.onClosePopup}/>
    </div>
  )
};

export default Profile;