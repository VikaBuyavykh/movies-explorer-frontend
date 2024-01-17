import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';
import { savedCards } from '../../utils/cards';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Popup from '../Popup/Popup';
import Preloader from '../Preloader/Preloader';

export default function SavedMovies({ onOpenClick, onCloseClick, isPopupVisible, isLoading, isAuthorized }) {
    return (
        <>
            <Header onOpenClick={onOpenClick} isAuthorized={isAuthorized} />
            <main className="saved-movies">
                <SearchForm />
                <MoviesCardList isSavedMovies='true' cards={savedCards}/>
                <Popup onCloseClick={onCloseClick} isPopupVisible={isPopupVisible} />
                {isLoading && <Preloader />}
            </main>
            <Footer />
        </>
    );
}