import React, { Component } from "react";
import { View, Text, TouchableOpacity, ListView } from "react-native";
import { Form, Input, Item, Label, Container, Content } from "native-base";
import styles from "./appStyle";

import Config from "react-native-config";

import * as firebase from "firebase";

var firebaseConfig = {
	apiKey: Config.apiKey,
	authDomain: Config.authDomain,
	databaseURL: Config.databaseURL,
	projectId: Config.projectId,
	storageBucket: Config.storageBucket,
	messagingSenderId: Config.messagingSenderId,
	appId: Config.appId
};

firebase.initializeApp(firebaseConfig);

var data = [];

class AppointmentInputScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		headerTitle: (
			<View style={{ alignSelf: "center", flex: 1 }}>
				<Text style={{ textAlign: "center" }}>Appointment</Text>
			</View>
		),
		headerRight: <View />
	});

	constructor(props) {
		super(props);

		this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

		this.state = {
			listViewData: data,
			appointment: "",
			location: "",
			date: "",
			time: ""
		};
	}

	addAppointment(dataAppt, dataLocat, dataDate, dataTime) {
		var key = firebase
			.database()
			.ref("/items")
			.push().key;
		firebase
			.database()
			.ref("/items")
			.child(key)
			.set({
				appointment: dataAppt,
				location: dataLocat,
				date: dataDate,
				time: dataTime
			});
	}

	render() {
		return (
			<Container>
				<Content
					contentContainerStyle={{
						flex: 1
					}}
				>
					<Text>AppointmentInputScreen</Text>

					<Form>
						<Item stackedLabel>
							<Label>Appointment</Label>
							<Input
								onChangeText={text => this.setState({ appointment: text })}
							/>
						</Item>
						<Item stackedLabel num1>
							<Label>Location</Label>
							<Input onChangeText={text => this.setState({ location: text })} />
						</Item>
						<Item stackedLabel num2>
							<Label>Date</Label>
							<Input onChangeText={text => this.setState({ date: text })} />
						</Item>
						<Item stackedLabel num3>
							<Label>Time</Label>
							<Input onChangeText={text => this.setState({ time: text })} />
						</Item>
					</Form>

					<TouchableOpacity
						title="AppointmentInput"
						style={styles.appointmentInputButton}
						accessibilityLabel="Appointment Input Button"
						onPress={() => {
							this.addAppointment(
								this.state.appointment,
								this.state.location,
								this.state.date,
								this.state.time
							);
							this.props.navigation.navigate("Appointment");
						}}
					>
						<Text style={styles.bigButtonText}>+</Text>
					</TouchableOpacity>
				</Content>
			</Container>
		);
	}
}

export default AppointmentInputScreen;
