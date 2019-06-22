import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Form, Input, Item, Label, Container, Content } from "native-base";
import MyHeader from "../../../components/header";
import styles from "./appStyle";

class AppointmentInputScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			appointment: "",
			location: "",
			date: "",
			time: ""
		};
	}

	render() {
		return (
			<Container>
				<MyHeader nav={this.props.navigation} headerTitle="Appointment" />
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
								onSubmitEditing={text => this.setState({ appointment: text })}
							/>
						</Item>
						<Item stackedLabel num1>
							<Label>Location</Label>
							<Input
								onSubmitEditing={text => this.setState({ location: text })}
							/>
						</Item>
						<Item stackedLabel num2>
							<Label>Date</Label>
							<Input onSubmitEditing={text => this.setState({ date: text })} />
						</Item>
						<Item stackedLabel num3>
							<Label>Time</Label>
							<Input onSubmitEditing={text => this.setState({ time: text })} />
						</Item>
					</Form>

					<TouchableOpacity
						title="AppointmentInput"
						style={styles.appointmentInputButton}
						accessibilityLabel="Appointment Input Button"
						onPress={() => this.props.navigation.navigate("Appointment")}
					>
						<Text style={styles.bigButtonText}>+</Text>
					</TouchableOpacity>
				</Content>
			</Container>
		);
	}
}

export default AppointmentInputScreen;
