import {SortingLine} from '../sorting-line';
import {Position, render, Key, unrender} from '../utils';
import {FilmCard} from '../film-card';
import {FilmPopup} from '../film-popup';

export class MovieController {
  constructor(container, filmData, onChangeView, onDataChange, addedClass) {
    this._container = container;
    this._film = filmData;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this._filmView = new FilmCard(this._film);
    this._filmPopup = new FilmPopup(this._film);
    this._addedClass = addedClass;

    this.init();
  }

  init() {
    const onEscKeyDown = (evt) => {
      if (evt.key === Key.ESCAPE || evt.key === Key.ESCAPE_IE) {
        const body = document.querySelector(`.body`);
        body.classList.contains(`hide-overflow`) ? body.classList.remove(`hide-overflow`) : ``;
        unrender(this._filmPopup.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const onCloseClick = () => {
      const body = document.querySelector(`.body`);
      body.classList.contains(`hide-overflow`) ? body.classList.remove(`hide-overflow`) : ``;
      unrender(this._filmPopup.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    let filmListElement = ``;

    if (this._container === document.querySelector(`.films-list__container`)) {
      const filmList = document.querySelector(`.films-list`);
      const filmsCount = filmList.querySelectorAll(`.film-card`);
      const showMore = document.querySelector(`.films-list__show-more`);
      if (filmsCount.length >= 5 && !showMore.classList.contains(`visually-hidden`)) {
        this._filmView.getElement().classList.add(`visually-hidden`);
      }
    } else {
      this._container = this._container.querySelector(`.films-list__container`)
    }

    // Event listener to change film to FilmPopup
    // Первы обработчик - при клике на колличество комментариев
    this._filmView.getElement().
    querySelector(`.film-card__comments`)
      .addEventListener(`click`, () => {
        const body = document.querySelector(`.body`);
        body.classList.contains(`hide-overflow`) ? `` : body.classList.add(`hide-overflow`);
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
        body.classList.contains(`hide-overflow`) ? `` : body.classList.add(`hide-overflow`);
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
        body.classList.contains(`hide-overflow`) ? `` : body.classList.add(`hide-overflow`);
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
          const formData = new FormData(this._filmPopup.getElement().querySelector(`.film-details__inner`));

          const comment = document.querySelector(`.film-details__comment:last-child`);
          const entry = Object.assign({}, this._film);
          entry.commentary.push({
            author: comment.querySelector(`.film-details__comment-author`).textContent,
            date: comment.querySelector(`.film-details__comment-day`).dataset.currentDate,
            emotion: comment.querySelector(`.film-details__comment-text`).textContent,
            commentary: comment.querySelector(`[name="emotion"]`).dataset.choosenEmoji,
          });

          this._onDataChange(entry, this._film);
        }

        if (evt.key === `Enter` && evt.shiftKey || evt.key === `Enter` && evt.metaKey) {
          evt.preventDefault();
          getFormData();

          this._film;
        }
      });

    this._filmPopup.getElement().querySelector(`.film-details__controls`)
      .addEventListener(`click`, this._onActiveButtonClick.bind(this));

    this._filmPopup.getElement().querySelector(`.film-details__emoji-list`)
      .addEventListener(`click`, this._onEmojiListClick.bind(this));

    render(this._container, this._filmView.getElement(), Position.BEFOREEND);
  }

  _onEmojiListClick(evt) {
    if (evt.target.tagName === `IMG`) {
      const currentEmoji = document.querySelector(`.film-details__current-emoji`);
      const activeEmoji = evt.target.dataset.activeEmoji;

      if (currentEmoji.classList.contains(`visually-hidden`)) {
        currentEmoji.classList.remove(`visually-hidden`);
        currentEmoji.src = `./images/emoji/${activeEmoji}.png`
      } else {
        currentEmoji.src = `./images/emoji/${activeEmoji}.png`
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

          case `watched`:
            entry = Object.assign({}, this._film, {
              isAdded: this._filmPopup.getElement().querySelector(`#watchlist`).checked,
              isWatched: evt.target.control.checked,
              isFavorite: this._filmPopup.getElement().querySelector(`#favorite`).checked,
            });

          case `favorite`:
            entry = Object.assign({}, this._film, {
              isAdded: this._filmPopup.getElement().querySelector(`#watchlist`).checked,
              isWatched: this._filmPopup.getElement().querySelector(`#watched`).checked,
              isFavorite: evt.target.control.checked,
            });
        }

        const middleBlock = document.querySelector(`.form-details__middle-container`);
        if (entry.isWatched) {
          middleBlock.classList.contains(`visually-hidden`) ? middleBlock.classList.remove(`visually-hidden`) : ``;
        } else {
          middleBlock.classList.contains(`visually-hidden`) ? `` : middleBlock.classList.add(`visually-hidden`);
        }
        this._onDataChange(entry, this._film);
      }

      document.querySelector(`.films-list__container`).innerHTML = ``;
      // evt.target.control.checked ? evt.target.control.checked = false : evt.target.control.checked = true;

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
      this._filmPopup.removeElement()
    }
  }
}
