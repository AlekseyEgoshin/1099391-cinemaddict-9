import {UserRank} from '../user-rank';
import {getUserRank, Position, render, unrender} from '../utils';


export default class UserRankController {
  constructor(container, films) {
    this._container = container;
    this._filmsData = films;

    this._userRank = new UserRank(getUserRank(this._filmsData));

    this._init();
  }

  updateView(updatedFilmsData) {
    unrender(this._userRank.getElement());
    this._userRank.removeElement();

    this._filmsData = updatedFilmsData;
    this._userRank = new UserRank(getUserRank(this._filmsData));

    this._init();
  }

  _init() {
    render(this._container, this._userRank.getElement(), Position.BEFOREEND);
  }
}
