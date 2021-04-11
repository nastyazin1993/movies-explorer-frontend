import React from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Register from "../Register/Register";
import Login from "../Login/Login";
import * as auth from "../../utils/auth";
import { Route, Switch, useHistory } from "react-router-dom";
import "./App.css";
import Error from "../Error/Error";
import Preloader from "../Preloader/Preloader";

function App() {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (!loggedIn) {
      // history.push("/");
      // Promise.all([api.getUserInfo(), api.getInitialCards()])
      //   .then(([res, data]) => {
      //      setCurrentUser(res);
      //     setCards(data);
      //     history.push("/");
      //   })
      //   .catch((err) => console.log(err));
    }
  }, [history, loggedIn]);

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      return;
    }
    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          setLoggedIn(true);
          // setEmail(res.email);
          // history.push("/");
        })
        .catch((err) => console.log(err));
    }
  }, [history, loggedIn]);

  function handleRegister(password, email, name) {
    // cleanCodeStatusInfo();
    setIsLoading(true);
    auth
      .register(escape(password), email, name)

      .then((res) => {
        // setCodeStatusInfo({
        //   iconStatus: okIcon,
        //   text: "Вы успешно зарегистрировались!",
        // });
        setIsLoading(false);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        <Error/>
        // setCodeStatusInfo({
        //   iconStatus: errIcon,
        //   text: "Что-то пошло не так! Попробуйте еще раз.",
        // });
      });
    // setInfoTooltipOpen(true);
  }

  function handleLogin(password, email) {
    // cleanCodeStatusInfo();
    setIsLoading(true);
    auth
      .authorize(escape(password), email)
      .then((data) => {
        localStorage.setItem("jwt", data.token);

        setLoggedIn(true);
        setIsLoading(false);
        history.push("/");
        // setInfoTooltipOpen(false);
      })

      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        <Error/>
        // setCodeStatusInfo({
        //   iconStatus: errIcon,
        //   text: "Что-то пошло не так! Попробуйте еще раз.",
        // });
      });

    // setInfoTooltipOpen(true);
  }
  function outAccount(){
    setIsLoading(true);
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    
    history.push("/");
    setIsLoading(false);
  }

  return (
    <div className="App">
      <Header loggedIn={loggedIn} />
      <Switch>
        <Route path="/error">
          <Error />
        </Route>
        <Route path="/signup">
          <Register onRegister={handleRegister} />
        </Route>
        <Route path="/signin">
          <Login onLogin={handleLogin} />
        </Route>
        
      </Switch>
      
      <Main /*loggedIn={loggedIn} */outAccount={outAccount} />
      {isLoading ? <Preloader/> : ''}
    </div>
  );
}

export default App;
