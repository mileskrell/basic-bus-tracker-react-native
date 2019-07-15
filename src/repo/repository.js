import {
  fetchTransLocArrivalEstimates,
  fetchTransLocRoutes,
  fetchTransLocStops
} from "../net/transloc-service";

export async function fetchFakeRoutes() {
  return [
    {
      routeId: "123",
      routeName: "Summer 1",
      routeColor: "#3388aa",
      stops: [
        {
          stopId: "1111",
          stopName: "Visitor Center",
          arrivalEstimates: [1, 6, 11]
        },
        {
          stopId: "2222",
          stopName: "Werblin Back Entrance",
          arrivalEstimates: [3, 8, 13]
        },
        {
          stopId: "3333",
          stopName: "Hill Center",
          arrivalEstimates: [5, 10, 15]
        }
      ]
    },
    {
      routeId: "456",
      routeName: "Summer 2",
      routeColor: "#aa8833",
      stops: [
        {
          stopId: "4444",
          stopName: "Busch Student Center",
          arrivalEstimates: [8, 13, 18]
        },
        {
          stopId: "5555",
          stopName: "Davidson Hall",
          arrivalEstimates: [10, 15, 20]
        },
        {
          stopId: "6666",
          stopName: "Library of Science",
          arrivalEstimates: [12, 17, 22]
        }
      ]
    }
  ];
}

/**
 * Fetch routes from TransLoc.
 *
 * @return list of routes.
 * @see fetchFakeRoutes for the structure
 */
export async function fetchRoutes() {
  /** Little note before we begin: this would be a lot simpler if the "is_active" field
   * from routes.json actually worked. But it doesn't, at least with Rutgers. So the
   * first endpoint we hit is actually arrival-estimates.json, which we use to figure
   * out which routes are active from whether they have arrival estimates.
   *
   * The problem with this is there's no way to know if a route is running but just
   * doesn't have any arrival estimates. So when there aren't any arrival estimates for
   * a route, it just isn't shown to the user at all.
   */

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // First we look at the arrival estimates to figure out which routes are actually active
  const arrivalEstimates = await fetchTransLocArrivalEstimates();

  let returnMeRoutes = arrivalEstimates
    // flat map to a list of arrival estimate objects
    .flatMap(predictionListBundle => predictionListBundle.arrivals)
    // map each of those objects to the route ID the object says it's for
    .map(arrivalBundle => arrivalBundle.route_id)
    // filter out duplicate route IDs
    .filter((routeId, index, array) => index === array.indexOf(routeId))
    // map each route ID to an object. Later we'll also add the route's name, color, and stop predictions.
    .map(routeId => ({ routeId: routeId }));

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const rutgersRoutes = await fetchTransLocRoutes();

  // For each route, add the route's name, color, and associated stop IDs.
  returnMeRoutes.forEach(activeRoute => {
    const thisRouteInfo = rutgersRoutes.filter(rutgersRoute => rutgersRoute.route_id === activeRoute.routeId)[0];
    if (thisRouteInfo !== undefined) {
      activeRoute.routeName = thisRouteInfo.long_name;
      activeRoute.routeColor = "#" + thisRouteInfo.color;
      activeRoute.stops = thisRouteInfo.stops.map(stop => ({ stopId: stop }));
    }
  });

  // Next we'll remove the routes that...don't have names? That's why we needed that
  // "thisRouteInfo !== undefined" check above - there are apparently predictions for
  // routes that...don't exist? Idk, but ok.
  returnMeRoutes = returnMeRoutes.filter(route => route.routeName !== undefined);

  // Next we'll add the predictions to our data
  returnMeRoutes.forEach(returningRoute => {
    let returningRouteId = returningRoute.routeId;
    returningRoute.stops.forEach(returningStop => {
      let returningStopId = returningStop.stopId;
      returningStop.arrivalEstimates = arrivalEstimates
        // Make sure stop ID matches
        .filter(predictionListBundle => predictionListBundle.stop_id === returningStopId)
        // Flat map so we have a list of arrival bundles
        .flatMap(predictionListBundle => predictionListBundle.arrivals)
        // Make sure route ID matches
        .filter(arrivalBundle => arrivalBundle.route_id === returningRouteId)
        // Map each bundle to the arrival estimate it contains
        .map(arrivalBundle => arrivalBundle.arrival_at);
    });
  });

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Finally, we'll get the names of all the stops
  const rutgersStops = await fetchTransLocStops();

  returnMeRoutes.forEach(route => {
    route.stops.forEach(stop => {
      stop.stopName = rutgersStops.filter(
        rutgersStop => rutgersStop.stop_id === stop.stopId
      )[0].name;
    });
  });

  returnMeRoutes = returnMeRoutes.sort((routeA, routeB) => {
    if (routeA.routeName < routeB.routeName) {
      return -1;
    }

    if (routeA.routeName > routeB.routeName) {
      return 1;
    }

    return 0;
  });

  // Move RBHS to the end if there's <= 3 routes
  if (
    returnMeRoutes.length > 0 &&
    returnMeRoutes.length < 4 &&
    returnMeRoutes[0].routeName === "Route RBHS"
  ) {
    const rbhs = returnMeRoutes.shift();
    returnMeRoutes.push(rbhs);
  }

  return returnMeRoutes;
}
