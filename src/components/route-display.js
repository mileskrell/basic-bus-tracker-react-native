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
      <View style={styles.fillSpace} key={this.props.route.routeName}>
        <Text style={[styles.busHeader, { color: this.props.route.routeColor }]}>
          {this.props.route.routeName}
        </Text>
        <FlatList
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
  fillSpace: {
    flex: 1
  },
  busHeader: {
    marginTop: "5%",
    marginBottom: "5%",
    alignSelf: "center",
    fontSize: 20
  }
});

export default RouteDisplay;
