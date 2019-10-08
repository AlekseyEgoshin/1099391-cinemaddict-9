import {MovieController} from './movie';

export class FilmListController {
  constructor(container, onDataChange, onChangeView, api) {
    this._container = container;

    this._subscriptions = [];
    this._films = [];
    this._api = api;

    this._onChangeView = onChangeView;
    this._onDataChange = onDataChange;
  }

  _renderCard(filmMock) {
    const movieController = new MovieController(this._container, filmMock, this._onChangeView, this._onDataChange, this._api);
    this._subscriptions.push(movieController.setDefaultView.bind(movieController));
  }

  setFilms(films) {
    this._films = films;
    this._subscriptions = [];

    this._container .innerHTML = ``;
    this._films.forEach((film) => this._renderCard(film, this._container));
  }

  getFilms() {
    return this._films;
  }

  _renderFilm(film) {
    const filmContoller = new MovieController(this._container, film, this._onChangeView, this._onDataChange, this._api);
    this._subscriptions.push(filmContoller.setDefaultView.bind(filmContoller));
  }
}
