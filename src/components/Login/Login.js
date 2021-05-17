import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const useValidation = (value, validations) => {
  const [isEmpty, setEmpty] = useState(true);
  const [minlengthError, setMinlengthError] = useState(false);
  const [maxlengthError, setMaxlengthError] = useState(false);
  const [isEmail, setEmail] = useState(false);
  const [inputValid, setInputValid] = useState(false);

  useEffect(() => {
    for (const validation in validations) {
      // eslint-disable-next-line default-case
      switch (validation) {
        case "minlengthError":
          value.length < validations[validation]
            ? setMinlengthError(true)
            : setMinlengthError(false);
          break;

        case "maxlengthError":
          value.length > validations[validation]
            ? setMaxlengthError(true)
            : setMaxlengthError(false);
          break;

        case "isEmpty":
          value ? setEmpty(false) : setEmpty(true);
          break;

        case "isEmail":
          const re = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
          re.test(String(value).toLowerCase())
            ? setEmail(false)
            : setEmail(true);
          break;
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (isEmpty || isEmail || maxlengthError || minlengthError) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, isEmail, maxlengthError, minlengthError]);
  return { isEmpty, minlengthError, isEmail, maxlengthError, inputValid };
};

const useInput = (initialValue, validations) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setDirty] = useState(false);
  const valid = useValidation(value, validations);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onBlur = (e) => {
    setDirty(true);
  };

  return {
    value,
    onChange,
    onBlur,
    isDirty,
    ...valid,
  };
};

function Login({ onLogin }) {
  const email = useInput("", { isEmpty: true, isEmail: true });
  const password = useInput("", {
    isEmpty: true,
    minlengthError: 8,
    maxlengthError: 30,
  });
 
  const handleSubmit = (e) => {
    e.preventDefault();

    onLogin(password.value, email.value);
  };

  return (
    <div className="form">
      <div className="form__container">
      <Link to="/"> <div className="form__logo"></div></Link>
        <h2 className="form__title">Рады видеть!</h2>
        <form onSubmit={handleSubmit} className="form__inputs">
         <label htmlFor="email" className="form__label">
            {" "}
            E-mail
            <input
              id="email"
              name="email"
              type="email"
              value={email.value}
              onChange={(e) => email.onChange(e)}
              onBlur={(e) => email.onBlur(e)}
              placeholder="Email"
              className="form__input form__name form__name_theme_dark"
            />
            {email.isDirty && email.isEmpty && (
              <div className="form__input-error" id="input-email-error">
                Поле не может быть пустым
              </div>
            )}
            {email.isDirty && email.isEmail && (
              <div className="form__input-error" id="input-name-error">
                Email не валиден
              </div>
            )}
          </label>
          <label htmlFor="password" className="form__label">
            {" "}
            Пароль{" "}
          </label>
          <input
            id="password"
            name="password"
            type="password"
            minLength="8"
            maxLength="30"
            value={password.value}
            onChange={(e) => password.onChange(e)}
            onBlur={(e) => password.onBlur(e)}
            placeholder="Пароль"
            className="form__input form__name form__name_theme_dark"
          />
          {password.isDirty && password.isEmpty && (
            <div className="form__input-error" id="input-name-error">
              Поле не может быть пустым
            </div>
          )}
          {password.isDirty && password.minlengthError && (
            <div className="form__input-error" id="input-name-error">
              Пароль должен быть не меньше 8 символов
            </div>
          )}
          {password.isDirty && password.maxlengthError && (
            <div className="form__input-error" id="input-name-error">
              Пароль должен быть не больше 30 символов
            </div>
          )}

          <div className="form__button-container">
            <button
              type="submit"
              className="form__save-button form__save-button_theme_dark"
              disabled={
                !email.inputValid || !password.inputValid
              }
            >
              Войти
            </button>
          </div>
        </form>
        <div className="form__signin">
          <p className="form__subtitle">
            Еще не зарегистрированы?
            <Link to="signup" className="form__login-link">
              Регистрация
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
