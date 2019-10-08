import {AbstractComponent} from "./abstract-component";

export class FilmPopupTopBlock extends AbstractComponent {
  constructor({movie, userDetails}) {
    super()
    this._movie = movie;
    this._userDetails = userDetails;
  }

  getTemplate() {
    return `<div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img name="poster" class="film-details__poster-img" src="./${this._movie.poster}" alt="">
            <p name="ageRating" class="film-details__age">${this._movie.ageRating}+</p>
          </div>
      
          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 name="title" class="film-details__title">${this._movie.title}</h3>
                <p name="alternative" class="film-details__title-original">Original: ${this._movie.alternativeTitle}</p>
              </div>
      
              <div class="film-details__rating">
                <p name="totalRating" class="film-details__total-rating">${this._movie.totalRating}</p>
                <p class="film-details__user-rating ${this._userDetails.personalRating && this._userDetails.alreadyWatched ? `` : `visually-hidden`}">Your rate ${this._userDetails.personalRating}</p>
              </div>
            </div>
      
            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td name="director" class="film-details__cell">${this._movie.director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td name="writers" class="film-details__cell">
                  ${(this._movie.writers.length > 1) ? Array.from(this._movie.genre).map((writer) => `${writer}`) : this._movie.writers}
                </td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td name="actors" class="film-details__cell">
                  ${(this._movie.actors.length > 1) ? Array.from(this._movie.actors).map((actor) => `${actor}`) : this._movie.actors}
                </td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td name="releaseDate" class="film-details__cell">${new Date(this._movie.release.date).getDate()}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td name="runtime" class="film-details__cell">${(this._movie.runtime) ? `${Math.floor(this._movie.runtime / 60)}h ${(this._movie.runtime - Math.floor(this._movie.runtime / 60) * 60 <= 0) ? `0` : (this._movie.runtime - Math.floor(this._movie.runtime / 60) * 60)}m` : `0h 0m`}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td name="country" class="film-details__cell">${this._movie.release.releaseCountry}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${this._movie.genre.lenth > 1 ? `Genres` : `Genre`}</td>
                <td name="genres" class="film-details__cell">
                  ${(!this._movie.genre) ? `` : Array.from(this._movie.genre).map((genre) => `
                    <span class="film-details__genre">
                      ${genre}
                    </span>`).join(``)}
              </tr>
            </table>
      
            <p name="description" class="film-details__film-description">
              ${this._movie.description}
            </p>
          </div>
        </div>
      
        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${this._userDetails.watchlist ? `checked` : ``}>
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
      
          <input type="checkbox" class="film-details__control-input visually-hidden" id="already_watched" name="watched" ${this._userDetails.alreadyWatched ? `checked` : ``}>
          <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
      
          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${this._userDetails.favorite ? `checked` : ``}>
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
        </section>
      </div>`
  }
}
