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
			frequency: "",
			date: "",
			time: "",
			isDateTimePickerVisible: false,
			dateTimeMode: "date"
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
				date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
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
							frequency: fbObject.medFreq,
							date: fbObject.medDate,
							time: fbObject.medTime
						});
					});
			} else {
				console.log(user);
			}
		}
	}

	updateMedication(dataName, dataFreq, dataDate, dataTime) {
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
					medFreq: dataFreq,
					medDate: dataDate,
					medTime: dataTime
				});
		} else {
			console.log(user);
		}
	}

	addMedication(dataName, dataFreq, dataDate, dataTime) {
		var user = firebase.auth().currentUser;
		if (user != null) {
			// Add Medicine
			const uid = user.uid;
			var key = firebase
				.database()
				.ref("/users_URW/" + uid + "/medications/list")
				.push().key;

			firebase
				.database()
				.ref("/users_URW/" + uid + "/medications/list")
				.child(key)
				.set({
					medName: dataName,
					medFreq: dataFreq,
					medDate: dataDate,
					medTime: dataTime
				});

			//Set local repeating notification

			PushNotification.localNotificationSchedule({
				//... You can use all the options from localNotifications
				message: "Time to eat your medicine!", // (required)
				date: new Date(dataDate + " " + dataTime),
				//Format
				//Date 2019/mm/dd
				//Time HH:mm
				//dataInfo: {name: "Encapsulated"},
				tag: "Hihi",
				dataInfo: {
					notifType: "medicine",
					medName: dataName
					//Work on encapsulating data
				},

				repeatType: "time",
				repeatTime: dataFreq * 1000 * 60 * 60 // in milliseconds
			});
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
									this.state.frequency,
									this.state.date,
									this.state.time
								);
							}
							this.props.navigation.navigate("Medicine");
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

export default MedicineInputScreen;
