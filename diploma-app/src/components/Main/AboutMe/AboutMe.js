import React from "react";
import './AboutMe.css';
import myPicture from '../../../images/My-foto.jpg';

function AboutMe() {
  return (
    <div className="about">
      <h2 className="about__title title">Студент</h2>
      <div className="break-line"></div>
      <div className="about__wrapper">
        <div className="about__text-side">
          <h3 className="about__name">Алексей</h3>
          <h4 className="about__developer">Фронтенд-разработчик, 22 лет</h4>
          <p className="about__paragraph">Я родился и живу в Риге. Развиваюсь как Фронтенд разработчик, закончил факультет Веб-разработки в Яндекс Практикуме. И начинаю свой путь в IT. Инетересуюсь новыми технологиями, особенно в машинной сфере. Играю в футбол и теннис, это мои основные хобби. </p>
          <ul className="about__links">
            <li className="about__list-item">
              <a className="about__link" rel={'noreferrer'} href="https://www.facebook.com/aleksej.sanatov/" target={'_blank'}>Facebook</a>
            </li>
            <li className="about__link-item">
              <a className="about__link" rel={'noreferrer'} href="https://github.com/alekseisanatov?tab=repositories" target={'_blank'}>Github</a>
            </li>
          </ul>
        </div>
        <div className="about__image-side">
          <img src={myPicture} alt="Фото студента" className="about__image"/>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;