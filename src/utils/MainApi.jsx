class MainApi {
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

    getProfile(token) {
        return fetch(`${this._url}/users/me`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token}`
            },
        }).then(this._getResponse);
    }

    getMovies(token) {
        return fetch(`${this._url}/movies`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token}`
            },
        }).then(this._getResponse);
    }

    updateProfile(data, token) {
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token}`
            },
            body: JSON.stringify(data),
        }).then(this._getResponse);
    }

    deleteMovie(id, token) {
        return fetch(`${this._url}/movies/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token}`
            },
        }).then(this._getResponse);
    }

    saveMovie(data, token) {
        return fetch(`${this._url}/movies`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token}`
            },
            body: JSON.stringify(data),
        }).then(this._getResponse);
    }

    register(name, email, password) {
        return fetch(`${this._url}/signup`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify({name, email, password}),
        }).then(this._getResponse);
    };
      
    authorize(email, password) {
        return fetch(`${this._url}/signin`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify({password, email}),
        }).then(this._getResponse);
    };
      
    tokenCheck(token) {
        return fetch(`${this._url}/users/me`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
          },
        }).then(this._getResponse);
    }
}

export const mainApi = new MainApi({
    url: "https://api.buyavykh-diploma.nomoredomainsmonster.ru",
    headers: {
        "Content-Type": "application/json"
    }
});