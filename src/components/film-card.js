export const createFilmCard = ({movie, rating, year, duration, genre, description, commentary, isAdded, wasWatched, isFavorite}) => `
  <article class="film-card">
    <h3 class="film-card__title">${movie.title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${year}</span>
      <span class="film-card__duration">${(duration) ? `${Math.floor(duration / 60)}h ${(duration - Math.floor(duration / 60) * 60 <= 0) ? `0` : (duration - Math.floor(duration / 60) * 60)}m` : `0h 0m`}</span>
      <span class="film-card__genre">${genre}</span>
    </p>
    <img src="./images/posters/${movie.src}" alt="" class="film-card__poster">
    <p class="film-card__description">${description.length > 137 ? `${description.substring(0, 137)}...` : description}</p>
    <a class="film-card__comments">${commentary.size} comments</a>
    <form class="film-card__controls">
      <button 
        class="film-card__controls-item button film-card__controls-item--add-to-watchlist${isAdded ? ` film-card__controls-item--active` : ``}"
      >Add to watchlist</button>
      <button
        class="film-card__controls-item button film-card__controls-item--mark-as-watched${wasWatched ? ` film-card__controls-item--active` : ``}"
      >Mark as watched</button>
      <button
        class="film-card__controls-item button film-card__controls-item--favorite${isFavorite ? ` film-card__controls-item--active` : ``}"
      >Mark as favorite</button>
    </form>
  </article>
`;
