import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ initialCards }) {
  const countCards =
    window.screen.width > 768 ? 12 : window.screen.width <= 768 ? 8 : 5;
  const cardElements = initialCards.slice(0, countCards).map((item) => (
    <li key={item._id}>
      <MoviesCard data={item} />
    </li>
  ));
  return (
    <div className="cards-conteiner"><ul className="cards">{cardElements}</ul></div>
  
  )
}

export default MoviesCardList;
