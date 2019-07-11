import React from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import ViewPager from "@react-native-community/viewpager";
import { observer } from "mobx-react";
import BusViewModel from "./BusViewModel";
import RouteDisplay from "./components/route-display";

@observer
class App extends React.Component {
  model = new BusViewModel();

  render() {
    return (
      <View style={styles.fillSpace}>
        <ViewPager style={styles.viewPager} initialPage={0}>
          {this.model.routes.length > 0 &&
            this.model.routes.map(route => (
              <View key={route.routeName}>
                <RouteDisplay route={route} />
              </View>
            ))}
          {this.model.routes.length === 0 && (
            <View style={styles.loadingView}>
              <ActivityIndicator size={"large"} />
              <Text style={styles.loadingText}>
                Getting arrival estimates...
              </Text>
            </View>
          )}
        </ViewPager>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fillSpace: {
    flex: 1
  },
  viewPager: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  loadingView: {
    flex: 1,
    paddingTop: "20%",
    alignItems: "center"
  },
  loadingText: {
    marginTop: "5%"
  }
});

export default App;
