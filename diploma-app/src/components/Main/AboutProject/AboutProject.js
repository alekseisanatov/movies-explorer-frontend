import React from "react";
import './AboutProject.css';

function AboutProject() {
  return (
    <div className="about-project">
      <h2 className="about-project__header title">О проекте</h2>
      <div className="break-line"></div>
      <div className="about-project__stages">
        <div className="about-project__stage">
          <h3 className="about-project__title">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__subtitle">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="about-project__stage">
          <h3 className="about-project__title">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="about-project__timeline">
        <div className="about-project__backend">
          <div className="about-project__time">1 неделя</div>
          <p className="about-project__time-text">Back-end</p>
        </div>
        <div className="about-project__frontend">
          <div className="about-project__time about-project__time_type_frontend">4 недель</div>
          <p className="about-project__time-text">Front-end</p>
        </div>
      </div>
    </div>
  );
};

export default AboutProject;