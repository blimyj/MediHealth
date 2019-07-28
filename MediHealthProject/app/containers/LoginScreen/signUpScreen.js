import React, { Component } from "react";
import {
	View,
	TouchableOpacity,
	StyleSheet,
	Text,
	Keyboard
} from "react-native";
import { Container, Content, Form, Item, Label, Input } from "native-base";
import DateTimePicker from "react-native-modal-datetime-picker";
import * as firebase from "firebase";

class SignUpScreen extends Component {
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

	writeUserData(uid_no) {
		this.setState({ uid: uid_no });
	}

	stringToDateObj(str) {
		//Takes in YYYY-MM-DD Format
		return new Date(str);
	}

	stringToTimeObj(str) {
		//Takes in HH:MM Format
		return new Date("2000 " + str);
	}

	dateTimeSplitter(dateTimeObj) {
		//Splits dateTime into date and time
		//Need to test for improper conversion of time if improper date coupled with daylight savings locale
		var date = new Date(
			"${dateTimeObj.getFullYear()}-${dateTimeObj.getMonth()}-${dateTimeObj.getDate()}"
		);
		var time = new Date(
			"0000 ${dateTimeObj.getHours()}:${dateTImeObj.getMinutes()}"
		);
		return [date, time];
	}

	initialiseUserData(uid_no) {
		var initDateTime = new Date();
		var initDate = this.dateTimeSplitter(initDateTime[0]);
		var initTime = this.dateTimeSplitter(initDateTime[1]);

		firebase
			.database()
			.ref("/users_PR_URW/" + uid_no) //Public reads, Users Read & Write
			.set({
				//Profile
				Profile: {
					profilePic:
						"https://i.imgur.com/MQHYB.jpg",
					displayName: this.state.name,
					age: this.state.age,
					weight: this.state.weight,
					height: this.state.height,
					birthday: this.state.birthday
				}
			});

		firebase
			.database()
			.ref("/users_URW/" + uid_no) //Users read and write, public no read no write
			.set({
				//Medicine
				medications: {
					metaData: {
						count: 0
					},
					list: {
						firstMedicineEntry: {
							medName: "Empty"
						}
					}
				},

				//Appointments
				appointments: {
					metaData: {
						count: 0
					},
					list: {
						firstAppointmentEntry: {
							appointmentName: "InitApptName",
							appointmentLocation: "InitApptLocation",
							appointmentDate: initDate,
							appointmentTime: initTime
						}
					}
				}
			});
	}

	signUp(email, password) {
		alert("Creating your account! Please wait for the next alert.");
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(
				authData => {
					console.log(authData.user);
					console.log(authData.user.uid);
					this.writeUserData(authData.user.uid);
					this.initialiseUserData(authData.user.uid);
					firebase.auth().currentUser.sendEmailVerification();

					//Clears input fields

					this.setState({ password: "" }, () => {
						this.setState({ email: "" }, () =>
							alert("Your account has been created and you've been signed in!")
						);
					});
				},
				error => {
					this.setState({ password: "" });
					var errorCode = error.code;
					var errorMessage = error.message;
					if (errorCode == "auth/weak-password") {
						alert("The password is too weak.");
					} else {
						alert(errorMessage);
					}
					console.log(error);
				}
			)
			.catch(error => {
				console.log(error.message);
				this.setState({ password: "" });
			});
	}

	onChangeText = (key, val) => {
		this.setState({ [key]: val });
	};

	render() {
		return (
			<Container>
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
								onFocus={this.showDateTimePicker}
							/>
						</Item>
						<Item stackedLabel style={styles.itemUnderline}>
							<Label>Email</Label>
							<Input
								onChangeText={text => this.setState({ email: text })}
								value={this.state.email}
								keyboardType="email-address"
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
					<View style={{ flexDirection: "row" }}>
						<View style={styles.ButtonPadding} />

						<View style={{ top: 40, flex: 3 }}>
							<TouchableOpacity
								title="SignUp Button"
								style={styles.signUpButton}
								accessibilityLabel="SignUp Button"
								onPress={() => {
									this.signUp(this.state.email, this.state.password);
								}}
							>
								<Text style={styles.bigButtonText}>Sign Up</Text>
							</TouchableOpacity>
						</View>

						<View style={styles.ButtonPadding} />
					</View>
				</Content>

				<View style={styles.textRow}>
					<Text style={{ color: "#484848", marginTop: 8 }}>
						Already have an account?
					</Text>
					<TouchableOpacity
						onPress={() => this.props.navigation.navigate("Login")}
						style={{ marginTop: 8 }}
					>
						<Text style={{ color: "#28DA9A" }}> Log in now.</Text>
					</TouchableOpacity>
				</View>

				<DateTimePicker
					isVisible={this.state.isDateTimePickerVisible}
					onCancel={this.hideDateTimePicker}
					onConfirm={this.handleDatePicked}
					minimumDate={new Date(1997, 0, 1)}
					maximumDate={new Date(1997, 11, 31)}
				/>
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
	signUpButton: {
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

export default SignUpScreen;
