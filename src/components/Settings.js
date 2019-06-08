import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Picker,
  AppState,
  Platform
} from "react-native";
import PushController from './PushController';
import PushNotification from 'react-native-push-notification';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.handleAppStateChange = this.handleAppStateChange.bind(this);
        this.state = {
          hour: '5',
        };
        /*let date = new Date(Date.now() + (this.state.hour * 1000));
        if (Platform.OS === 'ios') {
            date = date.toISOString();
        }*/
    }
     
    componentDidMount(){
        AppState.addEventListener('change', this.handleAppStateChange);
    }

    componentWillUnmount(){
        AppState.removeEventListener('change', this.handleAppStateChange);
    }
    handleAppStateChange(appState){
        if (appState === 'background') {
            PushNotification.localNotificationSchedule({
                //... You can use all the options from localNotifications
                message: "My Notification Message", // (required)
                date: new Date(Date.now() + (this.state.hour * 1000)) // in 60 secs
              });
        }
    }
    render () {
        return (
            <View>
                <View style={styles.headerStyle}>
                    <Text style={styles.headerText}>Settings</Text>
                </View>
                <Text>Push Notification</Text>
                <Picker
                    selectedValue={this.state.hour}
                    style={{height: 100, width: 120, alignSelf:'center'}}
                    onValueChange={(itemValue, itemIndex) =>
                    this.setState({freq: itemValue})
                    }>
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="09:00" value="09:00" />
                    <Picker.Item label="10:00" value="10:00" />
                </Picker>
                <PushController/>
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

export default Settings;