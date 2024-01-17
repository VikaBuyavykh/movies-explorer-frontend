import './SearchForm.css';
import searchButtonPath from '../../images/search-button.svg';
import { useState } from 'react';

export default function SearchForm() {
    const [buttonState, setButtonState] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    function handleButtonChange(e) {
        e.preventDefault();
        if (!buttonState) {
        setButtonState(true);
        } else {
            setButtonState(false);
    }};

    function handleChange(e) {
        setSearchQuery(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <fieldset className="search-form__fieldset search-form__search">
                <input onChange={handleChange} value={searchQuery} type="search" name="search" placeholder="Фильм" className="search-form__search-field" required />
                <button type="submit" className="search-form__search-button">
                    <img src={searchButtonPath} alt="Иконка поиска по запросу" />
                </button>
            </fieldset>
            <fieldset className="search-form__fieldset search-form__checkbox-field">
                <div className={`search-form__checkbox ${!buttonState ? 'search-form__checkbox_off' : ''}`}>
                    <button type="button" onClick={handleButtonChange} className={`search-form__checkbox-button ${!buttonState ? 'search-form__checkbox-button_off' : ''}`} />
                </div>
                <p className="search-form__checkbox-text">Короткометражки</p>
            </fieldset>
        </form>
    );
}