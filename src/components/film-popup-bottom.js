import {AbstractComponent} from "./abstract-component";
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

export class FilmPopupBottomBlock extends AbstractComponent {
  constructor({id}, comment) {
    super();
    this._id = id;
    this._commentary = comment;
  }

  getTemplate() {
    return `<div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._commentary.length}</span></h3>
      
            <ul class="film-details__comments-list">
              ${(!this._commentary) ? `` : Array.from(this._commentary).map((comment) => `
                <li class="film-details__comment" data-comment-info="${this._id}-${comment.id}" data-film-id="${this._id}" data-comment-id="${comment.id}">
                  <span class="film-details__comment-emoji">
                    <img name="emotion" src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji">
                  </span>
                  <div>
                    <p name="commentary" class="film-details__comment-text">${comment.comment}</p>
                    <p class="film-details__comment-info">
                      <span name="author" class="film-details__comment-author">${comment.author}</span>
                      <span name="date" class="film-details__comment-day">${moment(comment.date).fromNow(true)}</span>
                      <button data-comment-delete-info="${comment.id}" class="film-details__comment-delete">Delete</button>
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
      `
  }
}
