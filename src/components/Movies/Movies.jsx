import "./Movies.css";
import { useEffect, useState } from "react";
import throttle from "../../utils/throttle";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Popup from "../Popup/Popup";
import Preloader from "../Preloader/Preloader";
import Footer from "../Footer/Footer";
import {
  MIDDLE_SCREEN_WIDTH,
  LARGE_SCREEN_WIDTH,
  SMALL_SCREEN_CARDS_NUMBER,
  MIDDLE_SCREEN_CARDS_NUMBER,
  LARGE_SCREEN_CARDS_NUMBER,
  SMALL_AND_MIDDLE_SCREEN_ADD_INDEX,
  LARGE_SCREEN_ADD_INDEX,
} from "../../utils/constants";

export default function Movies({
  isAuthorized,
  movies,
  onOpenClick,
  searchQuery,
  onSearchInputChange,
  buttonState,
  onCheckboxClick,
  searchFormErrorText,
  handleSearchSubmit,
  onClickSave,
  onClickDelete,
  resultError,
  isPopupVisible,
  onCloseClick,
  isLoading,
  isBeforeSearching,
}) {
  const [isMore, setIsMore] = useState(false);
  const [numberOfCards, setNumberOfCards] = useState(0);
  const [addIndex, setAddIndex] = useState(0);

  function calculate() {
    if (window.innerWidth >= LARGE_SCREEN_WIDTH) {
      setNumberOfCards(LARGE_SCREEN_CARDS_NUMBER);
      setAddIndex(LARGE_SCREEN_ADD_INDEX);
    } else {
      setAddIndex(SMALL_AND_MIDDLE_SCREEN_ADD_INDEX);
      if (window.innerWidth >= MIDDLE_SCREEN_WIDTH) {
        setNumberOfCards(MIDDLE_SCREEN_CARDS_NUMBER);
      } else {
        setNumberOfCards(SMALL_SCREEN_CARDS_NUMBER);
      }
    }
  }

  //const optimizedCalculation = throttle(calculate, 50);

  useEffect(() => {
    calculate();
    window.addEventListener("resize", calculate);
    return () => {
      window.removeEventListener("resize", calculate);
    };
  }, []);

  function handleMoreClick() {
    setNumberOfCards(numberOfCards + addIndex);
  }

  useEffect(() => {
    if (movies.length > numberOfCards) {
      setIsMore(true);
    } else {
      setIsMore(false);
    }
  }, [movies, numberOfCards]);

  useEffect(() => {
    localStorage.setItem("buttonState", buttonState);
  }, [buttonState]);

  useEffect(() => {
    localStorage.setItem("searchQuery", searchQuery);
  }, [searchQuery]);
  return (
    <>
      <Header onOpenClick={onOpenClick} isAuthorized={isAuthorized} />
      <main className="movies">
        <SearchForm
          searchQuery={searchQuery}
          onSearchInputChange={onSearchInputChange}
          buttonState={buttonState}
          onCheckboxClick={onCheckboxClick}
          searchFormErrorText={searchFormErrorText}
          handleSearchSubmit={handleSearchSubmit}
        />
        <MoviesCardList
          movies={movies}
          numberOfCards={numberOfCards}
          onClickSave={onClickSave}
          onClickDelete={onClickDelete}
          resultError={resultError}
          isBeforeSearching={isBeforeSearching}
        />
        {isMore && (
          <div className="movies__more-section">
            <button
              type="button"
              className="movies__more-button"
              onClick={handleMoreClick}
            >
              Ещё
            </button>
          </div>
        )}
        <Popup isPopupVisible={isPopupVisible} onCloseClick={onCloseClick} />
        {isLoading && <Preloader />}
      </main>
      <Footer />
    </>
  );
}
