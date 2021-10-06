const BASE_URL = 'https://api.sanatov.nomoredomains.monster';

function checkResponse(res) {
  if(res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({name, email, password})
  })
    .then(checkResponse);
};

export const authorization = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({email,password})
  })
    .then(checkResponse);
};

export const getToken = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
  })
    .then(checkResponse);
}

export const logout = () => {
  return fetch(`${BASE_URL}/logout`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
  })
    .then(checkResponse);
}

export const getUserInfo = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
  })
    .then(checkResponse);
}

export const updateUser = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
  })
    .then(checkResponse);
}

export const getFilms = () => {
  return fetch(`${BASE_URL}/saved-movies`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
  })
    .then(checkResponse);
}

export const likeMovie = () => {
  return fetch(`${BASE_URL}/:filmId`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'inlude',
  })
    .then(checkResponse);
}

export const deleteMovie = () => {
  return fetch(`${BASE_URL}/:filmId`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'inlude',
  })
    .then(checkResponse);
}