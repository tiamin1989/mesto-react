class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.token = options.headers.authorization;
  }
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: this.token
      }
    })
      .then(res => {
        if (res.ok) return res.json();
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        alert(err);
      });
  }
  getPersonData() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: this.token
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        alert(err);
      });
  }
  savePersonData({ name, about }) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(res => {
        if (!res.ok) return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        alert(err);
      });
  }
  saveCardData({ name, link }) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => {
        if (!res.ok) return Promise.reject(`Ошибка: ${res.status}`);
        return res.json();
      })
      .catch((err) => {
        alert(err);
      });
  }
  deleteCardData(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      }
    })
      .catch((err) => {
        alert(err);
      });
  }
  likeCard(cardId, isLiked) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) return Promise.reject(`Ошибка: ${res.status}`);
        return res.json();
      })
      .catch((err) => {
        alert(err);
      });
  }
  changeAvatar({ avatar }) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(res => {
        if (!res.ok) return Promise.reject(`Ошибка: ${res.status}`);
        return res.json();
      })
      .catch((err) => {
        alert(err);
      });
  }
}

export default Api;
