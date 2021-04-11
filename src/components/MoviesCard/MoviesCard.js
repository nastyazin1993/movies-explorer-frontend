import React from "react";
import "./MoviesCard.css";
// import { useLocation } from "react-router";

function MoviesCard({ data }) {
  const { nameRU, duration, image, saved } = data;
//   const { pathname } = useLocation();
//   const cardLikeButtonClassName = (
//     `${saved ? 'card__btn_type_active' : 'card__btn'}`
//   );
    


  return (
    <div className="card">
        <img src={image} alt="Изображение фильма." className="card__image"/>
      <div className="card__header">
        <p className="card__title">{nameRU}</p>
        <button
        className={
          `${saved  ? 'card__btn_type_active' : 'card__btn'}`
        }

      >
     
     </button>
        
      </div>
      <p className="card__time">{`${Math.floor(duration /60)}ч ${(duration-60*(Math.floor(duration /60)))}м`}</p>
     
    </div>
  );
}

export default MoviesCard;