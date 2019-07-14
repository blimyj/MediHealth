import React, { Component } from "react";
import {
	View,
	TouchableOpacity,
	Keyboard,
	StyleSheet,
	Text
} from "react-native";
import { Container, Content, Form, Item, Label, Input } from "native-base";
import { NavigationEvents } from "react-navigation";
import DateTimePicker from "react-native-modal-datetime-picker";
import * as firebase from "firebase";

class EditProfileScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		headerRight: <View />
	});

	constructor(props) {
		super(props);

		this.state = {
			name: "",
			age: "",
			weight: "",
			height: "",
			birthday: "",
			job: "",
			uid: "",
			isDateTimePickerVisible: false
		};

		this.loadProfile = this.loadProfile.bind(this);
	}

	showDateTimePicker = () => {
		this.setState({ isDateTimePickerVisible: true });
	};

	hideDateTimePicker = () => {
		this.setState({ isDateTimePickerVisible: false });
	};

	handleDatePicked = date => {
		const birthday =
			date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
		this.setState({ birthday: birthday });
		this.hideDateTimePicker();
		Keyboard.dismiss();
	};

	confirmChanges(birthday) {
		const user = firebase.auth().currentUser;
		const profilePic =
			"https://media.licdn.com/dms/image/C5103AQEiJL0AgWj5KQ/profile-displayphoto-shrink_800_800/0?e=1566432000&v=beta&t=MaAA-eyV5MXKmgj4rRqSfKE8fwGDtjkkVn-EMruGzKA";
		if (user != null) {
			const uid = user.uid;
			firebase
				.database()
				.ref("/users_PR_URW/" + uid + "/Profile")
				.set({
					displayName: this.state.name,
					birthday: this.state.birthday,
					age: this.state.age,
					profilePic: profilePic,
					height: this.state.height,
					weight: this.state.weight,
					job: this.state.job
				});
		} else {
			console.log(user);
		}
	}

	loadProfile() {
		const user = firebase.auth().currentUser;
		if (user != null) {
			const uid = user.uid;
			firebase
				.database()
				.ref("/users_PR_URW/" + uid + "/Profile")
				.once("value", snapshot => {
					const fbObject = snapshot.val();
					this.setState({
						name: fbObject.displayName,
						job: fbObject.job,
						age: fbObject.age,
						weight: fbObject.weight,
						height: fbObject.height,
						birthday: fbObject.birthday
					});
				});
		} else {
			console.log(user);
		}
	}

	render() {
		return (
			<Container>
				<NavigationEvents onDidFocus={this.loadProfile} />
				<Content contentContainerStyle={styles.container}>
					<Form>
						<Item stackedLabel style={styles.itemUnderline}>
							<Label>Name</Label>
							<Input
								onChangeText={text => this.setState({ name: text })}
								value={this.state.name}
							/>
						</Item>
						<Item stackedLabel style={styles.itemUnderline}>
							<Label>Job</Label>
							<Input
								onChangeText={text => this.setState({ job: text })}
								value={this.state.job}
							/>
						</Item>
						<View style={{ flexDirection: "row" }}>
							<View style={{ flex: 1 }}>
								<Item stackedLabel style={styles.itemUnderline}>
									<Label>Age</Label>
									<Input
										onChangeText={text => this.setState({ age: text })}
										value={this.state.age}
										keyboardType="number-pad"
									/>
								</Item>
							</View>
							<View style={{ flex: 1 }}>
								<Item stackedLabel style={styles.itemUnderline}>
									<Label>Birthday</Label>
									<Input
										onChangeText={text => this.setState({ birthday: text })}
										value={this.state.birthday}
										onFocus={this.showDateTimePicker}
									/>
								</Item>
							</View>
						</View>
						<View style={{ flexDirection: "row" }}>
							<View style={{ flex: 1 }}>
								<Item stackedLabel style={styles.itemUnderline}>
									<Label>Weight</Label>
									<Input
										onChangeText={text => this.setState({ weight: text })}
										value={this.state.weight}
										keyboardType="number-pad"
									/>
								</Item>
							</View>
							<View style={{ flex: 1 }}>
								<Item stackedLabel style={styles.itemUnderline}>
									<Label>Height</Label>
									<Input
										onChangeText={text => this.setState({ height: text })}
										value={this.state.height}
										keyboardType="number-pad"
									/>
								</Item>
							</View>
						</View>
					</Form>
					<DateTimePicker
						isVisible={this.state.isDateTimePickerVisible}
						onCancel={this.hideDateTimePicker}
						onConfirm={this.handleDatePicked}
						minimumDate={new Date(1997, 0, 1)}
						maximumDate={new Date(1997, 11, 31)}
					/>
					<TouchableOpacity
						style={styles.confirmButton}
						accessibilityLabel="Confirm Button"
						onPress={() => {
							this.confirmChanges(this.state.birthday);
							this.props.navigation.navigate("Profile");
						}}
					>
						<Text style={styles.bigButtonText}>Confirm</Text>
					</TouchableOpacity>
				</Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	confirmButton: {
		backgroundColor: "#53e1ae",
		height: 40,
		borderRadius: 50,
		padding: 8,
		marginTop: 16,
		alignSelf: "center",
		alignItems: "center",
		width: 200
	},
	bigButtonText: {
		fontSize: 20,
		fontWeight: "400",
		color: "white",
		alignSelf: "center"
	},
	itemUnderline: {
		borderColor: "#53e1ae"
	}
});

export default EditProfileScreen;
