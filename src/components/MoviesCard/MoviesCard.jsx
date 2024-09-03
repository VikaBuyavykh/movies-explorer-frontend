import "./MoviesCard.css";

export default function MoviesCard({
  _id,
  movieId,
  nameRU,
  duration,
  image,
  trailerLink,
  isSaved,
  onClickSave,
  onClickDelete,
  isSavedPage,
}) {
  function handleClick() {
    isSaved ? onClickDelete(_id) : onClickSave(movieId);
  }

  return (
    <li className={`movies-card ${isSavedPage ? "movies-card_cursor" : ""}`}>
      <a
        href={trailerLink}
        target="_blank"
        rel="noreferrer"
        className="movies-card__trailer-link"
      >
        <img
          src={image}
          alt={`Постер фильма '${nameRU}'`}
          className="movies-card__img"
        />
      </a>
      <div className="movies-card__info">
        <h2 className="movies-card__name">{nameRU}</h2>
        <button
          onClick={handleClick}
          type="button"
          className={`movies-card__button ${
            isSaved ? "movies-card__button_like" : ""
          } ${isSavedPage ? "movies-card__button_none" : ""}`}
        ></button>
      </div>
      <p className="movies-card__duration">{`${Math.trunc(duration / 60)}ч ${
        duration % 60
      }мин`}</p>
    </li>
  );
}
