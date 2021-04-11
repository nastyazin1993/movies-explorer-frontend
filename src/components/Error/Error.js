import React from "react";
import "./Error.css";
import { useHistory } from "react-router";

function Error({ status = 404, message = "Страница не найдена" }) {

  const history = useHistory();

  return (
    <div className="error">
      <div className="error__container">
        <p className="error__status">{status}</p>
        <p className="error__message">{message}</p>
      </div>
      <button className="error__back" onClick={history.goBack}>Назад</button>
    </div>
  );
}

export default Error;