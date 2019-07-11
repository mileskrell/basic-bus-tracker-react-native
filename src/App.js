import React from "react";
import { StyleSheet, Text, View } from "react-native";

class App extends React.Component {
  render() {
    return (
      <View style={styles.root}>
        <Text>Hello, world!</Text>
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
