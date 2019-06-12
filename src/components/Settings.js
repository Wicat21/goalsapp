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
import BackgroundJob from 'react-native-background-job';

const regularJobKey = "regularJobKey";
BackgroundJob.register({
  jobKey: regularJobKey,
  job: () => PushNotification.localNotificationSchedule({
    message: "Don't forget your goals!"
  })
});  

class Settings extends Component {
    constructor(props) {
        super(props);
        this.handleAppStateChange = this.handleAppStateChange.bind(this);
        this.state = {
            switchValue: false,
            hour: '5',
            time: '',
            difftime: '',
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
        this.calcdiff(hour, minute);
        this.TimePicker.close();

      }

    toggleSwitch = (value) => {
        this.setState({switchValue: value});
    }

    calcdiff(hour, minute){
        var currenthour = new Date().getHours();
        var currentmin = new Date().getMinutes();
        const currenttime = (currenthour*60 + currentmin) * 60000;
        const fulltime = 86400000;
        var selectedtime = (hour * 60 + minute) * 60000;
        if (selectedtime > currenttime){
            this.setState({difftime: selectedtime - currenttime + 1000});
        } else {
            this.setState({difftime: fulltime - currenttime + selectedtime + 1000});
        };
        console.log(selectedtime); //ez nem ismert
        console.log(currenttime);
        console.log(this.state.difftime);
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
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            //meg kell szerezni a calcdiffet az oncomfirm végéből
                            BackgroundJob.schedule({
                                jobKey: regularJobKey,
                                notificationTitle: "Notification title",
                                notificationText: "Notification text",
                                timeout: difftime,
                                period: 900000
                            });
                        this.props.navigation.navigate("Goals");
                        }}
                    >
                        <Text>Save</Text>
                    </TouchableOpacity>
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