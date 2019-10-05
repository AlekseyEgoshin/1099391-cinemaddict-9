import {AbstractComponent} from './abstract-component';

export class Content extends AbstractComponent {
  getTemplate() {
    return `<section class="films"></section>`;
  }
}
