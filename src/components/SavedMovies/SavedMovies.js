import React from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

// компонент страницы с сохранёнными карточками фильмов
function SavedMovies({ initialCards }) {
  return (
    <>
      <section className="saved-movies">
        <SearchForm />
        <MoviesCardList initialCards={initialCards} />
        {initialCards.length > 12 && (
          <button className="movies__more">Ещё</button>
        )}
      </section>
      <Footer />
    </>
  );
}

export default SavedMovies;
