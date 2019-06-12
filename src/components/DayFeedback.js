import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Picker,
  AppState,
  Platform,
  Switch
} from "react-native";
import PushController from "./PushController";
import PushNotification from "react-native-push-notification";
import TimePicker from "react-native-24h-timepicker";

class DayFeedback extends Component {
  render() {
    return (
      <View>
        <View style={styles.headerStyle}>
          <Text style={styles.headerText}>még nincs kész</Text>
        </View>
      </View>
    );
  }
}

const styles = {
  headerStyle: {
    backgroundColor: "#383f51",
    marginTop: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
    height: 60,
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headerText: {
    fontSize: 20,
    padding: 25,
    color: "white"
  }
};

export default DayFeedback;
