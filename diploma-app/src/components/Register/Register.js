import React from "react";
import Form from "../Form/Form";

function Register() {
  return(
    <Form
      title={'Добро пожаловать!'}
      isNameRequired={true}
      buttonText={'Зарегистрироваться'}
      buttonLowerText={'Уже зарегистрированы?'}
      buttonLinkText={'Войти'}
      buttonLinkPath={'/signin'}
      isRegisterPage={true}
    />
  );
};

export default Register;