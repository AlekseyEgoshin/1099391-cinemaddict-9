import {MovieController} from './movie';

export class FilmListController {
  constructor(container, onDataChange, onChangeView) {
    this._container = container;

    this._subscriptions = [];
    this._films = [];

    this._onChangeView = onDataChange;
    this._onDataChange = onChangeView;
  }

  _renderCard(filmMock) {
    const movieController = new MovieController(this._container, filmMock, this._onChangeView, this._onDataChange);
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

  addComment(films) {
    films.forEach((task) => this._renderTask(task));
    this._films = this._films.concat(films);
  }

  _renderFilm(film) {
    const filmContoller = new MovieController(this._container, film, this._onChangeView, this._onDataChange);
    this._subscriptions.push(filmContoller.setDefaultView.bind(filmContoller));
  }
}
