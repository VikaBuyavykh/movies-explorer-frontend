import { useForm } from '../../utils/useFormHook';
import Header from '../Header/Header';
import Popup from '../Popup/Popup';
import './Profile.css';
import handleInput from '../../utils/validation';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile({ onOpenClick, onCloseClick, isPopupVisible, isAuthorized }) {
    const navigate = useNavigate();
    const {values, handleChange, setValues} = useForm({ name: "Виталий", email: "pochta@yandex.ru" });
    const [formAvailability, setFormAvailability] = useState(false);
    //the following constants are temporary, both of them are hardcode
    const hasApiError = true;
    const apiErrorMessage = 'При обновлении профиля произошла ошибка.';

    function handleSubmit(e) {
        e.preventDefault();
    }

    function logOut() {
        navigate('/');
    }

    function handleClick() {
        const element = document.querySelector('#fieldset');
        if (!formAvailability) {
            element.removeAttribute('disabled');
            setFormAvailability(true);
        } else {
            element.setAttribute('disabled', true);
            setFormAvailability(false);
        }
    }

    return (
        <>
            <Header onOpenClick={onOpenClick} isAuthorized={isAuthorized} />
            <main className="profile">
                <h1 className="profile__title">Привет, Виталий!</h1>
                <form className="profile__form" onSubmit={handleSubmit} noValidate>
                    <fieldset id="fieldset" className="profile__fieldset" disabled>
                        <label className="profile__label">
                            Имя
                            <input type="text" name="name" id="name" className="profile__input" placeholder="Ваше имя" value={values.name || ''} onChange={handleChange} onInput={handleInput} required minLength="2" maxLength="30" />
                        </label>
                        <span id="error-name" className="profile__error"></span>
                        <label className="profile__label">
                            E-mail
                            <input type="email" name="email" id="email" className="profile__input" placeholder="pochta@example.com" value={values.email || ''} onChange={handleChange} onInput={handleInput} required />
                        </label>
                        <span id="error-email" className="profile__error"></span>
                    </fieldset>
                    <fieldset className="profile__fieldset">
                        {formAvailability
                            ?
                            <>
                                <p className={`profile__error profile__api-error ${hasApiError ? 'error-visible' : ''}`}>{apiErrorMessage}</p>
                                <button type="submit" onClick={handleClick} className="profile__submit-button">Сохранить</button>
                            </>
                            :
                            <>
                                <button type="button" onClick={handleClick} className="profile__edit-button">Редактировать</button>
                                <button type="button" onClick={logOut} className="profile__exit-button">Выйти из аккаунта</button>
                            </>
                        }
                    </fieldset>
                </form>
                <Popup onCloseClick={onCloseClick} isPopupVisible={isPopupVisible} />
            </main>
        </>
    );
}