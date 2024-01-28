import React, { useEffect } from 'react';
import { useForm } from '../../utils/useFormHook';
import Header from '../Header/Header';
import Popup from '../Popup/Popup';
import './Profile.css';
import handleInput from '../../utils/validation';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../utils/CurrentUserContext';
import { mainApi } from '../../utils/MainApi';

export default function Profile({ setIsAuthorized, setCurrentUser, onOpenClick, onCloseClick, isPopupVisible, isAuthorized }) {
    const currentUser = React.useContext(CurrentUserContext);
    const [apiErrorMessage, setApiErrorMessage] = useState('');
    const [isSubmitAvailable, setIsSubmitAvailable] = useState(false);
    const navigate = useNavigate();
    const {values, handleChange, setValues} = useForm({ name: currentUser.name, email: currentUser.email });
    const [formAvailability, setFormAvailability] = useState(false);

    const fieldsetElement = document.querySelector('#fieldset');

    useEffect(() => {
        setValues({ name: currentUser.name, email: currentUser.email })
    }, [currentUser, setValues])

    function handleSubmit(e) {
        e.preventDefault();
        const token = localStorage.getItem('token');
        mainApi.updateProfile({ name: values.name, email: values.email }, token).then(() => {
            setCurrentUser({ name: values.name, email: values.email })
            setFormAvailability(false);
            fieldsetElement.setAttribute('disabled', true);
        }).catch((error) => {
            if (error === 'Ошибка: 409') {
                setApiErrorMessage('Пользователь с таким email уже существует.');
            } else if (error === 'Ошибка: 500') {
                setApiErrorMessage('На сервере произошла ошибка.');
            } else {
                setApiErrorMessage('При обновлении профиля произошла ошибка.');
            }
        })
    }

    function checkValidity(e) {
        setApiErrorMessage('');
        const form = e.target.form;
        const formButton = form.querySelector('.profile__submit-button');
        const isFormValid = form.checkValidity();
        if (isFormValid) {
            setIsSubmitAvailable(true);
            formButton.removeAttribute('disabled');
        } else {
            setIsSubmitAvailable(false);
            formButton.setAttribute('disabled', true);
        }
    }

    function logOut() {
        navigate('/');
        localStorage.clear()
        setIsAuthorized(false);
    }

    function handleClick() {
        fieldsetElement.removeAttribute('disabled');
        setFormAvailability(true);
    }

    return (
        <>
            <Header onOpenClick={onOpenClick} isAuthorized={isAuthorized} />
            <main className="profile">
                <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
                <form className="profile__form" onInput={checkValidity} onSubmit={handleSubmit} noValidate>
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
                                <p className='profile__error profile__api-error'>{apiErrorMessage}</p>
                                <button type="submit" className={`profile__submit-button ${isSubmitAvailable ? 'profile__submit-button_inactive' : ''}`} disabled>Сохранить</button>
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