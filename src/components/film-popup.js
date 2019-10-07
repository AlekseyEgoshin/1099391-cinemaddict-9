import {AbstractComponent} from './abstract-component';
import moment from 'moment';

moment.updateLocale(`en`, {
  relativeTime: {
    past: `%s ago`,
    s: `now`,
    ss: `now`,
    m: `a minute ago`,
    mm: `a few minutes ago`,
    h: `an hour ago`,
    hh: `a few hours ago`,
    d: `a day ago`,
    dd: `%d days ago`,
  }
});

moment.relativeTimeThreshold(`ss`, 0);
moment.relativeTimeThreshold(`s`, 59);
moment.relativeTimeThreshold(`m`, 3);
moment.relativeTimeThreshold(`mm`, 59);
moment.relativeTimeThreshold(`h`, 2);
moment.relativeTimeThreshold(`hh`, 24);
moment.relativeTimeThreshold(`d`, 355);

const FilmRating = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
  SIX: 6,
  SEVEN: 7,
  EIGHT: 8,
  NINE: 9,
};

export class FilmPopup extends AbstractComponent {
  constructor({id, movie, userDetails}, commentary) {
    super();
    this._id = id;
    this._movie = movie;
    this._commentary = commentary;
    this._userDetails = userDetails;
    this._element = null;

    this._subscribeOnEvents();
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
          </div>
          
          <div class="form-details__middle-container ${this._userDetails.alreadyWatched ? `` : `visually-hidden`}">
            <section class="film-details__user-rating-wrap">
              <div class="film-details__user-rating-controls">
                <button class="film-details__watched-reset" type="button">Undo</button>
              </div>
      
              <div class="film-details__user-score">
                <div class="film-details__user-rating-poster">
                  <img src="./${this._movie.poster}" alt="film-poster" class="film-details__user-rating-img">
                </div>
      
                <section class="film-details__user-rating-inner">
                  <h3 class="film-details__user-rating-title">${this._movie.title}</h3>
      
                  <p class="film-details__user-rating-feelings">How you feel it?</p>
      
                  <div class="film-details__user-rating-score">
                    <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="1" id="rating-1" ${this._userDetails.personalRating === FilmRating.ONE ? `checked` : ``}>
                    <label class="film-details__user-rating-label" for="rating-1">1</label>
      
                    <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="2" id="rating-2" ${this._userDetails.personalRating === FilmRating.TWO ? `checked` : ``}>
                    <label class="film-details__user-rating-label" for="rating-2">2</label>
      
                    <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="3" id="rating-3" ${this._userDetails.personalRating === FilmRating.THREE ? `checked` : ``}>
                    <label class="film-details__user-rating-label" for="rating-3">3</label>
      
                    <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="4" id="rating-4" ${this._userDetails.personalRating === FilmRating.FOUR ? `checked` : ``}>
                    <label class="film-details__user-rating-label" for="rating-4">4</label>
      
                    <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="5" id="rating-5" ${this._userDetails.personalRating === FilmRating.FIVE ? `checked` : ``}>
                    <label class="film-details__user-rating-label" for="rating-5">5</label>
      
                    <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="6" id="rating-6" ${this._userDetails.personalRating === FilmRating.SIX ? `checked` : ``}>
                    <label class="film-details__user-rating-label" for="rating-6">6</label>
      
                    <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="7" id="rating-7" ${this._userDetails.personalRating === FilmRating.SEVEN ? `checked` : ``}>
                    <label class="film-details__user-rating-label" for="rating-7">7</label>
      
                    <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="8" id="rating-8" ${this._userDetails.personalRating === FilmRating.EIGHT ? `checked` : ``}>
                    <label class="film-details__user-rating-label" for="rating-8">8</label>
      
                    <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="9" id="rating-9" ${this._userDetails.personalRating === FilmRating.NINE ? `checked` : ``}>
                    <label class="film-details__user-rating-label" for="rating-9">9</label>
      
                  </div>
                </section>
              </div>
            </section>
          </div>
      
          <div class="form-details__bottom-container">
            <section class="film-details__comments-wrap">
              <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._commentary.length}</span></h3>
      
              <ul class="film-details__comments-list">
                ${(!this._commentary) ? `` : Array.from(this._commentary).map((comment) => `
                  <li class="film-details__comment" id="comment-${this._id}-${comment.id}">
                    <span class="film-details__comment-emoji">
                      <img name="emotion" src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji">
                    </span>
                    <div>
                      <p name="commentary" class="film-details__comment-text">${comment.comment}</p>
                      <p class="film-details__comment-info">
                        <span name="author" class="film-details__comment-author">${comment.author}</span>
                        <span name="date" class="film-details__comment-day">${moment(comment.date).fromNow(true)}</span>
                        <button id="delete-${this._id}-${comment.id}" class="film-details__comment-delete">Delete</button>
                      </p>
                    </div>
                  </li>`).join(``)}
              </ul>
      
              <div class="film-details__new-comment">
                <div for="add-emoji" class="film-details__add-emoji-label">
                  <img class="film-details__current-emoji visually-hidden" src="./images/emoji/smile.png" width="55" height="55" alt="emoji">
                </div>
      
                <label class="film-details__comment-label">
                  <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
                </label>
      
                <div class="film-details__emoji-list">
                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                  <label class="film-details__emoji-label" for="emoji-smile">
                    <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji" data-active-emoji="smile">
                  </label>
      
                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                  <label class="film-details__emoji-label" for="emoji-sleeping">
                    <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji" data-active-emoji="sleeping">
                  </label>
      
                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-gpuke" value="puke">
                  <label class="film-details__emoji-label" for="emoji-gpuke">
                    <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji" data-active-emoji="puke">
                  </label>
      
                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                  <label class="film-details__emoji-label" for="emoji-angry">
                    <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji" data-active-emoji="angry">
                  </label>
                </div>
              </div>
            </section>
          </div>
        </form>
      </section>
    `;
  }

  _subscribeOnEvents() {
    const author = [`Kristofer Nolan`, `Taika Vaititi`, `Joe Russo`, `George Lucas`, `Leopold`];

    this.getElement()
      .querySelector(`.film-details__comment-input`).addEventListener(`keydown`, (evt) => {
        if (evt.key === `Enter` && evt.shiftKey || evt.key === `Enter` && evt.metaKey) {
          evt.preventDefault();
          const emoji = document.querySelector(`.film-details__emoji-item:checked`);
          this.getElement().querySelector(`.film-details__comments-list`).insertAdjacentHTML(`beforeend`, `<li class="film-details__comment">
              <span class="film-details__comment-emoji">
                <img name="emotion" src="./images/emoji/${emoji.value}.png" data-choosen-emoji="${emoji.value}" width="55" height="55" alt="emoji">
              </span>
              <div>
                <p name="commentary" class="film-details__comment-text">${evt.target.value}</p>
                <p class="film-details__comment-info">
                  <span name="author" class="film-details__comment-author">${author[Math.floor(Math.random() * author.length)]}</span>
                  <!-- TODO: Добавить корректную реализацию со временем по ТЗ -->
                  <span name="date" class="film-details__comment-day" data-current-date="${new Date().getTime()}">${moment().fromNow(true)}</span>
                  <button class="film-details__comment-delete">Delete</button>
                </p>
              </div>
            </li>`);
          evt.target.value = ``;
        }
      });
  }
}
