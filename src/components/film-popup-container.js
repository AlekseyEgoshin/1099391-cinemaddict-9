import {AbstractComponent} from './abstract-component';

export class FilmPopupContainer extends AbstractComponent {
  getTemplate() {
    return `<section class="film-details">
        <form class="film-details__inner" action="" method="post">
        </form>
      </section>
    `;
  }
}
