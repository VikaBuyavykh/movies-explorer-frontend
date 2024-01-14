import Navigation from '../Navigation/Navigation';
import './Header.css';
import logoPath from '../../images/logo.svg';
import { Link } from 'react-router-dom';

export default function Header({ isThemeBlue, onOpenClick, isAuthorized }) {
    return (
        <header className={`header ${isThemeBlue && 'header_blue-theme'}`}>
            <nav className="header__container">
                <Link className="header__link" to="/">
                    <img src={logoPath} alt="Логотип зеленого цвета с белым кругом внутри" className="header__logo" />
                </Link>
                {isAuthorized ? <Navigation onOpenClick={onOpenClick} /> : 
                    <ul className="header__list">
                        <li>
                            <Link to="/signup" className="header__list-link">Регистрация</Link>
                        </li>
                        <li>
                            <Link to="/signin" className="header__list-button">Войти</Link>
                        </li>
                    </ul>
                }
            </nav>
        </header>
    );
}