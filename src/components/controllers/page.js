import {SortingLine} from '../sorting-line';
import {render, unrender, Position, changeStatisticsPoint} from '../utils';
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
  constructor(container, onDataChange, api) {
    this._container = container;
    this._filmList = new Content();
    this._sort = new SortingLine();
    this._showMoreButton = new ShowMoreButton();
    this._films = [];
    this._currentFilms = [];
    this._defaultList = new FilmList();
    this._extraListTopRated = new ExtraListTopRated();
    this._extraListMostCommented = new ExtraListMostCommented();
    this._api = api;

    this._showedFilms = FILMS_IN_ROW;
    this._subscriptions = [];

    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onDataChangeMain = onDataChange;

    this._FilmListController = new FilmListController(
      this._defaultList.getElement().querySelector(`.films-list__container`),
      this._onDataChange.bind(this),
      this._onChangeView.bind(this)
    );

    this.init();
  }

  init() {
    render(this._container, this._filmList.getElement(), Position.BEFOREEND);
    render(this._filmList.getElement(), this._sort.getElement(), Position.AFTERBEGIN);
    render(this._filmList.getElement(), this._defaultList.getElement(), Position.BEFOREEND);
    this._sort.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));

    const siteMainNavigation = document.querySelector(`.main-navigation`);
    siteMainNavigation.addEventListener(`click`, (evt) => this._onFilterClick(evt));
  }

  _onDataChange(update, actionType, filmId = null) {
    switch (actionType) {
      case `changeFilm`:
        this._api.updateFilm({
          id: update.id,
          data: update.toRAW()
        })
          .then(() => this._api.getFilms()).then((films) => {
            const filtersCount = siteMenu.getElement().querySelectorAll(`.main-navigation__item-count`);
            filtersCount.forEach((filter) => (filter.textContent = 0));
            changeStatisticsPoint(films);
            pageController.show(films);
          });
        break;
      case `delete`:
        this._api.deleteComment(update)
          .then(() => this._api.getComments(filmId)
            .then((comments) => {
              pageController.updateComments(comments);
            }))
          .then(() => this._api.getFilms()
            .then((films) => {
              const filtersCount = siteMenu.getElement().querySelectorAll(`.main-navigation__item-count`);
              filtersCount.forEach((filter) => (filter.textContent = 0));
              changeStatisticsPoint(films);
              pageController.show(films);
            }));
        break;
      case `create`:
    }
  }


    // this.setFilms(this._films);


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
    const checkParametr = (Films) => {
      if (!this._showMoreButton) {
        Films.forEach((task) => this._renderCard(task));
      } else {
        Films.slice(0, this._showedFilms).forEach((task) => this._renderCard(task));
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

  _onFilterClick(evt) {
    const checkParametr = (Films) => {
      this._showedFilms = FILMS_IN_ROW;
      this._currentFilms = Films;

      if (this._showedFilms < this._currentFilms.length) {
        this._showMoreButton.getElement().classList.remove(`visually-hidden`);
      } else {
        this._showMoreButton.getElement().classList.add(`visually-hidden`);
      }
      this._currentFilms.slice(0, this._showedFilms).forEach((task) => this._renderCard(task));
    };

    evt.preventDefault();

    if (evt.target.tagName === `A`) {
      document.querySelector(`.films-list__container`).innerHTML = ``;
      switch (evt.target.hash) {
        case `#watchlist`:
          const watchlist = this._films.slice().filter((film) => film.userDetails.watchlist);
          checkParametr(watchlist);
          break;
        case `#history`:
          const history = this._films.slice().filter((film) => film.userDetails.alreadyWatched);
          checkParametr(history);
          break;
        case `#favorites`:
          const favorites = this._films.slice().filter((film) => film.userDetails.favorite);
          checkParametr(favorites);
          break;
        case `#all`:
          checkParametr(this._films);
          break;
      }
    }
  }

  _onLoadMoreButtonClick() {
    if (!this._currentFilms) {
      this._films.slice(this._showedFilms, this._showedFilms + FILMS_IN_ROW).forEach((film) => this._renderCard(film));
      this._showedFilms += FILMS_IN_ROW;

      if (this._showedFilms >= this._films.length) {
        this._showMoreButton.getElement().classList.add(`visually-hidden`);
      }
    } else {
      this._currentFilms.slice(this._showedFilms, this._showedFilms + FILMS_IN_ROW).forEach((film) => this._renderCard(film));
      this._showedFilms += FILMS_IN_ROW;

      if (this._showedFilms >= this._currentFilms.length) {
        this._showMoreButton.getElement().classList.add(`visually-hidden`);
      }
    }

  }

  _renderCard(filmData, place = this._defaultList.getElement()) {
    const movieController = new MovieController(place.querySelector(`.films-list__container`), filmData, this._onChangeView, this._onDataChange);
    this._subscriptions.push(movieController.setDefaultView.bind(movieController));
  }

  hide() {
    this._filmList.getElement().classList.add(`visually-hidden`);
  }

  show(films) {
    this._filmList.getElement().querySelector(`.films-list__title`).classList.add(`visually-hidden`);
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

  updateComments(commentData) {
    MovieController.updateComments(commentData);
  }
}
