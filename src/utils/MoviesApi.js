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

// class MoviesApi {
//     constructor(config) {
//       this._url = config.url;
//       this._headers = config.headers;
//     }
  
//     _getResponseData(res){
//       if (res.ok) {
//         return res.json();
//       }
//       return Promise.reject(new Error(`Ошибка: ${res.status} ....`));
//     }
  
  
//     getMoviesCardList(initialCards) {
//       return fetch(`${this._url}beatfilm-movies`, {
//         method: "GET",
//         headers: {...this._headers,
//         // 'authorization': `Bearer ${localStorage.getItem("jwt")}`,
//     } })
//       .then(res => this._getResponseData(res))
//       .then((data) => {
//         data.map((card) => {
//           if (card.image) {
//             card.image.url = "https://api.nomoreparties.co" + card.image.url;
//           } else {
//             card.image = {url: ""};
//           }
//           return card
//         })
//         return data
//       })

//     }
    
//   }
  
//   const moviesApi = new MoviesApi({
//     url: "https://api.nomoreparties.co/",
//     headers: {
//       "Content-Type": "application/json",
//       'authorization': `Bearer ${localStorage.getItem("jwt")}`,
//     },
//     credentials: "include",
//   });
  
//   export default moviesApi;