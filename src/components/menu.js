export const createMenu = (arr) => `
  <nav class="main-navigation">
    ${Array.from(arr).map((filter) => `
      <a
        href="#${filter.title.split(` `)[0].toLowerCase()}"
        class="main-navigation__item${!filter.count && !filter.title === `Stats` ? ` main-navigation__item--active` : ``}${(filter.title === `Stats`) ? ` main-navigation__item--additional` : ``}"
      />${filter.title}${!(filter.title === `Stats`) ? ` <span class="main-navigation__item-count main-navigation__${filter.title.toLowerCase().replace(` `, `-`)}">${filter.count}</span>` : ``}</a>
    `).join(``)}
  </nav>
`;
