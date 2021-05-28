import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import "./OpenMenu.css";

function OpenMenu({ closeMenu, openMenu }) {
  return (
    <div className={`${openMenu ? "OpenMenuActive" : "OpenMenu"}`}>
      {/* <div className="openMenu__container"> */}
        <button className="closeMenuButton" onClick={closeMenu}></button>
        <div className="menuLink">
          <Link to="/" title="Главная" className="menuLink__link">
            <p className="menuLink__text">Главная</p>
          </Link>
          <Navigation />
          <Link
            to="/profile"
            title="Аккаунт"
            className="menuLink__link menuLink__link_type_account"
          >
            <p className="menuLink__account">Аккаунт</p>
            <div className="menuLink__account_icon"></div>
          </Link>
        </div>
      {/* </div> */}
    </div>
  );
}

export default OpenMenu;
