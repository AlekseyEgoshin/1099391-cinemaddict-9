import {createSearchLine} from './components/search-line';
import {createUserRank} from './components/user-rank';

import {createMenu} from './components/menu';
import {createSortingLing} from './components/sorting-line';
import {createContent} from './components/content';
import {createFilmCard} from './components/film-card';

import {createFilmPopup} from './components/film-popup';

const Card = {
  DEFAULT: 5,
  EXTRA: 2,
};

const render = (container, template, place) => container.insertAdjacentHTML(place, template);

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);

render(header, createSearchLine(), `beforeend`);
render(header, createUserRank(), `beforeend`);

render(main, createMenu(), `beforeend`);
render(main, createSortingLing(), `beforeend`);
render(main, createContent(), `beforeend`);

// Появляется возможность объявить переменные после отрисовки createContent
const filmListDefault = document.querySelector(`.films-list`);
const filmContainer = filmListDefault.querySelector(`.films-list__container`);

for (let i = 0; i < Card.DEFAULT; i++) {
  render(filmContainer, createFilmCard(), `beforeend`);
}

// Появляется возможность объявить переменные после отрисовки карточек фильмов
const filmListExtra = document.querySelectorAll(`.films-list--extra`);

for (const extraList of filmListExtra) {
  const extraListContainer = extraList.querySelector(`.films-list__container`);
  for (let i = 0; i < Card.EXTRA; i++) {
    render(extraListContainer, createFilmCard(), `beforeend`);
  }
}

render(footer, createFilmPopup(), `afterend`);

// Появляется возможность объявить переменные после отрисовки Попапа для фильмов
const filmDetail = document.querySelector(`.film-details`);
filmDetail.classList.add(`visually-hidden`);
