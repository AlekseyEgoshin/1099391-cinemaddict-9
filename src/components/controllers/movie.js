import {Position, render} from '../utils';
import {FilmCard} from '../film-card';
import {FilmPopupController} from './film-popup';

export class MovieController {
  constructor(container, filmData, onChangeView, onDataChange, api) {
    this._container = container;
    this._siteBody = document.querySelector(`.body`);
    this._film = filmData;
    this._api = api;
    this._filmComments = [];
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this._filmView = new FilmCard(this._film);
    this._filmPopupController = {};

    this._init();
  }

  _init() {
    const onFilmCardClick = () => {
      if (this._siteBody.classList.contains(`hide-overflow`)) {
        this._siteBody.classList.add(`hide-overflow`);
      }

      this._api.getComments(this._film.id).then((comment) => {
        this._filmComments = comment;
        this._filmPopupController = new FilmPopupController(this._siteBody, this._film, this._filmComments, this._onDataChange);
        this._filmPopupController.setComments(this._filmComments);
      });
    };
    this._filmPopupController = new FilmPopupController(this._siteBody, this._film, null, this._onDataChange);

    // Event listener to change film to FilmPopup
    // Первый обработчик - при клике на колличество комментариев
    this._filmView.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, onFilmCardClick);
    // Второй обработчик - при клике на постер
    this._filmView.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, onFilmCardClick);
    // Третий обработчик - при клике название
    this._filmView.getElement().querySelector(`.film-card__title`).addEventListener(`click`, onFilmCardClick);

    render(this._container, this._filmView.getElement(), Position.BEFOREEND);
  }

  setDefaultView() {

  }

  updateComments(commentData) {
    this._filmPopupController.updateComment(commentData);
  }
}
