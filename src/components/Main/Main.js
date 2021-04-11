// import React from 'react';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Movies from '../Movies/Movies';
import { Switch, Route } from 'react-router';
import initialCards from './../../utils/initialCard';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';

function Main({ loggedIn, outAccount }) {

  return (
    <main className="content">
 {/* {loggedIn ? ( */}
   <Switch>
     <Route path="/movies">
       <Movies initialCards={initialCards}/>
    </Route>
    <Route path="/saved-movies">
      <SavedMovies initialCards={initialCards.filter(item => item.saved)}/>
    </Route>
    <Route path="/profile" >
      <Profile onOut={outAccount}/>
    </Route>
    </Switch>
    
      {/* ) :  */}
      {/* (  */}
          <Switch>
            <Route exact path="/">
        <Promo 
        /*Promo — компонент с вёрсткой баннера страницы «О проекте».*//> 
        <NavTab
        /*компонент с навигацией по странице «О проекте».*/ />
        <AboutProject 
        /*AboutProject — компонент с описанием дипломного проекта.*//>
        <Techs 
        /*Techs — компонент с использованными технологиями.*//>
        <AboutMe
        /*AboutMe — компонент с информацией о студенте.*//>
        <Portfolio
        /*Portfolio — компонент со ссылками на другие проекты.*//>
        <Footer />
        </Route>
        </Switch>
      {/* )} */}

       
       
    </main>
  );
 
}
  
export default Main;

//<NavTab
///*компонент с навигацией по странице «О проекте».*/ />
//<AboutProject 
///*AboutProject — компонент с описанием дипломного проекта.*//>
//<Techs 
///*Techs — компонент с использованными технологиями.*//>
//<AboutMe
///*AboutMe — компонент с информацией о студенте.*//>
//<Portfolio
///*Portfolio — компонент со ссылками на другие проекты.*//>