import {ModelFilm} from './model-film';

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const toJSON = (response) => {
  return response.json();
};

export const API = class {
  constructor({endPoint, authorization}) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getFilms() {
    return this._load({url: `movies`}).then(toJSON).then(ModelFilm.parseFilms);
  }

  updateFilm({id, data}) {
    return this._load({
      url: `movies/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': `application/json`})
    }).then(toJSON).then(ModelFilm.parseFilm);
  }

  getComments(filmId) {
    return this._load({url: `comments/${filmId}`}).then(toJSON).then(ModelFilm.parseComments);
  }

  createComment(filmId, newComment, comment) {
    return this._load({
      url: `comments/${filmId}`,
      method: Method.POST,
      body: JSON.stringify(comment),
      headers: new Headers({'Content-Type': `application/json`})
    }).then(toJSON).then(ModelFilm.parseFilm);
  }

  deleteComment(filmId, commentId) {
    return this._load({
      url: `comments/${commentId}`,
      method: Method.DELETE,
      body: JSON.stringify(commentId),
      headers: new Headers({'Content-Type': `application/json`})
    }).then(toJSON);
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
};
