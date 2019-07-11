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

import { DrawerActions } from "react-navigation";
import * as firebase from "firebase";

class EditProfileScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		headerRight: <View />
	});

	render() {
		return (
			<Container>
				<Text>Hello</Text>
			</Container>
		);
	}
}

export default EditProfileScreen;
