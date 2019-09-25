import {Content} from '../content';
import {Position, render} from '../utils';
import {FilmPopup} from '../film-popup';
import {FilmCard} from '../film-card';

const Film = {
  DEFAULT: `default`,
  EXTRA: `extra`,
};

export class ContentController {
  constructor(container, defaultFilms, extraFilms) {
    this._container = container;
    this._content = new Content();
    this._defaultFilms = defaultFilms;
    this._extraFilms = extraFilms;
  }

  init() {
    const changeStatisticsPoint = (filmCards) => {
      const movies = document.querySelector(`.main-navigation__all-movies`);
      const watchlist = document.querySelector(`.main-navigation__watchlist`);
      const history = document.querySelector(`.main-navigation__history`);
      const favorites = document.querySelector(`.main-navigation__favorites`);

      filmCards.forEach((filmCard) => {
        // Обновляем значение фильтра all
        movies.textContent = parseFloat(movies.textContent) + 1;

        // Обновляем значение фильтра repeating
        if (filmCard.isAdded) {
          watchlist.textContent = parseFloat(watchlist.textContent) + 1;
        }

        // Обновляем значение фильтра history
        if (filmCard.isWatched) {
          favorites.textContent = parseFloat(history.textContent) + 1;
        }

        // Обновляем значение фильтра favorites
        if (filmCard.isFavorite) {
          favorites.textContent = parseFloat(favorites.textContent) + 1;
        }
      });
    };

    const onMouseClick = () => {
      const filmCards = document.querySelectorAll(`.film-card`);
      const loadButton = document.querySelector(`.films-list__show-more`);

      filmCards.forEach((singleCard) => {
        if (singleCard.classList.contains(`visually-hidden`)) {
          singleCard.classList.remove(`visually-hidden`);
        }
      });

      loadButton.classList.add(`visually-hidden`);
    };

    changeStatisticsPoint(this._defaultFilms);
    changeStatisticsPoint(this._extraFilms);

    render(this._container, this._content.getElement(), Position.BEFOREEND);

    let i = 0;
    this._defaultFilms.forEach((filmMock) => this._renderCard(filmMock, i++, Film.DEFAULT));

    const showMore = document.querySelector(`.films-list__show-more`);
    showMore.addEventListener(`click`, onMouseClick);

    i = 0;
    this._extraFilms.forEach((filmMock) => this._renderCard(filmMock, i++, Film.EXTRA));
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
