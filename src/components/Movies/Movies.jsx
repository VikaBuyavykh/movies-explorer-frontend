import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Popup from '../Popup/Popup';
import Preloader from '../Preloader/Preloader';
import { useEffect, useState } from 'react';
import throttle from '../../utils/throttle';
import { 
    MIDDLE_SCREEN_WIDTH, LARGE_SCREEN_WIDTH, SMALL_SCREEN_CARDS_NUMBER, MIDDLE_SCREEN_CARDS_NUMBER,
    LARGE_SCREEN_CARDS_NUMBER, SMALL_AND_MIDDLE_SCREEN_ADD_INDEX, LARGE_SCREEN_ADD_INDEX
} from '../../utils/config';

export default function Movies({ setSearchFormErrorText, onClickDelete, onClickSave, onSearchInputChange, onCheckboxClick, resultError, notFoundResult, buttonState, searchQuery, handleSearchSubmit, searchFormErrorText,  onOpenClick, onCloseClick, isPopupVisible, isLoading, isAuthorized, cards, savedCards }) {
    const [isMore, setIsMore] = useState(false); 
    
    function calculate() {
        let initialNumberOfCards;
        let initialAddIndex;   

        if (window.innerWidth < MIDDLE_SCREEN_WIDTH) {
            initialNumberOfCards = SMALL_SCREEN_CARDS_NUMBER;
            initialAddIndex = SMALL_AND_MIDDLE_SCREEN_ADD_INDEX;
        } else if (window.innerWidth < LARGE_SCREEN_WIDTH) {
            initialNumberOfCards = MIDDLE_SCREEN_CARDS_NUMBER;
            initialAddIndex = SMALL_AND_MIDDLE_SCREEN_ADD_INDEX;
        } else {
            initialNumberOfCards = LARGE_SCREEN_CARDS_NUMBER;
            initialAddIndex = LARGE_SCREEN_ADD_INDEX;
        };

        return {initialNumberOfCards, initialAddIndex};
    }

    const {initialNumberOfCards, initialAddIndex} = calculate();

    const [numberOfCards, setNumberOfCards] = useState(initialNumberOfCards);
    const [addIndex, setAddIndex] = useState(initialAddIndex);

    function recalculate(e) {
        if (e.target.innerWidth < MIDDLE_SCREEN_WIDTH) {
            setNumberOfCards(SMALL_SCREEN_CARDS_NUMBER);
            setAddIndex(SMALL_AND_MIDDLE_SCREEN_ADD_INDEX);
        } else if (e.target.innerWidth < LARGE_SCREEN_WIDTH) {
            setNumberOfCards(MIDDLE_SCREEN_CARDS_NUMBER);
            setAddIndex(SMALL_AND_MIDDLE_SCREEN_ADD_INDEX);
        } else {
            setNumberOfCards(LARGE_SCREEN_CARDS_NUMBER);
            setAddIndex(LARGE_SCREEN_ADD_INDEX);
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