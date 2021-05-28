// import React from 'react';
import './NavTab.css';


function NavTab() {


  return (
    <section className="nav">
        <a href="#aboutProject" className="nav__link nav_project">
            О проекте
        </a>
        <a href="#techs" className="nav__link nav_technology">
            Технологии
        </a>
        <a href="#student" className="nav__link nav_student">
            Студент
        </a>
       
    </section>
  );
 
}
  
export default NavTab;