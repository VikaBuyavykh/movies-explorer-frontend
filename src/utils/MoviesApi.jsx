class MoviesApi {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
    }

    _getResponse(response) {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(`Ошибка: ${response.status}`);
        };
    }

    getCards() {
        return fetch(this._url, {
            headers: this._headers,
        }).then(this._getResponse);
    }
}

const moviesApi = new MoviesApi({
    url: "https://api.nomoreparties.co/beatfilm-movies",
    headers:{
      "Content-Type": "application/json"
    }
  });

export default moviesApi;