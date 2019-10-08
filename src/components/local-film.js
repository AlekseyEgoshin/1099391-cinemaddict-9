export default class LocalFilm {
  constructor(data) {
    this.id = data[`id`];
    this.commentary = data[`commentary`];
    this.filmInfo = {
      title: data[`movie`][`title`],
      alternativeTitle: data[`movie`][`alternativeTitle`],
      totalRating: data[`movie`][`totalRating`],
      poster: data[`movie`][`poster`],
      ageRating: data[`movie`][`ageRating`],
      director: data[`movie`][`director`],
      writers: data[`movie`][`writers`],
      actors: data[`movie`][`actors`],
      release: {
        date: data[`movie`][`release`][`date`],
        releaseCountry: data[`movie`][`release`][`releaseCountry`],
      },
      runtime: data[`movie`][`runtime`],
      genre: data[`movie`][`genre`],
      description: data[`movie`][`description`],
    };
    this.userDetails = {
      personalRating: data[`userDetails`][`personalRating`],
      watchlist: data[`userDetails`][`watchlist`],
      alreadyWatched: data[`userDetails`][`alreadyWatched`],
      watchingDate: data[`userDetails`][`watchingDate`],
      favorite: data[`userDetails`][`favorite`],
    };
  }

  toRAW() {
    return {
      'id': this.id,
      'comments': this.commentary,
      'film_info': {
        'title': this.filmInfo.title,
        'alternative_title': this.filmInfo.alternativeTitle,
        'total_rating': this.filmInfo.totalRating,
        'poster': this.filmInfo.poster,
        'age_rating': this.filmInfo.ageRating,
        'director': this.filmInfo.director,
        'writers': this.filmInfo.writers,
        'actors': this.filmInfo.actors,
        'release': {
          'date': new Date(this.filmInfo.release.date).toISOString(),
          'release_country': this.filmInfo.release.releaseCountry
        },
        'runtime': this.filmInfo.runtime,
        'genre': this.filmInfo.genre || [],
        'description': this.filmInfo.description
      },
      'user_details': {
        'personal_rating': this.userDetails.personalRating,
        'watchlist': this.userDetails.watchlist,
        'already_watched': this.userDetails.alreadyWatched,
        'watching_date': new Date(this.userDetails.watchingDate).toISOString(),
        'favorite': this.userDetails.favorite
      }
    };
  }
}
