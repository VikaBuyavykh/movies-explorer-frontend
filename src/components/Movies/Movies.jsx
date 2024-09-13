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
} from "../../utils/config";

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

  // function calculate() {
  //   let initialNumberOfCards;
  //   let initialAddIndex;

  //   if (window.innerWidth < MIDDLE_SCREEN_WIDTH) {
  //     initialNumberOfCards = SMALL_SCREEN_CARDS_NUMBER;
  //     initialAddIndex = SMALL_AND_MIDDLE_SCREEN_ADD_INDEX;
  //   } else if (window.innerWidth < LARGE_SCREEN_WIDTH) {
  //     initialNumberOfCards = MIDDLE_SCREEN_CARDS_NUMBER;
  //     initialAddIndex = SMALL_AND_MIDDLE_SCREEN_ADD_INDEX;
  //   } else {
  //     initialNumberOfCards = LARGE_SCREEN_CARDS_NUMBER;
  //     initialAddIndex = LARGE_SCREEN_ADD_INDEX;
  //   }

  //   return { initialNumberOfCards, initialAddIndex };
  // }

  //const { initialNumberOfCards, initialAddIndex } = calculate();

  // const [numberOfCards, setNumberOfCards] = useState(initialNumberOfCards);
  // const [addIndex, setAddIndex] = useState(initialAddIndex);

  const [numberOfCards, setNumberOfCards] = useState(6);
  const [addIndex, setAddIndex] = useState(3);

  // function recalculate(e) {
  //   if (e.target.innerWidth < MIDDLE_SCREEN_WIDTH) {
  //     setNumberOfCards(SMALL_SCREEN_CARDS_NUMBER);
  //     setAddIndex(SMALL_AND_MIDDLE_SCREEN_ADD_INDEX);
  //   } else if (e.target.innerWidth < LARGE_SCREEN_WIDTH) {
  //     setNumberOfCards(MIDDLE_SCREEN_CARDS_NUMBER);
  //     setAddIndex(SMALL_AND_MIDDLE_SCREEN_ADD_INDEX);
  //   } else {
  //     setNumberOfCards(LARGE_SCREEN_CARDS_NUMBER);
  //     setAddIndex(LARGE_SCREEN_ADD_INDEX);
  //   }
  // }

  //const optimizedRecalculate = throttle(recalculate, 50);

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

  // useEffect(() => {
  //   window.addEventListener("resize", optimizedRecalculate);
  //   return () => {
  //     window.removeEventListener("resize", optimizedRecalculate);
  //   };
  // }, []);

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
