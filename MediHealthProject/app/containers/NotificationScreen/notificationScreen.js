import React, { Component } from "react";
import {
	View,
	Text,
	FlatList,
	TouchableOpacity,
	Image,
	ListView,
	Platform
} from "react-native";
import { Container, Content, Button } from "native-base";
import { NavigationEvents } from "react-navigation";
import styles from "./appStyle";
import * as firebase from "firebase";
import PushNotification from "react-native-push-notification";


class NotificationScreen extends Component {

	constructor(props) {
		super(props);
		
		this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

		this.state = {
			dataInfo: this.props.navigation.getParam('data').dataInfo,
			displayString: "",
			screen: "Home"
		};
		//PushNotification Configuration
        PushNotification.configure({
            onNotification: function(notification) {
                console.log("Snooze:", notification);
                //To test if dataInfo work in both android and iOS or must use tag and userInfo for each OS
                props.navigation.navigate('Notification', {data: notification}); 
                
            },
            popInitialNotification: true,
            requestPermissions: true
		});
	}

	//Taken Handler
	taken() {
		
	}

	//Snooze Handler
	snooze = (notificationDataInfo) => {
		console.log(notificationDataInfo);
		var newTime = new Date(notificationDataInfo.date);
		var notifID = notificationDataInfo.notifID;
		var message = "";
		var screen = "";
		//Prompt for duration to remind later //For now reminds again in 5 minutes
		
		//Create new notification
		console.log(newTime);
		newTime.setUTCMinutes(newTime.getUTCMinutes() + 5);
		if( (notifID % 10000) % 2 == 0 ) {//If first place is even i.e. repeating type 
			notifID += 10000; //Change it to snooze type which is odd
		}
		if( notifID % 10000 < 2) {
			message = "Time for your medicine!";
		} else {
			message = "Time for your appointment!";
		}
		//Change existing dataInfo to have new time so future snoozes work
		//Should I clone notificationDataInfo instead?
		alteredDataInfo = notificationDataInfo;
		alteredDataInfo.date = newTime;

		if (Platform.OS === 'android') {
			PushNotification.localNotificationSchedule({
				//... You can use all the options from localNotifications
				message: message, // (required)
				date: newTime,
				//Format
				//Date 2019/mm/dd
				//Time HH:mm
				//dataInfo: {name: "Encapsulated"},
				tag: 'Hihi',
				dataInfo: alteredDataInfo,
				//for Android notification cancelling
				id: notifID.toString()
			});
		}
		
		if (Platform.OS === 'ios') {
			PushNotification.localNotificationSchedule({
				//... You can use all the options from localNotifications
				message: message, // (required)
				date: newTime,
				//Format
				//Date 2019/mm/dd
				//Time HH:mm
				//dataInfo: {name: "Encapsulated"},
				tag: 'Hihi',
				dataInfo: alteredDataInfo,
				//for iOS notification cancelling
				userInfo: {
					id: notifID.toString()
				}
			});
		}
		//How would this affect other notifications???
		this.props.navigation.navigate("Home");
	}

	//Skip Handler
	skip(){

	}

	medNotificationDisplay = (notificationDataInfo) => {
		const dispString = "Time to take " 
			+ notificationDataInfo.medName 
			+ "!";

		this.setState({
			displayString: dispString
		})
	}

	apptNotificationDisplay = (notificationDataInfo) => {
		const dateTime = new Date(notificationDataInfo.date);
		const dateString = dateTime.getDate() 
			+ " " 
			+ (dateTime.getMonth() + 1) 
			+ " " 
			+ dateTime.getFullYear()
			+ " "
			+ dateTime.getHours()
			+ ":"
			+ dateTime.getMinutes();
		const dispString = "You have an appointment on " 
			+ dateString
			+ " at "
			+ notificationDataInfo.apptLocation
			+ " for your "
			+ notificationDataInfo.apptName
			+"!";

		this.setState({
			displayString: dispString
		});
	}
	
	whoops(notificationDataInfo) {
		console.log("Whoops!")
		console.log(notificationDataInfo);
	}

	notificationPasser(notificationType) {
		if(notificationType == 'medication') {
			return this.medNotificationDisplay;
		} else if(notificationType == 'appointment') {
			return this.apptNotificationDisplay;
		}
		else return this.whoops;
	}
	
	componentDidMount(){
		this.setState({
			dataInfo: this.props.navigation.getParam('data').dataInfo
		});
		console.log(this.state.dataInfo)
		if(this.state.dataInfo.notifType == 'medication') {
			this.setState({screen: "Medicine"});
		} else {
			this.setState({screen: "Appointment"});
		}
		notifHandlerFunc = this.notificationPasser(this.state.dataInfo.notifType);
		notifHandlerFunc(this.state.dataInfo)
	}
	
	render() {

		return (
			<Container>
				<NavigationEvents/>
				<Content contentContainerStyle={{ flex: 1 }}>
					<View style={{flex: 1 }}>
						<View style={{flex: 0.5 }}></View>
						<View style={{flex: 1 }}>
							<Text style={{ textAlign: "center", fontSize: 18 }}>
								{this.state.displayString}
							</Text>
						</View>
						<View style={{flex: 0.5 }}></View>
					</View>
					<View style={{flex: 1 }}>
						<View style={{flex: 1 }}></View>
						<View style={{flexDirection: 'row', justifyContent: 'space-evenly', flex: 1 }}>
						<Button
							transparent
							title="Yes"
							accessibilityLabel="Taken"
							onPress={() => this.props.navigation.navigate(this.state.screen)}
							style={{}}
						>
							<Image
								source={require("../../assets/images/tick.png")}
								style={styles.takenButton}
							/>
						</Button>
						<Button
							transparent
							title="Snooze"
							accessibilityLabel="Snooze"
							onPress={() => this.snooze(this.state.dataInfo)}
							style={{}}
						>
							<Image
								source={require("../../assets/images/snooze.png")}
								style={styles.snoozeButton}
							/>
						</Button>
						<Button
							transparent
							title="No"
							accessibilityLabel="Skip"
							onPress={() => this.props.navigation.navigate(this.state.screen)}
							style={{}}
						>
							<Image
								source={require("../../assets/images/cross.png")}
								style={styles.skipButton}
							/>
						</Button>
						</View>
						<View style={{flex: 1 }}></View>
					</View>
				</Content>
			</Container>
		);
	}
}

export default NotificationScreen;
