import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <h2 className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
            <div className="footer__container">
                <p className="footer__date">© 2024</p>
                <ul className="footer__links">
                    <li>
                        <a href="https://practicum.yandex.ru/" target="_blank" rel="noopener noreferrer" className="footer__link">Яндекс.Практикум</a>
                    </li>
                    <li>
                        <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="footer__link">Github</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}