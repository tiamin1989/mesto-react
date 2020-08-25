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
  /*   likeCard(user, card) {
      const myLike = card._likes.find((currentUser, index, array) => {
        if (currentUser._id === user._id) array.splice(index, 1);
        return currentUser._id === user._id;
      });
      if (!myLike) card._likes.push(user);
      return fetch(`${this.baseUrl}/cards/likes/${card._id}`, {
        method: myLike ? 'DELETE' : 'PUT',
        headers: {
          authorization: this.token,
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          if (!res.ok) return Promise.reject(`Ошибка: ${res.status}`);
          res.json()
            .then(res => {
              card._card.querySelector('.photo-grid__like-count').textContent = res.likes.length;
              card.likeCard();
            });
        })
        .catch((err) => {
          alert(err);
        });
    } */
  changeAvatar({ url }) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: url
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
