import "./Movies.css";
import { useEffect, useMemo, useState } from "react";
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
  //reactive width

  const [width, setWidth] = useState(window.innerWidth);

  function resize() {
    setWidth(window.innerWidth);
  }

  const throttledResize = throttle(resize, 200);

  useEffect(() => {
    window.addEventListener("resize", throttledResize);
    return () => {
      window.removeEventListener("resize", throttledResize);
    };
  }, []);

  //cards calculation

  const [moreCounter, setMoreCounter] = useState(0);

  function handleMoreClick() {
    setMoreCounter(moreCounter + 1);
  }

  const addIndex = useMemo(
    () =>
      width < LARGE_SCREEN_WIDTH
        ? SMALL_AND_MIDDLE_SCREEN_ADD_INDEX
        : LARGE_SCREEN_ADD_INDEX,
    [width]
  );

  const numberOfCards = useMemo(
    () =>
      (width < MIDDLE_SCREEN_WIDTH
        ? SMALL_SCREEN_CARDS_NUMBER
        : width < LARGE_SCREEN_WIDTH
        ? MIDDLE_SCREEN_CARDS_NUMBER
        : LARGE_SCREEN_CARDS_NUMBER) +
      moreCounter * addIndex,
    [width, addIndex, moreCounter]
  );

  const isMore = useMemo(
    () => movies.length > numberOfCards,
    [movies, numberOfCards]
  );

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
