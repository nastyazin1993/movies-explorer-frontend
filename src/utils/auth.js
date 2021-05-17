export const BASE_URL = "https://api.nastyazin.students.nomoredomains.rocks/";

export const register = (password, email, name) =>
  fetch(`${BASE_URL}signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email, name }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(
      new Error({ status: res.status, message: "Что-то пошло не так" })
    );
  });

export const authorize = (password, email) =>
  fetch(`${BASE_URL}signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(
        new Error({ status: res.status, message: "Что-то пошло не так" })
      );
    })
    .then((data) => {
      localStorage.setItem("jwt", data.token);

      return data;
    })
    .catch((err) => {
      console.log(err.message);
    });

export const getContent = (jwt) =>
  fetch(`${BASE_URL}users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${jwt}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(
        new Error(res.status, { message: "Что-то пошло не так" })
      );
    })
    .then((data) => data);
