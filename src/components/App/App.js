import React from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Register from "../Register/Register";
import Login from "../Login/Login";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import * as auth from "../../utils/auth";
import * as mainApi from "../../utils/MainApi";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import "./App.css";
import Error from "../Error/Error";
import Preloader from "../Preloader/Preloader";
import * as moviesApi from "../../utils/MoviesApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";

function App() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isOk, setIsOk] = React.useState(false);
  const [like, setLike] = React.useState(0);
  const [moviesCards, setMoviesCards] = React.useState([]);
  const [usersMoviesCards, setUsersMoviesCards] = React.useState([]);
  const [filters, setFilters] = React.useState({});
  const [error, setError] = React.useState({});
  const location = useLocation();

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      return;
    }
    if (jwt) {
      setIsLoading(true);
      Promise.all([auth.getContent(jwt), mainApi.getMoviesCardList(jwt)])
        .then(([res, data]) => {
          setLoggedIn(true);
          setCurrentUser(res);
          setUsersMoviesCards(data);
          if (JSON.parse(localStorage.getItem("searchMovies")) !== null) {
            const arrMoviesCards = JSON.parse(
              localStorage.getItem("searchMovies")
            );
            setMoviesCards(arrMoviesCards);
          }
          setIsLoading(false);
          history.push(location.pathname);
        })
        .catch(({ status, message }) => {
          setIsLoading(false);
          setError({ status, message });
          history.push("/error");
        });
    }
  }, [like, history]);

  function handleRegister(password, email, name) {
    setIsLoading(true);
    auth
      .register(escape(password), email, name)
      .then(() => {
        setIsLoading(false);
        history.push("/signin");
      })
      .catch(({ status, message }) => {
        setIsLoading(false);
        console.log({ status, message });
        setError({ status, message });
        history.push("/error");
      });
  }

  function handleLogin(password, email) {
    setIsLoading(true);
    auth
      .authorize(escape(password), email)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setLoggedIn(true);
        setIsLoading(false);
        history.push("/movies");
      })
      .catch(({ status, message }) => {
        setError({ status, message });
        setIsLoading(false);
        history.push("/error");
      });
  }

  function handleUpdateUser(res) {
    setIsLoading(true);
    mainApi
      .patchUserInfo(res)
      .then((res) => {
        setCurrentUser(res.data);
        setIsLoading(false);
        setIsOk(true);
        setTimeout(() => {
          setIsOk(false);
        }, 5 * 1000);
      })
      .catch(({ status, message }) => {
        setError({ status, message });
        setIsLoading(false);
        history.push("/error");
      });
  }

  function outAccount() {
    setIsLoading(true);
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    setIsLoading(false);
    history.push("/");
  }

  function getAllMovies() {
    setIsLoading(true);
    moviesApi
      .getMoviesCardList()
      .then((data) => {
        const allMovies = data.map(
          ({
            country,
            director,
            duration,
            year,
            description,
            image,
            trailerLink,
            id,
            nameRU,
            nameEN,
          }) => ({
            country,
            director,
            duration,
            year,
            description,
            image: image,
            trailerLink: trailerLink,
            nameRU,
            nameEN,
            thumbnail: image,
            movieId: id,
          })
        );

        localStorage.setItem("allMovies", JSON.stringify(allMovies));
        handleFilterAllMovies();
      })
      .catch(({ status, message }) => {
        setError({ status, message });
        setIsLoading(false);
        history.push("/error");
      });
  }

  const handleChangeFilters = ({ key, value }) => {
    setFilters(() => {
      handleFilterAllMovies({ ...usersMoviesCards, [key]: value });
      return { ...usersMoviesCards, [key]: value };
    });
  };

  const handleFilterAllMovies = (filters) => {
    if (localStorage.getItem("allMovies")) {
      setIsLoading(true);
      const filteredMovies =
        getFilteredMovies(
          JSON.parse(localStorage.getItem("allMovies")),
          filters
        ) || [];
      setMoviesCards(filteredMovies);
      localStorage.setItem("searchMovies", JSON.stringify(filteredMovies));
      setIsLoading(false);
    } else {
      getAllMovies("");
    }
  };

  const getFilteredMovies = (movies, { text = "", short = false }) => {
    return movies.filter((item) => {
      if (short && item.duration > 40) {
        return false;
      }
      for (let key in item) {
        if (
          item.hasOwnProperty(key) &&
          typeof item[key] === "string" &&
          item[key].toLowerCase().includes(text.toLowerCase())
        ) {
          return true;
        }
      }
      return false;
    });
  };

  const handleCardLikeButton = (movie) => {
    mainApi
      .changeLikeCardStatus(movie)
      .then((data) => {
        if (data) {
          setUsersMoviesCards([...usersMoviesCards, data]);
          setLike(like + 1);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteMovieCard = (movieId) => {
    const id = usersMoviesCards.find((item) => item.movieId === movieId)._id;
    setIsLoading(true);
    mainApi
      .deleteMovies(id)
      .then(() => {
        setUsersMoviesCards(usersMoviesCards.filter((item) => item._id !== id));
      })
      .catch(({ status, message }) => {
        setError({ status, message });
        history.push("/error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header loggedIn={loggedIn} />
        <Switch>
          <Route path="/error">
            <Error message={error.message} status={error.status} />
          </Route>
          <Route exact path="/">
            <Main />
          </Route>
          <ProtectedRoute
            path="/signup"
            loggedIn={!loggedIn}
            component={Register}
            onRegister={handleRegister}
          />
          <ProtectedRoute
            path="/signin"
            loggedIn={!loggedIn}
            component={Login}
            onLogin={handleLogin}
          />
        </Switch>
        <Switch>
          <ProtectedRoute
            path="/movies"
            component={Movies}
            loggedIn={loggedIn}
            initialCards={moviesCards}
            onChangeFilters={handleChangeFilters}
            cardLikeButton={handleCardLikeButton}
            usersMoviesCards={usersMoviesCards}
            cardDelete={handleDeleteMovieCard}
          />
          <ProtectedRoute
            path="/saved-movies"
            component={Movies}
            loggedIn={loggedIn}
            initialCards={getFilteredMovies(usersMoviesCards, filters)}
            cardDelete={handleDeleteMovieCard}
            onChangeFilters={handleChangeFilters}
            usersMoviesCards={usersMoviesCards}
          />
          <ProtectedRoute
            path="/profile"
            component={Profile}
            loggedIn={loggedIn}
            onOut={outAccount}
            onUpdateUser={handleUpdateUser}
            isOk={isOk}
          />
        </Switch>

        {isLoading ? <Preloader /> : ""}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
