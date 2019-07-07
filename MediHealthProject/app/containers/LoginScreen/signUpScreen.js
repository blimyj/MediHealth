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

class SignUpScreen extends Component {
	state = {
		username: "",
		password: "",
		email: "",
		phone_number: ""
	};

	onChangeText = (key, val) => {
		this.setState({ [key]: val });
	};

	render() {
		return (
			<Container>
				<Form>
					<Item stackedLabel>
						<Label>Email</Label>
						<Input
							onChangeText={text => this.setState({ email: text })}
							value={this.state.email}
						/>
					</Item>
				</Form>

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
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	input: {
		width: 350,
		height: 55,
		backgroundColor: "#42A5F5",
		margin: 10,
		padding: 8,
		color: "white",
		borderRadius: 14,
		fontSize: 18,
		fontWeight: "500"
	},
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	textRow: {
		flexDirection: "row",
		justifyContent: "center",
		paddingHorizontal: 8
	}
});

export default SignUpScreen;
