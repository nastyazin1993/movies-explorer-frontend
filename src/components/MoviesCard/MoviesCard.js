import React from "react";
import { useLocation } from "react-router";
import "./MoviesCard.css";

function MoviesCard({ data, cardLikeButton, saved, cardDelete}) {
  const { nameRU, duration, image, movieId, trailerLink} = data;
  const { pathname } = useLocation();
  
  const handleCardLikeButton = () => {
    if (!saved) {
      cardLikeButton({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: data.image.url,
        trailerLink: data.trailerLink,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
        thumbnail: data.image.url,
        movieId: data.movieId,
      });
    } else{
      cardDelete(movieId)
    }
  };

  return (
    <div className="card">
     <a href={trailerLink} target="blank"> <img src={image.url || image} alt="Изображение фильма." className="card__image" /></a>
      <div className="card__header">
        <p className="card__title">{nameRU}</p>
        <button
          className={
            `${
              saved && pathname === "/saved-movies" ? "card__btn_hidden" : ""
            }` ||
            `${
              saved && pathname === "/movies"
                ? "card__btn_type_active"
                : "card__btn"
            }`
          }
          onClick={handleCardLikeButton}
        ></button>
      </div>
      <p className="card__time">{`${Math.floor(duration / 60)}ч ${
        duration - 60 * Math.floor(duration / 60)
      }м`}</p>
    </div>
  );
}

export default MoviesCard;
