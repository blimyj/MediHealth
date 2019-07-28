import React, { Component } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	ListView,
	Image,
	Keyboard,
	Platform
} from "react-native";
import { Form, Input, Item, Label, Container, Content } from "native-base";
import { NavigationEvents } from "react-navigation";
import styles from "./appStyle";
import DateTimePicker from "react-native-modal-datetime-picker";
import * as firebase from "firebase";
import PushNotification from "react-native-push-notification";

class AppointmentInputScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		headerTitle: (
			<View style={{ alignSelf: "center", flex: 1 }}>
				<Text
					style={{
						textAlign: "center",
						fontWeight: "bold",
						fontSize: 18,
						color: "black"
					}}
				>
					Appointment
				</Text>
			</View>
		),
		headerRight: <View />
	});

	constructor(props) {
		super(props);

		//PushNotification Configuration
        PushNotification.configure({
            onNotification: function(notification) {
                console.log("Appointment:", notification);
                //To test if dataInfo work in both android and iOS or must use tag and userInfo for each OS
                props.navigation.navigate('Notification', {data: notification}); 
                
            },
            popInitialNotification: true,
            requestPermissions: true
		});

		this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

		this.state = {
			toUpdate: false,
			appointment: "",
			location: "",
			date: "",
			time: "",
			remind: "0",
			isDateTimePickerVisible: false,
			dateTimeMode: "date",
			notifCount: null,
			notifID: null
		};

		this.loadAppointment = this.loadAppointment.bind(this);
	}

	showDateTimePicker = mode => {
		this.setState({
			dateTimeMode: mode,
			isDateTimePickerVisible: true
		});
	};

	hideDateTimePicker = () => {
		this.setState({ isDateTimePickerVisible: false });
	};

	handleDatePicked = date => {
		if (this.state.dateTimeMode == "date") {
			const appointmentDate =
			date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
			this.setState({ date: appointmentDate });
		} else if (this.state.dateTimeMode == "time") {
			var appointmentTimeHours = date.getHours() + "";
			var appointmentTimeMinutes = date.getMinutes() + "";
			if (appointmentTimeHours.length == 1) {
				appointmentTimeHours = "0" + appointmentTimeHours;
			}
			if (appointmentTimeMinutes.length == 1) {
				appointmentTimeMinutes = "0" + appointmentTimeMinutes;
			}
			const appointmentTime = appointmentTimeHours + ":" + appointmentTimeMinutes;
			this.setState({ time: appointmentTime });
		}

		this.hideDateTimePicker();
		Keyboard.dismiss();
	};

	loadAppointment() {
		const key = this.props.navigation.getParam("key", null);
		if (key != null) {
			this.setState({ toUpdate: true }, () => {
				console.log("toUpdate: ", this.state.toUpdate);
			});

			const user = firebase.auth().currentUser;
			if (user != null) {
				const uid = user.uid;
				firebase
					.database()
					.ref("/users_URW/" + uid + "/appointments/list")
					.child(key)
					.once("value", snapshot => {
						const fbObject = snapshot.val();
						this.setState({
							appointment: fbObject.appointmentName,
							location: fbObject.appointmentLocation,
							date: fbObject.appointmentDate,
							time: fbObject.appointmentTime,
							remind: fbObject.remindBefore,
							notifID: fbObject.notifID
						});
					});
			} else {
				console.log(user);
			}
		}
	}

	updateAppointment(dataAppt, dataLocat, dataDate, dataTime, dataRemind) {
		var user = firebase.auth().currentUser;
		const key = this.props.navigation.getParam("key", null);

		if (user != null) {
			const uid = user.uid;
			firebase
				.database()
				.ref("/users_URW/" + uid + "/appointments/list")
				.child(key)
				.set({
					appointmentName: dataAppt,
					appointmentLocation: dataLocat,
					appointmentDate: dataDate,
					appointmentTime: dataTime,
					notifID: this.state.notifID,
					remindBefore: dataRemind
				});

			//Replace previous notification with new notification date time

			//Cancel previous notification
			PushNotification.cancelLocalNotifications({id: this.state.notifID.toString()});
			//Write new notification by setting new local notification
			var remindTime = new Date(dataDate + " " + dataTime);
			remindTime.setUTCHours(remindTime.getUTCHours() - dataRemind);
	
			if (Platform.OS === 'android') {
				PushNotification.localNotificationSchedule({
					//... You can use all the options from localNotifications
					message: "Time for your appointment!", // (required)
					date: remindTime,
					//Format
					//Date 2019/mm/dd
					//Time HH:mm
					//dataInfo: {name: "Encapsulated"},
					tag: 'Hihi',
					dataInfo: {
						notifType: 'appointment',
						apptName: dataAppt,
						apptLocation: dataLocat,
						notifID: this.state.notifID,
						date: remindTime
						//Work on encapsulating data
					},
					//for Android notification cancelling
					id: this.state.notifID.toString()
				});
			}
			

			if (Platform.OS === 'ios') {
				PushNotification.localNotificationSchedule({
					//... You can use all the options from localNotifications
					message: "Time for your appointment!", // (required)
					date: remindTime,
					//Format
					//Date 2019/mm/dd
					//Time HH:mm
					//dataInfo: {name: "Encapsulated"},
					tag: 'Hihi',
					dataInfo: {
						notifType: 'appointment',
						apptName: dataAppt,
						apptLocation: dataLocat,
						notifID: this.state.notifID,
						date: remindTime
						//Work on encapsulating data
					},
					//for iOS notification cancelling
					userInfo: {
						id: this.state.notifID.toString()
					}
				});
			}
		} else {
			console.log(user);
		}
	}

	addNotification(dataAppt, dataLocat, dataDate, dataTime, dataRemind, user) {
		console.log(user);
		console.log(this.state.notifCount);
		if (this.state.notifCount > 8000){
			alert('Notification Limit Reached, please inform developers.');
		}
		else if (user != null && this.state.notifCount != null) {
			const uid = user.uid;
			var key = firebase
				.database()
				.ref("/users_URW/" + uid + "/appointments/list")
				.push().key;
			
			//2 Appended to front of count to signify its appointment reminder
			//3 is for appointment snooze.
			var notifID = 20000 + this.state.notifCount;
			firebase
				.database()
				.ref("/users_URW/" + uid + "/appointments/list")
				.child(key)
				.set({
					appointmentName: dataAppt,
					appointmentLocation: dataLocat,
					appointmentDate: dataDate,
					appointmentTime: dataTime,
					remindBefore: dataRemind,
					notifID: notifID
				});

			//Increment notification count
			firebase
			.database()
			.ref("/users_URW/" + uid + "/appointments/metaData")
			.set({
				count: this.state.notifCount+1
			});

			//Set local notification
			var remindTime = new Date(dataDate + " " + dataTime);
			remindTime.setUTCHours(remindTime.getUTCHours() - dataRemind);

			if (Platform.OS === 'android') {
				PushNotification.localNotificationSchedule({
					//... You can use all the options from localNotifications
					message: "Time for your appointment!", // (required)
					date: remindTime,
					//Format
					//Date 2019/mm/dd
					//Time HH:mm
					//dataInfo: {name: "Encapsulated"},
					tag: 'Hihi',
					dataInfo: {
						notifType: 'appointment',
						apptName: dataAppt,
						apptLocation: dataLocat,
						notifID: notifID,
						date: remindTime
						//Work on encapsulating data
					},
					//for Android notification cancelling
					id: notifID.toString()
				});
			}
			

			if (Platform.OS === 'ios') {
				PushNotification.localNotificationSchedule({
					//... You can use all the options from localNotifications
					message: "Time for your appointment!", // (required)
					date: remindTime,
					//Format
					//Date 2019/mm/dd
					//Time HH:mm
					//dataInfo: {name: "Encapsulated"},
					tag: 'Hihi',
					dataInfo: {
						notifType: 'appointment',
						apptName: dataAppt,
						apptLocation: dataLocat,
						notifID: notifID,
						date: remindTime
						//Work on encapsulating data
					},
					//for iOS notification cancelling
					userInfo: {
						id: notifID.toString()
					}
				});
			}



			console.log("After Schedule!");
		} else {
			console.log(user);
		}
	}

	addAppointment(dataAppt, dataLocat, dataDate, dataTime, dataRemind) {
		
		var user = firebase.auth().currentUser;
		//Obtains number of notifications
		if (user != null) {
			const uid = user.uid;
			firebase
				.database()
				.ref("/users_URW/" + uid + "/appointments/metaData")
				.once("value", snapshot => {
					const fbObject = snapshot.val();
					this.setState({
						notifCount: fbObject.count
					});
					this.addNotification(dataAppt, dataLocat, dataDate, dataTime, dataRemind, user);

				});
				console.log(this.state.notifCount);
		}

	}

	render() {
		return (
			<Container>
				<NavigationEvents onDidFocus={this.loadAppointment} />
				<Content
					contentContainerStyle={{
						flex: 1,
						alignItems: "center",
						justifyContent: "center"
					}}
				>
					<Form>
						<Item stackedLabel style={{ borderColor: "#53e1ae" }}>
							<Label>Appointment</Label>
							<Input
								value={this.state.appointment}
								onChangeText={text => this.setState({ appointment: text })}
							/>
						</Item>
						<Item stackedLabel num1 style={{ borderColor: "#53e1ae" }}>
							<Label>Location</Label>
							<Input
								value={this.state.location}
								onChangeText={text => this.setState({ location: text })}
							/>
						</Item>
						<Item stackedLabel num2 style={{ borderColor: "#53e1ae" }}>
							<Label>Date</Label>
							<Input
								value={this.state.date}
								onChangeText={text => this.setState({ date: text })}
								onFocus={() => this.showDateTimePicker("date")}
							/>
						</Item>
						<Item stackedLabel num3 style={{ borderColor: "#53e1ae" }}>
							<Label>Time</Label>
							<Input
								keyboardType="number-pad"
								value={this.state.time}
								onChangeText={text => this.setState({ time: text })}
								onFocus={() => this.showDateTimePicker("time")}
							/>
						</Item>
						<Item stackedLabel style={{ borderColor: "#53e1ae" }}>
							<Label>Remind you how many hours before appointment?</Label>
							<Input
								value={this.state.remind}
								onChangeText={text => this.setState({ remind: text })}
							/>
						</Item>
					</Form>
					<DateTimePicker
						isVisible={this.state.isDateTimePickerVisible}
						onCancel={this.hideDateTimePicker}
						onConfirm={this.handleDatePicked}
						mode={this.state.dateTimeMode}
					/>
					<TouchableOpacity
						accessibilityLabel="Appointment Input Button"
						onPress={() => {
							if (this.state.toUpdate) {
								this.updateAppointment(
									this.state.appointment,
									this.state.location,
									this.state.date,
									this.state.time,
									this.state.remind
								);
							} else {
								this.addAppointment(
									this.state.appointment,
									this.state.location,
									this.state.date,
									this.state.time,
									this.state.remind
								);
							}
							this.props.navigation.navigate("Appointment");
						}}
						style={{ alignSelf: "flex-end", right: 16, top: 16 }}
					>
						<Image
							source={require("../../../assets/images/plus-icon.png")}
							style={styles.appointmentInputButton}
						/>
					</TouchableOpacity>
				</Content>
			</Container>
		);
	}
}

export default AppointmentInputScreen;
