import { useEffect } from "react";
import Form from "../Form/Form";

export default function Login({ setIsSubmitAvailable, setValues, setAuthApiErrorText, onInput, isSubmitAvailable, authApiErrorText, values, handleChange, onSubmit }) {
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
            name="login"
            titleText="Рады видеть!"
            buttonText="Войти"
            questionText="Ещё не зарегистрированы?"
            linkText="Регистрация"
            linkTo="/signup"
        />
    );
}