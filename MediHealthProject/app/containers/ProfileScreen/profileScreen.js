import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Container } from "native-base";
import { NavigationEvents, DrawerActions } from "react-navigation";
import MenuButton from "../../components/menuButton";
import { Avatar } from "react-native-elements";
import * as firebase from "firebase";

class ProfileScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		headerLeft: (
			<View>
				<MenuButton
					whenPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
				/>
			</View>
		),
		headerRight: (
			<TouchableOpacity
				style={{ alignSelf: "center" }}
				accessibilityLabel="Profile Edit Button"
				onPress={() => navigation.navigate("EditProfile")}
			>
				<Image
					source={require("../../assets/images/update-icon.png")}
					style={{
						height: 28,
						width: 28,
						tintColor: "#28DA9A"
					}}
				/>
			</TouchableOpacity>
		),
		headerRightContainerStyle: { right: 20 }
	});

	constructor(props) {
		super(props);

		this.state = {
			profilePic: "https://i.imgur.com/MQHYB.jpg",
			displayName: "",
			age: "0",
			weight: "0",
			height: "0",
			birthday: "01-01-2000",
			job: "Patient",
			heightInCm: true,
			weightInKg: true
		};

		this.readUserData = this.readUserData.bind(this);
		this.displayHeight = this.displayHeight.bind(this);
		this.displayWeight = this.displayWeight.bind(this);
	}

	componentDidMount() {
		this.readUserData();
	}

	readUserData = () => {
		var user = firebase.auth().currentUser;
		if (user != null) {
			const uid = user.uid;
			console.log(uid);

			firebase
				.database()
				.ref("users_PR_URW/" + uid + "/Profile")
				.once("value", snapshot => {
					const fbObject = snapshot.val();
					console.log("Here: ", fbObject);
					this.setState({
						profilePic: fbObject.profilePic,
						displayName: fbObject.displayName,
						age: fbObject.age,
						weight: fbObject.weight,
						height: fbObject.height,
						birthday: fbObject.birthday,
						job: fbObject.job
					});
				});
		} else {
			console.log(user);
		}
	};

	displayHeight() {
		if (this.state.heightInCm) {
			return (
				<TouchableOpacity onPress={() => this.setState({ heightInCm: false })}>
					<Text style={styles.details}>{this.state.height + " cm"}</Text>
				</TouchableOpacity>
			);
		} else {
			heightInFt = Math.round((this.state.height / 30.48) * 100) / 100;
			return (
				<TouchableOpacity onPress={() => this.setState({ heightInCm: true })}>
					<Text style={styles.details}>{heightInFt + " ft"}</Text>
				</TouchableOpacity>
			);
		}
	}

	displayWeight() {
		if (this.state.weightInKg) {
			return (
				<TouchableOpacity onPress={() => this.setState({ weightInKg: false })}>
					<Text style={styles.details}>{this.state.weight + " kg"}</Text>
				</TouchableOpacity>
			);
		} else {
			weightInPounds = Math.round(this.state.weight * 2.20462);
			return (
				<TouchableOpacity onPress={() => this.setState({ weightInKg: true })}>
					<Text style={styles.details}>{weightInPounds + " lbs"}</Text>
				</TouchableOpacity>
			);
		}
	}

	render() {
		return (
			<Container>
				<NavigationEvents onDidFocus={this.readUserData} />
				<View style={{ backgroundColor: "#F9F9F9", flex: 1 }}>
					<Avatar
						rounded
						title={this.state.displayName[0]}
						source={{
							uri: this.state.profilePic
						}}
						size="xlarge"
						containerStyle={styles.avatar}
					/>
					<View style={{ alignItems: "center" }}>
						<Text style={styles.name}>{this.state.displayName}</Text>
					</View>
					<View style={{ alignItems: "center" }}>
						<Text style={styles.info}>{this.state.job}</Text>
					</View>
					<View style={{ backgroundColor: "white" }}>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								paddingLeft: 16,
								paddingRight: 16,
								paddingTop: 8,
								paddingBottom: 8,
								borderTopWidth: 0.3,
								borderBottomWidth: 0.1,
								borderColor: "#62e4b5"
							}}
						>
							<Text
								style={{ color: "black", fontWeight: "bold", fontSize: 16 }}
							>
								Age
							</Text>
							<Text style={styles.details}>
								{this.state.age + " years old"}
							</Text>
						</View>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								paddingLeft: 16,
								paddingRight: 16,
								paddingTop: 8,
								paddingBottom: 8,
								borderTopWidth: 0.2,
								borderBottomWidth: 0.1,
								borderColor: "#62e4b5"
							}}
						>
							<Text
								style={{ color: "black", fontWeight: "bold", fontSize: 16 }}
							>
								Birthday
							</Text>
							<Text style={styles.details}>{this.state.birthday}</Text>
						</View>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								paddingLeft: 16,
								paddingRight: 16,
								paddingTop: 8,
								paddingBottom: 8,
								borderTopWidth: 0.2,
								borderBottomWidth: 0.1,
								borderColor: "#62e4b5"
							}}
						>
							<Text
								style={{ color: "black", fontWeight: "bold", fontSize: 16 }}
							>
								Height
							</Text>
							{this.displayHeight()}
						</View>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								paddingLeft: 16,
								paddingRight: 16,
								paddingTop: 8,
								paddingBottom: 8,
								borderTopWidth: 0.2,
								borderBottomWidth: 0.3,
								borderColor: "#62e4b5"
							}}
						>
							<Text
								style={{ color: "black", fontWeight: "bold", fontSize: 16 }}
							>
								Weight
							</Text>
							{this.displayWeight()}
						</View>
					</View>
				</View>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	avatar: {
		alignSelf: "center",
		marginTop: 24
	},
	name: {
		fontSize: 28,
		color: "black",
		fontWeight: "600",
		marginTop: 10
	},
	info: {
		fontSize: 16,
		color: "#28DA9A",
		marginTop: 5,
		marginBottom: 12
	},
	details: {
		color: "#696969",
		fontSize: 16
	}
});

export default ProfileScreen;
