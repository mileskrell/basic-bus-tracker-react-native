import React from "react";
import { View, StyleSheet, Text } from "react-native";

class StopDisplay extends React.Component {
  prepareArrivalEstimates = () => {
    const now = new Date().getTime();

    return this.props.stop.arrivalEstimates
      .map(timestamp => new Date(timestamp).getTime() - now)
      .map(ms => ms / 1000 / 60)
      .map(estimate => Math.round(estimate));
  };

  getEstimateString = () => {
    const times = this.prepareArrivalEstimates();

    if (times.length === 0) {
      return "No estimated arrivals";
    }

    switch (times.length) {
      case 1:
        switch (times[0]) {
          case "0":
            return "Arriving now";
          case "1":
            return "Arriving in 1 minute";
          default:
            return `Arriving in ${times[0]} minutes`;
        }
      case 2:
        return `Arriving in ${times[0]} and ${times[1]} minutes`;
    }

    let timesString = "Arriving in ";
    for (let i = 0; i < times.length - 1; i++) {
      timesString += times[i] + ", ";
    }
    timesString += `and ${times[times.length - 1]} minutes`;

    return timesString;
  };

  getTextColor = () => {
    const arrivalEstimates = this.prepareArrivalEstimates();

    if (arrivalEstimates.length === 0) {
      return;
    }
    if (Math.min(...arrivalEstimates) <= 5) {
      return "#db4437"; // red
    }
    if (Math.min(...arrivalEstimates) <= 10) {
      return "#f4b400"; // yellow
    }
    return "#4285f4"; // blue
  };

  render() {
    return (
      <View style={styles.stopDisplay}>
        <Text style={styles.stopName}>{this.props.stop.stopName + ":"}</Text>
        <Text style={[styles.stopEstimates, { color: this.getTextColor() }]}>
          {this.getEstimateString()}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  stopDisplay: {
    width: "90%",
    alignSelf: "center",
    padding: 5,
    marginBottom: "5%",
    borderWidth: 2,
    borderRadius: 4,
    borderColor: "#aaaaaa"
  },
  stopName: {
    alignSelf: "center",
    textAlign: "center",
    fontWeight: "bold"
  },
  stopEstimates: {
    alignSelf: "center",
    textAlign: "center"
  }
});

export default StopDisplay;
