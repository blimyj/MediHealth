import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon, Button, Container, Content, Left } from "native-base";
import MyHeader from "../../components/header";
import * as firebase from "firebase";

class SettingsScreen extends Component {
	logout() {
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
	}

	render() {
		return (
			<Container>
				<MyHeader nav={this.props.navigation} headerTitle="Settings" />
				<Content contentContainerStyle={styles.contentContainer}>
					<TouchableOpacity
						title="Logout Button"
						style={styles.button}
						accessibilityLabel="Logout Button"
						onPress={this.logout}
					>
						<Text style={styles.text}>Logout</Text>
					</TouchableOpacity>
				</Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	contentContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	button: {
		backgroundColor: "transparent",
		height: 60,
		borderRadius: 5,
		padding: 15,
		marginTop: 10,
		borderColor: "#28DA9A",
		borderWidth: 2
	},
	text: {
		fontSize: 20,
		fontWeight: "400",
		color: "#b23b3b",
		alignSelf: "center"
	}
});

export default SettingsScreen;
