import './MoviesCard.css';

export default function MoviesCard({ cardPath, cardName, cardDuration, isLiked, isSaved }) {
    return (
        <li className={`movies-card ${isSaved && 'movies-card_cursor'}`}>
            <img src={cardPath} alt="Постер фильма" className="movies-card__img" />
            <div className="movies-card__info">
                <h2 className="movies-card__name">{cardName}</h2>
                <button type="button" className={`movies-card__button ${isLiked && 'movies-card__button_like'} ${isSaved && 'movies-card__button_none'}`}></button>
            </div>
            <p className="movies-card__duration">{cardDuration}</p>
        </li>
    );
}