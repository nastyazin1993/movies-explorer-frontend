import React from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

function Profile({onOut}) {
    
  return (
    <div className="profile">
      <div className="profile__container">
        <h2 className="profile__title">Привет, Вероника!</h2>
        <form className="profile__inputs">
          <label htmlFor="name" className="profile__label">
            Имя
            <input
              id="name"
              name="name"
              type="text"
              minLength="2"
              maxLength="30"
              value="Вероника"
              placeholder="Имя"
              className="profile__input"
            />
          </label>

          <label htmlFor="email" className="profile__label">
            E-mail
            <input
              id="email"
              name="email"
              type="email"
              value="rtgyj@ya.ru"
              placeholder="Email"
              className="profile__input"
            />
          </label>

          <div className="profile__button-container">
            <button type="submit" className="profile__edit-button">
              Редактировать
            </button>
          </div>
        </form>
        <div className="profile__signout">
          <p className="profile__subtitle">
            <Link to="/" className="profile__out-link" onClick={onOut}>
              Выйти из аккаунта
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
