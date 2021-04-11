import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./Movies.css";
import Footer from "../Footer/Footer.js";
// import initialCards from '../../utils/initialCard.js';

function Movies({ initialCards }) {
  return (
    <>
      <section className="movies">
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

export default Movies;
