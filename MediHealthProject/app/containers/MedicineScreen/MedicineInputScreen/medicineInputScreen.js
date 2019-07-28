import React, { Component } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	ListView,
	Image,
	Keyboard
} from "react-native";
import { Form, Input, Item, Label, Container, Content } from "native-base";
import { NavigationEvents } from "react-navigation";
import styles from "./appStyle";
import * as firebase from "firebase";
import PushNotification from "react-native-push-notification";
import DateTimePicker from "react-native-modal-datetime-picker";

class MedicineInputScreen extends Component {
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
					Medicine
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
				console.log("MEDICATION:", notification);
				//To test if dataInfo work in both android and iOS or must use tag and userInfo for each OS
				props.navigation.navigate("Notification", { data: notification });
			},
			popInitialNotification: true,
			requestPermissions: true
		});

		//State Initialization
		this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

		this.state = {
			toUpdate: false,
			medicine: "",
			date: "",
			time: "",
			remindEvery: "1",
			isDateTimePickerVisible: false,
			dateTimeMode: "date",
			notifCount: null,
			notifID: null

		};

		this.loadMedication = this.loadMedication.bind(this);
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
			const medDate =
			date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
			this.setState({ date: medDate });
		} else if (this.state.dateTimeMode == "time") {
			var medTimeHours = date.getHours() + "";
			var medTimeMinutes = date.getMinutes() + "";
			if (medTimeHours.length == 1) {
				medTimeHours = "0" + medTimeHours;
			}
			if (medTimeMinutes.length == 1) {
				medTimeMinutes = "0" + medTimeMinutes;
			}
			const medTime = medTimeHours + medTimeMinutes;
			this.setState({ time: medTime });
		}

		this.hideDateTimePicker();
		Keyboard.dismiss();
	};

	loadMedication() {
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
					.ref("/users_URW/" + uid + "/medications/list")
					.child(key)
					.once("value", snapshot => {
						const fbObject = snapshot.val();
						this.setState({
							medicine: fbObject.medName,
							date: fbObject.medDate,
							time: fbObject.medTime,
							remindEvery: fbObject.remindEvery,
							notifID: fbObject.notifID
						});
					});
			} else {
				console.log(user);
			}
		}
	}

	updateMedication(dataName, dataDate, dataTime, dataRemind) {
		var user = firebase.auth().currentUser;
		const key = this.props.navigation.getParam("key", null);
		if (user != null) {
			const uid = user.uid;
			firebase
				.database()
				.ref("/users_URW/" + uid + "/medications/list")
				.child(key)
				.set({
					medName: dataName,
					medDate: dataDate,
					medTime: dataTime,
					notifID: this.state.notifID,
					remindEvery: dataRemind
				});
			//Cancel previous notification
			PushNotification.cancelLocalNotifications({id: this.state.notifID.toString()});
			//Write new notification by setting new local notification
			var remindTime = new Date(dataDate + " " + dataTime);
	
			if (Platform.OS === 'android') {
				PushNotification.localNotificationSchedule({
					//... You can use all the options from localNotifications
					message: "Time for your medicine!", // (required)
					date: remindTime,
					//Format
					//Date 2019/mm/dd
					//Time HH:mm
					//dataInfo: {name: "Encapsulated"},
					tag: 'Hihi',
					dataInfo: {
						notifType: 'medication',
						medName: dataName,
						notifID: this.state.notifID,
						date: remindTime,
						//Work on encapsulating data
					},
					repeatType: 'day',
					repeatTime: dataRemind, // in days
					//for Android notification cancelling
					id: this.state.notifID.toString()
				});
			}
			

			if (Platform.OS === 'ios') {
				PushNotification.localNotificationSchedule({
					//... You can use all the options from localNotifications
					message: "Time for your medicine!", // (required)
					date: remindTime,
					//Format
					//Date 2019/mm/dd
					//Time HH:mm
					//dataInfo: {name: "Encapsulated"},
					tag: 'Hihi',
					dataInfo: {
						notifType: 'medication',
						apptName: dataAppt,
						notifID: this.state.notifID,
						date: remindTime,
						//Work on encapsulating data
					},
					repeatType: 'day',
					repeatTime: dataRemind, // in days
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

	addNotification(dataName, dataDate, dataTime, dataRemind, user) {
		console.log(user);
		console.log(this.state.notifCount);
		if (this.state.notifCount > 8000){
			alert('Notification Limit Reached, please inform developers.');
		}
		else if (user != null && this.state.notifCount != null) {
			const uid = user.uid;
			var key = firebase
				.database()
				.ref("/users_URW/" + uid + "/medications/list")
				.push().key;
			
			//0 Appended to front of count to signify its medications repeating type
			//1 is for medications snooze.
			var notifID = this.state.notifCount;
			firebase
				.database()
				.ref("/users_URW/" + uid + "/medications/list")
				.child(key)
				.set({
					medName: dataName,
					medDate: dataDate,
					medTime: dataTime,
					remindEvery: dataRemind,
					notifID: notifID
				});

			//Increment notification count
			firebase
			.database()
			.ref("/users_URW/" + uid + "/medications/metaData")
			.set({
				count: this.state.notifCount+1
			});

			//Set local notification
			var remindTime = new Date(dataDate + " " + dataTime);

			if (Platform.OS === 'android') {
				PushNotification.localNotificationSchedule({
					//... You can use all the options from localNotifications
					message: "Time for your medicine!", // (required)
					date: remindTime,
					//Format
					//Date 2019/mm/dd
					//Time HH:mm
					//dataInfo: {name: "Encapsulated"},
					tag: 'Hihi',
					dataInfo: {
						notifType: 'medication',
						medName: dataName,
						notifID: notifID,
						date: remindTime
						//Work on encapsulating data
					},
					repeatType: 'day',
					repeatTime: dataRemind, // in days
					//for Android notification cancelling
					id: notifID.toString()
				});
			}
			

			if (Platform.OS === 'ios') {
				PushNotification.localNotificationSchedule({
					//... You can use all the options from localNotifications
					message: "Time for your medicine!", // (required)
					date: remindTime,
					//Format
					//Date 2019/mm/dd
					//Time HH:mm
					//dataInfo: {name: "Encapsulated"},
					tag: 'Hihi',
					dataInfo: {
						notifType: 'medication',
						medName: dataName,
						notifID: notifID,
						date: remindTime,
						//Work on encapsulating data
					},
					repeatType: 'day',
					repeatTime: dataRemind, // in days
					//for iOS notification cancelling
					userInfo: {
						id: notifID.toString()
					}
				});
			}
		} else {
			console.log(user);
		}
	}


	addMedication(dataName, dataDate, dataTime, dataRemind) {
		var user = firebase.auth().currentUser;
		if (user != null) {
			// Add Medicine
			const uid = user.uid;
			firebase
				.database()
				.ref("/users_URW/" + uid + "/medications/metaData")
				.once("value", snapshot => {
					const fbObject = snapshot.val();
					this.setState({
						notifCount: fbObject.count
					});
					this.addNotification(dataName, dataDate, dataTime, dataRemind, user)
				});
			
			if (dataFreq > 0) {//Set local repeating notification otherwise set a one off notification
				PushNotification.localNotificationSchedule({
					//... You can use all the options from localNotifications
					message: "Time to eat your medicine!", // (required)
					date: new Date(dataDate + " " + dataTime),
					//Format
					//Date 2019/mm/dd
					//Time HH:mm
					//dataInfo: {name: "Encapsulated"},
					tag: 'Hihi',
					dataInfo: {
						notifType: 'medicine',
						medName: dataName
						//Work on encapsulating data
					},
					
					repeatType: 'time',
					repeatTime: dataFreq * 1000 * 60 * 60 // in milliseconds
				});
			} else {
				PushNotification.localNotificationSchedule({
					//... You can use all the options from localNotifications
					message: "Time to eat your medicine!", // (required)
					date: new Date(dataDate + " " + dataTime),
					//Format
					//Date 2019/mm/dd
					//Time HH:mm
					//dataInfo: {name: "Encapsulated"},
					tag: 'Hihi',
					dataInfo: {
						notifType: 'medicine',
						medName: dataName
						//Work on encapsulating data
					}
				});
			}
		} else {
			console.log(user);
		}
	}

	render() {
		return (
			<Container>
				<NavigationEvents onDidFocus={this.loadMedication} />
				<Content
					contentContainerStyle={{
						flex: 1,
						alignItems: "center",
						justifyContent: "center"
					}}
				>
					<Form>
						<Item stackedLabel style={{ borderColor: "#53e1ae" }}>
							<Label>Medicine</Label>
							<Input
								value={this.state.medicine}
								onChangeText={text => this.setState({ medicine: text })}
							/>
						</Item>
						<Item stackedLabel num1 style={{ borderColor: "#53e1ae" }}>
							<Label>Frequency</Label>
							<Input
								value={this.state.frequency}
								onChangeText={text => this.setState({ frequency: text })}
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
						<Item stackedLabel num4 style={{ borderColor: "#53e1ae" }}>
							<Label>Remind Every ___ Days:</Label>
							<Input
								keyboardType="number-pad"
								value={this.state.remindEvery}
								onChangeText={text => this.setState({ remindEvery: text })}
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
						accessibilityLabel="Medicine Input Button"
						onPress={() => {
							if (this.state.toUpdate) {
								this.updateMedication(
									this.state.medicine,
									this.state.frequency,
									this.state.date,
									this.state.time
								);
							} else {
								this.addMedication(
									this.state.medicine,
									this.state.date,
									this.state.time,
									this.state.remindEvery
								);
							}
							this.props.navigation.navigate("Medicine");
						}}
						style={{ alignSelf: "flex-end", right: 16, top: 16 }}
					>
						<Image
							source={require("../../../assets/images/plus-icon.png")}
							style={styles.medicineInputButton}
						/>
					</TouchableOpacity>
				</Content>
			</Container>
		);
	}
}

export default MedicineInputScreen;
