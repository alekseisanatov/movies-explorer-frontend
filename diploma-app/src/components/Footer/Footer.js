import React from "react";
import './Footer.css';

function Footer() {
 return (
     <footer className="footer">
        <p className="footer__upper-text">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
       <div className="break-line_type_dark"></div>
      <div className="footer__lower-wrapper">
        <p className="footer__year">© 2021</p>
        <div className="footer__links">
          <a className="footer__link" target={'_blank'} rel={'noreferrer'} href="https://practicum.yandex.ru/">Яндекс.Практикум</a>
          <a className="footer__link" target={'_blank'} rel={'noreferrer'} href="https://github.com/alekseisanatov?tab=repositories">Github</a>
          <a className="footer__link" target={'_blank'} rel={'noreferrer'} href="https://www.facebook.com/aleksej.sanatov/">Facebook</a>
        </div>
      </div>
     </footer>
 )
};

export default Footer;