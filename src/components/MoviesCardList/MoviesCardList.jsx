import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export default function MoviesCardList({ isSaved, onClickDelete, onClickSave, numberOfCards, cards, savedCards, resultError, notFoundResult }) {
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
                                        duration={card.duration}
                                        year={card.year}
                                        description={card.description}
                                        image={card.image}
                                        trailerLink={card.trailer}
                                        nameRU={card.nameRU}
                                        nameEN={card.nameEN}
                                        thumbnail={card.thumbnail}
                                        movieId={card.movieId}
                                        onClickSave={onClickSave}
                                        onClickDelete={onClickDelete}
                                        savedCards={savedCards}
                                        isSaved={isSaved}
                                        _id={card.id}
                                    />
                                );
                            } else {
                                return '';
                            }
                        })}
                    </ul>
                :
                (notFoundResult ? <p className="movies-card-list__result">Ничего не найдено</p> : '')
            )
            :
            (<p className="movies-card-list__result">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p>)
            }
        </section>
    );
}