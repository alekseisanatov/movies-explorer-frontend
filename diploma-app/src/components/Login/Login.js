import React from "react";
import Form from "../Form/Form";

function Login() {
  return(
    <Form
      title={'Рады видеть!'}
      isNameRequierd={false}
      buttonText={'Войти'}
      buttonLowerText={'Ещё не зарегистрированы?'}
      buttonLinkText={'Зарегистрироваться'}
      buttonLinkPath={'/signup'}
      isRegisterPage={false}
    />
  );
};

export default Login;