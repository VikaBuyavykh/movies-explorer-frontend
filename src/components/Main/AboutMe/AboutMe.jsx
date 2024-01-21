import './AboutMe.css';
import studentPhotoPath from '../../../images/student-img.png';

export default function AboutMe() {
    return (
        <section className="about-me" id="about-me">
            <h2 className="about-me__title">Студент</h2>
            <div className="about-me__container">
                <div className="about-me__info">
                    <h3 className="about-me__name">Виталий</h3>
                    <p className="about-me__main-info">Фронтенд-разработчик, 30 лет</p>
                    <p className="about-me__text">Я родился и живу в Саратове, закончил факультет экономики СГУ. 
                    У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. 
                    Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». 
                    После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами 
                    и ушёл с постоянной работы.</p>
                    <a target="_blank" rel="noopener noreferrer" href="https://github.com/VikaBuyavykh" className="about-me__link">Github</a>
                </div>
                <img src={studentPhotoPath} alt="Фотокарточка студента на белом фоне" className="about-me__photo" />
            </div>
        </section>
    );
}