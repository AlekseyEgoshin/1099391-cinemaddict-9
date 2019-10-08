import {getFilters} from './components/data';
import {SearchLine} from './components/search-line';
import {UserRank} from './components/user-rank';
// import SiteMenu from './components/site-menu'

import {render, Position, AUTHORIZATION, END_POINT, changeStatisticsPoint} from './components/utils';
import {Menu} from './components/menu';
import PageController from './components/controllers/page';
import {SearchController} from './components/controllers/search';
import {StatisticController} from "./components/controllers/statistics";
import {API} from './components/api';
import UserRankController from "./components/controllers/user-rank";

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteMenu = new Menu(getFilters());
const searchLine = new SearchLine();
render(siteHeaderElement, searchLine.getElement(), Position.BEFOREEND);

const userRank = new UserRankController(siteHeaderElement);

render(siteMainElement, siteMenu.getElement(), Position.BEFOREEND);

const statisticController = new StatisticController(siteMainElement);

const pageController = new PageController(siteMainElement, null, api);

api.getFilms().then(function (filmData) {
  changeStatisticsPoint(filmData);
  userRank.updateView(filmData);

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
