import {AbstractComponent} from './abstract-component';

export class FilmPopup extends AbstractComponent {
  constructor({movie, commentary, isAdded, isWatched, isFavorite}) {
    super();
    this._movie = movie;
    this._commentary = commentary;
    this._added = isAdded;
    this._watched = isWatched;
    this._favorite = isFavorite;
    this._element = null;
  }

  getTemplate() {
    return `<section class="film-details">
        <form class="film-details__inner" action="" method="get">
          <div class="form-details__top-container">
            <div class="film-details__close">
              <button class="film-details__close-btn" type="button">close</button>
            </div>
            <div class="film-details__info-wrap">
              <div class="film-details__poster">
                <img class="film-details__poster-img" src="./${this._movie.poster}" alt="">
                <p class="film-details__age">${this._movie.ageRating}+</p>
              </div>
      
              <div class="film-details__info">
                <div class="film-details__info-head">
                  <div class="film-details__title-wrap">
                    <h3 class="film-details__title">${this._movie.title}</h3>
                    <p class="film-details__title-original">Original: ${this._movie.alternativeTitle}</p>
                  </div>
      
                  <div class="film-details__rating">
                    <p class="film-details__total-rating">${this._movie.totalRating}</p>
                  </div>
                </div>
      
                <table class="film-details__table">
                  <tr class="film-details__row">
                    <td class="film-details__term">Director</td>
                    <td class="film-details__cell">${this._movie.director}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Writers</td>
                    <td class="film-details__cell">
                      ${(this._movie.writers.length > 1) ? Array.from(this._movie.genre).map((writer) => `${writer}`) : this._movie.writers}
                    </td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Actors</td>
                    <td class="film-details__cell">
                      ${(this._movie.actors.length > 1) ? Array.from(this._movie.actors).map((actor) => `${actor}`) : this._movie.actors}
                    </td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Release Date</td>
                    <td class="film-details__cell">${new Date(this._movie.release.date).getDate()}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Runtime</td>
                    <td class="film-details__cell">${(this._movie.runtime) ? `${Math.floor(this._movie.runtime / 60)}h ${(this._movie.runtime - Math.floor(this._movie.runtime / 60) * 60 <= 0) ? `0` : (this._movie.runtime - Math.floor(this._movie.runtime / 60) * 60)}m` : `0h 0m`}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Country</td>
                    <td class="film-details__cell">${this._movie.release.releaseCountry}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">${this._movie.genre.lenth > 1 ? `Genres` : `Genre`}</td>
                    <td class="film-details__cell">
                      ${(!this._movie.genre) ? `` : Array.from(this._movie.genre).map((genre) => `
                        <span class="film-details__genre">
                          ${genre}
                        </span>`).join(``)}
                  </tr>
                </table>
      
                <p class="film-details__film-description">
                  ${this._movie.description}
                </p>
              </div>
            </div>
      
            <section class="film-details__controls">
              <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
              <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
      
              <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
              <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
      
              <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
              <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
            </section>
          </div>
      
          <div class="form-details__bottom-container">
            <section class="film-details__comments-wrap">
              <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._commentary.length}</span></h3>
      
              <ul class="film-details__comments-list">
                ${(!this._commentary) ? `` : Array.from(this._commentary).map((comment) => `
                  <li class="film-details__comment">
                    <span class="film-details__comment-emoji">
                      <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji">
                    </span>
                    <div>
                      <p class="film-details__comment-text">${comment.commentary}</p>
                      <p class="film-details__comment-info">
                        <span class="film-details__comment-author">${comment.author}</span>
                        <span class="film-details__comment-day">${comment.date}</span>
                        <button class="film-details__comment-delete">Delete</button>
                      </p>
                    </div>
                  </li>`).join(``)}
              </ul>
      
              <div class="film-details__new-comment">
                <div for="add-emoji" class="film-details__add-emoji-label"></div>
      
                <label class="film-details__comment-label">
                  <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
                </label>
      
                <div class="film-details__emoji-list">
                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="sleeping">
                  <label class="film-details__emoji-label" for="emoji-smile">
                    <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                  </label>
      
                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="neutral-face">
                  <label class="film-details__emoji-label" for="emoji-sleeping">
                    <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                  </label>
      
                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-gpuke" value="grinning">
                  <label class="film-details__emoji-label" for="emoji-gpuke">
                    <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                  </label>
      
                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="grinning">
                  <label class="film-details__emoji-label" for="emoji-angry">
                    <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                  </label>
                </div>
              </div>
            </section>
          </div>
        </form>
      </section>
    `;
  }
}
