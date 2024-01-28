import './MoviesCard.css';
import React, { useState } from 'react';
import { AppContext } from '../../utils/AppContext';


export default function MoviesCard({ onClickSave, country, director, duration, mins, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId }) {
    const { savedCards } = React.useContext(AppContext);
    const arr = [];
    savedCards.forEach((item) => {
        arr.push(item.movieId);
    });
    const [isLiked, setIsLiked] = useState(arr.includes(movieId));

    //the following constant is hardcode
    const isSaved = false;

    function handleClickSave() {
        onClickSave({
            isLiked, setIsLiked, country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId
        });
    }

    return (
        <li className={`movies-card ${isSaved ? 'movies-card_cursor' : ''}`}>
            <img src={image} alt={`Постер фильма '${nameRU}'`} className="movies-card__img" />
            <div className="movies-card__info">
                <h2 className="movies-card__name">{nameRU}</h2>
                <button type="button" onClick={handleClickSave} className={`movies-card__button ${isLiked ? 'movies-card__button_like' : ''} ${isSaved ? 'movies-card__button_none' : ''}`}></button>
            </div>
            <p className="movies-card__duration">{mins}</p>
        </li>
    );
}