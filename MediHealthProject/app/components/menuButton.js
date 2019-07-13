import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { Icon, Button } from "native-base";

class MenuButton extends Component {
	render() {
		return (
			<TouchableOpacity
				style={{
					alignSelf: "center",
					padding: 16,
					backgroundColor: "transparent"
				}}
				onPress={this.props.whenPress}
			>
				<Icon ios="ios-menu" android="md-menu" style={{ color: "#28DA9A" }} />
			</TouchableOpacity>
		);
	}
}

export default MenuButton;
