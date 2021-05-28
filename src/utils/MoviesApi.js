const BASE__URL = 'https://api.nomoreparties.co/beatfilm-movies';

export const getMoviesCardList = (filmReq) => {
  return fetch(`${BASE__URL}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject({status: res.status, message: 'Что-то пошло не так'});
  })
  .then((data) => {
    data.map((card) => {
      if (card.image) {
        card.image.url = "https://api.nomoreparties.co" + card.image.url;
      } else {
        card.image = {url: ""};
      }
      return card
    })
    return data
  })
};
