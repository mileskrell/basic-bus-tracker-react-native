import { observable, action } from "mobx";
import { fetchFakeRoutes, fetchRoutes } from "../repo/repository";

export default class BusViewModel {
  /**
   * Array of routes
   * @see fetchFakeRoutes for the structure
   */
  @observable routes = [];

  constructor() {
    // this.loadFakeRoutes();
    this.loadRoutes();
  }

  @action
  loadRoutes = async () => {
    this.routes = await fetchRoutes();
  };

  @action
  loadFakeRoutes = async () => {
    this.routes = await fetchFakeRoutes();
  };
}
