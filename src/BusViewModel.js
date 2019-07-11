import { observable, action } from "mobx";
import { sleep } from "./utils";

export default class BusViewModel {
  /**
   * Array of routes
   * @type {Array}
   */
  @observable routes = [];

  constructor() {
    this.loadFakeRoutes();
  }

  @action
  loadFakeRoutes = async () => {
    await sleep(1500);

    this.routes = [
      {
        routeName: "Summer 1",
        stops: [
          {
            stopName: "Visitor Center",
            arrivalEstimates: [1, 6, 11]
          },
          {
            stopName: "Werblin Back Entrance",
            arrivalEstimates: [3, 8, 13]
          },
          {
            stopName: "Hill Center",
            arrivalEstimates: [5, 10, 15]
          }
        ]
      },
      {
        routeName: "Summer 2",
        stops: [
          {
            stopName: "Busch Student Center",
            arrivalEstimates: [8, 13, 18]
          },
          {
            stopName: "Davidson Hall",
            arrivalEstimates: [10, 15, 20]
          },
          {
            stopName: "Library of Science",
            arrivalEstimates: [12, 17, 22]
          }
        ]
      }
    ];
    console.log();
  };

  @action
  loadRoutes = () => {};
}
