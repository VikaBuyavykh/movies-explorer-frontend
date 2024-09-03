import "./SavedMovies.css";
import { useEffect } from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Popup from "../Popup/Popup";
import Preloader from "../Preloader/Preloader";
import Footer from "../Footer/Footer";

export default function SavedMovies({
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
  useEffect(() => {
    localStorage.setItem("buttonStateSM", buttonState);
  }, [buttonState]);

  useEffect(() => {
    localStorage.setItem("searchQuerySM", searchQuery);
  }, [searchQuery]);
  return (
    <>
      <Header onOpenClick={onOpenClick} isAuthorized={isAuthorized} />
      <main className="saved-movies">
        <SearchForm
          searchQuery={searchQuery}
          onSearchInputChange={onSearchInputChange}
          buttonState={buttonState}
          onCheckboxClick={onCheckboxClick}
          searchFormErrorText={searchFormErrorText}
          handleSearchSubmit={handleSearchSubmit}
        />
        <MoviesCardList
          movies={movies.filter((movie) => movie.isSaved)}
          numberOfCards={movies.filter((movie) => movie.isSaved).length}
          onClickSave={onClickSave}
          onClickDelete={onClickDelete}
          resultError={resultError}
          isSavedPage="true"
          isBeforeSearching={isBeforeSearching}
        />
        <Popup isPopupVisible={isPopupVisible} onCloseClick={onCloseClick} />
        {isLoading && <Preloader />}
      </main>
      <Footer />
    </>
  );
}
