import Form from '../Form/Form';
import { useForm } from '../../utils/useFormHook';
import handleInput from '../../utils/validation';
import { nameRegex } from '../../utils/regex';
import { mainApi } from '../../utils/MainApi';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Register({ setIsAuthorized }) {
    const [apiErrorText, setApiErrorText] = useState('');
    const {values, handleChange} = useForm({ name: '', email: '', password: '' });
    const navigate = useNavigate();
    
    function handleRegister() {
        const {name, email, password} = values;
        mainApi.register(name, email, password).then((response) => {
            mainApi.authorize(email, password).then((res) => {
                localStorage.setItem('token', res.token);
                setIsAuthorized(true);
                navigate('/movies');
            }).catch(console.error);
        }).catch((error) => {
            if (error === 'Ошибка: 409') {
                setApiErrorText('Пользователь с таким email уже существует.')
            } else if (error === 'Ошибка: 400') {
                setApiErrorText('При регистрации пользователя произошла ошибка.');
            } else {
                setApiErrorText('На сервере произошла ошибка.');
            }
        })
    }

    return (
        <Form 
            setApiErrorText={setApiErrorText}
            apiErrorText={apiErrorText}
            values={values}
            handleChange={handleChange}
            onSubmit={handleRegister}
            name="register"
            titleText="Добро пожаловать!"
            buttonText="Зарегистрироваться"
            questionText="Уже зарегистрированы?"
            linkText="Войти"
            linkTo="/signin"
        >
            <div className="form__input-group">
                <label htmlFor="name" className="form__label">Имя</label>
                <input className="form__input" id="name" name="name" placeholder="Ваше имя" value={values.name || ''} type="text" onChange={handleChange} onInput={handleInput} required pattern={nameRegex} minLength="2" maxLength="30" />
                <span id="error-name" className="form__error"></span>
            </div>
        </Form>
    );
}