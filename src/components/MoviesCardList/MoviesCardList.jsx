import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export default function MoviesCardList({ cards }) {
    return (
        <section className="movies-card-list">
            <ul className="movies-card-list__container">
                {cards.map((card) => {
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
                })}
            </ul>
        </section>
    );
}