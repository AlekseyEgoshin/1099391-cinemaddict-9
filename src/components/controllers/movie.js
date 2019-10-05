import {Position, render, Key, unrender} from '../utils';
import {FilmCard} from '../film-card';
import {FilmPopup} from '../film-popup';

export class MovieController {
  constructor(container, filmData, onChangeView, onDataChange) {
    this._container = container;
    this._film = filmData;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this._filmView = new FilmCard(this._film);
    this._filmPopup = new FilmPopup(this._film);

    this.init();
  }

  init() {
    const onEscKeyDown = (evt) => {
      if (evt.key === Key.ESCAPE || evt.key === Key.ESCAPE_IE) {
        const body = document.querySelector(`.body`);
        if (body.classList.contains(`hide-overflow`)) {
          body.classList.remove(`hide-overflow`);
        }
        unrender(this._filmPopup.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const onCloseClick = () => {
      const body = document.querySelector(`.body`);
      if (body.classList.contains(`hide-overflow`)) {
        body.classList.remove(`hide-overflow`);
      }
      unrender(this._filmPopup.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    // Event listener to change film to FilmPopup
    // Первы обработчик - при клике на колличество комментариев
    this._filmView.getElement().
    querySelector(`.film-card__comments`)
      .addEventListener(`click`, () => {
        const body = document.querySelector(`.body`);
        if (body.classList.contains(`hide-overflow`)) {
          body.classList.add(`hide-overflow`);
        }
        render(body, this._filmPopup.getElement(), Position.BEFOREEND);

        document.addEventListener(`keydown`, onEscKeyDown);
        const exit = document.querySelector(`.film-details__close-btn`);
        exit.addEventListener(`click`, onCloseClick);
      });
    // Второй обработчик - при клике на постер
    this._filmView.getElement().
    querySelector(`.film-card__poster`)
      .addEventListener(`click`, () => {
        const body = document.querySelector(`.body`);
        if (body.classList.contains(`hide-overflow`)) {
          body.classList.add(`hide-overflow`);
        }
        render(body, this._filmPopup.getElement(), Position.BEFOREEND);

        document.addEventListener(`keydown`, onEscKeyDown);
        const exit = document.querySelector(`.film-details__close-btn`);
        exit.addEventListener(`click`, onCloseClick);
      });
    // Третий обработчик - при клике название
    this._filmView.getElement().
    querySelector(`.film-card__title`)
      .addEventListener(`click`, () => {
        const body = document.querySelector(`.body`);
        if (body.classList.contains(`hide-overflow`)) {
          body.classList.add(`hide-overflow`);
        }
        render(body, this._filmPopup.getElement(), Position.BEFOREEND);

        document.addEventListener(`keydown`, onEscKeyDown);
        const exit = document.querySelector(`.film-details__close-btn`);
        exit.addEventListener(`click`, onCloseClick);
      });

    // Добавляется/удаляется обработчик при нажатии/выхода с поля ввода комментария
    this._filmPopup.getElement().querySelector(`textarea`)
      .addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscKeyDown);
        const exit = document.querySelector(`.film-details__close-btn`);
        exit.removeEventListener(`click`, onCloseClick);
      });

    this._filmPopup.getElement().querySelector(`textarea`)
      .addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscKeyDown);
        const exit = document.querySelector(`.film-details__close-btn`);
        exit.addEventListener(`click`, onCloseClick);
      });

    this._filmPopup.getElement().querySelector(`textarea`)
      .addEventListener(`keydown`, (evt) => {
        const getFormData = () => {
          const commentsCount = document.querySelector(`.film-details__comments-count`);
          commentsCount.textContent = parseFloat(commentsCount.textContent) + 1;
          const comment = document.querySelector(`.film-details__comment:last-child`);
          const entry = JSON.parse(JSON.stringify(this._film));
          const newComment = [{
            author: comment.querySelector(`.film-details__comment-author`).textContent,
            date: comment.querySelector(`.film-details__comment-day`).dataset.currentDate,
            commentary: comment.querySelector(`.film-details__comment-text`).textContent,
            emotion: comment.querySelector(`[name="emotion"]`).dataset.choosenEmoji,
          }];
          Array.prototype.push.apply(entry.commentary, newComment);

          this._onDataChange(entry, this._film);
        };

        if (evt.key === Key.ENTER && evt.shiftKey || evt.key === Key.ENTER && evt.metaKey) {
          evt.preventDefault();
          document.querySelector(`.films-list__container`).innerHTML = ``;
          getFormData();
        }
      });

    this._filmPopup.getElement().querySelector(`.film-details__controls`)
      .addEventListener(`click`, this._onActiveButtonClick.bind(this));

    this._filmPopup.getElement().querySelector(`.film-details__emoji-list`)
      .addEventListener(`click`, this._onEmojiListClick.bind(this));

    this._filmPopup.getElement().querySelector(`.film-details__comment-delete`)
      .addEventListener(`click`, (evt) => {
        // Вызываем внешний обработчик
        // С помощью null сообщаем, что данные были удалены
        evt.preventDefault();

        if (evt.target.id && evt.target.tagName === `BUTTON`) {
          const deleteButtonId = evt.target.id.split(`-`);
          deleteButtonId.shift();

          // const choosenElement = this._filmPopup.getElement().querySelector(`#comment-${deleteButtonId[0]}-${deleteButtonId[1]}`);

          const entry = JSON.parse(JSON.stringify(this._film));
          entry.commentary[evt.target.id] = null;

          this._onDataChange(entry, this._film);
        }
      });

    render(this._container, this._filmView.getElement(), Position.BEFOREEND);
  }

  _onEmojiListClick(evt) {
    if (evt.target.tagName === `IMG`) {
      const currentEmoji = document.querySelector(`.film-details__current-emoji`);
      const activeEmoji = evt.target.dataset.activeEmoji;

      if (currentEmoji.classList.contains(`visually-hidden`)) {
        currentEmoji.classList.remove(`visually-hidden`);
        currentEmoji.src = `./images/emoji/${activeEmoji}.png`;
      } else {
        currentEmoji.src = `./images/emoji/${activeEmoji}.png`;
      }
    }
  }

  _onActiveButtonClick(evt) {
    if (evt.target.tagName === `LABEL`) {
      evt.preventDefault();
      const changeData = () => {
        let entry;
        evt.target.control.checked = !evt.target.control.checked;
        switch (evt.target.control.id) {
          case `watchlist`:
            entry = Object.assign({}, this._film, {
              isAdded: evt.target.control.checked,
              isWatched: this._filmPopup.getElement().querySelector(`#watched`).checked,
              isFavorite: this._filmPopup.getElement().querySelector(`#favorite`).checked,
            });
            break;

          case `watched`:
            entry = Object.assign({}, this._film, {
              isAdded: this._filmPopup.getElement().querySelector(`#watchlist`).checked,
              isWatched: evt.target.control.checked,
              isFavorite: this._filmPopup.getElement().querySelector(`#favorite`).checked,
            });
            break;

          case `favorite`:
            entry = Object.assign({}, this._film, {
              isAdded: this._filmPopup.getElement().querySelector(`#watchlist`).checked,
              isWatched: this._filmPopup.getElement().querySelector(`#watched`).checked,
              isFavorite: evt.target.control.checked,
            });
            break;
        }

        const middleBlock = document.querySelector(`.form-details__middle-container`);
        if (entry.isWatched) {
          if (middleBlock.classList.contains(`visually-hidden`)) {
            middleBlock.classList.remove(`visually-hidden`);
          }
        } else {
          if (!middleBlock.classList.contains(`visually-hidden`)) {
            middleBlock.classList.add(`visually-hidden`);
          }
        }
        this._onDataChange(entry, this._film);
      };

      document.querySelector(`.films-list__container`).innerHTML = ``;

      if (evt.target.classList.contains(`film-card__controls-item--active`)) {
        evt.target.classList.remove(`film-card__controls-item--active`);

        changeData();
      } else {
        evt.target.classList.add(`film-card__controls-item--active`);

        changeData();
      }
    }
  }

  setDefaultView() {
    if (document.body.contains(this._filmPopup.getElement())) {
      unrender(this._filmPopup.getElement());
      this._filmPopup.removeElement();
    }
  }
}
