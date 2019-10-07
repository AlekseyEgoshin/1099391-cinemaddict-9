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

  toRAW() {
    return {
      "id": this.id,
      "comments": [...this.commentary],
      "film_info": {
        "title": this.movie.title,
        "alternative_title": this.movie.alternativeTitle,
        "total_rating": this.movie.totalRating,
        "poster": this.movie.poster,
        "age_rating": this.movie.ageRating,
        "director": this.movie.director,
        "writers": this.movie.writers,
        "actors": this.movie.actors,
        "release": {
          "date": new Date(this.movie.release.date).toISOString(),
          "release_country": this.movie.release.releaseCountry
        },
        "runtime": this.movie.runtime,
        "genre": this.movie.genre || [],
        "description": this.movie.description
      },
      "user_details": {
        "personal_rating": this.userDetails.personalRating,
        "watchlist": this.userDetails.watchlist,
        "already_watched": this.userDetails.alreadyWatched,
        "watching_date": new Date(this.userDetails.watchingDate).toISOString(),
        "favorite": this.userDetails.favorite
      }
    };
  }
}

export class ModelCommentary {
  constructor(data) {
    this.id = data[`id`];
    this.author = data[`author`];
    this.comment = data[`comment`];
    this.date = data[`date`];
    this.emotion = data[`emotion`];
  }

  static parseComment(data) {
    return new ModelCommentary(data);
  }

  static parseComments(data) {
    return data.map(ModelCommentary.parseComment);
  }
}
