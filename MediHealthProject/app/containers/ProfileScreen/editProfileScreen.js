import React, { Component } from "react";
import {
	View,
	TouchableOpacity,
	TextInput,
	StyleSheet,
	Text,
	Button
} from "react-native";
import { Container, Content, Form, Item, Label, Input } from "native-base";
import { DrawerActions, NavigationEvents } from "react-navigation";
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
			height: "",
			weight: "",
			birthday: "",
			job: "",
			email: "",
			password: "",
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
					birthday: birthday,
					age: this.state.age,
					profilePic: profilePic,
					height: 170,
					weight: 50
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
						age: fbObject.age,
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
							<Label>Birthday</Label>
							<Input
								onChangeText={text => this.setState({ birthday: text })}
								value={this.state.birthday}
							/>
						</Item>
						<Item stackedLabel style={styles.itemUnderline}>
							<Label>Age</Label>
							<Input
								onChangeText={text => this.setState({ age: text })}
								value={this.state.age}
							/>
						</Item>
						<Item stackedLabel style={styles.itemUnderline}>
							<Label>Password</Label>
							<Input
								secureTextEntry={true}
								onChangeText={text => this.setState({ password: text })}
								value={this.state.password}
							/>
						</Item>
					</Form>
					<Button title="Show DatePicker" onPress={this.showDateTimePicker} />
					<DateTimePicker
						isVisible={this.state.isDateTimePickerVisible}
						onCancel={this.hideDateTimePicker}
						onConfirm={this.handleDatePicked}
					/>
					<View style={{ flexDirection: "row" }}>
						<View style={styles.ButtonPadding} />

						<View style={{ top: 40, flex: 3 }}>
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
						</View>

						<View style={styles.ButtonPadding} />
					</View>
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
	textRow: {
		flexDirection: "row",
		justifyContent: "center",
		paddingVertical: 15
	},
	confirmButton: {
		backgroundColor: "#53e1ae",
		height: 40,
		borderRadius: 50,
		padding: 8,
		marginTop: 10
	},
	bigButtonText: {
		fontSize: 20,
		fontWeight: "400",
		color: "white",
		alignSelf: "center"
	},
	ButtonPadding: {
		flex: 1
	},
	itemUnderline: {
		borderColor: "#53e1ae"
	}
});

export default EditProfileScreen;
