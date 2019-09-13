import {createElement} from './utils';

export class Menu {
  constructor(filters) {
    this._filters = filters;
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
    return `<nav class="main-navigation">
        ${Array.from(this._filters).map((filter) => `
          <a
            href="#${filter.title.split(` `)[0].toLowerCase()}"
            class="main-navigation__item${!filter.count && !filter.title === `Stats` ? ` main-navigation__item--active` : ``}${(filter.title === `Stats`) ? ` main-navigation__item--additional` : ``}"
          />${filter.title}${!(filter.title === `Stats`) ? ` <span class="main-navigation__item-count main-navigation__${filter.title.toLowerCase().replace(` `, `-`)}">${filter.count}</span>` : ``}</a>
        `).join(``)}
      </nav>
    `;
  }
}
