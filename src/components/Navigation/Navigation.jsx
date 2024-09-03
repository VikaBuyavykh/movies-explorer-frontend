import "./Navigation.css";
import { Link, NavLink } from "react-router-dom";
import profileIconPath from "../../images/profile-icon.svg";
import menuButtonPath from "../../images/menu-button.svg";

export default function Navigation({
  children,
  onOpenClick,
  onCloseClick,
  isPopupVisible,
}) {
  return (
    <nav className={`nav-block ${isPopupVisible ? "nav-block_vertical" : ""}`}>
      <div
        className={`nav-block__container ${
          isPopupVisible ? "nav-block__container_vertical" : ""
        }`}
      >
        <ul
          className={`nav-block__menu ${
            isPopupVisible ? "nav-block__menu_vertical" : ""
          }`}
        >
          {children}
          <li>
            <NavLink
              to="/movies"
              onClick={onCloseClick}
              className={({ isActive }) =>
                `nav-block__menu-item ${
                  isActive ? "nav-block__menu-item_active" : ""
                }`
              }
            >
              Фильмы
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/saved-movies"
              onClick={onCloseClick}
              className={({ isActive }) =>
                `nav-block__menu-item ${
                  isActive ? "nav-block__menu-item_active" : ""
                }`
              }
            >
              Сохранённые фильмы
            </NavLink>
          </li>
        </ul>
        <button
          onClick={onOpenClick}
          type="button"
          className={`nav-block__menu-button ${
            isPopupVisible ? "nav-block__menu-button_vertical" : ""
          }`}
        >
          <img src={menuButtonPath} alt="Иконка кнопки меню" />
        </button>
      </div>
      <Link
        to="/profile"
        onClick={onCloseClick}
        className={`nav-block__account-group ${
          isPopupVisible ? "nav-block__account-group_vertical" : ""
        }`}
      >
        <div className="nav-block__account">
          <p className="nav-block__text">Аккаунт</p>
          <img
            src={profileIconPath}
            alt="Иконка профиля"
            className="nav-block__icon"
          />
        </div>
      </Link>
    </nav>
  );
}
