import {render, unrender, Position} from '../utils';
import {SearchResult} from '../search-result';
import {SearchResultInfo} from '../search-result-info';
import {FilmListController} from './film-list';
import {SearchResultGroup} from '../search-result-group';

export class SearchController {
  constructor(container, search, onBackButtonClick, onDataChange) {
    this._container = container;
    this._onBackButtonClick = onBackButtonClick;
    this._onDataChangeMain = onDataChange;

    this._films = [];

    this._search = search;
    // Отрисовывает контейнер
    this._searchResult = new SearchResult();
    // Выводит поле Result с количеством найденных фильмов
    this._searchResultInfo = new SearchResultInfo({});
    this._searchResultGroup = new SearchResultGroup();
    this._filmListController = new FilmListController(this._searchResultGroup.getElement().querySelector(`.result__films`),
        this._onDataChange.bind(this));

    this._init();
  }

  _init() {
    this.hide();

    render(this._container, this._searchResult.getElement(), Position.BEFOREEND);
    render(this._searchResult.getElement(), this._searchResultInfo.getElement(), Position.BEFOREEND);
    render(this._searchResult.getElement(), this._searchResultGroup.getElement(), Position.AFTERBEGIN);

    this._search.getElement().querySelector(`.search__reset`).addEventListener(`click`, (evt) => {
      if (evt.target.tagName === `BUTTON`) {
        this._search.getElement().querySelector(`input`).value = ``;
        this._onBackButtonClick();
      }
    });

    this._search.getElement().querySelector(`input`).addEventListener(`keyup`, (evt) => {
      const {value} = evt.target;
      if (value.length > 2) {
        const films = this._films.filter((film) => {
          return film.movie.title.toLowerCase().includes(value);
        });
        this._showSearchResult(films);
      } else if (value.length === 0) {
        // TODO: проверить!
        this._showSearchResult(this._films);
      }
    });
  }

  hide() {
    this._searchResult.getElement().classList.add(`visually-hidden`);
  }

  show(films) {
    this._films = films;

    if (this._searchResult.getElement().classList.contains(`visually-hidden`)) {
      this._showSearchResult(this._films);
      this._searchResult.getElement().classList.remove(`visually-hidden`);
    }
  }

  _showSearchResult(films) {
    if (this._searchResultGroup) {
      unrender(this._searchResultInfo.getElement());
      this._searchResultInfo.removeElement();
    }

    this._searchResultInfo = new SearchResultInfo({count: films.length});

    render(this._searchResult.getElement(), this._searchResultInfo.getElement(), Position.AFTERBEGIN);
    this._filmListController.setFilms(films);
  }

  _onDataChange(films) {
    this._films = films;
    this._onDataChangeMain(this._tasks);
  }
}
