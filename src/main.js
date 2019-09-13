import {getFilters, getFilmInfo} from './components/data';
import {SearchLine} from './components/search-line';
import {UserRank} from './components/user-rank';

import {Menu} from './components/menu';
import {SortingLine} from './components/sorting-line';
import {Content} from './components/content';
import {FilmCard} from './components/film-card';

import {FilmPopup} from './components/film-popup';

import {render, Position} from './components/utils';

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

const Card = {
  DEFAULT: 10,
  EXTRA: 4,
};

const Film = {
  DEFAULT: `default`,
  EXTRA: `extra`,
};

const renderCard = (filmMock, count, place) => {
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
  const changeStatisticsPoint = (filmCard) => {
    const movies = document.querySelector(`.main-navigation__all-movies`);
    const watchlist = document.querySelector(`.main-navigation__watchlist`);
    const history = document.querySelector(`.main-navigation__history`);
    const favorites = document.querySelector(`.main-navigation__favorites`);

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
  };

  const film = new FilmCard(filmMock);
  const filmPopup = new FilmPopup(filmMock);
  changeStatisticsPoint(filmMock);

  let filmListElement = ``;

  switch (place) {
    case Film.DEFAULT:
      const filmList = document.querySelector(`.films-list__container`);
      filmListElement = filmList;

      render(filmList, film.getElement(), Position.BEFOREEND);

      if (count >= 5) {
        const lastAddedFilm = filmList.lastElementChild;
        lastAddedFilm.classList.add(`visually-hidden`);
      }
      break;

    case Film.EXTRA:
      const filmListExtra = document.querySelectorAll(`.films-list--extra`);
      let filmsList;
      if (count <= 1) {
        filmsList = filmListExtra[0].querySelector(`.films-list__container`);
      } else {
        filmsList = filmListExtra[1].querySelector(`.films-list__container`);
      }
      filmListElement = filmsList;

      render(filmsList, film.getElement(), Position.BEFOREEND);
      break;
  }

  // Event listener to change film to FilmPopup
  // Первы обработчик - при клике на колличество комментариев
  film.getElement().
    querySelector(`.film-card__comments`)
      .addEventListener(`click`, () => {
        filmListElement.replaceChild(filmPopup.getElement(), film.getElement());
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
};

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);

render(header, new SearchLine().getElement(), Position.BEFOREEND);
render(header, new UserRank().getElement(), Position.BEFOREEND);
render(main, new Menu(getFilters()).getElement(), Position.BEFOREEND);
render(main, new SortingLine().getElement(), Position.BEFOREEND);
render(main, new Content().getElement(), Position.BEFOREEND);

// Отрисовка фильмов
const filmMocks = new Array(Card.DEFAULT).fill(``).map(getFilmInfo);
const filmMocksExtra = new Array(Card.EXTRA).fill(``).map(getFilmInfo);

let i = 0;
filmMocks.forEach((filmMock) => renderCard(filmMock, i++, Film.DEFAULT));

const showMore = document.querySelector(`.films-list__show-more`);
showMore.addEventListener(`click`, onMouseClick);

i = 0;
filmMocksExtra.forEach((filmMock) => renderCard(filmMock, i++, Film.EXTRA));
