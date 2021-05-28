import "./Portfolio.css";

export default function AboutProject() {
  return (
    <section className='portfolio'>
    <h2 className='portfolio__title'>Портфолио</h2>
    <a href='https://github.com/nastyazin1993/how-to-learn' title='Статический сайт' target="blank" className='portfolio__link'>Статический сайт</a>
    <hr className='portfolio__horizontal-rule'></hr>
    <a href='https://nastyazin1993.github.io/russian-travel/index.html' title='Адаптивный сайт' target="blank" className='portfolio__link'>Адаптивный сайт</a>
    <hr className='portfolio__horizontal-rule'></hr>
    <a href='https://nastyagun1993.students.nomoredomains.work' title='Одностраничное приложение' target="blank" className='portfolio__link'>Одностраничное приложение</a>
    <hr className='portfolio__horizontal-rule'></hr>
</section>
  );
}