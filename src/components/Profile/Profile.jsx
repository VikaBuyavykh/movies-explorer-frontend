import "./Profile.css";
import React, { useEffect } from "react";
import { nameRegex } from "../../utils/regex";
import handleInput from "../../utils/validation";
import { useForm } from "../../utils/useFormHook";
import { CurrentUserContext } from "../../utils/CurrentUserContext";
import Header from "../Header/Header";
import Popup from "../Popup/Popup";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

export default function Profile({
  isInfoTooltipVisible,
  setIsInfoTooltipVisible,
  setFormAvailability,
  setIsSubmitAvailable,
  isSubmitAvailable,
  authApiErrorText,
  formAvailability,
  onEditClick,
  onExitClick,
  onSubmit,
  onInput,
  onOpenClick,
  onCloseClick,
  isPopupVisible,
  isAuthorized,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, handleChange, setValues } = useForm({
    name: currentUser.name,
    email: currentUser.email,
  });

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(values);
  }

  useEffect(() => {
    setValues({ name: currentUser.name, email: currentUser.email });
    setIsSubmitAvailable(false);
  }, [currentUser, setValues]);

  useEffect(() => {
    setFormAvailability(false);
    setIsSubmitAvailable(false);
  }, []);

  return (
    <>
      <Header onOpenClick={onOpenClick} isAuthorized={isAuthorized} />
      <main className="profile">
        <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
        <form
          className="profile__form"
          onInput={onInput}
          onSubmit={handleSubmit}
          noValidate
        >
          <fieldset id="fieldset" className="profile__fieldset" disabled>
            <label className="profile__label">
              Имя
              <input
                type="text"
                name="name"
                id="name"
                className="profile__input"
                placeholder="Ваше имя"
                value={values.name || ""}
                onChange={handleChange}
                onInput={handleInput}
                required
                pattern={nameRegex}
                minLength="2"
                maxLength="30"
              />
            </label>
            <span id="error-name" className="profile__error"></span>
            <label className="profile__label">
              E-mail
              <input
                type="email"
                name="email"
                id="email"
                className="profile__input"
                placeholder="pochta@example.com"
                value={values.email || ""}
                onChange={handleChange}
                onInput={handleInput}
                required
              />
            </label>
            <span id="error-email" className="profile__error"></span>
          </fieldset>
          <fieldset className="profile__fieldset">
            {formAvailability ? (
              <>
                <p className="profile__error profile__api-error">
                  {authApiErrorText}
                </p>
                <button
                  type="submit"
                  className={`profile__submit-button ${
                    !isSubmitAvailable ? "profile__submit-button_inactive" : ""
                  }`}
                  disabled
                >
                  Сохранить
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={onEditClick}
                  className="profile__edit-button"
                >
                  Редактировать
                </button>
                <button
                  type="button"
                  onClick={onExitClick}
                  className="profile__exit-button"
                >
                  Выйти из аккаунта
                </button>
              </>
            )}
          </fieldset>
        </form>
        <Popup onCloseClick={onCloseClick} isPopupVisible={isPopupVisible} />
        <InfoTooltip
          setIsInfoTooltipVisible={setIsInfoTooltipVisible}
          isInfoTooltipVisible={isInfoTooltipVisible}
        />
      </main>
    </>
  );
}
