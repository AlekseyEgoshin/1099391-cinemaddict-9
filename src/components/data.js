export const getFilmInfo = () => ({
  id: getRandomArbitrary(0, 1000),
  movie: createFilm(),
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
      count: 0,
    },
    {
      title: `History`,
      count: 0,
    },
    {
      title: `Favorites`,
      count: 0,
    },
    {
      title: `Stats`,
      count: 0,
    }
  ]
);

const StringSize = {
  MAX: 10,
  MIN: 1,
};

const getRandomArbitrary = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const createFilm = () => {
  function createMocks(arr) {
    let oldArray = arr;
    let newMock = [];
    const quantity = getRandomArbitrary(1, 4);

    for (let i = 0; i < quantity; i++) {
      let j = getRandomArbitrary(0, oldArray.length);
      newMock.push(oldArray[j]);
      oldArray.splice(oldArray.indexOf(oldArray[j]), 1);
    }

    return newMock;
  }

  const title = [
    `The Dance of Life`,
    `Sagebrush Trail`,
    `The Man with the Golden Arm`,
    `Santa Claus Conquers the Martians`,
    `Popeye the Sailor Meets Sindbad the Sailor`,
    `The Great Flamarion`,
    `Made for Each Other`,
  ];

  const date = [
    `2019-05-11T16:12:32.554Z`,
    `1962-05-11T10:10:30.554Z`,
    `2019-10-06T16:12:32.554Z`,
    `2005-02-25T20:11:52.554Z`,
    `2012-12-27T16:16:32.554Z`,
    `1988-06-28T22:02:32.554Z`,
    `1967-03-13T23:09:32.554Z`,
  ][Math.floor(Math.random() * 7)];

  const alt = [
    `The Dance of Life`,
    `Sagebrush Trail`,
    `The Man with the Golden Arm`,
    `Santa Claus Conquers the Martians`,
    `Popeye the Sailor Meets Sindbad the Sailor`,
    `The Great Flamarion`,
    `Made for Each Other`,
  ];

  const poster = [
    `images/posters/the-dance-of-life.jpg`,
    `images/posters/sagebrush-trail.jpg`,
    `images/posters/the-man-with-the-golden-arm.jpg`,
    `images/posters/santa-claus-conquers-the-martians.jpg`,
    `images/posters/popeye-meets-sinbad.png`,
    `images/posters/the-great-flamarion.jpg`,
    `images/posters/made-for-each-other.png`,
  ];

  const director = [
    `Anthony Russo`,
    `Joe Russo`,
    `Jon Favreau`,
    `Louis Leterrier`,
    `Kenneth Branagh`,
    `Joe Johnston`,
    `Joss Whedon`,
  ][Math.floor(Math.random() * 7)];

  const writers = [
    `Stan Lee`,
    `Taika Waititi`,
    `Andi Bushell`,
    `Edward Norton`,
    `James Gunn`,
    `Joss Whedon`,
  ];

  const actors = [
    `Jim Carrey`,
    `Bred Pitt`,
    `Robert Downey Jr.`,
    `Cris Evans`,
    `Cris Pratt`,
    `Kit Harrington`,
    `Scarlett Johanson`,
    `Mark Ruffalo`,
    `Salma Haek`,
    `Bri Larson`,
  ];

  const ageRating = [
    0,
    6,
    12,
    16,
    18,
  ][Math.floor(Math.random() * 5)];

  const releaseCountry = [
    `Usa`,
    `Finland`,
    `Polska`,
    `Russia`,
    `Ukrain`,
    `Canada`,
    `Italia`,
    `France`,
    `Germany`,
    `China`,
    `Japan`,
  ][Math.floor(Math.random() * 11)];

  const runtime = [
    110,
    150,
    90,
    30,
    105,
    132,
    155,
    198,
    47,
  ][Math.floor(Math.random() * 7)];

  const genre = [
    `musical`,
    `action`,
    `drama`,
    `comedy`,
    `adventure`,
    `documentary`,
    `horror`,
    `science fiction`,
    `crime`,
  ];

  const description = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`,
  ][Math.floor(Math.random() * 3)];

  const index = Math.floor(getRandomArbitrary(0, title.length));
  const totalRating = Math.ceil((Math.random()) * 100) / 10;

  return {
    title: title[index],
    alternativeTitle: alt[index],
    totalRating,
    poster: poster[index],
    ageRating,
    director,
    runtime,
    writers: createMocks(writers),
    actors: createMocks(actors),
    release: {
      date,
      releaseCountry
    },
    genre: createMocks(genre),
    description
  };
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

  const author = [`Kristofer Nolan`, `Taika Vaititi`, `Joe Russo`, `George Lucas`, `Leopold`];
  const date = [
    `2019-10-02T12:36:30+05:00`,
    `2019-10-02T12:34:12+05:00`,
    `2019-10-02T12:30:12+05:00`,
    `2019-10-02T12:25:12+05:00`,
    `2019-10-02T11:34:12+05:00`,
    `2019-10-02T07:34:12+05:00`,
  ];
  const emotion = [`smile`, `sleeping`, `puke`, `angry`];

  const count = Math.floor(getRandomArbitrary(StringSize.MIN, StringSize.MAX));
  const commentInfo = new Array(count);
  for (let i = 0; i < count; i++) {
    commentInfo[i] = {};
    commentInfo[i].id = getRandomArbitrary(1, 1000);
    commentInfo[i].author = author[Math.floor(Math.random() * author.length)];
    commentInfo[i].date = date[Math.floor(Math.random() * date.length)];
    commentInfo[i].emotion = emotion[Math.floor(Math.random() * emotion.length)];
    commentInfo[i].commentary = comments[Math.floor(Math.random() * comments.length)];
  }

  return commentInfo;
};
