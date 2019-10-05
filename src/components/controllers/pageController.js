import {SortingLine} from '../sorting-line';
import {render, unrender, Position} from '../utils';
import {MovieController} from './movie';
import {Content} from '../content';
import {ShowMoreButton} from '../show-more-button';
import moment from 'moment';
import {FilmList} from '../film-list';
import {ExtraListTopRated} from '../extra-list-top-rated';
import {FilmListController} from './film-list';
import {ExtraListMostCommented} from '../extra-list-most-commented';

const FILMS_IN_ROW = 5;

export default class PageController {
  constructor(container, films, onDataChange) {
    this._container = container;
    this._filmList = new Content();
    this._sort = new SortingLine();
    this._showMoreButton = new ShowMoreButton();
    this._films = [];
    this._defaultList = new FilmList();
    this._extraListTopRated = new ExtraListTopRated();
    this._extraListMostCommented = new ExtraListMostCommented();

    this._showedFilms = FILMS_IN_ROW;
    this._subscriptions = [];

    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onDataChangeMain = onDataChange;

    this._FilmListController = new FilmListController(this._defaultList.getElement().querySelector(`.films-list__container`),
        this._onDataChange.bind(this),
        this._onChangeView.bind(this));

    this.init();
  }

  init() {
    render(this._container, this._filmList.getElement(), Position.BEFOREEND);
    render(this._filmList.getElement(), this._sort.getElement(), Position.AFTERBEGIN);
    render(this._filmList.getElement(), this._defaultList.getElement(), Position.BEFOREEND);
    this._sort.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
  }

  _onDataChange(newData, oldData) {
    const index = this._films.findIndex((film) => film === oldData);

    if (newData.some((film) => film.commentary.includes(null))) {
      this._films = [...this._films.slice(0, index), ...this._films.slice(index + 1)];
    } else if (newData.commentary.length > oldData.commentary.length) {
      this._films[index].commentary = newData.commentary;
    } else {
      this._films.isWatched = newData.isWatched;
      this._films.isAdded = newData.isAdded;
      this._films.isFavorite = newData.isFavorite;
    }

    this.setFilms(this._films);

    this._onDataChangeMain(this._films);
  }

  _renderBoard() {
    render(this._filmList.getElement(), this._defaultList.getElement(), Position.BEFOREEND);

    unrender(this._showMoreButton.getElement());
    this._showMoreButton.removeElement();
    if (this._showedFilms < this._films.length) {
      render(this._filmList.getElement(), this._showMoreButton.getElement(), Position.BEFOREEND);
    }

    this._FilmListController.setFilms(this._films.slice(0, this._showedFilms), this._defaultList.getElement());

    this._showMoreButton.getElement()
      .addEventListener(`click`, () => this._onLoadMoreButtonClick());

    render(this._filmList.getElement(), this._extraListTopRated.getElement(), Position.BEFOREEND);
    render(this._filmList.getElement(), this._extraListMostCommented.getElement(), Position.BEFOREEND);

    const topRated = this._films.slice().sort((a, b) => b.movie.totalRating - a.movie.totalRating).slice(0, 2);
    topRated.forEach((film) => this._renderCard(film, this._extraListTopRated.getElement()));

    const MostCommented = this._films.slice().sort((a, b) => b.commentary.length - a.commentary.length).slice(0, 2);
    MostCommented.forEach((film) => this._renderCard(film, this._extraListMostCommented.getElement()));

  }

  _onChangeView() {
    this._subscriptions.forEach((subscription) => subscription());
  }

  _onSortLinkClick(evt) {
    const checkParametr = (Mocks) => {
      if (!this._showMoreButton) {
        Mocks.forEach((task) => this._renderCard(task));
      } else {
        Mocks.slice(0, this._showedFilms).forEach((task) => this._renderCard(task));
      }

      if (currentActiveButton.dataset.sortType !== evt.target.dataset.sortType) {
        currentActiveButton.classList.remove(`sort__button--active`);
        evt.target.classList.add(`sort__button--active`);
      }
    };

    evt.preventDefault();
    const currentActiveButton = document.querySelector(`.sort__button--active`);

    if (evt.target.tagName === `A`) {
      document.querySelector(`.films-list__container`).innerHTML = ``;
      switch (evt.target.dataset.sortType) {
        case `date-up`:
          const sortedByDateUpFilms = this._films.slice().sort((a, b) => moment(a.movie.release.date) - moment(b.movie.release.date));
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
  }

  _onLoadMoreButtonClick() {
    this._films.slice(this._showedFilms, this._showedFilms + FILMS_IN_ROW).forEach((film) => this._renderCard(film));

    this._showedFilms += FILMS_IN_ROW;

    if (this._showedFilms >= this._films.length) {
      unrender(this._showMoreButton.getElement());
      this._showMoreButton.removeElement();
    }
  }

  _renderCard(filmMock, place = this._defaultList.getElement()) {
    const movieController = new MovieController(place.querySelector(`.films-list__container`), filmMock, this._onChangeView, this._onDataChange);
    this._subscriptions.push(movieController.setDefaultView.bind(movieController));
  }

  hide() {
    this._filmList.getElement().classList.add(`visually-hidden`);
  }

  show(films) {
    if (films !== this._films) {
      this._setFilms(films);
    }
    this._filmList.getElement().classList.remove(`visually-hidden`);
  }

  _setFilms(films) {
    this._films = films;
    this._showedFilms = FILMS_IN_ROW;

    this._renderBoard();
  }
}
