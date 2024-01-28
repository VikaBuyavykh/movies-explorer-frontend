import Form from "../Form/Form";

export default function Login({ onInput, isSubmitAvailable, authApiErrorText, values, handleChange, onSubmit }) {
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