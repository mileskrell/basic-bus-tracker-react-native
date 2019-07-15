import React from "react";
import { View, StyleSheet, Text } from "react-native";

class StopDisplay extends React.Component {
  getEstimateString = arrivalEstimates => {
    if (arrivalEstimates.length === 0) {
      return "No estimated arrivals";
    }

    const now = new Date().getTime();

    const times = arrivalEstimates
      .map(timestamp => new Date(timestamp).getTime() - now)
      .map(ms => ms / 1000 / 60)
      .map(estimate => Math.round(estimate));

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

  render() {
    return (
      <View style={styles.stopDisplay}>
        <Text style={styles.stopName}>{this.props.stop.stopName + ":"}</Text>
        <Text>{this.getEstimateString(this.props.stop.arrivalEstimates)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  stopDisplay: {
    width: "100%",
    alignItems: "center",
    padding: 5,
    marginBottom: "5%",
    borderWidth: 2,
    borderRadius: 4,
    borderColor: "#aaaaaa"
  },
  stopName: {
    fontWeight: "bold"
  }
});

export default StopDisplay;
