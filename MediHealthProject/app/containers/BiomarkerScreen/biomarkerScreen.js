import React, { Component } from "react";
import { View, Text } from "react-native";
import { Container, Content } from "native-base";

class BiomarkerScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		headerTitle: (
			<View style={{ alignSelf: "center", flex: 1 }}>
				<Text style={{ textAlign: "center" }}>Biomarker</Text>
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
					<Text>Biomarker Screen</Text>
				</Content>
			</Container>
		);
	}
}

export default BiomarkerScreen;
