import NavTab from './NavTab/NavTab';
import Promo from './Promo/Promo';
import Techs from './Techs/Techs';
import AboutProject from './AboutProject/AboutProject';
import AboutMe from './AboutMe/AboutMe';
import Portfolio from './Portfolio/Portfolio';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Popup from '../Popup/Popup';

export default function Main({ isThemeBlue, onOpenClick, onCloseClick, isPopupVisible, isAuthorized }) {
    return (
        <>
            <Header isThemeBlue={isThemeBlue} onOpenClick={onOpenClick} isAuthorized={isAuthorized} />
            <main>
                <Promo />
                <NavTab />
                <AboutProject />
                <Techs />
                <AboutMe />
                <Portfolio />
                <Popup onCloseClick={onCloseClick} isPopupVisible={isPopupVisible} />
            </main>
            <Footer />
        </>
    );
}