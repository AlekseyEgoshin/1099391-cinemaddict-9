import {AbstractComponent} from './abstract-component';

export class FilmList extends AbstractComponent {
  getTemplate() {
    return `<section class="films-list">
        <h2 class="films-list__title">All movies. Upcoming</h2>
        <div class="films-list__container"></div>
      </section>
    `;
  }
}
