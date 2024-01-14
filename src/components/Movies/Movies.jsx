import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { cards } from '../../utils/cards';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Popup from '../Popup/Popup';
import Preloader from '../Preloader/Preloader';

export default function Movies({ onOpenClick, onCloseClick, isPopupVisible, isLoading, isAuthorized }) {
    return (
        <>
            <Header onOpenClick={onOpenClick} isAuthorized={isAuthorized} />
            <main className="movies">
                <SearchForm />
                <MoviesCardList cards={cards} />
                <section className="movies__more-section">
                        <button type="button" className="movies__more-button">Ещё</button>
                </section>
            </main>
            <Footer />
            <Popup onCloseClick={onCloseClick} isPopupVisible={isPopupVisible} />
            {isLoading && <Preloader />}
        </>
    );
}