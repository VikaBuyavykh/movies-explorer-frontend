import Form from "../Form/Form";
import { useState } from 'react';
import { useForm } from '../../utils/useFormHook';
import { mainApi } from '../../utils/MainApi';
import { useNavigate } from 'react-router-dom';

export default function Login({ setIsAuthorized }) {
    const [apiErrorText, setApiErrorText] = useState('');
    const {values, handleChange} = useForm({ email: '', password: '' });
    const navigate = useNavigate();

    function handleLogin() {
        const {email, password} = values;
        mainApi.authorize(email, password).then((response) => {
            if (!response.token) {
                setApiErrorText('При авторизации произошла ошибка. Токен не передан или передан не в том формате.');
            } else {
                localStorage.setItem('token', response.token);
                setIsAuthorized(true);
                navigate('/movies');
            }
        }).catch((error) => {
            if (error === 'Ошибка: 401') {
                setApiErrorText('Вы ввели неправильный логин или пароль')
            } else if (error === 'Ошибка: 500') {
                setApiErrorText('На сервере произошла ошибка.')
            } else {
                setApiErrorText('При авторизации произошла ошибка. Переданный токен некорректен.')
            }
        })
    }

    return (
        <Form
            setApiErrorText={setApiErrorText}
            apiErrorText={apiErrorText}
            values={values}
            handleChange={handleChange}
            onSubmit={handleLogin}
            name="login"
            titleText="Рады видеть!"
            buttonText="Войти"
            questionText="Ещё не зарегистрированы?"
            linkText="Регистрация"
            linkTo="/signup"
        />
    );
}