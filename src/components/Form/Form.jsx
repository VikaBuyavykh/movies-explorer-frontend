import "./Form.css";
import { Link } from "react-router-dom";
import handleInput from "../../utils/validation";
import logoPath from "../../images/logo.svg";

export default function Form({
  onInput,
  isSubmitAvailable,
  authApiErrorText,
  values,
  handleChange,
  onSubmit,
  name,
  titleText,
  children,
  buttonText,
  questionText,
  linkText,
  linkTo,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <>
      <header className="form-header">
        <Link className="form-header__logo-link" to="/">
          <img
            src={logoPath}
            alt="Логотип зеленого цвета с белым кругом внутри"
            className="form-header__logo"
          />
        </Link>
        <h1 className="form-header__title">{titleText}</h1>
      </header>
      <main>
        <form
          className="form"
          name={`${name}-form`}
          onSubmit={handleSubmit}
          onInput={onInput}
          noValidate
        >
          <div className="form__inputs-container">
            {children}
            <div className="form__input-group">
              <label htmlFor="email" className="form__label">
                E-mail
              </label>
              <input
                className="form__input"
                id="email"
                name="email"
                placeholder="pochta@example.com"
                value={values.email || ""}
                type="email"
                onChange={handleChange}
                onInput={handleInput}
                required
              />
              <span id="error-email" className="form__error"></span>
            </div>
            <div className="form__input-group">
              <label htmlFor="password" className="form__label">
                Пароль
              </label>
              <input
                className="form__input"
                id="password"
                name="password"
                placeholder="Введите пароль"
                value={values.password || ""}
                type="password"
                minLength="8"
                maxLength="30"
                onChange={handleChange}
                onInput={handleInput}
                required
              />
              <span id="error-password" className="form__error"></span>
            </div>
          </div>
          <div className="form__button-group">
            <p className="form__api-error">{authApiErrorText}</p>
            <button
              type="submit"
              className={`form__button ${
                !isSubmitAvailable ? "form__button_inactive" : ""
              }`}
              disabled
            >
              {buttonText}
            </button>
            <p className="form__text">
              {questionText}
              <Link to={linkTo} className="form__link">
                {linkText}
              </Link>
            </p>
          </div>
        </form>
      </main>
    </>
  );
}
