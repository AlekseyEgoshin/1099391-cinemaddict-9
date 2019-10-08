import {Position, render, Key, unrender} from '../utils';
import {FilmCard} from '../film-card';
import {API} from "../api";
import {FilmPopupController} from "./film-popup";

const AUTHORIZATION = `Basic ${Math.random().toString(36).slice(2)}`;
const END_POINT = `https://htmlacademy-es-9.appspot.com/cinemaddict/`;

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

export class MovieController {
  constructor(container, filmData, onChangeView, onDataChange) {
    this._container = container;
    this._siteBody = document.querySelector(`.body`);
    this._film = filmData;
    this._filmComments = [];
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this._filmView = new FilmCard(this._film);
    this._filmPopupController = {};

    this.init();
  }

  init() {
    const onFilmCardClick = () => {
      if (this._siteBody.classList.contains(`hide-overflow`)) {
        this._siteBody.classList.add(`hide-overflow`);
      }

      api.getComments(this._film.id).then((comment) => {
        this._filmComments = comment;

        this._filmPopupController = new FilmPopupController(this._siteBody, this._film, this._filmComments, this._onDataChange);
      });
    };

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
    this._filmPopupController.updateComments(commentData);
  }
}
