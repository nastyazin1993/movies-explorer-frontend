import React from "react";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./Movies.css";
import Footer from "../Footer/Footer.js";

function Movies({
  initialCards,
  onChangeFilters,
  cardLikeButton,
  usersMoviesCards,
  cardDelete,
}) {
  const [countCardsVisible, setCountCardsVisible] = React.useState(
    window.screen.width > 768 ? 12 : window.screen.width <= 768 ? 8 : 5
  );
  const countCards =
    window.screen.width > 768
      ? countCardsVisible + 4
      : window.screen.width <= 768
      ? countCardsVisible + 2
      : countCardsVisible + 1;

  const handleMore = () => {
    setCountCardsVisible(countCards);
  };

  return (
    <>
      <section className="movies">
        <SearchForm onChangeFilters={onChangeFilters} />

        <MoviesCardList
          initialCards={initialCards}
          countCardsVisible={countCardsVisible}
          cardLikeButton={cardLikeButton}
          usersMoviesCards={usersMoviesCards}
          cardDelete={cardDelete}
        />
        {initialCards.length > 12 && (
          <button className="movies__more" onClick={handleMore}>
            Ещё
          </button>
        )}
      </section>
      <Footer />
    </>
  );
}

export default Movies;
