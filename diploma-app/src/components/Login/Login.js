import React from "react";
import FormLoginOrRegister from "../Form/Form";

function Login(props) {
  return(
    <FormLoginOrRegister
      title={'Рады видеть!'}
      isNameRequierd={false}
      buttonText={'Войти'}
      buttonLowerText={'Ещё не зарегистрированы?'}
      buttonLinkText={'Зарегистрироваться'}
      buttonLinkPath={'/signup'}
      isRegisterPage={false}
      onLogin={props.onLogin}
      isAccepted={props.isAccepted}
      isAcceptedPopupOpen={props.isAcceptedPopupOpen}
      onClosePopup={props.onClosePopup}
    />
  );
};

export default Login;