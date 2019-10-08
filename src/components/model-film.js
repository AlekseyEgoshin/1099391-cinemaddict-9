export class ModelFilm {
  constructor(data) {
    this.id = data[`id`];
    this.movie = {
      title: data[`film_info`].title,
      alternativeTitle: data[`film_info`].alternative_title,
      totalRating: data[`film_info`].total_rating,
      poster: data[`film_info`].poster,
      ageRating: data[`film_info`].age_rating,
      director: data[`film_info`].director,
      writers: data[`film_info`].writers,
      actors: data[`film_info`].actors,
      release: {
        date: data[`film_info`].release.date,
        releaseCountry: data[`film_info`].release.release_country
      },
      runtime: data[`film_info`].runtime,
      genre: data[`film_info`].genre,
      description: data[`film_info`].description
    };
    this.commentary = data[`comments`];
    this.userDetails = {
      personalRating: data[`user_details`].personal_rating,
      watchlist: data[`user_details`].watchlist,
      alreadyWatched: data[`user_details`].already_watched,
      watchingDate: data[`user_details`].watching_date,
      favorite: data[`user_details`].favorite,
    };
  }

  static parseFilm(data) {
    return new ModelFilm(data);
  }

  static parseFilms(data) {
    return data.map(ModelFilm.parseFilm);
  }
}
