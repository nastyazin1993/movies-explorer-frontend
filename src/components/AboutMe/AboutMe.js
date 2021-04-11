import "./AboutMe.css";

export default function AboutProject() {
  return (
    <section id="student" className="aboutMe">
      <h2 className="aboutMe__title">Студент</h2>
      <div className="aboutMe__container">
        <div className="aboutMe__container-life">
          <h3 className="aboutMe__heading">Анастасия Зинченко</h3>
          <p className="aboutMe__profession">Frontend Developer, 27 лет</p>
          <p className="aboutMe__text">
            Я закончила Финансовый Университет при Правительстве РФ в Москве,
            экономист. Замужем, двое детей. Еще в далеком 2008 году закончила
            курсы Web-дизайна. Но в данной области не работала. Сейчас хочу
            развиваться в области веб-разработок, в связи с этим пошла на курсы
            Яндекс.Практикума. Во время своей учебы я реализовала 15 проектных
            работ на Reactjs, Nodejs (Expressjs), JavaScript, CSS, HTML.
          </p>
          <div className="aboutMe__container-link">
            <a
              href="https://https://github.com/nastyazin1993"
              title="GitHub"
              className="aboutMe__link"
            >
              GitHub
            </a>
            <a
              href="https://vk.com/nastyagun"
              title="Vk"
              className="aboutMe__link"
            >
              Vk
            </a>
          </div>
        </div>
        <div className="aboutMe__image"></div>
      </div>
    </section>
  );
}
