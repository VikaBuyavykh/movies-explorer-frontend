import './Portfolio.css';

export default function Portfolio() {
    return (
        <section className="portfolio">
            <h2 className="portfolio__title">Портфолио</h2>
            <ul className="portfolio__list">
                <li className="portfolio__list-item">
                    <a href="https://vikabuyavykh.github.io/ono-tebe-nado/" target="_blank" rel="noopener noreferrer" className="portfolio__text-link">
                        <p>Статичный сайт</p>
                        <p>↗</p>
                    </a>
                </li>
                <li className="portfolio__list-item">
                    <a href="https://vikabuyavykh.github.io/russian-travel/" target="_blank" rel="noopener noreferrer" className="portfolio__text-link">
                        <p>Адаптивный сайт</p>
                        <p>↗</p>
                    </a>
                </li>
                <li className="portfolio__list-item">
                    <a href="https://vikabuyavykh.nomoredomainsmonster.ru/" target="_blank" rel="noopener noreferrer" className="portfolio__text-link">
                        <p>Одностраничное приложение</p>
                        <p>↗</p>
                    </a>
                </li>                
            </ul>
        </section>
    );
}