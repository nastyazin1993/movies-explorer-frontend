import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import OpenMenu from "../OpenMenu/OpenMenu";
import "./Header.css";


function Header({ loggedIn }) {
 
  const [openMenu, setOpenMenu] = useState(false);
  function handleOpenMenu(){
    setOpenMenu(true)
  }
  function handleCloseMenu(){
    setOpenMenu(false)
  }
  return (
    <header className="header">
      <Link to="/"><div className="header__logo"></div></Link>
      {loggedIn ? 
      (<>
        <div className = "hiddenMenu"> <button className="header__menu" onClick={handleOpenMenu}>
         </button></div>
         <OpenMenu openMenu={openMenu}  closeMenu={handleCloseMenu}/>
        
        
        <div className="header__container">
            <Navigation />
             <Link
            to="/profile"
               title="Аккаунт"
             className="header__link header__link_type_account"
             >
            <p className="header__account">Аккаунт</p>
               <div className="header__account_icon"></div>
            </Link>
          </div>
          </>
        // <>
        
        //   {(window.MediaDevices === 768 || window.innerWidth < 768) ? (
        //     <>
        //     <OpenMenu openMenu={openMenu}  closeMenu={handleCloseMenu}/>
        //     <button className="header__menu" onClick={handleOpenMenu}>
        //     </button>
        //     </>
        //   ) : (
           
        //     <div className="header__container">
        //       <Navigation />
        //       <Link
        //         to="/profile"
        //         title="Аккаунт"
        //         className="header__link header__link_type_account"
        //       >
        //         <p className="header__account">Аккаунт</p>
        //         <div className="header__account_icon"></div>
        //       </Link>
        //     </div>
            
            
        //   )}
        // </>
      ) 
      : (
        <div className="header__sign">
          <Link to="/signup" title="Регистрация" className="header__link">
            Регистрация
          </Link>
          <Link
            to="/signin"
            title="Войти"
            className="header__link header__link_type_enter"
          >
            Войти
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;

