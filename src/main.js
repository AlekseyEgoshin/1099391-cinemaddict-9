import {getFilters, getFilmInfo} from './components/data';
import {SearchLine} from './components/search-line';
import {UserRank} from './components/user-rank';

import {ContentController} from './components/controllers/content';

import {render, Position} from './components/utils';
import {Menu} from './components/menu';
import {PageController} from './components/controllers/pageController';

const Card = {
  DEFAULT: 10,
  TOTAL: 14,
};

const header = document.querySelector(`.header`);
const filmContainer = document.querySelector(`.main`);

render(header, new SearchLine().getElement(), Position.BEFOREEND);
render(header, new UserRank().getElement(), Position.BEFOREEND);

const filmsMocks = new Array(Card.TOTAL).fill(``).map(getFilmInfo);

let defaultFilms = [];
let extraFilms = [];
let j = 0;
for (let i = 0; i < filmsMocks.length; i++) {
  if (i < Card.DEFAULT) {
    defaultFilms[i] = filmsMocks[i];
  } else {
    extraFilms[j++] = filmsMocks[i];
  }
}
render(filmContainer, new Menu(getFilters()).getElement(), Position.BEFOREEND);

const sortController = new PageController(filmContainer, defaultFilms);
sortController.init();

const contentController = new ContentController(filmContainer, defaultFilms, extraFilms);
contentController.init();
