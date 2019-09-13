import {createElement} from './utils';

export class FilmCard {
  constructor({movie, commentary, isAdded, isWatched, isFavorite}) {
    this._movie = movie;
    this._commentary = commentary.length;
    this._added = isAdded;
    this._watched = isWatched;
    this._favorite = isFavorite;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    if (this._element) {
      this._element = null;
    }
    return this._element;
  }

  getTemplate() {
    return `<article class="film-card">
        <h3 class="film-card__title">${this._movie.title}</h3>
        <p class="film-card__rating">${this._movie.totalRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${new Date(this._movie.release.date).toDateString()}</span>
          <span class="film-card__movie.runtime">${(this._movie.runtime) ? `${Math.floor(this._movie.runtime / 60)}h ${(this._movie.runtime - Math.floor(this._movie.runtime / 60) * 60 <= 0) ? `0` : (this._movie.runtime - Math.floor(this._movie.runtime / 60) * 60)}m` : `0h 0m`}</span>
          <span class="film-card__genre">
            ${(this._movie.genre.length > 1) ? Array.from(this._movie.genre).map((genre) => `${genre}`) : `${this._movie.genre}` }
          </span>
        </p>
        <img src="./${this._movie.poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${this._movie.description.length > 139 ? `${this._movie.description.substring(0, 139)}...` : this._movie.description}</p>
        <a class="film-card__comments">${this._commentary} comments</a>
        <form class="film-card__controls">
          <button 
            class="film-card__controls-item button film-card__controls-item--add-to-watchlist${this._added ? ` film-card__controls-item--active` : ``}"
          >Add to watchlist</button>
          <button
            class="film-card__controls-item button film-card__controls-item--mark-as-watched${this._watched ? ` film-card__controls-item--active` : ``}"
          >Mark as watched</button>
          <button
            class="film-card__controls-item button film-card__controls-item--favorite${this._favorite ? ` film-card__controls-item--active` : ``}"
          >Mark as favorite</button>
        </form>
      </article>
    `;
  }
}
