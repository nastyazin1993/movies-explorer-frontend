import React from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

// компонент страницы с сохранёнными карточками фильмов
function SavedMovies({ initialCards, onChangeFilters, usersMoviesCards, cardLikeButton, cardDelete }) {
  const [countCardsVisible, setCountCardsVisible] = React.useState(window.screen.width > 768 ? 12 : window.screen.width <= 768 ? 8 : 5);
  const countCards = window.screen.width > 768 ? countCardsVisible + 4 : window.screen.width <= 768 ? countCardsVisible + 2 : countCardsVisible + 1
  
  const handleMore = () => {
    setCountCardsVisible(countCards);
  };
 

  return (
    <>
      <section className="saved-movies">
      <SearchForm onChangeFilters={onChangeFilters}/>
        <MoviesCardList 
        initialCards={initialCards} 
        countCardsVisible={countCardsVisible} 
        cardLikeButton={cardLikeButton} 
        cardDelete={cardDelete}
        usersMoviesCards={usersMoviesCards}/>

        {usersMoviesCards.length > 12 && (
          <button className="movies__more" onClick={handleMore}>Ещё</button>
        )}
      </section>
      <Footer />
    </>
  );
}

export default SavedMovies;
