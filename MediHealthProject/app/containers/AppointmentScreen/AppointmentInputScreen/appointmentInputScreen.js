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
import DateTimePicker from "react-native-modal-datetime-picker";
import * as firebase from "firebase";

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

		this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

		this.state = {
			toUpdate: false,
			appointment: "",
			location: "",
			date: "",
			time: "",
			isDateTimePickerVisible: false,
			dateTimeMode: "date"
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
				date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
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
			const appointmentTime = appointmentTimeHours + appointmentTimeMinutes;
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
							time: fbObject.appointmentTime
						});
					});
			} else {
				console.log(user);
			}
		}
	}

	updateAppointment(dataAppt, dataLocat, dataDate, dataTime) {
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
					appointmentTime: dataTime
				});
		} else {
			console.log(user);
		}
	}

	addAppointment(dataAppt, dataLocat, dataDate, dataTime) {
		var user = firebase.auth().currentUser;
		if (user != null) {
			const uid = user.uid;
			var key = firebase
				.database()
				.ref("/users_URW/" + uid + "/appointments/list")
				.push().key;

			firebase
				.database()
				.ref("/users_URW/" + uid + "/appointments/list")
				.child(key)
				.set({
					appointmentName: dataAppt,
					appointmentLocation: dataLocat,
					appointmentDate: dataDate,
					appointmentTime: dataTime
				});
		} else {
			console.log(user);
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
						accessibilityLabel="Appointment Input Button"
						onPress={() => {
							if (this.state.toUpdate) {
								this.updateAppointment(
									this.state.appointment,
									this.state.location,
									this.state.date,
									this.state.time
								);
							} else {
								this.addAppointment(
									this.state.appointment,
									this.state.location,
									this.state.date,
									this.state.time
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
