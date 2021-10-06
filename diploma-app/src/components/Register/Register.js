import React from "react";
import FormLoginOrRegister from "../Form/Form";

function Register(props) {
  return(
    <FormLoginOrRegister
      title={'Добро пожаловать!'}
      isNameRequired={true}
      buttonText={'Зарегистрироваться'}
      buttonLowerText={'Уже зарегистрированы?'}
      buttonLinkText={'Войти'}
      buttonLinkPath={'/signin'}
      isRegisterPage={true}
      onRegister={props.handleSubmit}
    />
  );
};

export default Register;