import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Popup from '../Popup/Popup';
import Preloader from '../Preloader/Preloader';
import { useEffect } from 'react';

export default function SavedMovies({ mapCardsSavePage, setCardsSavedPage, setButtonSavedMoviesState, setSearchQuerySavedPage, notFoundResult, handleSearchSubmit, searchFormErrorText, searchQuery, onSearchInputChange, buttonState, onCheckboxClick, savedCards, cards, onClickDelete, onOpenClick, onCloseClick, isPopupVisible, isLoading, isAuthorized }) {    
    useEffect(() => {
        setButtonSavedMoviesState(false);
        setSearchQuerySavedPage('');
        setCardsSavedPage(mapCardsSavePage(savedCards));
      }, [])
    
    return (
        <>
            <Header onOpenClick={onOpenClick} isAuthorized={isAuthorized} />
            <main className="saved-movies">
                <SearchForm handleSearchSubmit={handleSearchSubmit} searchFormErrorText={searchFormErrorText} searchQuery={searchQuery} onSearchInputChange={onSearchInputChange} buttonState={buttonState} onCheckboxClick={onCheckboxClick} />
                <MoviesCardList notFoundResult={notFoundResult} savedCards={savedCards} onClickDelete={onClickDelete} numberOfCards={cards.length} cards={cards} isSaved='true' />
                <Popup onCloseClick={onCloseClick} isPopupVisible={isPopupVisible} />
                {isLoading && <Preloader />}
            </main>
            <Footer />
        </>
    );
}