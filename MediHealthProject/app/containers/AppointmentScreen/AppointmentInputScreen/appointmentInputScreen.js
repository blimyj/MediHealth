import React, { Component } from "react";
import { View, Text, TouchableOpacity, ListView, Image } from "react-native";
import {
	Form,
	Input,
	Item,
	Label,
	Container,
	Content,
	Button
} from "native-base";
import { NavigationEvents } from "react-navigation";
import styles from "./appStyle";

import * as firebase from "firebase";

var data = [];

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
			time: ""
		};

		this.loadAppointment = this.loadAppointment.bind(this);
	}

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
							/>
						</Item>
						<Item stackedLabel num3 style={{ borderColor: "#53e1ae" }}>
							<Label>Time</Label>
							<Input
								value={this.state.time}
								onChangeText={text => this.setState({ time: text })}
							/>
						</Item>
					</Form>

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
