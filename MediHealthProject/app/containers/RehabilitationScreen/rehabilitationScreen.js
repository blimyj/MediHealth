import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Icon, Button, Container, Content, Left, Right } from "native-base";
import MyHeader from "../../components/header";

class RehabilitationScreen extends Component {
	render() {
		return (
			<Container>
				<MyHeader nav={this.props.navigation} headerTitle="Rehabilitation" />
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
