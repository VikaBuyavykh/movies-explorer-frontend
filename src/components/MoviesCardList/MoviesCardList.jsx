import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({
  movies,
  numberOfCards,
  onClickSave,
  onClickDelete,
  resultError,
  isSavedPage,
  isBeforeSearching,
}) {
  return (
    <section className="movies-card-list">
      {!resultError ? (
        movies.length > 0 ? (
          <ul className="movies-card-list__container">
            {movies.map((movie, index) => {
              if (index < numberOfCards) {
                return (
                  <MoviesCard
                    _id={movie._id}
                    key={movie.movieId}
                    movieId={movie.movieId}
                    nameRU={movie.nameRU}
                    nameEN={movie.nameEN}
                    country={movie.country}
                    director={movie.director}
                    duration={movie.duration}
                    year={movie.year}
                    description={movie.description}
                    image={movie.image}
                    thumbnail={movie.thumbnail}
                    trailerLink={movie.trailer}
                    isSaved={movie.isSaved}
                    onClickSave={onClickSave}
                    onClickDelete={onClickDelete}
                    isSavedPage={isSavedPage}
                  />
                );
              } else {
                return "";
              }
            })}
          </ul>
        ) : isBeforeSearching ? (
          ""
        ) : (
          <p className="movies-card-list__result">Ничего не найдено</p>
        )
      ) : (
        <p className="movies-card-list__result">
          Во время запроса произошла ошибка. Возможно, проблема с соединением
          или сервер недоступен. Подождите немного и попробуйте ещё раз
        </p>
      )}
    </section>
  );
}
