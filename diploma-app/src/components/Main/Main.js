import React from "react";
import './Main.css';
import '../../blocks/blocks.css';
import Footer from '../Footer/Footer';
import Promo from "./Promo/Promo";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";
import Portfolio from "./Portfolio/Portfolio";

function Main(props) {
  return (
    <main className="main">
      <Promo isLoggedIn={props.isLoggedIn} />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
      <Footer />
    </main>
  )
};

export default Main;