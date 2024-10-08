import "./AboutMe.css";
import studentPhotoPath from "../../../images/VikaBuyavykh.jpg";

export default function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__info">
          <h3 className="about-me__name">Виктория</h3>
          <p className="about-me__main-info">Frontend-разработчик, 28 лет</p>
          <p className="about-me__text">
            Я родилась и выросла в Екатеринбурге, последние 8 лет жила в Москве,
            сейчас курсирую Екб-Мск/Мск-Екб. В 2020 закончила филфак ГосИРЯ им.
            А.С. Пушкина. Работала журналистом и пресс-атташе, полтора года
            назад увлеклась кодингом. В феврале 2024 успешно окончила факультет
            веб-разработки Яндекс Практикума, получив 293(/300) балла за
            дипломный проект. Сейчас завершаю курс по Vue от JavaScript.ru у
            Григория Шарцева, параллельно пишу pet-проекты. Мечтаю продолжить
            свое профессиональное развитие в команде крутых и заряженных ребят.
          </p>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/VikaBuyavykh"
            className="about-me__link"
          >
            Github
          </a>
        </div>
        <img
          src={studentPhotoPath}
          alt="Фотокарточка Виктории"
          className="about-me__photo"
        />
      </div>
    </section>
  );
}
