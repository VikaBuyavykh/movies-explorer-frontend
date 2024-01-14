import './Navigation.css';
import profileIconPath from '../../images/profile-icon.svg';
import menuButtonPath from '../../images/menu-button.svg';
import { Link, NavLink } from 'react-router-dom';

export default function Navigation({children, onOpenClick, onCloseClick, isPopupVisible }) {
    return (
        <div className={`navigation ${isPopupVisible && 'navigation_popup'}`}>
            <div className={`navigation__main ${isPopupVisible && 'navigation__main_popup'}`}>
                <ul className={`navigation__menu ${isPopupVisible && 'navigation__menu_popup'}`}>
                    {children}
                    <li>
                        <NavLink to="/movies" onClick={onCloseClick} className={({isActive}) => `navigation__menu-item ${isActive && 'navigation__menu-item_active'}`}>Фильмы</NavLink>
                    </li>
                    <li>
                        <NavLink to="/saved-movies" onClick={onCloseClick} className={({isActive}) => `navigation__menu-item ${isActive && 'navigation__menu-item_active'}`}>Сохранённые фильмы</NavLink>
                    </li>
                </ul>
                <button onClick={onOpenClick} type="button" className={`navigation__menu-button ${isPopupVisible && 'navigation__menu-button_popup'}`}>
                    <img src={menuButtonPath} alt="Иконка кнопки меню" />
                </button>
            </div>
            <Link to="/profile" onClick={onCloseClick} className={`navigation__profile-link ${isPopupVisible && 'navigation__profile-link_popup'}`}><div className="navigation__profile">
                <p className="navigation__profile-text">Аккаунт</p>
                <img src={profileIconPath} alt="Иконка профиля" className="navigation__profile-icon" />
            </div></Link>
        </div>
    );
}