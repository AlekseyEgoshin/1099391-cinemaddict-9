import {SortingLine} from '../sorting-line';
import {render, Position} from '../utils';
import {FilmPopup} from "../film-popup";
import {FilmCard} from "../film-card";

const Film = {
  DEFAULT: `default`,
  EXTRA: `extra`,
};

export class PageController {
  constructor(container, defaultFilms) {
    this._container = container;
    this._sort = new SortingLine();
    this._defaultFilms = defaultFilms;
  }

  init() {
    render(this._container, this._sort.getElement(), Position.BEFOREEND);
    this._sort.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
  }

  _onSortLinkClick(evt) {
    const checkParametr = (Mocks) => {
      const showMore = document.querySelector(`.films-list__show-more`);
      if (showMore.classList.contains(`visually-hidden`)) {
        Mocks.forEach((taskMock) => this._renderCard(taskMock, 0, Film.DEFAULT));
      } else {
        let i = 0;
        Mocks.forEach((taskMock) => this._renderCard(taskMock, i++, Film.DEFAULT));
      }

      if (currentActiveButton.dataset.sortType !== evt.target.dataset.sortType) {
        currentActiveButton.classList.remove(`sort__button--active`);
        evt.target.classList.add(`sort__button--active`);
      }
    };

    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }

    document.querySelector(`.films-list__container`).innerHTML = ``;
    const currentActiveButton = document.querySelector(`.sort__button--active`);

    switch (evt.target.dataset.sortType) {
      case `date-up`:
        const sortedByDateUpFilms = this._defaultFilms.slice().sort((a, b) => a.movie.release.date - b.movie.release.date);
        checkParametr(sortedByDateUpFilms);
        break;
      case `rating-up`:
        const sortedByRatingUpFilms = this._defaultFilms.slice().sort((a, b) => b.movie.totalRating - a.movie.totalRating);
        checkParametr(sortedByRatingUpFilms);
        break;
      default:
        checkParametr(this._defaultFilms);
        break;
    }
  }

  _renderCard(filmMock, count, place) {
    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        filmListElement.replaceChild(film.getElement(), filmPopup.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const onCloseClick = () => {
      filmListElement.replaceChild(film.getElement(), filmPopup.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    const film = new FilmCard(filmMock);
    const filmPopup = new FilmPopup(filmMock);

    let filmListElement = ``;

    if (place === Film.DEFAULT) {
      const filmList = document.querySelector(`.films-list__container`);
      filmListElement = filmList;

      if (count >= 5) {
        const lastAddedFilm = filmList.lastElementChild;
        lastAddedFilm.classList.add(`visually-hidden`);
      }
    } else if (place === Film.EXTRA) {
      const filmListExtra = document.querySelectorAll(`.films-list--extra`);
      let filmsList;
      if (count <= 1) {
        filmsList = filmListExtra[0].querySelector(`.films-list__container`);
      } else {
        filmsList = filmListExtra[1].querySelector(`.films-list__container`);
      }
      filmListElement = filmsList;
    }

    // Event listener to change film to FilmPopup
    // Первы обработчик - при клике на колличество комментариев
    film.getElement().
    querySelector(`.film-card__comments`)
      .addEventListener(`click`, () => {
        // filmListElement.replaceChild(filmPopup.getElement(), film.getElement());
        document.addEventListener(`keydown`, onEscKeyDown);
        const exit = document.querySelector(`.film-details__close-btn`);
        exit.addEventListener(`click`, onCloseClick);
      });
    // Второй обработчик - при клике на постер
    film.getElement().
    querySelector(`.film-card__poster`)
      .addEventListener(`click`, () => {
        filmListElement.replaceChild(filmPopup.getElement(), film.getElement());
        document.addEventListener(`keydown`, onEscKeyDown);
        const exit = document.querySelector(`.film-details__close-btn`);
        exit.addEventListener(`click`, onCloseClick);
      });
    // Второй обработчик - при клике на постер
    film.getElement().
    querySelector(`.film-card__title`)
      .addEventListener(`click`, () => {
        filmListElement.replaceChild(filmPopup.getElement(), film.getElement());
        document.addEventListener(`keydown`, onEscKeyDown);
        const exit = document.querySelector(`.film-details__close-btn`);
        exit.addEventListener(`click`, onCloseClick);
      });

    filmPopup.getElement().querySelector(`textarea`)
      .addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscKeyDown);
        const exit = document.querySelector(`.film-details__close-btn`);
        exit.removeEventListener(`click`, onCloseClick);
      });

    filmPopup.getElement().querySelector(`textarea`)
      .addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscKeyDown);
        const exit = document.querySelector(`.film-details__close-btn`);
        exit.addEventListener(`click`, onCloseClick);
      });

    render(filmListElement, film.getElement(), Position.BEFOREEND);
  }
}
