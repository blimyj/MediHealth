import React, { Component } from "react";
import { Icon, Button } from "native-base";

class MenuButton extends Component {
	render() {
		return (
			<Button transparent onPress={this.props.whenPress}>
				<Icon ios="ios-menu" android="md-menu" style={{ color: "#28DA9A" }} />
			</Button>
		);
	}
}

export default MenuButton;
