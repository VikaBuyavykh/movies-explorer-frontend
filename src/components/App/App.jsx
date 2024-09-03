import "./App.css";
import { useEffect, useMemo, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import moviesApi from "../../utils/MoviesApi";
import { mainApi } from "../../utils/MainApi";
import { useForm } from "../../utils/useFormHook";
import { CurrentUserContext } from "../../utils/CurrentUserContext";
import ProtectedRouteElement from "../../utils/ProtectedRoute";
import { SHORT_FILM_MAX_DURATION } from "../../utils/config";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  //имена для работы форм

  const [isAuthorized, setIsAuthorized] = useState(
    JSON.parse(localStorage.getItem("isAuth")) || false
  );
  const [currentUser, setCurrentUser] = useState({});
  const [userId, setUserId] = useState(null);
  const { values, handleChange, setValues } = useForm({
    name: "",
    email: "",
    password: "",
  });
  const [formAvailability, setFormAvailability] = useState(false);
  const [isSubmitAvailable, setIsSubmitAvailable] = useState(false);
  const [authApiErrorText, setAuthApiErrorText] = useState("");

  const [initialMovies, setInitialMovies] = useState(
    JSON.parse(localStorage.getItem("movies")) || []
  );
  const [movies, setMovies] = useState([]);

  //имена  для работы поиска, постфикс SM - здесь и далее для страницы '/saved-movies'

  const [searchQuery, setSearchQuery] = useState(
    localStorage.getItem("searchQuery") || ""
  );
  const [searchQuerySM, setSearchQuerySM] = useState(
    localStorage.getItem("searchQuerySM") || ""
  );

  const [buttonState, setButtonState] = useState(
    JSON.parse(localStorage.getItem("buttonState")) || false
  );
  const [buttonStateSM, setButtonStateSM] = useState(
    JSON.parse(localStorage.getItem("buttonStateSM")) || false
  );

  const [searchFormErrorText, setSearchFormErrorText] = useState("");
  const [resultError, setResultError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [popupVisibility, setPopupVisibility] = useState(false);
  const [isInfoTooltipVisible, setIsInfoTooltipVisible] = useState(false);

  //работа форм

  function checkValidity(e) {
    setAuthApiErrorText("");
    const form = e.target.form;
    const formErrors = form.querySelectorAll("span");
    const formInputs = form.querySelectorAll("input");
    const formButton = form.querySelector('button[type="submit"]');
    const isFormInvalid = Array.from(formErrors).some((error) => {
      return error.textContent !== "";
    });
    const hasAnEmptyInput = Array.from(formInputs).some((input) => {
      return input.value === "";
    });
    if (!isFormInvalid && !hasAnEmptyInput) {
      setIsSubmitAvailable(true);
      formButton.removeAttribute("disabled");
    } else {
      setIsSubmitAvailable(false);
      formButton.setAttribute("disabled", true);
    }
    if (form.className === "profile__form") {
      if (
        Array.from(formInputs)[0].value === currentUser.name &&
        Array.from(formInputs)[1].value === currentUser.email
      ) {
        setIsSubmitAvailable(false);
        formButton.setAttribute("disabled", true);
      }
    }
  }

  function makeFormBlocked() {
    setIsSubmitAvailable(false);
    document
      .querySelector('button[type="submit"]')
      .setAttribute("disabled", true);
    Array.from(document.querySelectorAll("input")).forEach((input) => {
      input.setAttribute("disabled", true);
    });
  }

  function makeFormUnblocked() {
    setIsSubmitAvailable(true);
    document.querySelector('button[type="submit"]').removeAttribute("disabled");
    Array.from(document.querySelectorAll("input")).forEach((input) => {
      input.removeAttribute("disabled");
    });
  }

  function handleEditClick() {
    document.querySelector("#fieldset").removeAttribute("disabled");
    setFormAvailability(true);
  }

  function handleEditProfile(profileValues) {
    makeFormBlocked();
    const token = localStorage.getItem("token");
    mainApi
      .getUsers(token)
      .then((response) => {
        if (
          response
            .map((item) => item.email)
            .filter((item) => item !== currentUser.email)
            .some((item) => item === profileValues.email)
        ) {
          throw new Error("Пользователь с таким email уже существует.");
        } else {
          mainApi
            .updateProfile(
              { name: profileValues.name, email: profileValues.email },
              token,
              userId
            )
            .then(() => {
              setCurrentUser({
                name: profileValues.name,
                email: profileValues.email,
              });
              setFormAvailability(false);
              document
                .querySelector("#fieldset")
                .setAttribute("disabled", true);
              setIsInfoTooltipVisible(true);
            });
        }
      })
      .catch((error) => {
        if (error.message === "Пользователь с таким email уже существует.") {
          setAuthApiErrorText(error.message);
        } else {
          setAuthApiErrorText(
            "При обновлении профиля произошла ошибка. Повторите попытку позднее"
          );
        }
      })
      .finally(() => {
        makeFormUnblocked();
      });
  }

  function handleRegister() {
    const { name, email, password } = values;
    makeFormBlocked();
    mainApi
      .register(name, email, password)
      .then((response) => {
        mainApi
          .authorize(email, password)
          .then((res) => {
            localStorage.setItem("token", res.token);
            setIsAuthorized(true);
            localStorage.setItem("isAuth", true);
            navigate("/movies");
          })
          .catch(console.error);
      })
      .catch((error) => {
        if (error === "Ошибка: 401") {
          setAuthApiErrorText("Пользователь с таким email уже существует.");
        } else {
          setAuthApiErrorText(
            "На сервере произошла ошибка. Попробуйте войти позднее"
          );
        }
      })
      .finally(() => {
        makeFormUnblocked();
      });
  }

  function handleLogin() {
    makeFormBlocked();
    const { email, password } = values;
    mainApi
      .authorize(email, password)
      .then((response) => {
        if (!response.token) {
          setAuthApiErrorText(
            "При авторизации произошла ошибка. Токен не передан или передан не в том формате."
          );
        } else {
          localStorage.setItem("token", response.token);
          setIsAuthorized(true);
          localStorage.setItem("isAuth", true);
          navigate("/movies");
        }
      })
      .catch((error) => {
        if (error === "Ошибка: 401") {
          setAuthApiErrorText("Вы ввели неправильный логин или пароль");
        } else {
          setAuthApiErrorText(
            "На сервере произошла ошибка. Попробуйте войти позднее"
          );
        }
      })
      .finally(() => {
        makeFormUnblocked();
      });
  }

  function handleLogOut() {
    localStorage.clear();
    setSearchQuery("");
    setButtonState(false);
    setSearchQuerySM("");
    setButtonStateSM(false);
    setInitialMovies([]);
    setMovies([]);
    setSearchFormErrorText("");
    setResultError(false);
    setUserId(null);
    setCurrentUser({});
    setIsAuthorized(false);
    navigate("/");
  }

  function handlePopupOpen() {
    setPopupVisibility(true);
  }

  function handlePopupClose() {
    setPopupVisibility(false);
  }

  //работа поиска

  const isBeforeSearching = useMemo(() => movies.length === 0, [movies]);

  const durationFilter = (item) => item.duration <= SHORT_FILM_MAX_DURATION;
  const noFilter = (item) => item;

  const filterState = useMemo(
    () => (buttonState ? durationFilter : noFilter),
    [buttonState]
  );
  const filterStateSM = useMemo(
    () => (buttonStateSM ? durationFilter : noFilter),
    [buttonStateSM]
  );

  const nameFilter = (item) =>
    item.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.nameEN.toLowerCase().includes(searchQuery.toLowerCase());
  const nameFilterSM = (item) =>
    item.nameRU.toLowerCase().includes(searchQuerySM.toLowerCase()) ||
    item.nameEN.toLowerCase().includes(searchQuerySM.toLowerCase());

  function handleSearchInputChange(e) {
    if (location.pathname === "/movies") {
      setSearchQuery(e.target.value);
      setSearchFormErrorText("");
    } else {
      setSearchQuerySM(e.target.value);
      setSearchFormErrorText("");
    }
  }

  function handleCheckboxClick(e) {
    e.preventDefault();
    handleSearchSubmit();
    if (location.pathname === "/movies") {
      if (initialMovies.length !== 0 || searchQuery !== "") {
        setButtonState(!buttonState);
      }
    } else {
      if (initialMovies.length !== 0 || searchQuerySM !== "") {
        setButtonStateSM(!buttonStateSM);
      }
    }
  }

  const mapCards = (items) => {
    return items.map((item) => ({
      movieId: item.id,
      nameRU: item.nameRU,
      nameEN: item.nameEN,
      country: item.country,
      director: item.director,
      duration: item.duration,
      year: item.year,
      description: item.description,
      image: `https://api.nomoreparties.co${item.image.url}`,
      thumbnail: `https://api.nomoreparties.co${item.image.formats.thumbnail.url}`,
      trailer: item.trailerLink,
    }));
  };

  function handleSearchSubmit() {
    setResultError(false);
    if (initialMovies.length === 0) {
      if (
        (location.pathname === "/movies" && searchQuery === "") ||
        (location.pathname === "/saved-movies" && searchQuerySM === "")
      ) {
        setSearchFormErrorText("Нужно ввести ключевое слово");
      } else {
        setIsLoading(true);
        moviesApi
          .getCards()
          .then((res) => {
            setInitialMovies(mapCards(res));
          })
          .catch((error) => {
            setResultError(true);
            console.log(error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    }
  }

  function handleClickSave(movieId) {
    const movie = movies.find((movie) => movie.movieId === movieId);
    const token = localStorage.getItem("token");
    if (token && movie) {
      mainApi
        .saveMovie(movie, token)
        .then((res) => {
          setMovies(
            movies.map((movie) =>
              movie.movieId === res.movieId
                ? { ...movie, isSaved: true, _id: res.id }
                : movie
            )
          );
        })
        .catch(console.error);
    }
  }

  function handleClickDelete(_id) {
    const token = localStorage.getItem("token");
    if (token && _id) {
      mainApi
        .deleteMovie(_id, token)
        .then((res) => {
          setMovies(
            movies.map((movie) =>
              movie._id === _id
                ? { ...movie, isSaved: false, _id: null }
                : movie
            )
          );
        })
        .catch(console.error);
    }
  }

  useEffect(() => {
    if (initialMovies.length > 0) {
      const token = localStorage.getItem("token");
      if (token) {
        mainApi
          .getMovies(token)
          .then((res) => {
            localStorage.setItem("movies", JSON.stringify(initialMovies));
            setMovies(
              initialMovies.map((movie) => {
                const savedMovie = res.find(
                  (item) => item.movieId === movie.movieId
                );
                if (savedMovie) {
                  return { ...movie, isSaved: true, _id: savedMovie.id };
                } else {
                  return movie;
                }
              })
            );
          })
          .catch(console.error);
      }
    }
  }, [initialMovies]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      mainApi
        .tokenCheck(token)
        .then((response) => {
          if (response) {
            setCurrentUser({ name: response.name, email: response.email });
            setIsAuthorized(true);
            localStorage.setItem("isAuth", true);
            setUserId(response.id);
            navigate("/movies");
          }
        })
        .catch((error) => {
          console.log(error);
          setIsAuthorized(false);
          localStorage.removeItem("isAuth");
          navigate("/");
        });
    }
    console.log(isAuthorized);
  }, [isAuthorized]);

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            path="/signin"
            element={
              isAuthorized ? (
                <Navigate to="/movies" replace />
              ) : (
                <Login
                  onSubmit={handleLogin}
                  onInput={checkValidity}
                  setIsSubmitAvailable={setIsSubmitAvailable}
                  values={values}
                  handleChange={handleChange}
                  setValues={setValues}
                  setAuthApiErrorText={setAuthApiErrorText}
                  authApiErrorText={authApiErrorText}
                  isSubmitAvailable={isSubmitAvailable}
                />
              )
            }
          />
          <Route
            path="/signup"
            element={
              isAuthorized ? (
                <Navigate to="/movies" replace />
              ) : (
                <Register
                  onSubmit={handleRegister}
                  onInput={checkValidity}
                  values={values}
                  setIsSubmitAvailable={setIsSubmitAvailable}
                  handleChange={handleChange}
                  setValues={setValues}
                  setAuthApiErrorText={setAuthApiErrorText}
                  authApiErrorText={authApiErrorText}
                  isSubmitAvailable={isSubmitAvailable}
                />
              )
            }
          />
          <Route
            path="/"
            element={
              <Main
                isThemeBlue="true"
                onOpenClick={handlePopupOpen}
                onCloseClick={handlePopupClose}
                isPopupVisible={popupVisibility}
                isAuthorized={isAuthorized}
              />
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRouteElement
                component={Movies}
                isAuthorized={isAuthorized}
                movies={movies.filter(filterState).filter(nameFilter)}
                onOpenClick={handlePopupOpen}
                searchQuery={searchQuery}
                onSearchInputChange={handleSearchInputChange}
                buttonState={buttonState}
                onCheckboxClick={handleCheckboxClick}
                searchFormErrorText={searchFormErrorText}
                handleSearchSubmit={handleSearchSubmit}
                onClickSave={handleClickSave}
                onClickDelete={handleClickDelete}
                resultError={resultError}
                isPopupVisible={popupVisibility}
                onCloseClick={handlePopupClose}
                isLoading={isLoading}
                isBeforeSearching={isBeforeSearching}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRouteElement
                component={SavedMovies}
                isAuthorized={isAuthorized}
                movies={movies.filter(filterStateSM).filter(nameFilterSM)}
                onOpenClick={handlePopupOpen}
                searchQuery={searchQuerySM}
                onSearchInputChange={handleSearchInputChange}
                buttonState={buttonStateSM}
                onCheckboxClick={handleCheckboxClick}
                searchFormErrorText={searchFormErrorText}
                handleSearchSubmit={handleSearchSubmit}
                onClickSave={handleClickSave}
                onClickDelete={handleClickDelete}
                resultError={resultError}
                isPopupVisible={popupVisibility}
                onCloseClick={handlePopupClose}
                isLoading={isLoading}
                isBeforeSearching={isBeforeSearching}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRouteElement
                component={Profile}
                isInfoTooltipVisible={isInfoTooltipVisible}
                setIsInfoTooltipVisible={setIsInfoTooltipVisible}
                setFormAvailability={setFormAvailability}
                setIsSubmitAvailable={setIsSubmitAvailable}
                isSubmitAvailable={isSubmitAvailable}
                authApiErrorText={authApiErrorText}
                formAvailability={formAvailability}
                onEditClick={handleEditClick}
                onExitClick={handleLogOut}
                onSubmit={handleEditProfile}
                onInput={checkValidity}
                onOpenClick={handlePopupOpen}
                onCloseClick={handlePopupClose}
                isPopupVisible={popupVisibility}
                isAuthorized={isAuthorized}
              />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
