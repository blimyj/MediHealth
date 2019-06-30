import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Icon, Button, Header, Left, Right } from "native-base";
import MenuButton from "./menuButton";

class MyHeader extends Component {
	render() {
		return (
			<Header style={styles.headerStyle}>
				<Left style={styles.leftStyle}>
					<MenuButton whenPress={() => this.props.nav.openDrawer()} />
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
