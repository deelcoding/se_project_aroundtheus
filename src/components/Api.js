export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _request(endpoint, { method, body }) {
    return fetch(`${this._baseUrl}${endpoint}`, {
      headers: this._headers,
      method: method,
      body: body,
    }).then((res) => this._checkResponse(res));
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject("Error: `${res.status}`");
  }

  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  // getInitialCards() {
  //   return fetch(`${this._baseUrl}/cards`, {
  //     headers: this._headers      
  //   })
  //     .then(res => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //       // if the server returns an error, reject the promise
  //       return Promise.reject(`Error: ${res.status}`);
  //     });
  // }

/**************************************************************************
 *                           GET INITIAL CARDS                            *
 **************************************************************************/
  getInitialCards() {
    return this._request(`/cards`, {});
  }


/**************************************************************************
 *                             GET USER INFO                              *
 **************************************************************************/
  getUserInfo() {
    return this._request(`/users/me`, {
      "about": "about",
      "avatar": "avatar",
      "name": "name",
      "_id": "9ad20f72db0274ca5ee20ecb"
      // "_id": "7201f736b481bff4a161c4a9"
    });
  }


/**************************************************************************
 *                             SET USER INFO                              *
 **************************************************************************/
  setUserInfo({ name, about }) {
    return this._request(`/users/me`, {
      method: "PATCH",
      body: JSON.stringify({
        name: name, 
        about: about
      }),
    });
  }


/**************************************************************************
 *                               SET AVATAR                               *
 **************************************************************************/
  setUserAvatar(avatarUrl) {
    return this._request(`/users/me/avatar`, {
      method: "PATCH",
      body: JSON.stringify({ avatar: avatarUrl}),
    });
  }


/**************************************************************************
 *                              UPLOAD CARD                               *
 **************************************************************************/
  uploadCard({ name, link }) {
    return this._request(`/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }


/**************************************************************************
 *                              DELETE CARD                               *
 **************************************************************************/

  // deleteCard(id) {
  //   return this._request(`/cards/${id}`, {
  //     method: "DELETE",
  //   });
  // }


/**************************************************************************
 *                       ADDING AND REMOVING LIKES                        *
 **************************************************************************/
  // likeCard(cardId) {
  //   return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
  //     headers: this._headers,
  //     method: "PUT",
  //   }).then(this._handleResponse);
  // }

  // dislikeCard(cardId) {
  //   return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
  //     headers: this._headers,
  //     method: "DELETE",
  //   }).then(this._handleResponse);
  // }

}