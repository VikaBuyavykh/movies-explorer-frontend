import Form from '../Form/Form';
import handleInput from '../../utils/validation';
import { nameRegex } from '../../utils/regex';
import { useEffect } from 'react';

export default function Register({ setIsSubmitAvailable, setValues, setAuthApiErrorText, onInput, isSubmitAvailable, authApiErrorText, values, handleChange, onSubmit }) {
    useEffect(() => {
        setIsSubmitAvailable(false);
        return () => {
            setAuthApiErrorText('');
            setValues({ email: '', password: '' });
        }
    }, [])
    return (
        <Form
            onInput={onInput}
            isSubmitAvailable={isSubmitAvailable}
            authApiErrorText={authApiErrorText}
            values={values}
            handleChange={handleChange}
            onSubmit={onSubmit}
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