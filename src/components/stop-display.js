import React from "react";
import { View, StyleSheet, Text } from "react-native";

class StopDisplay extends React.Component {
  getStopString = stop => {
    let result = ": ";

    for (let i = 0; i < stop.arrivalEstimates.length; i++) {
      result += stop.arrivalEstimates[i] + ", ";
    }

    return result.substring(0, result.length) + "minutes";
  };

  render() {
    return (
      <View style={styles.stopDisplay}>
        <Text style={styles.stopName}>{this.props.stop.stopName + ":"}</Text>
        <Text>{this.props.stop.arrivalEstimates.join(", ")}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  stopDisplay: {
    width: "100%",
    alignItems: "center",
    marginBottom: "5%"
  },
  stopName: {
    fontWeight: "bold"
  }
});

export default StopDisplay;
