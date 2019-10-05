import {AbstractComponent} from './abstract-component';

export class SearchResultGroup extends AbstractComponent {
  getTemplate() {
    return `<section class="result__group">
      <div class="result__films films-list__container"></div>
      <!--Append tasks here-->
    </section>`;
  }
}
