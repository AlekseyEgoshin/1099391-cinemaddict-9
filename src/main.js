import {getFilters} from './components/data';
import {SearchLine} from './components/search-line';
import {UserRank} from './components/user-rank';
// import SiteMenu from './components/site-menu'

import {render, Position} from './components/utils';
import {Menu} from './components/menu';
import PageController from './components/controllers/page';
import {SearchController} from './components/controllers/search';
import {StatisticController} from "./components/controllers/statistics";
import {API} from './components/api';

const AUTHORIZATION = `Basic ${Math.random().toString(36).slice(2)}`;
const END_POINT = `https://htmlacademy-es-9.appspot.com/cinemaddict`;

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

const onDataChange = (update) => {
  api.updateFilm({
    id: update.id,
    data: update.toRAW()
  }).then(() => api.getFilms()).then((films) => {
    const filtersCount = siteMenu.getElement().querySelectorAll(`.main-navigation__item-count`);
    filtersCount.forEach((filter) => (filter.textContent = 0));
    changeStatisticsPoint(films);
    pageController.show(films);
  });
};

const changeStatisticsPoint = (filmCards) => {
  filmCards.forEach((filmCard) => {
    const watchlist = document.querySelector(`.main-navigation__watchlist`);
    const history = document.querySelector(`.main-navigation__history`);
    const favorites = document.querySelector(`.main-navigation__favorites`);

    // Обновляем значение фильтра repeating
    if (filmCard.userDetails.watchlist) {
      watchlist.textContent = parseFloat(watchlist.textContent) + 1;
    }

    // Обновляем значение фильтра history
    if (filmCard.userDetails.alreadyWatched) {
      history.textContent = parseFloat(history.textContent) + 1;
    }

    // Обновляем значение фильтра favorites
    if (filmCard.userDetails.favorite) {
      favorites.textContent = parseFloat(favorites.textContent) + 1;
    }
  });
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteMenu = new Menu(getFilters());

const searchLine = new SearchLine();

render(siteHeaderElement, searchLine.getElement(), Position.BEFOREEND);
render(siteHeaderElement, new UserRank().getElement(), Position.BEFOREEND);

render(siteMainElement, siteMenu.getElement(), Position.BEFOREEND);

const statisticController = new StatisticController(siteMainElement);

const pageController = new PageController(siteMainElement, onDataChange);

api.getFilms().then(function (filmData) {
  changeStatisticsPoint(filmData);

  pageController.show(filmData);

  siteMenu.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();

    const onResetButtonClick = () => {
      statisticController.hide();
      searchController.hide();
      pageController.show(filmData);
    };

    const searchController = new SearchController(siteMainElement, searchLine, onResetButtonClick, onDataChange);

    searchLine.getElement().addEventListener(`click`, (ev) => {
      if (ev.target.tagName === `INPUT`) {
        statisticController.hide();
        pageController.hide();
        searchController.show(filmData);
      }
    });

    if (evt.target.tagName === `A`) {
      const currentActiveElement = siteMenu.getElement().querySelector(`.main-navigation__item--active`);
      switch (evt.target.dataset.contentList) {
        case `control_film`:
          statisticController.hide();
          searchController.hide();
          pageController.show(filmData);
          if (currentActiveElement) {
            currentActiveElement.classList.remove(`main-navigation__item--active`);
          }
          evt.target.classList.add(`main-navigation__item--active`);
          break;
        case `control_statistic`:
          searchController.hide();
          statisticController.show(filmData);
          pageController.hide();
          if (currentActiveElement) {
            currentActiveElement.classList.remove(`main-navigation__item--active`);
          }
          evt.target.classList.add(`main-navigation__item--active`);
          break;
      }
    }
  });
});
