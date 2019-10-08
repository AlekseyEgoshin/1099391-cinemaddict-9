export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const changeStatisticsPoint = (filmCards) => {
  const watchlist = document.querySelector(`.main-navigation__watchlist`);
  const history = document.querySelector(`.main-navigation__history`);
  const favorites = document.querySelector(`.main-navigation__favorites`);

  watchlist.textContent = 0;
  history.textContent = 0;
  favorites.textContent = 0;

  filmCards.forEach((filmCard) => {
    // Обновляем значение фильтра repeating
    if (filmCard.userDetails.watchlist) {
      watchlist.textContent = parseFloat(watchlist.textContent) + 1;
    }

    // Обновляем значение фильтра history
    if (filmCard.userDetails.alreadyWatched) {
      history.textContent = parseFloat(history.textContent) + 1;
    }

    // Обновляем значение фильтра favorites
    if (filmCard.userDetails.favorite) {
      favorites.textContent = parseFloat(favorites.textContent) + 1;
    }
  });
};

export const render = (container, element, place) => {
  switch (place) {
    case Position.AFTERBEGIN:
      container.prepend(element);
      break;
    case Position.BEFOREEND:
      container.append(element);
      break;
  }
};

export const unrender = (element) => {
  if (element) {
    element.remove();
  }
};

export const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const Key = {
  ESCAPE_IE: `Escape`,
  ESCAPE: `Esc`,
  ENTER: `Enter`,
};

export const ActionType = {
  createComment: `create`,
  deleteComment: `delete`,
  changeStatistic: `changeFilm`,
};

export const FilmRating = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
  SIX: 6,
  SEVEN: 7,
  EIGHT: 8,
  NINE: 9,
};

export const shake = (element) => {
  const ANIMATION_TIMEOUT = 600;
  element.style.animation = `shake ${ANIMATION_TIMEOUT / 1000}s`;

  setTimeout(() => {
    element.style.animation = ``;
  }, ANIMATION_TIMEOUT);
};

export const getUserRank = (filmsData) => {
  if (!filmsData) {
    return ``;
  }

  const watchedFilmsList = filmsData.filter(({userDetails}) => userDetails.alreadyWatched).length;

  if (watchedFilmsList === 0) {
    return ``;
  }
  if (watchedFilmsList <= 10) {
    return `Novice`;
  }
  if (watchedFilmsList <= 20) {
    return `Fan`;
  }
  if (watchedFilmsList >= 21) {
    return `Movie Buff`;
  }

  return `undefined`;
};

export const AUTHORIZATION = `Basic ${Math.random().toString(36).slice(2)}`;
export const END_POINT = `https://htmlacademy-es-9.appspot.com/cinemaddict`;
