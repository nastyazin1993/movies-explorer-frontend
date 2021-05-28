const BASE__URL = "https://api.nastyazin.students.nomoredomains.rocks/";

export const getMoviesCardList = (token) => {
  return fetch(`${BASE__URL}movies`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject({
      status: res.status,
      message: "Что-то пошло не так",
    });
  });
};

export const patchUserInfo = (res) => {
  return fetch(`${BASE__URL}users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify(res),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject({
      status: res.status,
      message: "Что-то пошло не так",
    });
  });
};

export const deleteMovies = (id) => {
  return fetch(`${BASE__URL}movies/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject({
      status: res.status,
      message: "Что-то пошло не так",
    });
  });
};

export const changeLikeCardStatus = ({
  country,
  director,
  duration,
  year,
  description,
  image,
  trailerLink,
  nameRU,
  nameEN,
  thumbnail,
  movieId,
}) => {
  return fetch(`${BASE__URL}movies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject({
      status: res.status,
      message: "Что-то пошло не так",
    });
  });
};
