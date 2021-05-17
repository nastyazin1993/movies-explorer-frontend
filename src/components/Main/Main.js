// import React from 'react';
import Promo from "../Promo/Promo";
import NavTab from "../NavTab/NavTab";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";
import Movies from "../Movies/Movies";
import { Switch, Route } from "react-router";
// import initialCards from "./../../utils/initialCard";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function Main({ loggedIn, outAccount, cards, onChangeFilters, onUpdateUser, cardLikeButton, usersMoviesCards, moviesCards, cardDelete, isOk}) {
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
      <Switch>
        <ProtectedRoute
          path="/movies"
          component={Movies}
          loggedIn={loggedIn}
          initialCards={moviesCards}
          onChangeFilters={onChangeFilters}
          cardLikeButton={cardLikeButton}
          usersMoviesCards={usersMoviesCards}
          cardDelete={cardDelete}
        />
        <ProtectedRoute
          path="/saved-movies"
          component={SavedMovies}
          loggedIn={loggedIn}
          initialCards={cards}
          cardDelete={cardDelete}
          onChangeFilters={onChangeFilters}
          usersMoviesCards={usersMoviesCards}
        />
        <ProtectedRoute
          path="/profile"
          component={Profile}
          loggedIn={loggedIn}
          onOut={outAccount}
          onUpdateUser={onUpdateUser}
          isOk={isOk}
        />
      </Switch>
    
    </main>
  );
}

export default Main;
