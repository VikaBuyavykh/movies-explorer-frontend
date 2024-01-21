import './Form.css';
import logoPath from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import { useForm } from '../../utils/useFormHook';
import handleInput from '../../utils/validation';

export default function Form({ name, titleText, children, buttonText, questionText, linkText, linkTo }) {
    const {values, handleChange, setValues} = useForm({ email: 'pochta@yandex.ru', password: 'pochta@yandex.ru' });

    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <>
            <header className="form-header">
                <Link className="form-header__logo-link" to="/"><img src={logoPath} alt="Логотип зеленого цвета с белым кругом внутри" className="form-header__logo" /></Link>
                <h1 className="form-header__title">{titleText}</h1>
            </header>
            <main>
                <form className="form" name={`${name}-form`} onSubmit={handleSubmit} noValidate>
                    <div className="form__inputs-container">
                        {children}
                        <div className="form__input-group">
                            <label htmlFor="email" className="form__label">E-mail</label>
                            <input className="form__input" id="email" name="email" placeholder="pochta@example.com" value={values.email || ''} type="email" onChange={handleChange} onInput={handleInput} required />
                            <span id="error-email" className="form__error"></span>
                        </div>
                        <div className="form__input-group">
                            <label htmlFor="password" className="form__label">Пароль</label>
                            <input className="form__input" id="password" name="password" placeholder="Введите пароль" value={values.password || ''} type="password" minLength="8" maxLength="30" onChange={handleChange} onInput={handleInput} required />
                            <span id="error-password" className="form__error"></span>
                        </div>
                    </div>
                    <div className="form__button-group">
                        <button type="submit" className="form__button">{buttonText}</button>
                        <p className="form__text">{questionText}
                            <Link to={linkTo} className="form__link">{linkText}</Link>
                        </p>
                    </div>
                </form>
            </main>
        </>
    );
}