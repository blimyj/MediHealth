import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Icon, Button, Header, Left, Right } from "native-base";

class MyHeader extends Component {
	render() {
		return (
			<Header style={styles.headerStyle}>
				<Left style={styles.leftStyle}>
					<Button transparent onPress={() => this.props.nav.openDrawer()}>
						<Icon ios="ios-menu" android="md-menu" style={{ color: "black" }} />
					</Button>
				</Left>
				<View style={styles.viewStyle}>
					<Text>{this.props.headerTitle}</Text>
				</View>
				<Right />
			</Header>
		);
	}
}

const styles = StyleSheet.create({
	headerStyle: {
		backgroundColor: "white",
		height: 60
	},
	leftStyle: {
		flex: 1,
		flexDirection: "row"
	},
	viewStyle: {
		justifyContent: "center",
		flexDirection: "row",
		alignItems: "center"
	}
});

export default MyHeader;
