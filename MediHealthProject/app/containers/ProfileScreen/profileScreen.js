import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Container } from "native-base";
import { NavigationEvents, DrawerActions } from "react-navigation";
import MenuButton from "../../components/menuButton";

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
			age: 0,
			weight: 0,
			height: 0,
			birthday: "01-01-2011"
		};

		this.readUserData = this.readUserData.bind(this);
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
						birthday: fbObject.birthday
					});
				});
		} else {
			console.log(user);
		}
	};

	render() {
		return (
			<Container>
				<View style={styles.container}>
					<View style={styles.header} />
					<Image
						style={styles.avatar}
						source={{
							uri: this.state.profilePic
						}}
					/>
					<View style={styles.body}>
						<View style={styles.bodyContent}>
							<Text style={styles.name}>{this.state.displayName}</Text>
							<Text style={styles.info}>Student</Text>
							<Text style={styles.description}>
								{"Age: " +
									this.state.age +
									"\n Weight: " +
									this.state.weight +
									"\n Height: " +
									this.state.height +
									"\n Birthday: " +
									this.state.birthday}
							</Text>

							<TouchableOpacity style={styles.buttonContainer}>
								<Text>Opcion 1</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.buttonContainer}>
								<Text>Opcion 2</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: "#62e4b5",
		height: 200
	},
	avatar: {
		width: 130,
		height: 130,
		borderRadius: 63,
		borderWidth: 4,
		borderColor: "white",
		marginBottom: 10,
		alignSelf: "center",
		position: "absolute",
		marginTop: 130
	},
	name: {
		fontSize: 22,
		color: "#FFFFFF",
		fontWeight: "600"
	},
	body: {
		marginTop: 40
	},
	bodyContent: {
		flex: 1,
		alignItems: "center",
		padding: 30
	},
	name: {
		fontSize: 28,
		color: "#696969",
		fontWeight: "600"
	},
	info: {
		fontSize: 16,
		color: "#62e4b5",
		marginTop: 10
	},
	description: {
		fontSize: 16,
		color: "#696969",
		marginTop: 10,
		textAlign: "center"
	},
	buttonContainer: {
		marginTop: 10,
		height: 45,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 20,
		width: 250,
		borderRadius: 30,
		backgroundColor: "#62e4b5"
	}
});

export default ProfileScreen;
