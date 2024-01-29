import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Popup from '../Popup/Popup';
import Preloader from '../Preloader/Preloader';
import { useEffect, useState } from 'react';
import throttle from '../../utils/throttle';

export default function Movies({ setSearchFormErrorText, onClickDelete, onClickSave, onSearchInputChange, onCheckboxClick, resultError, notFoundResult, buttonState, searchQuery, handleSearchSubmit, searchFormErrorText,  onOpenClick, onCloseClick, isPopupVisible, isLoading, isAuthorized, cards, savedCards }) {
    const [isMore, setIsMore] = useState(false); 
    
    function calculate() {
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

        return {initialNumberOfCards, initialAddIndex};
    }

    const {initialNumberOfCards, initialAddIndex} = calculate();

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

    function handleMoreClick() {
        setNumberOfCards(numberOfCards + addIndex);
    };

    useEffect(() => {
        if (cards.length > numberOfCards) {
            setIsMore(true);
        } else {
            setIsMore(false);
        }
        localStorage.setItem('cards', JSON.stringify(cards));
    }, [cards, numberOfCards]);

    useEffect(() => {
        window.addEventListener('resize', optimizedRecalculate);
        return () => {
            setSearchFormErrorText('');
            window.removeEventListener('resize', optimizedRecalculate);
        }
    }, [])

    useEffect(() => {
        const {initialNumberOfCards, initialAddIndex} = calculate();
        setNumberOfCards(initialNumberOfCards);
        setAddIndex(initialAddIndex);
    }, [isLoading])
    
    return (
        <>
            <Header onOpenClick={onOpenClick} isAuthorized={isAuthorized} />
            <main className="movies">
                <SearchForm onSearchInputChange={onSearchInputChange} onCheckboxClick={onCheckboxClick} buttonState={buttonState} searchQuery={searchQuery} handleSearchSubmit={handleSearchSubmit} searchFormErrorText={searchFormErrorText} />
                <MoviesCardList onClickDelete={onClickDelete} onClickSave={onClickSave} numberOfCards={numberOfCards} cards={cards} savedCards={savedCards} resultError={resultError} notFoundResult={notFoundResult} />
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