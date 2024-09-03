import "./Header.css";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import logoPath from "../../images/logo.svg";

export default function Header({ isThemeBlue, onOpenClick, isAuthorized }) {
  return (
    <header className={`header ${isThemeBlue ? "header_blue-theme" : ""}`}>
      <div className="header__container">
        <Link className="header__link" to="/">
          <img
            src={logoPath}
            alt="Логотип зеленого цвета с белым кругом внутри"
            className="header__logo"
          />
        </Link>
        {isAuthorized ? (
          <Navigation onOpenClick={onOpenClick} />
        ) : (
          <nav>
            <ul className="header__list">
              <li>
                <Link to="/signup" className="header__list-link">
                  Регистрация
                </Link>
              </li>
              <li>
                <Link to="/signin" className="header__list-button">
                  Войти
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
