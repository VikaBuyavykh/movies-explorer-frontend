import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Popup from '../Popup/Popup';
import Preloader from '../Preloader/Preloader';
import React, { useEffect, useState } from 'react';
import throttle from '../../utils/throttle';
import { AppContext } from '../../utils/AppContext';

export default function Movies({ buttonState, setButtonState, setErrorText, searchQuery, setSearchQuery, notFoundText, resultError, onSubmit, onClickSave, onOpenClick, onCloseClick, isPopupVisible, isAuthorized }) {
    const { cards, errorText, isLoading } = React.useContext(AppContext);
    const [isMore, setIsMore] = useState(false);   

    let initialNumberOfCards;
    let initialAddIndex;

    if (window.innerWidth < 768) {
        initialNumberOfCards = 5;
        initialAddIndex = 2;
    } else if (window.innerWidth < 1280) {
        initialNumberOfCards = 8;
        initialAddIndex = 2;
    } else {
        initialNumberOfCards = 12;
        initialAddIndex = 3;
    };

    const [numberOfCards, setNumberOfCards] = useState(initialNumberOfCards);
    const [addIndex, setAddIndex] = useState(initialAddIndex);

    function recalculate(e) {
        if (e.target.innerWidth < 768) {
            setNumberOfCards(5);
            setAddIndex(2);
        } else if (e.target.innerWidth < 1280) {
            setNumberOfCards(8);
            setAddIndex(2);
        } else {
            setNumberOfCards(12);
            setAddIndex(3);
        }
    };

    const optimizedRecalculate = throttle(recalculate, 50);

    window.addEventListener('resize', optimizedRecalculate);

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit();
    };

    function handleMoreClick() {
        setNumberOfCards(numberOfCards + addIndex);
    };

    useEffect(() => {
    if (cards.length > numberOfCards) {
        setIsMore(true);
    } else {
        setIsMore(false);
    }
    localStorage.setItem('checkboxDependentCards', JSON.stringify(cards));
    }, [cards, numberOfCards]);    

    return (
        <>
            <Header onOpenClick={onOpenClick} isAuthorized={isAuthorized} />
            <main className="movies">
                <SearchForm buttonState={buttonState} setButtonState={setButtonState} searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearchFormSubmit={handleSubmit} errorText={errorText} setErrorText={setErrorText} />
                <MoviesCardList onClickSave={onClickSave} numberOfCards={numberOfCards} resultError={resultError} notFoundText={notFoundText} />
                {isMore && (
                    <div className="movies__more-section">
                            <button type="button" className="movies__more-button" onClick={handleMoreClick}>Ещё</button>
                    </div>)
                }
                <Popup onCloseClick={onCloseClick} isPopupVisible={isPopupVisible} />
                {isLoading && <Preloader />}
            </main>
            <Footer />
        </>
    );
}