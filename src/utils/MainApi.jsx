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
    }
  }

  getMovies(token) {
    return fetch(`${this._url}/movies`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(this._getResponse);
  }

  getUsers(token) {
    return fetch(`${this._url}/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(this._getResponse);
  }

  updateProfile(data, token, id) {
    return fetch(`${this._url}/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }).then(this._getResponse);
  }

  deleteMovie(id, token) {
    return fetch(`${this._url}/movies/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  saveMovie(data, token) {
    return fetch(`${this._url}/movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }).then(this._getResponse);
  }

  register(name, email, password) {
    return fetch(`${this._url}/register`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, email, password }),
    }).then(this._getResponse);
  }

  authorize(email, password) {
    return fetch(`${this._url}/auth`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ password, email }),
    }).then(this._getResponse);
  }

  tokenCheck(token) {
    return fetch(`${this._url}/auth_me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(this._getResponse);
  }
}

export const mainApi = new MainApi({
  url: "https://9e122dc894a5458f.mokky.dev",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
