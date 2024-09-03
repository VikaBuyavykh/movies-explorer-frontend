import "./SearchForm.css";
import searchButtonPath from "../../images/search-button.svg";

export default function SearchForm({
  searchQuery,
  onSearchInputChange,
  buttonState,
  onCheckboxClick,
  searchFormErrorText,
  handleSearchSubmit,
}) {
  function onSubmit(e) {
    e.preventDefault();
    handleSearchSubmit();
  }

  return (
    <form onSubmit={onSubmit} className="search-form" noValidate>
      <fieldset className="search-form__fieldset search-form__search">
        <input
          value={searchQuery}
          onChange={onSearchInputChange}
          type="search"
          name="search"
          placeholder="Фильм"
          className="search-form__search-field"
          required
        />
        <button type="submit" className="search-form__search-button">
          <img src={searchButtonPath} alt="Иконка поиска по запросу" />
        </button>
      </fieldset>
      <p className="search-form__error">{searchFormErrorText}</p>
      <fieldset className="search-form__fieldset search-form__checkbox-field">
        <div
          className={`search-form__checkbox ${
            !buttonState ? "search-form__checkbox_off" : ""
          }`}
        >
          <button
            onClick={onCheckboxClick}
            type="button"
            className={`search-form__checkbox-button ${
              !buttonState ? "search-form__checkbox-button_off" : ""
            }`}
          />
        </div>
        <p className="search-form__checkbox-text">Короткометражки</p>
      </fieldset>
    </form>
  );
}
