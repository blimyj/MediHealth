import React, { Component } from "react";
import { View, Text } from "react-native";
import { Container, Content } from "native-base";

class RehabilitationScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
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
					Rehabilitation
				</Text>
			</View>
		),
		headerRight: <View />
	});

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
					<Text>Rehabilitation Screen</Text>
				</Content>
			</Container>
		);
	}
}

export default RehabilitationScreen;
