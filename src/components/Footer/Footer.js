import "./Footer.css";

export default function Footer() {
  return (
    <footer className='footer'>
         <h2 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm</h2>
            <div className='footer__container'>
                <p className='footer__text'>&copy; 2021</p>
                <div className='footer__container-link'>
                    <a href='https://praktikum.yandex.ru' title='Yandex.Practicum' className='footer__link'>Яндекс.Практикум</a>
                    <a href='https://github.com/nastyazin1993' title='Github' className='footer__link'>Github</a>
                    <a href='https://ru-ru.facebook.com' title='Facebook' className='footer__link'>Facebook</a>
                </div>
            </div>
    </footer>
     
  );
}