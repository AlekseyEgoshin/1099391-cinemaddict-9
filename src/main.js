import {getFilters, getFilmInfo} from './components/data';
import {SearchLine} from './components/search-line';
import {UserRank} from './components/user-rank';

import {ContentController} from './components/controllers/content';

import {render, Position} from './components/utils';

const Card = {
  TOTAL: 14,
};

const header = document.querySelector(`.header`);
const filmContainer = document.querySelector(`.main`);

render(header, new SearchLine().getElement(), Position.BEFOREEND);
render(header, new UserRank().getElement(), Position.BEFOREEND);

const filmsMocks = new Array(Card.TOTAL).fill(``).map(getFilmInfo);
const contentController = new ContentController(filmContainer, filmsMocks, getFilters());
contentController.init();
