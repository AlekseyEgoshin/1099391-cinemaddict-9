import {Statistics} from '../statistics';
import {Position, render} from '../utils';
import Chart from 'chart.js';

export class StatisticController {
  constructor(container) {
    this._container = container;
    this._statistic = new Statistics();
    this._films = [];
    this._watchingTime = 0;
    this._charter = ``;

    this.init();
  }

  init() {
    this._statistic.getElement().classList.add(`visually-hidden`);
    render(this._container, this._statistic.getElement(), Position.BEFOREEND);
  }

  show(films) {
    const genreSorting = (genres) => {
      let sortable = [];
      for (let genre in genres) {
        if ({}.hasOwnProperty.call(genres, genre)) {
          sortable.push([genre, genres[genre]]);
        }
      }
      const genresFiltredData = sortable.slice(0, 5).sort((a, b) => b[1] - a[1]);

      mostPopularGenre.textContent = genresFiltredData[0][0];

      let returnedData = {};
      genresFiltredData.forEach((genre) => (returnedData[genre[0]] = genre[1]));
      return returnedData;
    };

    this._films = films;
    this._statistic.getElement().classList.remove(`visually-hidden`);

    const alreadyWatchedTextContent = document.querySelector(`.main-navigation__history`).textContent;
    const currentElemnt = document.querySelector(`.statistic__watched-count`);
    currentElemnt.textContent = alreadyWatchedTextContent;

    const mostPopularGenre = this._statistic.getElement().querySelector(`.statistic__most-popular`);
    const totalDuration = this._statistic.getElement().querySelector(`.statistic__watching-time`);

    let statisticGenre = {};
    this._films.forEach(({movie: {genre}, movie: {runtime}, userDetails: {alreadyWatched}}) => {
      if (genre.length) {
        genre.forEach((genreItem) => {
          if (statisticGenre[genreItem]) {
            statisticGenre[genreItem] += 1;
          } else {
            statisticGenre[genreItem] = 1;
          }
        });
      }

      if (alreadyWatched) {
        this._watchingTime += runtime;
      }
    });
    const calculateTime = {
      hours: Math.floor(this._watchingTime / 60),
      minutes: (this._watchingTime.runtime - Math.floor(this._watchingTime.runtime / 60) * 60 <= 0) ? 0 : (this._watchingTime - Math.floor(this._watchingTime / 60) * 60)
    };

    const statisticTimeTemplate = `${calculateTime.hours} <span class="statistic__item-description">h</span> ${calculateTime.minutes} <span class="statistic__item-description">m</span>`;
    totalDuration.innerHTML = statisticTimeTemplate;

    const sortedGenres = genreSorting(statisticGenre);

    const statisticCanvas = this._statistic.getElement().querySelector(`.statistic__chart`);

    const chartOptions = {
      type: `horizontalBar`,
      data: {
        labels: [...Object.keys(sortedGenres)],
        datasets: [{
          data: [...Object.values(sortedGenres)],
          backgroundColor: `#fbe44d`,
        }],
      },
      tooltips: {
        enabled: false
      },
      hover: {
        animationDuration: 0
      },
      responsive: true,
      options: {
        scales: {
          yAxes: [{
            barThickness: 35,
            barPercentage: 1,
            categoryPercentage: 2,
            ticks: {
              beginAtZero: true,
              fontSize: 20,
              fontColor: `#ffffff`,
              display: true,
              padding: 80
            },
            gridLines: {
              offsetGridLines: false,
              display: false,
              drawBorder: false
            }
          }],
          xAxes: [{
            ticks: {
              display: false,
              min: 0
            },
            gridLines: {
              display: false,
              drawBorder: false
            }
          }]
        },
        legend: {
          position: `left`,
          display: false,
        },
        animation: {
          onComplete() {
            const chartInstance = this.chart;
            const ctx = chartInstance.ctx;
            ctx.fillStyle = `#fff`;
            Chart.helpers.each(this.data.datasets.forEach(function (dataset, i) {
              const meta = chartInstance.controller.getDatasetMeta(i);
              Chart.helpers.each(meta.data.forEach(function (bar, index) {
                const data = dataset.data[index];
                if (i === 0) {
                  ctx.fillText(data, 140, bar._model.y + 4);
                } else {
                  ctx.fillText(data, bar._model.x - 25, bar._model.y + 4);
                }
              }));
            }));
          }
        },
      }
    };

    this._charter = new Chart(statisticCanvas, chartOptions);
  }

  hide() {
    this._statistic.getElement().classList.add(`visually-hidden`);
  }
}
