export const getFilmInfo = () => ({
  movie: createFilm(),
  rating: Math.ceil((Math.random()) * 100) / 10,
  year: [
    `1990`,
    `1997`,
    `1975`,
    `2002`,
    `1989`,
    `1988`,
    `1971`,
    `2007`,
    `2004`,
  ][Math.floor(Math.random() * 7)],
  // Предположим, что длительность дается в минутах
  duration: [
    110,
    150,
    90,
    30,
    105,
    132,
    155,
    198,
    47,
  ][Math.floor(Math.random() * 7)],
  genre: [
    `musical`,
    `action`,
    `drama`,
    `comedy`,
    `adventure`,
    `documentary`,
    `horror`,
    `science fiction`,
    `crime`,
  ][Math.floor(Math.random() * 9)],
  description: [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`,
  ][Math.floor(Math.random() * 3)],
  commentary: createComments(),
  isAdded: Boolean(Math.round(Math.random())),
  isWatched: Boolean(Math.round(Math.random())),
  isFavorite: Boolean(Math.round(Math.random())),
});

export const getFilters = () => (
  [
    {
      title: `All movies`,
      count: 0,
    },
    {
      title: `Watchlist`,
      count: 1,
    },
    {
      title: `History`,
      count: 2,
    },
    {
      title: `Favorites`,
      count: 3,
    },
    {
      title: `Stats`,
      count: 0,
    }
  ]
);

const StringSize = {
  MAX: 10,
  MIN: 0,
};

const getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min;
};

const createFilm = () => {
  const title = [
    `The Dance of Life`,
    `Sagebrush Trail`,
    `The Man with the Golden Arm`,
    `Santa Claus Conquers the Martians`,
    `Popeye the Sailor Meets Sindbad the Sailor`,
    `The Great Flamarion`,
    `Made for Each Other`,
  ];

  const poster = [
    `the-dance-of-life.jpg`,
    `sagebrush-trail.jpg`,
    `the-man-with-the-golden-arm.jpg`,
    `santa-claus-conquers-the-martians.jpg`,
    `popeye-meets-sinbad.png`,
    `the-great-flamarion.jpg`,
    `made-for-each-other.png`,
  ];
  const index = Math.floor(getRandomArbitrary(0, title.length));

  return {title: title[index], src: poster[index]};
};

const createComments = () => {
  const comments = [
    `Interesting setting and a good cast`,
    `Booooooooooring`,
    `Very very old. Meh`,
    `Almost two hours? Seriously?`,
    `I think it is the best film`,
    `Sad story`,
  ];

  const count = Math.floor(getRandomArbitrary(StringSize.MIN, StringSize.MAX));
  const commentaries = new Set();

  for (let i = 0; i < count; i++) {
    commentaries.add(comments[Math.floor(Math.random() * comments.length)]);
  }

  return commentaries;
};
