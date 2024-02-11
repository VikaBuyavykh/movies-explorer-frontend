import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import moviesApi from '../../utils/MoviesApi';
import { mainApi } from '../../utils/MainApi';
import { useForm } from '../../utils/useFormHook';
import { CurrentUserContext } from '../../utils/CurrentUserContext';
import ProtectedRouteElement from '../../utils/ProtectedRoute';
import { SHORT_FILM_MAX_DURATION } from '../../utils/config';

function App() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({});
  const {values, handleChange, setValues} = useForm({ name: '', email: '', password: '' });
  const [authApiErrorText, setAuthApiErrorText] = useState('');
  const [isSubmitAvailable, setIsSubmitAvailable] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [formAvailability, setFormAvailability] = useState(false);
  const [popupVisibility, setPopupVisibility] = useState(false);
  const [buttonState, setButtonState] = useState(JSON.parse(localStorage.getItem('buttonState')) || false);
  const [buttonSavedMoviesState, setButtonSavedMoviesState] = useState(false);
  const [searchQuery, setSearchQuery] = useState(localStorage.getItem('searchQuery') || '');
  const [searchQuerySavedPage, setSearchQuerySavedPage] = useState('');
  const [searchFormErrorText, setSearchFormErrorText] = useState('');
  const [searchFormSavedPageErrorText, setSearchFormSavedPageErrorText] = useState('');
  const [cards, setCards] = useState(JSON.parse(localStorage.getItem('cards')) || []);
  const [allMovies, setAllMovies] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  const [cardsSavedPage, setCardsSavedPage] = useState([]);
  const [resultError, setResultError] = useState(false);
  const [notFoundResult, setNotFoundResult] = useState(false);
  const [notFoundResultSavedPage, setNotFoundResultSavedPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSavedPage, setIsLoadingSavedPage] = useState(false);
  const [isInfoTooltipVisible, setIsInfoTooltipVisible] = useState(false);

  function checkValidity(e) {
    setAuthApiErrorText('');
    const form = e.target.form;
    const formErrors = form.querySelectorAll('span');
    const formInputs = form.querySelectorAll('input');
    const formButton = form.querySelector('button[type="submit"]');
    const isFormInvalid = Array.from(formErrors).some((error) => {
      return error.textContent !== '';
    });
    const hasAnEmptyInput = Array.from(formInputs).some((input) => {
      return input.value === '';
    })
    if (!isFormInvalid && !hasAnEmptyInput) {
      setIsSubmitAvailable(true);
      formButton.removeAttribute('disabled');
    } else {
      setIsSubmitAvailable(false);
      formButton.setAttribute('disabled', true);
    }
    if (form.className === 'profile__form') {
      if (Array.from(formInputs)[0].value === currentUser.name && Array.from(formInputs)[1].value === currentUser.email) {
        setIsSubmitAvailable(false);
        formButton.setAttribute('disabled', true);
      }
    }
  }

  function handleLogOut() {
    localStorage.clear();
    setButtonState(false);
    setButtonSavedMoviesState(false);
    setSearchQuery('');
    setSearchQuerySavedPage('');
    setCards([]);
    setCardsSavedPage([]);
    setNotFoundResult(false);
    setNotFoundResultSavedPage(false);
    setResultError(false);
    setSearchFormErrorText('');
    setSearchFormSavedPageErrorText('');
    navigate('/');
    setIsAuthorized(false);
  }

  function makeFormBlocked() {
    setIsSubmitAvailable(false);
    document.querySelector('button[type="submit"]').setAttribute('disabled', true);
    Array.from(document.querySelectorAll('input')).forEach((input) => {
      input.setAttribute('disabled', true);
    });
  }

  function makeFormUnblocked() {
    setIsSubmitAvailable(true);
    document.querySelector('button[type="submit"]').removeAttribute('disabled');
    Array.from(document.querySelectorAll('input')).forEach((input) => {
      input.removeAttribute('disabled');
    });
  }

  function handleEditProfile(profileValues) {
    makeFormBlocked();
    const token = localStorage.getItem('token');
    mainApi.updateProfile({ name: profileValues.name, email: profileValues.email }, token).then(() => {
      setCurrentUser({ name: profileValues.name, email: profileValues.email })
      setFormAvailability(false);
      document.querySelector('#fieldset').setAttribute('disabled', true);
      setIsInfoTooltipVisible(true);
    }).catch((error) => {
      if (error === 'Ошибка: 409') {
        setAuthApiErrorText('Пользователь с таким email уже существует.');
      } else if (error === 'Ошибка: 500') {
        setAuthApiErrorText('На сервере произошла ошибка.');
      } else {
        setAuthApiErrorText('При обновлении профиля произошла ошибка.');
      }
    }).finally(() => {
      makeFormUnblocked();
    })
  }

  function handleEditClick() {
    document.querySelector('#fieldset').removeAttribute('disabled');
    setFormAvailability(true);
  }

  function handleRegister() {
    const {name, email, password} = values;    
    makeFormBlocked();
    mainApi.register(name, email, password).then((response) => {
      mainApi.authorize(email, password).then((res) => {
        localStorage.setItem('token', res.token);
        setIsAuthorized(true);
        navigate('/movies');
      }).catch(console.error);
    }).catch((error) => {
      if (error === 'Ошибка: 409') {
        setAuthApiErrorText('Пользователь с таким email уже существует.')
      } else if (error === 'Ошибка: 400') {
        setAuthApiErrorText('При регистрации пользователя произошла ошибка.');
      } else {
        setAuthApiErrorText('На сервере произошла ошибка.');
      }
    }).finally(() => {
      makeFormUnblocked();
    })
  }

  function handleLogin() {
    makeFormBlocked();
    const {email, password} = values;
    mainApi.authorize(email, password).then((response) => {
      if (!response.token) {
        setAuthApiErrorText('При авторизации произошла ошибка. Токен не передан или передан не в том формате.');
      } else {
        localStorage.setItem('token', response.token);
        setIsAuthorized(true);
        navigate('/movies');
      }
    }).catch((error) => {
      if (error === 'Ошибка: 401') {
        setAuthApiErrorText('Вы ввели неправильный логин или пароль')
      } else if (error === 'Ошибка: 500') {
        setAuthApiErrorText('На сервере произошла ошибка.')
      } else {
        setAuthApiErrorText('При авторизации произошла ошибка. Переданный токен некорректен.')
      }
    }).finally(() => {
      makeFormUnblocked();
    })
  }

  function handlePopupOpen() {
    setPopupVisibility(true);
  }

  function handlePopupClose() {
    setPopupVisibility(false);
  }

  function handleCheckboxClick(e) {
    e.preventDefault();
    if (!buttonState) {
      setButtonState(true);
    } else {
      setButtonState(false);
    }
    const backwards = true;
    handleSearchSubmit(backwards);
  };

  function handleCheckboxSavedPageClick(e) {
    e.preventDefault();
    if (!buttonSavedMoviesState) {
      setButtonSavedMoviesState(true);
    } else {
      setButtonSavedMoviesState(false);
    }
    const backwards = true;
    handleSearchSavedPageSubmit(backwards);
  };

  function handleSearchInputChange(e) {
    setSearchQuery(e.target.value);
    setSearchFormErrorText('');
  }

  function handleSearchInputSavedPageChange(e) {
    setSearchQuerySavedPage(e.target.value);
    setSearchFormSavedPageErrorText('');
  }

  const mapCards = (items) => {
    return items.map((item) => ({
        country: item.country,
        director: item.director,
        duration: item.duration,
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

  const mapCardsSavePage = (items) => {
    return items.map((item) => ({
        country: item.country,
        director: item.director,
        duration: item.duration,
        year: item.year,
        description: item.description,
        image: item.image,
        trailer: item.trailerLink,
        nameRU: item.nameRU,
        nameEN: item.nameEN,
        thumbnail: item.thumbnail,
        movieId: item.movieId,
        id: item._id
    }));
  };

  const nameFilter = (items) => {
    return items.filter((item) => item.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) || item.nameEN.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  const nameFilterSavedPage = (items) => {
    return items.filter((item) => item.nameRU.toLowerCase().includes(searchQuerySavedPage.toLowerCase()) || item.nameEN.toLowerCase().includes(searchQuerySavedPage.toLowerCase()));
  };

  const shortFilmsFilter = (items) => {
    return items.filter((item) => item.duration <= SHORT_FILM_MAX_DURATION);
  }

  function handleSearchSubmit(backwards) {
    setResultError(false);
    setNotFoundResult(false);
    setCards([]);
    if (searchQuery !== '') {
      setIsLoading(true);
      if (allMovies.length === 0) {
        moviesApi.getCards().then((res) => {
          setNotFoundResult(true);
          setAllMovies(res);
          if (backwards ? buttonState : !buttonState) {
            setCards(nameFilter(mapCards(res)));
          } else {
            setCards(shortFilmsFilter(nameFilter(mapCards(res))))
          }
        }).catch(() => {
          setResultError(true);
        }).finally(() => {
          setIsLoading(false);
        });        
      } else {
        let allMoviesFiltered;
        if (backwards ? buttonState : !buttonState) {
          allMoviesFiltered = nameFilter(mapCards(allMovies));
        } else {
          allMoviesFiltered = shortFilmsFilter(nameFilter(mapCards(allMovies)));
        }
        setCards(allMoviesFiltered);
        if (allMoviesFiltered.length === 0) {
          setNotFoundResult(true);
        }
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }      
      localStorage.setItem('buttonState', backwards ? !buttonState : buttonState);
      localStorage.setItem('searchQuery', searchQuery);
    } else {
      setSearchFormErrorText('Нужно ввести ключевое слово');
    }
  }

  function handleSearchSavedPageSubmit(backwards) {
    setIsLoadingSavedPage(true);
    if (searchQuerySavedPage !== '') {
      let savedPageMovies;
      if (backwards ? buttonSavedMoviesState : !buttonSavedMoviesState) {
        savedPageMovies = nameFilterSavedPage(mapCardsSavePage(savedCards));
      } else {
        savedPageMovies = shortFilmsFilter(nameFilterSavedPage(mapCardsSavePage(savedCards)));
      }      
      setCardsSavedPage(savedPageMovies);
      if (savedPageMovies.length === 0) {
        setNotFoundResultSavedPage(true);
      } else {
        setNotFoundResultSavedPage(false); 
      }
    } else {
      setSearchFormSavedPageErrorText('Нужно ввести ключевое слово');
    }
    setTimeout(() => {
      setIsLoadingSavedPage(false);
    }, 500);
  }

  function handleClickSave(setIsLiked, country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId) {
    const token = localStorage.getItem('token');
    mainApi.saveMovie({
      country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId
    }, token).then((newSavedCard) => {
      setSavedCards([...savedCards, newSavedCard]);
      setIsLiked(true);
    }).catch(console.error);
  }

  function handleClickDelete(setIsLiked, id) {
    const token = localStorage.getItem('token');
    mainApi.deleteMovie(id, token).then(() => {
      setSavedCards((state) => state.filter((c) => c._id !== id && c));
      setIsLiked(false);
    }).catch(console.error)
  }

  function handleClickUnsave(id) {
    const token = localStorage.getItem('token');
    mainApi.deleteMovie(id, token).then(() => {
      setCardsSavedPage((state) => state.filter((c) => c.id !== id && c));
      setSavedCards((state) => state.filter((c) => c._id !== id && c));
    }).catch(console.error)
  }

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
    }
    mainApi.getProfile(token).then((res) => {        
      setCurrentUser({
        name: res.name,
        email: res.email,
      });
    }).catch(console.error);         
  }, [isAuthorized]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      mainApi.getMovies(token).then((data) => {
        setSavedCards(data);
      }).catch(console.error);
    }
  }, [isAuthorized, isLoading]);

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path='/signin' element={isAuthorized ? <Navigate to="/movies" replace /> : <Login onSubmit={handleLogin} onInput={checkValidity} setIsSubmitAvailable={setIsSubmitAvailable} values={values} handleChange={handleChange} setValues={setValues} setAuthApiErrorText={setAuthApiErrorText} authApiErrorText={authApiErrorText} isSubmitAvailable={isSubmitAvailable} />} />
          <Route path='/signup' element={isAuthorized ? <Navigate to="/movies" replace /> : <Register onSubmit={handleRegister} onInput={checkValidity} values={values} setIsSubmitAvailable={setIsSubmitAvailable} handleChange={handleChange} setValues={setValues} setAuthApiErrorText={setAuthApiErrorText} authApiErrorText={authApiErrorText} isSubmitAvailable={isSubmitAvailable} />} />
          <Route path='/' element={<Main isThemeBlue='true' onOpenClick={handlePopupOpen} onCloseClick={handlePopupClose} isPopupVisible={popupVisibility} isAuthorized={isAuthorized} />} />
          <Route path='/movies' element={<ProtectedRouteElement component={Movies} setSearchFormErrorText={setSearchFormErrorText} onClickDelete={handleClickDelete} onClickSave={handleClickSave} onOpenClick={handlePopupOpen} onCloseClick={handlePopupClose} isPopupVisible={popupVisibility} isLoading={isLoading} isAuthorized={isAuthorized} buttonState={buttonState} searchQuery={searchQuery} handleSearchSubmit={handleSearchSubmit} searchFormErrorText={searchFormErrorText} cards={cards} savedCards={savedCards} resultError={resultError} notFoundResult={notFoundResult} onCheckboxClick={handleCheckboxClick} onSearchInputChange={handleSearchInputChange} />} />
          <Route path='/saved-movies' element={<ProtectedRouteElement component={SavedMovies} setSearchFormSavedPageErrorText={setSearchFormSavedPageErrorText} mapCardsSavePage={mapCardsSavePage} setCardsSavedPage={setCardsSavedPage} setButtonSavedMoviesState={setButtonSavedMoviesState} setSearchQuerySavedPage={setSearchQuerySavedPage} savedCards={savedCards} onClickDelete={handleClickUnsave} onOpenClick={handlePopupOpen} onCloseClick={handlePopupClose} isPopupVisible={popupVisibility} isLoading={isLoadingSavedPage} isAuthorized={isAuthorized} cards={cardsSavedPage} buttonState={buttonSavedMoviesState} onCheckboxClick={handleCheckboxSavedPageClick} searchQuery={searchQuerySavedPage} onSearchInputChange={handleSearchInputSavedPageChange} notFoundResult={notFoundResultSavedPage} searchFormErrorText={searchFormSavedPageErrorText} handleSearchSubmit={handleSearchSavedPageSubmit} />} />
          <Route path='/profile' element={<ProtectedRouteElement component={Profile} isInfoTooltipVisible={isInfoTooltipVisible} setIsInfoTooltipVisible={setIsInfoTooltipVisible} setFormAvailability={setFormAvailability} setIsSubmitAvailable={setIsSubmitAvailable} isSubmitAvailable={isSubmitAvailable} authApiErrorText={authApiErrorText} formAvailability={formAvailability} onEditClick={handleEditClick} onExitClick={handleLogOut} onSubmit={handleEditProfile} onInput={checkValidity} onOpenClick={handlePopupOpen} onCloseClick={handlePopupClose} isPopupVisible={popupVisibility} isAuthorized={isAuthorized} />} /> 
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
