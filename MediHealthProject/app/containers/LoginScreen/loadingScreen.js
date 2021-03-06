import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import * as firebase from "firebase";

export default class LoadingScreen extends React.Component {
	componentDidMount() {
		firebase.auth().onAuthStateChanged(user => {
			this.props.navigation.navigate(user ? "Home" : "Login");
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<ActivityIndicator size="large" color="#28DA9A" />
				<Text>Loading</Text>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	}
});
