import "./Portfolio.css";

export default function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a
            href="https://avion-shop-seven.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="portfolio__text-link"
          >
            <p>Avion. Онлайн-магазин мебели и декора. Vue</p>
            <p>↗</p>
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            href="https://github.com/VikaBuyavykh/vue-film"
            target="_blank"
            rel="noopener noreferrer"
            className="portfolio__text-link"
          >
            <p>Film. Онлайн-сервис по покупке билетов в кино. Vue</p>
            <p>↗</p>
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            href="https://vikabuyavykh.nomoredomainsmonster.ru/"
            target="_blank"
            rel="noopener noreferrer"
            className="portfolio__text-link"
          >
            <p>Mesto. Приложение для разменщения фотоконтента. React</p>
            <p>↗</p>
          </a>
        </li>
      </ul>
    </section>
  );
}
