import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import { AppContext } from '../../utils/AppContext';

export default function MoviesCardList({ onClickSave, numberOfCards, resultError, notFoundText }) {
    const { cards } = React.useContext(AppContext);

    return (
        <section className="movies-card-list">
            {!resultError
            ? 
            ((cards.length > 0)
                ?
                <ul className="movies-card-list__container">
                    {cards.map((card, index) => {
                        if (index < numberOfCards) {
                            return (
                                <MoviesCard
                                    key={card.movieId}
                                    country={card.country}
                                    director={card.director}
                                    duration={card.mins}
                                    year={card.year}
                                    description={card.description}
                                    image={card.image}
                                    trailerLink={card.trailer}
                                    nameRU={card.nameRU}
                                    nameEN={card.nameEN}
                                    thumbnail={card.thumbnail}
                                    movieId={card.movieId}
                                    mins={card.duration}
                                    onClickSave={onClickSave}
                                />
                            );
                        } else {
                            return '';
                        }
                    })}
                </ul>
                :
                <p className="movies-card-list__result">{notFoundText}</p>
            )
            :
            (<p className="movies-card-list__result">{resultError}</p>)
            }
        </section>
    );
}