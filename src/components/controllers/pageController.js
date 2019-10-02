import {SortingLine} from '../sorting-line';
import {render, Position} from '../utils';
import {FilmPopup} from '../film-popup';
import {FilmCard} from '../film-card';
import {MovieController} from './movie';
import {Content} from '../content';

const Film = {
  DEFAULT: `default`,
  EXTRA: `extra`,
};

export class PageController {
  constructor(container, films) {
    this._container = container;
    this._content = new Content();
    this._sort = new SortingLine();
    this._films = films;

    this._subscriptions = [];
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
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
          history.textContent = parseFloat(history.textContent) + 1;
        }

        // Обновляем значение фильтра favorites
        if (filmCard.isFavorite) {
          favorites.textContent = parseFloat(favorites.textContent) + 1;
        }
      });
    };
    const removeHiddenClass = () => {
      const films = this._container.querySelectorAll(`.film-card`);
      films.forEach((film) => {
        if (film.classList.contains(`visually-hidden`)) {
          film.classList.remove(`visually-hidden`);
        }
      });
      showMore.classList.add(`visually-hidden`);
    };

    changeStatisticsPoint(this._films);

    render(this._container, this._sort.getElement(), Position.BEFOREEND);
    render(this._container, this._content.getElement(), Position.BEFOREEND);
    this._sort.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));

    this._films.forEach((filmMock) => this._renderCard(filmMock));

    const extraFilmList = [];
    extraFilmList[0] = this._films.slice().sort((a, b) => b.movie.totalRating - a.movie.totalRating).slice(0, 2);
    extraFilmList[1] = this._films.slice().sort((a, b) => b.commentary.length - a.commentary.length).slice(0, 2);

    const extraFilms = document.querySelectorAll(`.films-list--extra`);
    let i = 0;
    extraFilms.forEach((container) => {
      extraFilmList[i].forEach((film) => this._renderCard(film, undefined, container));
      i++;
    });

    const showMore = document.querySelector(`.films-list__show-more`);
    showMore.addEventListener(`click`, removeHiddenClass);
  }

  _onDataChange(newData, oldData) {
    this._films[this._films.findIndex((it2) => it2 === oldData)] = newData;

    this._films.forEach((filmMock) => this._renderCard(filmMock));
  }

  _onChangeView() {
    this._subscriptions.forEach((subscription) => subscription());
  }

  _onSortLinkClick(evt) {
    const checkParametr = (Mocks) => {
      const showMore = document.querySelector(`.films-list__show-more`);
      if (showMore.classList.contains(`visually-hidden`)) {
        Mocks.forEach((taskMock) => this._renderCard(taskMock));
      } else {
        let i = 0;
        Mocks.forEach((taskMock) => {
          if (i <= 5) {
            this._renderCard(taskMock);
          } else {
            const addedClass = `visually-hidden`;
            this._renderCard(taskMock, addedClass);
          }
          i++;
        });
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
        const sortedByDateUpFilms = this._films.slice().sort((a, b) => a.movie.release.date - b.movie.release.date);
        checkParametr(sortedByDateUpFilms);
        break;
      case `rating-up`:
        const sortedByRatingUpFilms = this._films.slice().sort((a, b) => b.movie.totalRating - a.movie.totalRating);
        checkParametr(sortedByRatingUpFilms);
        break;
      default:
        checkParametr(this._films);
        break;
    }
  }

  _renderCard(filmMock, addedClass = ``, place = document.querySelector(`.films-list__container`)) {
    const movieController = new MovieController(place, filmMock, this._onChangeView, this._onDataChange, addedClass);
    this._subscriptions.push(movieController.setDefaultView.bind(movieController));
  }
}
