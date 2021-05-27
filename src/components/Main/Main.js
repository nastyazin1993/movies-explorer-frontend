import Promo from "../Promo/Promo";
import NavTab from "../NavTab/NavTab";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";
import { Switch, Route } from "react-router";
import Footer from "../Footer/Footer";

function Main() {
  return (
    <main className="content">
      <Switch>
        <Route exact path="/">
          <Promo />
          <NavTab />
          <AboutProject />
          <Techs />
          <AboutMe />
          <Portfolio />
          <Footer />
        </Route>
      </Switch>
    </main>
  );
}

export default Main;
