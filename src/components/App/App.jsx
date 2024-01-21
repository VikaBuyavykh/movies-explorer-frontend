import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

function App() {
  const [popupVisibility, setPopupVisibility] = useState(false);
  // the following constants are temporary hardcode
  const isLoading = false;
  const isAuthorized = true;

  function handlePopupOpen() {
    setPopupVisibility(true);
  }

  function handlePopupClose() {
    setPopupVisibility(false);
  }

  return (
    <div className="app">
      <Routes>
        <Route path='/' element={<Main isThemeBlue='true' onOpenClick={handlePopupOpen} onCloseClick={handlePopupClose} isPopupVisible={popupVisibility} isAuthorized={isAuthorized} />} />
        <Route path='/movies' element={<Movies onOpenClick={handlePopupOpen} onCloseClick={handlePopupClose} isPopupVisible={popupVisibility} isLoading={isLoading} isAuthorized={isAuthorized} />} />
        <Route path='/saved-movies' element={<SavedMovies onOpenClick={handlePopupOpen} onCloseClick={handlePopupClose} isPopupVisible={popupVisibility} isLoading={isLoading} isAuthorized={isAuthorized} />} />
        <Route path='/profile' element={<Profile onOpenClick={handlePopupOpen} onCloseClick={handlePopupClose} isPopupVisible={popupVisibility} isAuthorized={isAuthorized} />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
