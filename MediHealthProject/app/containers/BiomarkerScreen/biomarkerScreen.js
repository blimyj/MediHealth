import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Icon, Button, Container, Content, Left, Right } from "native-base";
import MyHeader from "../../components/header";

class BiomarkerScreen extends Component {
	render() {
		return (
			<Container>
				<MyHeader nav={this.props.navigation} headerTitle="Biomarker" />
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
