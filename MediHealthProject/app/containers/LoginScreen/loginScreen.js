import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import {
	Icon,
	Button,
	Container,
	Content,
	Form,
	Item,
	Label,
	Input
} from "native-base";
import MyHeader from "../../components/header";
import styles from "./appStyle";

import * as firebase from "firebase";

class LoginScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			currEmail: "",
			password: "",
			error: "",
			uid: ""
		};

		//this.displayUser = this.displayUser.bind(this);
	}

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
						"https://media.licdn.com/dms/image/C5103AQEiJL0AgWj5KQ/profile-displayphoto-shrink_800_800/0?e=1566432000&v=beta&t=MaAA-eyV5MXKmgj4rRqSfKE8fwGDtjkkVn-EMruGzKA",
					displayName: "Hao Jun",
					age: 22,
					weight: 20,
					height: 190,
					birthday: "30-06-2019"
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
						initMedicine: "Empty"
					}
				},

				//Appointments
				appointments: {
					metaData: {
						count: 0
					},
					list: {
						appointmentNum: -1,
						apppointmentName: "InitApptName",
						appointmentLocation: "InitApptLocation",
						appointmentDate: initDate,
						appointmentTime: initTime
					}
				}
			});
	}

	signUp(email, password) {
		alert(
			"Creating your account! Please wait for the next alert. //This to be changed to a modal screen popup with loading animation."
		);
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(
				authData => {
					console.log(authData.user);
					console.log(authData.user.uid);
					this.writeUserData(authData.user.uid);
					this.initialiseUserData(authData.user.uid);

					//Clears input fields

					this.setState({ password: "" }, () => {
						this.setState({ email: "" }, () =>
							alert(
								"Your account has been created and you've been signed in! \n//To be replaced with navigate away from login screen"
							)
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

	login(email, password) {
		alert(
			"Logging you in! Please wait for the next alert. //This to be changed to a modal screen popup with loading animation."
		);
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(
				() => {
					alert("Login Successful!");

					this.setState({ password: "" });
					this.setState({ email: "" });
				},
				() => {
					alert("User / Password Combination does not exist.");
					this.setState({ password: "" });
				}
			)
			.catch(error => {
				alert("Unknown Login Error.");
				this.setState({ password: "" });
			});
	}

	logout() {
		alert(
			"Logging you out! Please wait for the next alert. //This to be changed to a modal screen popup with loading animation."
		);
		firebase
			.auth()
			.signOut()
			.then(
				() => {
					alert("You've been logged out!");
				},
				() => {
					alert(
						"Unknown Logout Error. \n Beware: You may not have been logged out."
					);
				}
			);
		this.setState({ password: "" });
		this.setState({ email: "" });
	}

	displayUser() {
		function alertCallback() {
			alert(this.state.currEmail);
		}

		console.log("displayUser");
		var user = firebase.auth().currentUser;
		console.log(user);

		if (user != null) {
			this.setState({ currEmail: user.email }, alertCallback);
		} else {
			this.setState({ currEmail: "No current user" }, alertCallback);
		}
	}

	render() {
		return (
			<Container>
				<Content
					contentContainerStyle={{
						flex: 1,
						alignItems: "center",
						justifyContent: "center"
					}}
				>
					<Form>
						<Item stackedLabel>
							<Label>Email</Label>
							<Input
								onChangeText={text => this.setState({ email: text })}
								value={this.state.email}
							/>
						</Item>
						<Item stackedLabel num1>
							<Label>Password</Label>
							<Input
								secureTextEntry={true}
								onChangeText={text => this.setState({ password: text })}
								value={this.state.password}
							/>
						</Item>
					</Form>
					<View style={styles.ButtonsContainer}>
						<View style={styles.ButtonPadding} />

						<View style={styles.ButtonContainer}>
							<TouchableOpacity
								title="Login Button"
								style={styles.LoginButton}
								accessibilityLabel="Login Button"
								onPress={() => {
									this.login(this.state.email, this.state.password);
								}}
							>
								<Text style={styles.bigButtonText}>Login</Text>
							</TouchableOpacity>
						</View>

						<View style={styles.ButtonPadding} />

						<View style={styles.ButtonContainer}>
							<TouchableOpacity
								title="Sign Up Button"
								style={styles.SignUpButton}
								accessibilityLabel="Sign Up Button"
								onPress={() => {
									this.signUp(this.state.email, this.state.password);
								}}
							>
								<Text style={styles.bigButtonText}>Sign Up</Text>
							</TouchableOpacity>
						</View>

						<View style={styles.ButtonPadding} />
					</View>

					<View style={styles.ButtonsContainer}>
						<View style={styles.ButtonPadding} />

						<View style={styles.ButtonContainer}>
							<TouchableOpacity
								title="Logout Button"
								style={styles.LogoutButton}
								accessibilityLabel="Logout Button"
								onPress={() => {
									this.logout();
								}}
							>
								<Text style={styles.bigButtonText}>Logout</Text>
							</TouchableOpacity>
						</View>

						<View style={styles.ButtonPadding} />

						<View style={styles.ButtonContainer}>
							<TouchableOpacity
								title="Display User Button"
								style={styles.DisplayUserButton}
								accessibilityLabel="Display User Button"
								onPress={() => {
									this.displayUser();
								}}
							>
								<Text style={styles.bigButtonText}>Display</Text>
							</TouchableOpacity>
						</View>

						<View style={styles.ButtonPadding} />
					</View>
				</Content>
			</Container>
		);
	}
}

export default LoginScreen;
