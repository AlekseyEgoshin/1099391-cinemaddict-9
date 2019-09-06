import {getFilters} from './components/data';
import {getFilmInfo} from './components/data';

import {createSearchLine} from './components/search-line';
import {createUserRank} from './components/user-rank';

import {createMenu} from './components/menu';
import {createSortingLing} from './components/sorting-line';
import {createContent} from './components/content';
import {createFilmCard} from './components/film-card';

import {createFilmPopup} from './components/film-popup';

const Card = {
  DEFAULT: 10,
  EXTRA: 2,
};

const renderCard = (cb, count) => {
  const onMouseClick = () => {
    const filmCards = document.querySelectorAll(`.film-card`);
    const loadButton = document.querySelector(`.films-list__show-more`);

    filmCards.forEach(function (singleCard) {
      if (singleCard.classList.contains(`visually-hidden`)) {
        singleCard.classList.remove(`visually-hidden`);
      }
    });

    loadButton.classList.add(`visually-hidden`);
  };

  const changeStatisticsPoint = (filmCard) => {
    const all = document.querySelector(`.main-navigation__all-movies`);
    const watchlist = document.querySelector(`.main-navigation__watchlist`);
    const history = document.querySelector(`.main-navigation__history`);
    const favorites = document.querySelector(`.main-navigation__favorites`);
    // const stats = document.querySelector(`.main-navigation__stats`);

    // Обновляем значение фильтра all
    all.textContent = parseFloat(all.textContent) + 1;

    // Обновляем значение фильтра repeating
    if (filmCard.isAdded) {
      watchlist.textContent = parseFloat(watchlist.textContent) + 1;
    }

    // Обновляем значение фильтра history
    if (filmCard.wasWatched) {
      favorites.textContent = parseFloat(history.textContent) + 1;
    }

    // Обновляем значение фильтра favorites
    if (filmCard.isFavorite) {
      favorites.textContent = parseFloat(favorites.textContent) + 1;
    }
  };

  const func = createFilmCard;

  if (count === Card.DEFAULT) {
    const filmList = document.querySelector(`.films-list`);
    const filmContainer = filmList.querySelector(`.films-list__container`);

    for (let i = 0; i < count; i++) {
      const filmCard = cb();
      changeStatisticsPoint(filmCard);

      renderFilm(filmContainer, filmCard, func);
      if (i >= Card.DEFAULT / 2) {
        const lastAddedFilm = filmContainer.lastElementChild;
        lastAddedFilm.classList.add(`visually-hidden`);
      }
    }

    const loadButton = document.querySelector(`.films-list__show-more`);
    loadButton.addEventListener(`click`, onMouseClick);
  } else {
    const filmList = document.querySelectorAll(`.films-list--extra`);

    for (let i = 0; i < count; i++) {
      for (const extraList of filmList) {
        const extraListContainer = extraList.querySelector(`.films-list__container`);
        const filmCard = cb();
        changeStatisticsPoint(filmCard);

        renderFilm(extraListContainer, filmCard, func);
      }
    }
  }
};

const render = (container, template) => container.insertAdjacentHTML(`beforeend`, template);

const renderFilm = (container, data, func) => {
  container.insertAdjacentHTML(`beforeend`, new Array(1)
    .fill(``)
    .map(() => data)
    .map(func)
    .join(``));
};

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);

render(header, createSearchLine());
render(header, createUserRank());
render(main, createMenu(getFilters()));
render(main, createSortingLing());
render(main, createContent());

renderCard(getFilmInfo, Card.DEFAULT);
renderCard(getFilmInfo, Card.EXTRA);

render(footer, createFilmPopup());

// Появляется возможность объявить переменные после отрисовки Попапа для фильмов
const filmDetail = document.querySelector(`.film-details`);
filmDetail.classList.add(`visually-hidden`);
