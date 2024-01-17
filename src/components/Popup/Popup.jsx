import Navigation from '../Navigation/Navigation';
import './Popup.css';
import { NavLink } from 'react-router-dom';

export default function Popup({ onCloseClick, isPopupVisible }) {
    return (
        <aside className={`popup ${isPopupVisible ? 'popup_visible' : ''}`}>
            <div className="popup__container">
                <Navigation isPopupVisible={isPopupVisible} onCloseClick={onCloseClick}>
                    <li>
                        <NavLink to="/" onClick={onCloseClick} className={({isActive}) => `nav-block__menu-item ${isActive ? 'nav-block__menu-item_active' : ''}`}>Главная</NavLink>
                    </li>
                </Navigation>
            </div>
            <button onClick={onCloseClick} type="button" className="popup__close-button"></button>
        </aside>
    );
}