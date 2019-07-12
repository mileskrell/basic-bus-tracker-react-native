import { sleep } from "../util/utils";

const AGENCY = 1;
const GEO_AREA = "40.531576, -74.479837|40.475925, -74.423951";

/**
 * Fetch routes from TransLoc.
 *
 * @return list of routes, structured like in
 */
export function fetchRoutes() {}

export async function fetchFakeRoutes() {
  await sleep(1500);

  return [
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
}
