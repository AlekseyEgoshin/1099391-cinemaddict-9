import {FilmPopupTopBlock} from '../film-popup-top';
import {FilmPopupBottomBlock} from '../film-popup-bottom';
import {FilmPopupMiddleBlock} from '../film-popup-middle';
import {ActionType, Key, Position, render, unrender} from '../utils';
import {FilmPopupContainer} from '../film-popup-container';

export class FilmPopupController {
  constructor(container, film, comments, onDataChange) {
    this._container = container;
    this._film = film;
    this._comments = comments;
    this._onDataChange = onDataChange;

    this._popupContainer = new FilmPopupContainer();
    this._topElement = new FilmPopupTopBlock(this._film);
    this._middleElement = new FilmPopupMiddleBlock(this._film);
    this._bottomElement = new FilmPopupBottomBlock(this._film, this._comments);

    this._init();
  }

  _init() {
    render(this._container, this._popupContainer.getElement(), Position.BEFOREEND);
    render(this._popupContainer.getElement().querySelector(`.film-details__inner`), this._topElement.getElement(), Position.BEFOREEND);
    render(this._popupContainer.getElement().querySelector(`.film-details__inner`), this._middleElement.getElement(), Position.BEFOREEND);
    render(this._popupContainer.getElement().querySelector(`.film-details__inner`), this._bottomElement.getElement(), Position.BEFOREEND);

    this._addListeners();
  }

  _onEscKeyDown(evt) {
    if (evt.key === Key.ESCAPE || evt.key === Key.ESCAPE_IE) {
      if (this._container.classList.contains(`hide-overflow`)) {
        this._container.classList.remove(`hide-overflow`);
      }
      this._filmPopupController.unrenderPopup();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  _onCloseClick() {
    const body = document.querySelector(`.body`);
    if (body.classList.contains(`hide-overflow`)) {
      body.classList.remove(`hide-overflow`);
    }
    this._filmPopupController.unrenderPopup();
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  _addListeners() {
    document.addEventListener(`keydown`, this._onEscKeyDown);
    const exit = document.querySelector(`.film-details__close-btn`);
    exit.addEventListener(`click`, this._onCloseClick);

    // Добавляется/удаляется обработчик при нажатии/выхода с поля ввода комментария
    this._bottomElement.getElement().querySelector(`textarea`).addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, this._onEscKeyDown);
      exit.removeEventListener(`click`, this._onCloseClick);
    });

    this._bottomElement.getElement().querySelector(`textarea`).addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, this._onEscKeyDown);
      exit.addEventListener(`click`, this._onCloseClick);
    });

    this._bottomElement.getElement().querySelector(`textarea`).addEventListener(`keydown`, (evt) => {
      const getFormData = () => {
        const formData = new FormData(document.querySelector(`.film-details__inner`));
        console.log(document.querySelector(`.film-details__emoji-label`))
        console.log(formData)

        // const commentsCount = document.querySelector(`.film-details__comments-count`);
        // commentsCount.textContent = parseFloat(commentsCount.textContent) + 1;
        // const lastComment = document.querySelector(`.film-details__comment:last-child`);
        // const entry = JSON.parse(JSON.stringify(this._film));
        // const newComment = [{
        //   author: lastComment.querySelector(`.film-details__comment-author`).textContent,
        //   date: lastComment.querySelector(`.film-details__comment-day`).dataset.currentDate,
        //   commentary: lastComment.querySelector(`.film-details__comment-text`).textContent,
        //   emotion: lastComment.querySelector(`[name="emotion"]`).dataset.choosenEmoji,
        // }];
        // Array.prototype.push.apply(entry.commentary, newComment);
        //
        // this._onDataChange(entry, this._film);
      };

      if (evt.key === Key.ENTER && evt.shiftKey || evt.key === Key.ENTER && evt.metaKey) {
        evt.preventDefault();
        document.querySelector(`.films-list__container`).innerHTML = ``;
        getFormData();
      }
    });

    this._topElement.getElement().querySelector(`.film-details__controls`).addEventListener(`click`, this._onActiveButtonClick.bind(this));

    this._bottomElement.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`click`, this._onEmojiListClick.bind(this));

    this._bottomElement.getElement().querySelector(`.film-details__comments-list`).addEventListener(`click`, (evt) => {
      // Вызываем внешний обработчик
      // С помощью null сообщаем, что данные были удалены
      evt.preventDefault();

      if (evt.target.dataset.commentDeleteInfo && evt.target.classList.contains(`film-details__comment-delete`)) {
        const deleteButtonId = evt.target.dataset.commentDeleteInfo;

        this._onDataChange(deleteButtonId, ActionType.deleteComment, this._film.id);
        this._blockDeleteButton(evt.target);
      }
    });
  }

  _blockDeleteButton(deleteButton) {
    deleteButton.disabled = true;
    deleteButton.textContent = `Deleting…`;
  }

  _onEmojiListClick(evt) {
    if (evt.target.tagName === `IMG`) {
      const currentEmoji = this._bottomElement.getElement().querySelector(`.film-details__current-emoji`);
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
        let entry = JSON.parse(JSON.stringify(this._film));
        evt.target.control.checked = !evt.target.control.checked;
        switch (evt.target.control.id) {
          case `watchlist`:
            entry.userDetails.watchlist = evt.target.control.checked;
            break;

          case `already_watched`:
            entry.userDetails.alreadyWatched = evt.target.control.checked;
            break;

          case `favorite`:
            entry.userDetails.favorite = evt.target.control.checked;
            break;
        }

        const middleBlock = document.querySelector(`.form-details__middle-container`);
        if (entry.userDetails.alreadyWatched) {
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

  unrenderPopup() {
    unrender(this._popupContainer.getElement());
    this._popupContainer.removeElement();
  }

  updateRating() {

  }

  updateComment(newComments) {
    this._comments = newComments;
    unrender(this._bottomElement.getElement());
    this._bottomElement.removeElement();
    this._bottomElement = new FilmPopupBottomBlock(this._comments);

    render(this._popupContainer.getElement().querySelector(`.film-details__inner`), this._bottomElement.getElement(), Position.BEFOREEND);
  }
}
