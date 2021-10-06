import React from "react";
import './InfoToolTip.css';
import acceptedImage from '../../images/formAccepted.svg';
import declinedImage from '../../images/formDeclined.svg';
import closeImage from '../../images/closeImage.svg';

function InfoToolTip(props) {
  return(
    <div className={`info ${props.isAcceptedPopupOpen ? 'info_active' : ''}`}>
      <div className="info__wrapper">
        <button onClick={props.onClosePopup} type={'reset'} className={'info__button'}>
          <img className={'info__button-close'} src={closeImage} alt="Закрыть"/>
        </button>
        <img className={'info__image'} src={props.isAccepted ? acceptedImage : declinedImage} alt="Статус"/>
        <h2 className={'info__title'}>
          {props.isAccepted ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}
        </h2>
      </div>
    </div>
  )
}

export default InfoToolTip;