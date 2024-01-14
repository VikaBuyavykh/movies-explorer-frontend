import './NavTab.css';

export default function NavTab() {
    return (
        <section className="nav-tab">
            <nav className="nav-tab__menu">
                <ul>
                    <li>
                        <a href="#about-project" className="nav-tab__menu-item">О проекте</a>
                    </li>
                    <li>
                        <a href="#techs" className="nav-tab__menu-item">Технологии</a>
                    </li>
                    <li>
                        <a href="#about-me" className="nav-tab__menu-item">Студент</a>
                    </li>
                </ul>
            </nav>
        </section>
    );
}