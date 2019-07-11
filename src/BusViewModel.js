import { observable, action } from "mobx";

export default class BusViewModel {
  /**
   * Array of routes
   * @type {Array}
   */
  @observable routes = [];

  @action
  loadRoutes;

  @action
  addRoute = route => {
    this.routes.push(route);
  };
}

let sampleRoutes = [
  {
    "Summer 1": [
      { "College Ave Student Center": [1, 6, 11] },
      { "Scott Hall": [3, 8, 13] }
    ]
  },
  {
    "Summer 2": [
      { "College Ave Student Center": [8, 13, 18] },
      { "Scott Hall": [10, 15, 20] }
    ]
  }
];
