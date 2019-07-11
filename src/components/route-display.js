import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import StopDisplay from "./stop-display";

/**
 * Represents a page displaying one route.
 *
 * Must be provided with one prop: a "route" object, containing
 * the route name and a list of "stop" objects.
 */
class RouteDisplay extends React.Component {
  render() {
    return (
      <View key={this.props.route.routeName}>
        <Text style={styles.busHeader}>{this.props.route.routeName}</Text>
        <FlatList
          contentContainerStyle={styles.list}
          keyExtractor={(item, index) => item.stopName}
          data={this.props.route.stops}
          renderItem={({ item, index }) => (
            <StopDisplay stop={this.props.route.stops[index]} />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  busHeader: {
    marginTop: "10%",
    marginBottom: "10%",
    alignSelf: "center",
    fontSize: 20
  },
  list: {
    alignItems: "center"
  }
});

export default RouteDisplay;
