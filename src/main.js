import {getFilters, getFilmInfo} from './components/data';
import {SearchLine} from './components/search-line';
import {UserRank} from './components/user-rank';
// import SiteMenu from './components/site-menu'

import {render, Position} from './components/utils';
import {Menu} from './components/menu';
import PageController from './components/controllers/pageController';
import {Statistics} from './components/statistics';
import {SearchController} from './components/controllers/search';

const Card = {
  DEFAULT: 10,
  TOTAL: 14,
};

const onDataChange = (tasks) => {
  filmsMocks = tasks;
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteMenu = new Menu(getFilters());

const statistics = new Statistics();
const searchLine = new SearchLine();
statistics.getElement().classList.add(`visually-hidden`);

render(siteHeaderElement, searchLine.getElement(), Position.BEFOREEND);
render(siteHeaderElement, new UserRank().getElement(), Position.BEFOREEND);

render(siteMainElement, siteMenu.getElement(), Position.BEFOREEND);
render(siteMainElement, statistics.getElement(), Position.BEFOREEND);

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
      history.textContent = parseFloat(history.textContent) + 1;
    }

    // Обновляем значение фильтра favorites
    if (filmCard.isFavorite) {
      favorites.textContent = parseFloat(favorites.textContent) + 1;
    }
  });
};

let filmsMocks = new Array(Card.DEFAULT).fill(``).map(getFilmInfo);
changeStatisticsPoint(filmsMocks);

const pageController = new PageController(siteMainElement, onDataChange);

const onResetButtonClick = () => {
  statistics.getElement().classList.add(`visually-hidden`);
  searchController.hide();
  pageController.show(filmsMocks);
};

const searchController = new SearchController(siteMainElement, searchLine, onResetButtonClick, onDataChange);

pageController.show(filmsMocks);

siteMenu.getElement().addEventListener(`click`, (evt) => {
  evt.preventDefault();

  if (evt.target.tagName === `A`) {
    const currentActiveElement = siteMenu.getElement().querySelector(`.main-navigation__item--active`);
    switch (evt.target.id) {
      case `control_film`:
        statistics.getElement().classList.add(`visually-hidden`);
        searchController.hide();
        if (currentActiveElement) {
          currentActiveElement.classList.remove(`main-navigation__item--active`);
        }
        evt.target.classList.add(`main-navigation__item--active`);
        break;
      case `control_statistic`:
        searchController.hide();
        statistics.getElement().classList.remove(`visually-hidden`);
        if (currentActiveElement) {
          currentActiveElement.classList.remove(`main-navigation__item--active`);
        }
        if (!evt.target.classList.contains(`main-navigation__item--active`)) {
          evt.target.classList.add(`main-navigation__item--active`);
        }
        break;
    }
  }
});

searchLine.getElement().addEventListener(`click`, (evt) => {
  if (evt.target.tagName === `INPUT`) {
    statistics.getElement().classList.add(`visually-hidden`);
    pageController.hide();
    searchController.show(filmsMocks);
  }
});
