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
import PushController from './PushController';
import PushNotification from 'react-native-push-notification';
import TimePicker from "react-native-24h-timepicker";

class Settings extends Component {
    constructor(props) {
        super(props);
        this.handleAppStateChange = this.handleAppStateChange.bind(this);
        this.state = {
            switchValue: false,
            hour: '5',
            time: '',
            hour: null, 
            minute: null
        };
    }
     
    componentDidMount(){
        AppState.addEventListener('change', this.handleAppStateChange);
    }

    componentWillUnmount(){
        AppState.removeEventListener('change', this.handleAppStateChange);
    }
    handleAppStateChange(appState){
        if (date.getHours()==hour && date.getMinutes()==minute && appState === 'background') {
            PushNotification.localNotificationSchedule({
                //... You can use all the options from localNotifications
                message: "Don't forget your goals!", // (required)
                date: new Date(Date.now() + (1000)) // in 60 secs
              });
        }
    }

    onCancel() {
        this.TimePicker.close();
      }
     
      onConfirm(hour, minute) {
        this.setState({ time: `${hour}:${minute}`, hour:hour, minute:minute });
        this.TimePicker.close();
      }

    toggleSwitch = (value) => {
        this.setState({switchValue: value});
    }

    renderNotification(){
        if (this.state.switchValue === true){
            return(
                <View>
                    <TouchableOpacity
                        onPress={() => this.TimePicker.open()}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Set Notification time</Text>
                    </TouchableOpacity>
                    <View>
                        <Text>Notification time:</Text>
                        <Text style={styles.text}>{this.state.time}</Text>
                    </View>
                    <TimePicker
                        ref={ref => {
                            this.TimePicker = ref;
                        }}
                        onCancel={() => this.onCancel()}
                        onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
                    />
                </View>
            );
        }
    }

    render () {
        return (
            <View>
                <View style={styles.headerStyle}>
                    <Text style={styles.headerText}>Settings</Text>
                </View>
                <TouchableOpacity style={[styles.button, {flexDirection:'row'}]}>
                    <Text style={styles.buttonText}>Enable Notification</Text>
                    <Switch
                        onValueChange = {this.toggleSwitch}
                        value = {this.state.switchValue}
                    />
                </TouchableOpacity>
                {this.renderNotification()}
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
    },
    text: {
        fontSize: 20,
        marginTop: 10
      },
      button: {
        backgroundColor: "#3c4f76",
        paddingVertical: 11,
        paddingHorizontal: 17,
        borderRadius: 3
      },
      buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600"
      }
};

export default Settings;