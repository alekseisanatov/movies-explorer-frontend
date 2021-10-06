import React from "react";
import Form from "../Form/Form";

function Login(props) {
  return(
    <Form
      title={'Рады видеть!'}
      isNameRequierd={false}
      buttonText={'Войти'}
      buttonLowerText={'Ещё не зарегистрированы?'}
      buttonLinkText={'Зарегистрироваться'}
      buttonLinkPath={'/signup'}
      isRegisterPage={false}
      onLogin={props.onLogin}
    />
  );
};

export default Login;