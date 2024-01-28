import { useState } from 'react';
import './MoviesCard.css';

export default function MoviesCard({ _id, isSaved, savedCards, onClickDelete, onClickSave, country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId }) {
    const arr = [];
    if (!isSaved) {
        savedCards.forEach((item) => {
            arr.push(item.movieId);
        });
    }
    const [isLiked, setIsLiked] = useState(arr.includes(movieId));

    function handleClick() {
        let id;
        savedCards.forEach((item) => {
            if (item.movieId === movieId) {
                id = item._id;
            };
        })
        if (isSaved) {
            onClickDelete(id);
        } else {
            if (!isLiked) {
                onClickSave(setIsLiked, country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId);
            } else {
                onClickDelete(setIsLiked, id);
            };
        };
    }
    
    return (
        <li className={`movies-card ${isSaved ? 'movies-card_cursor' : ''}`}>
            <a href={trailerLink} target='_blank' rel='noreferrer' className="movies-card__trailer-link"><img src={image} alt={`Постер фильма '${nameRU}'`} className="movies-card__img" /></a>
            <div className="movies-card__info">
                <h2 className="movies-card__name">{nameRU}</h2>
                <button onClick={handleClick} type="button" className={`movies-card__button ${isLiked ? 'movies-card__button_like' : ''} ${isSaved ? 'movies-card__button_none' : ''}`}></button>
            </div>
            <p className="movies-card__duration">{`${Math.trunc(duration/60)}ч ${duration % 60}мин`}</p>
        </li>
    );
}