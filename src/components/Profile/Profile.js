import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import "./Profile.css";

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
          const re =
            /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
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

function Profile({ onOut, onUpdateUser, isOk }) {
  const currentUser = React.useContext(CurrentUserContext);
  const email = useInput(currentUser.email, { isEmpty: true, isEmail: true });
  const name = useInput(currentUser.name, {
    isEmpty: true,
    minlengthError: 2,
    maxlengthError: 40,
  });

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name.value,
      email: email.value,
    });
  }

  return (
    <div className="profile">
      <div className="profile__container">
        <h2 className="profile__title">Привет, {currentUser.name}!</h2>
        <form className="profile__inputs" onSubmit={handleSubmit}>
          <label htmlFor="name" className="profile__label">
            Имя
            <input
              id="name"
              name="name"
              type="text"
              minLength="2"
              maxLength="40"
              value={name.value || ""}
              onChange={(e) => name.onChange(e)}
              onBlur={(e) => name.onBlur(e)}
              placeholder="Имя"
              className="profile__input"
            />
          </label>

          <label htmlFor="email" className="profile__label">
            E-mail
            <input
              id="email"
              name="email"
              type="email"
              value={email.value || ""}
              onChange={(e) => email.onChange(e)}
              onBlur={(e) => email.onBlur(e)}
              placeholder="Email"
              className="profile__input"
            />
          </label>
          {name.isDirty && name.isEmpty && (
            <div className="form__input-error" id="input-name-error">
              Поле не может быть пустым
            </div>
          )}
          {name.isDirty && name.minlengthError && (
            <div className="form__input-error" id="input-name-error">
              Имя должно быть не меньше 2 символов
            </div>
          )}
          {name.isDirty && name.maxlengthError && (
            <div className="form__input-error" id="input-name-error">
              Имя может быть не больше 40 символов
            </div>
          )}
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
          {isOk ? (
            <>
              <div className="form__input-isOk">Данные сохранены</div>
            </>
          ) : (
            ""
          )}
          <div className="profile__button-container">
            <button
              type="submit"
              className="profile__edit-button"
              disabled={!name.inputValid || !email.inputValid}
            >
              Редактировать
            </button>
          </div>
        </form>
        <div className="profile__signout">
          <p className="profile__subtitle">
            <Link to="/" className="profile__out-link" onClick={onOut}>
              Выйти из аккаунта
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;

// import React from "react";
// import { Link } from "react-router-dom";
// import CurrentUserContext from '../../contexts/CurrentUserContext.js';
// import "./Profile.css";

// function Profile({onOut, onUpdateUser}) {
//   const currentUser = React.useContext(CurrentUserContext);
//   const [name, setName] = React.useState(currentUser.name);
//     const [email, setEmail] = React.useState(currentUser.email);
//     React.useEffect(() => {
//         setName(currentUser.name);
//         setEmail(currentUser.email);
//     }, [currentUser]);

//     function handleChangeName(e) {
//       setName(e.target.value);
//     }

//     function handleChangeEmail(e) {
//       setEmail(e.target.value);
//     }

//     function handleSubmit(e) {
//       e.preventDefault();
//       onUpdateUser({
//         name,
//         email: email,
//       });
//     }

//   return (
//     <div className="profile">
//       <div className="profile__container">
//         <h2 className="profile__title">Привет, {currentUser.name}!</h2>
//         <form className="profile__inputs" onSubmit={handleSubmit}>
//           <label htmlFor="name" className="profile__label">
//             Имя
//             <input
//               id="name"
//               name="name"
//               type="text"
//               minLength="2"
//               maxLength="30"
//               value={name || ''}
//               onChange={handleChangeName}
//               placeholder="Имя"
//               className="profile__input"
//             />
//           </label>

//           <label htmlFor="email" className="profile__label">
//             E-mail
//             <input
//               id="email"
//               name="email"
//               type="email"
//               value={email || ''}
//               onChange={handleChangeEmail}
//               placeholder="Email"
//               className="profile__input"
//             />
//           </label>

//           <div className="profile__button-container">
//             <button type="submit" className="profile__edit-button" >
//               Редактировать
//             </button>
//           </div>
//         </form>
//         <div className="profile__signout">
//           <p className="profile__subtitle">
//             <Link to="/" className="profile__out-link" onClick={onOut}>
//               Выйти из аккаунта
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Profile;
