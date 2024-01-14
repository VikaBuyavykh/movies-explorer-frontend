import './Portfolio.css';

export default function Portfolio() {
    return (
        <section className="portfolio">
            <h2 className="portfolio__title">Портфолио</h2>
            <ul className="portfolio__list">
                <li className="portfolio__list-item">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="portfolio__text-link">Статичный сайт</a>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="portfolio__symbol-link">↗</a>
                </li>
                <li className="portfolio__list-item">
                    <a href="https://vikabuyavykh.github.io/russian-travel/" target="_blank" rel="noopener noreferrer" className="portfolio__text-link">Адаптивный сайт</a>
                    <a href="https://vikabuyavykh.github.io/russian-travel/" target="_blank" rel="noopener noreferrer" className="portfolio__symbol-link">↗</a>
                </li>
                <li className="portfolio__list-item">
                    <a href="https://vikabuyavykh.nomoredomainsmonster.ru/" target="_blank" rel="noopener noreferrer" className="portfolio__text-link">Одностраничное приложение</a>
                    <a href="https://vikabuyavykh.nomoredomainsmonster.ru/" target="_blank" rel="noopener noreferrer" className="portfolio__symbol-link">↗</a>
                </li>                
            </ul>
        </section>
    );
}