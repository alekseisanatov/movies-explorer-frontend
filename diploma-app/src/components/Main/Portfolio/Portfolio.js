import React from "react";
import './Portfolio.css';
import ButtonImage from '../../../images/portfolio-link-button.svg';

function Portfolio() {
  return(
    <div className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__projects">
        <li className="portfolio__project">
          <a href={'https://alekseisanatov.github.io/how-to-learn/'} target={'_blank'} rel={'noreferrer'} className="portfolio__link">Статичный сайт</a>
          <a href={'https://alekseisanatov.github.io/how-to-learn/'} target={'_blank'} rel={'noreferrer'} className="portfolio__link">
            <button className="portfolio__button">
              <img src={ButtonImage} alt="Стрелка" className="portfolio__button-image"/>
            </button>
          </a>
        </li>
        <li className="portfolio__project break-line_type_dark"></li>
        <li className="portfolio__project">
          <a href={'https://alekseisanatov.github.io/russian-travel/'} target={'_blank'} rel={'noreferrer'} className="portfolio__link">Адаптивный сайт</a>
          <a href={'https://alekseisanatov.github.io/russian-travel/'} target={'_blank'} rel={'noreferrer'} className="portfolio__link">
            <button className="portfolio__button">
              <img src={ButtonImage} alt="Стрелка" className="portfolio__button-image"/>
            </button>
          </a>
        </li>
        <li className="portfolio__project break-line_type_dark"></li>
        <li className="portfolio__project">
          <a href={'https://alekseisanatov.students.nomoredomains.work/sign-in'} target={'_blank'} rel={'noreferrer'} className="portfolio__link">Одностраничное приложение</a>
          <a href={'https://alekseisanatov.students.nomoredomains.work/sign-in'} target={'_blank'} rel={'noreferrer'} className="portfolio__link">
            <button className="portfolio__button">
              <img src={ButtonImage} alt="Стрелка" className="portfolio__button-image"/>
            </button>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Portfolio;