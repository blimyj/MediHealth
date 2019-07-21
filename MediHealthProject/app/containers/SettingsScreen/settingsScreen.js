import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Container, Content } from "native-base";
import { DrawerActions } from "react-navigation";
import MenuButton from "../../components/menuButton";
import * as firebase from "firebase";

class SettingsScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		headerLeft: (
			<View>
				<MenuButton
					whenPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
				/>
			</View>
		),
		headerTitle: (
			<View style={{ alignSelf: "center", flex: 1 }}>
				<Text
					style={{
						textAlign: "center",
						fontWeight: "bold",
						fontSize: 18,
						color: "black"
					}}
				>
					Settings
				</Text>
			</View>
		),
		headerRight: <View />
	});

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
