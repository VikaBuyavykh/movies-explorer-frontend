import { useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export default function MoviesCardList({ isSavedMovies, cards }) {
    let initialNumberOfCards;

    if ((window.innerWidth < 768) && isSavedMovies) {
        initialNumberOfCards = 2;
    } else if (window.innerWidth < 768) {
        initialNumberOfCards = 5;
    } else if ((window.innerWidth < 1280) && isSavedMovies) {
        initialNumberOfCards = 3;
    } else if (window.innerWidth < 1280) {
        initialNumberOfCards = 8;
    } else if (isSavedMovies) {
        initialNumberOfCards = 3;
    } else {
        initialNumberOfCards = 12;
    }

    const [numberOfCards, setNumberOfCards] = useState(initialNumberOfCards);

    window.addEventListener('resize', (e) => {
        if ((e.target.innerWidth < 768) && isSavedMovies) {
            setNumberOfCards(2);
        } else if (e.target.innerWidth < 768) {
            setNumberOfCards(5);
        } else if ((e.target.innerWidth < 1280) && isSavedMovies) {
            setNumberOfCards(3);
        } else if (e.target.innerWidth < 1280) {
            setNumberOfCards(8);
        } else if (isSavedMovies) {
            setNumberOfCards(3);
        } else {
            setNumberOfCards(12);
        }
    })
    
    return (
        <section className="movies-card-list">
            <ul className="movies-card-list__container">
                {cards.map((card, index) => {
                    if (index < numberOfCards) {
                        return (
                            <MoviesCard
                                key={card.id}
                                cardPath={card.path}
                                cardName={card.name}
                                cardDuration={card.duration}
                                isLiked={card.isLiked}
                                isSaved={card.isSaved}
                            />
                        );
                    } else {
                        return '';
                    }
                })}
            </ul>
        </section>
    );
}