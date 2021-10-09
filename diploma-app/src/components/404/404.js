import React from "react";
import './404.css';
import {Link} from "react-router-dom";
import {useHistory} from "react-router-dom/cjs/react-router-dom";

function ErrorPage404() {
  const history = useHistory();

  return (
    <div className="error-page">
      <h1 className="error-page__title">404</h1>
      <h2 className="error-page__subtitle">Страница не найдена</h2>
      <Link to={history.goBack} className="error-page__link">Назад</Link>
    </div>
  );
};

export default ErrorPage404;

