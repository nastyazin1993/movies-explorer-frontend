import React from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Register from "../Register/Register";
import Login from "../Login/Login";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import * as auth from "../../utils/auth";
import * as mainApi from "../../utils/MainApi";
import { Route, Switch, useHistory } from "react-router-dom";
import "./App.css";
import Error from "../Error/Error";
import Preloader from "../Preloader/Preloader";
import * as moviesApi from "../../utils/MoviesApi";

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

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      return;
    }
    if (jwt) {
      auth
        .getContent(jwt)
        .then((data) => {
          setIsLoading(true);
          setCurrentUser(data);
          setLoggedIn(true);
          setIsLoading(false);
          history.push("/movies");
        })
        .catch(({ status, message }) => {
          setIsLoading(false);
          setError({ status, message });
          history.push("/error");
        });
        if (localStorage.getItem("allMovies")) {
          setMoviesCards(JSON.parse(localStorage.getItem("allMovies")));
        }
    }
  }, [history, loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      setIsLoading(true);
      mainApi
        .getMoviesCardList()
        .then((data) => {
          setUsersMoviesCards(data);
        })
        .catch(({ status, message }) => {
          setIsLoading(false);
          setError({ status, message });
          history.push("/error");
        });
    }
    if (localStorage.getItem("allMovies")) {
      setMoviesCards(JSON.parse(localStorage.getItem("allMovies")));
    }
  }, [history, loggedIn, like]);

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
        console.log({ status, message })
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
        setIsOk(true)
        setTimeout(
          () => {
            setIsOk(false)
          },
          5 * 1000
        );

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
            image,
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
    setFilters((prev) => {
     
      handleFilterAllMovies({ ...prev, [key]: value });
      return { ...prev, [key]: value };

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
    console.log(movie)
    mainApi
      .changeLikeCardStatus(movie)
      .then((data) => {
        
        if (data) {
          setUsersMoviesCards(prev => ([...prev, data]));
          setLike(like + 1)
        }
      })
      .catch((err) => console.log(err));
  }

  const handleDeleteMovieCard = (movieId) => {
    const id = usersMoviesCards.find(item => item.movieId === movieId)._id;
    setIsLoading(true);
    mainApi.deleteMovies(id)
      .then(() => {
        setUsersMoviesCards(prev => prev.filter(item => item._id !== id));
      })
      .catch(({ status, message }) => {
          setError({ status, message });
          history.push("/error");
        },
      )
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
          <Route path="/signup">
            <Register onRegister={handleRegister} />
          </Route>
          <Route path="/signin">
            <Login onLogin={handleLogin} />
          </Route>
          
        </Switch>

        <Main
          loggedIn={loggedIn}
          outAccount={outAccount}
          moviesCards={moviesCards}
          isOk={isOk}
          cards={getFilteredMovies(usersMoviesCards, filters)}
          onChangeFilters={handleChangeFilters}
          onUpdateUser={handleUpdateUser}
          cardLikeButton={handleCardLikeButton}
          cardDelete={handleDeleteMovieCard}
          usersMoviesCards={usersMoviesCards}
        />

        {isLoading ? <Preloader /> : ""}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
