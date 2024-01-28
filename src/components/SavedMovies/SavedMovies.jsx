import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';
import { savedCards } from '../../utils/cards';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Popup from '../Popup/Popup';
import Preloader from '../Preloader/Preloader';
import React, { useState } from 'react';
import { AppContext } from '../../utils/AppContext';

export default function SavedMovies({ buttonState, setButtonState, onOpenClick, onCloseClick, isPopupVisible, isAuthorized, searchQuery, setSearchQuery }) {
    const {isLoading} = React.useContext(AppContext);
    
    let initialNumberOfCards;

    if (window.innerWidth < 768) {
        initialNumberOfCards = 2;
    } else if (window.innerWidth < 1280) {
        initialNumberOfCards = 3;
    } else {
        initialNumberOfCards = 3;
    }

    const [numberOfCards, setNumberOfCards] = useState(initialNumberOfCards);

    window.addEventListener('resize', (e) => {
        if (e.target.innerWidth < 768) {
            setNumberOfCards(2);
        } else if (e.target.innerWidth < 1280) {
            setNumberOfCards(3);
        } else {
            setNumberOfCards(3);
        } 
    })
    
    return (
        <>
            <Header onOpenClick={onOpenClick} isAuthorized={isAuthorized} />
            <main className="saved-movies">
                <SearchForm buttonState={buttonState} setButtonState={setButtonState} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                <MoviesCardList numberOfCards={numberOfCards} isSavedMovies='true' cards={savedCards}/>
                <Popup onCloseClick={onCloseClick} isPopupVisible={isPopupVisible} />
                {isLoading && <Preloader />}
            </main>
            <Footer />
        </>
    );
}