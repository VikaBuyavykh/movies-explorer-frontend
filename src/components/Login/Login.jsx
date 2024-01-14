import Form from "../Form/Form";

export default function Login() {
    return (
        <Form
            name="login"
            titleText="Рады видеть!"
            buttonText="Войти"
            questionText="Ещё не зарегистрированы?"
            linkText="Регистрация"
            linkTo="/signup"
        />
    );
}