import './AboutProject.css';

export default function AboutProject() {
    return (
        <section className="about-project" id="about-project">
            <h2 className="about-project__title">О проекте</h2>
            <div className="about-project__info-container">
                <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
                <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
                <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                <p className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
            </div>
            <div className="about-project__duration-container">
                <h4 className="about-project__duration-text">1 неделя</h4>
                <h4 className="about-project__duration-text">4 недели</h4>
                <p className="about-project__duration-description">Back-end</p>
                <p className="about-project__duration-description">Front-end</p>
            </div>
        </section>
    );
}