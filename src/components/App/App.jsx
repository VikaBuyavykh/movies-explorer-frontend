import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { useEffect, useState, useCallback } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { mainApi } from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import { CurrentUserContext } from '../../utils/CurrentUserContext';
import { AppContext } from '../../utils/AppContext';
import ProtectedRouteElement from '../../utils/ProtectedRoute';

function App() {
  const navigate = useNavigate();

  const initialButtonState = () => {
    if (localStorage.buttonState) {
      return JSON.parse(localStorage.getItem('buttonState'));
    } else {
      return true;
  }
}
  const initialSearchQuery = () => {
    if (localStorage.getItem('searchQuery')) {
        return localStorage.getItem('searchQuery');
    } else {
      return '';
    }
  }
  const checkboxDependentCards = () => {
    if (localStorage.getItem('checkboxDependentCards')) {
        return JSON.parse(localStorage.getItem('checkboxDependentCards'));
    } else {
        return [];
    }
  }
  const checkboxIndipendentCards = () => {
    if (localStorage.getItem('checkboxIndipendentCards')) {
        return JSON.parse(localStorage.getItem('checkboxIndipendentCards'));
    } else {
        return [];
    } 
  }

  const [popupVisibility, setPopupVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [savedCards, setSavedCards] = useState([]);
  const [resultError, setResultError] = useState('');
  const [notFoundText, setNotFoundText] = useState('');
  const [errorText, setErrorText] = useState('');
  const [cards, setCards] = useState([]);
  const [nameFilteredCards, setNameFilteredCards] = useState(checkboxIndipendentCards);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [buttonState, setButtonState] = useState(initialButtonState);

  function handlePopupOpen() {
    setPopupVisibility(true);
  }

  function handlePopupClose() {
    setPopupVisibility(false);
  }  

  const mapCards = (items) => {
    return items.map((item) => ({
        country: item.country,
        director: item.director,
        duration: `${Math.trunc(item.duration/60)}ч ${item.duration % 60}мин`,
        mins: item.duration,
        year: item.year,
        description: item.description,
        image: `https://api.nomoreparties.co${item.image.url}`,
        trailer: item.trailerLink,
        nameRU: item.nameRU,
        nameEN: item.nameEN,
        thumbnail: `https://api.nomoreparties.co${item.image.formats.thumbnail.url}`,
        movieId: item.id
    }));
  };

  const filterCards = (items) => {
    return items.filter((item) => item.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) || item.nameEN.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  const shortFilmsFilter = (items) => {
    return items.filter((item) => item.mins <= 40);
}

  const checkboxFilter = useCallback(() => {
    if (buttonState) {
        setCards(shortFilmsFilter(nameFilteredCards));
    } else {
        setCards(nameFilteredCards);
    }
    localStorage.setItem('checkboxIndipendentCards', JSON.stringify(nameFilteredCards));
}, [buttonState, nameFilteredCards]);

  function handleSearchSubmit() {
    setResultError('');
    setNotFoundText('');
    setCards([]);
    if (searchQuery === '') {
      setErrorText('Нужно ввести ключевое слово');
    } else {
      setIsLoading(true);
      moviesApi.getCards()
      .then((data) => {
        setNotFoundText('Ничего не найдено');
        setNameFilteredCards(filterCards(mapCards(data)));
        checkboxFilter();
        localStorage.setItem('searchQuery', searchQuery);
      })
      .catch((error) => {
        console.log(error);
        setResultError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
      })
      .finally(() => {
        setIsLoading(false);
      });
    }
  }

  function handleClickSave({ isLiked, setIsLiked, country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId }) {
    const token = localStorage.getItem('token');
    if (!isLiked) {
        setIsLiked(true);
        mainApi.saveMovie({
            country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId
        }, token).catch(console.error);
    } else {
        savedCards.forEach((item) => {
            if (item.movieId === movieId) {
                mainApi.deleteMovie(item._id, token).catch(console.error);
            };
        })
        setIsLiked(false);
    }
  }

  useEffect(() => {
    checkboxFilter();
    localStorage.setItem('buttonState', buttonState);
  }, [buttonState, checkboxFilter]);  

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      mainApi.tokenCheck(token).then((response) => {
        if (response) {
          setIsAuthorized(true);
          navigate('/movies');
        }
      }).catch(() => {
        navigate('/');
      });
      mainApi.getProfile(token).then((res) => {        
        setCurrentUser({
          name: res.name,
          email: res.email,
        });
      }).catch(console.error);
    }
  }, [isAuthorized]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      mainApi.getMovies(token).then(setSavedCards).catch(console.error);
    }
    console.log(savedCards);
  }, [isAuthorized]);

  return (
    <AppContext.Provider value={{savedCards, cards, errorText, isLoading}}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="app">
          <Routes>
            <Route path='/' element={<Main isThemeBlue='true' onOpenClick={handlePopupOpen} onCloseClick={handlePopupClose} isPopupVisible={popupVisibility} isAuthorized={isAuthorized} />} />
            <Route path='/movies' element={<ProtectedRouteElement component={Movies} onOpenClick={handlePopupOpen} onCloseClick={handlePopupClose} isPopupVisible={popupVisibility} isAuthorized={isAuthorized} savedCards={savedCards} onClickSave={handleClickSave} onSubmit={handleSearchSubmit} resultError={resultError} notFoundText={notFoundText} searchQuery={searchQuery} setSearchQuery={setSearchQuery} setErrorText={setErrorText} buttonState={buttonState} setButtonState={setButtonState} />} />
            <Route path='/saved-movies' element={<ProtectedRouteElement component={SavedMovies} onOpenClick={handlePopupOpen} onCloseClick={handlePopupClose} isPopupVisible={popupVisibility} searchQuery={searchQuery} setSearchQuery={setSearchQuery} isAuthorized={isAuthorized} buttonState={buttonState} setButtonState={setButtonState} />} />
            <Route path='/profile' element={<ProtectedRouteElement component={Profile} setIsAuthorized={setIsAuthorized} setCurrentUser={setCurrentUser} onOpenClick={handlePopupOpen} onCloseClick={handlePopupClose} isPopupVisible={popupVisibility} isAuthorized={isAuthorized} />} />
            <Route path='/signin' element={<Login setIsAuthorized={setIsAuthorized} />} />
            <Route path='/signup' element={<Register setIsAuthorized={setIsAuthorized} />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </div>
      </CurrentUserContext.Provider>
      </AppContext.Provider>
  );
}

export default App;
