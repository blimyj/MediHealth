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
import styles from "./appStyle";

import * as firebase from "firebase";

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

					<Button
						transparent
						title="AppointmentInput"
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
						style={{ alignSelf: "flex-end", bottom: 15, right: 15 }}
					>
						<Image
							source={require("../../../assets/images/plus-icon.png")}
							style={styles.appointmentInputButton}
						/>
					</Button>
				</Content>
			</Container>
		);
	}
}

export default AppointmentInputScreen;
