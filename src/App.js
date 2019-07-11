import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ViewPager from "@react-native-community/viewpager";
import BusViewModel from "./BusViewModel";

class App extends React.Component {
  render() {
    const model = new BusViewModel();

    return (
      <View style={styles.root}>
        <ViewPager initialPage={0}>
          <View key="1">
            <Text>First page</Text>
          </View>
          <View key="2">
            <Text>Second page</Text>
          </View>
        </ViewPager>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default App;
