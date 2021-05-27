import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({
  initialCards,
  countCardsVisible,
  cardLikeButton,
  usersMoviesCards,
  cardDelete,
}) {
  const cardElements = initialCards.slice(0, countCardsVisible).map((item) => (
    <li key={item.movieId}>
      <MoviesCard
        data={item}
        cardLikeButton={cardLikeButton}
        cardDelete={cardDelete}
        saved={usersMoviesCards.some(
          (usersItem) => usersItem.movieId === item.movieId
        )}
      />
    </li>
  ));

  return (
    <div className="cards-conteiner">
      <ul className="cards">
        {cardElements.length === 0 ? "Ничего не найдено" : cardElements}
      </ul>
    </div>
  );
}

export default MoviesCardList;
