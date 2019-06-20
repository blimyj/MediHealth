import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Icon, Button, Header, Left, Right } from "native-base";

class MyHeader extends Component {
	render() {
		return (
			<Header style={{ backgroundColor: "white" }}>
				<Left style={{ flex: 1, flexDirection: "row" }}>
					<Button transparent onPress={() => this.props.nav.openDrawer()}>
						<Icon ios="ios-menu" android="md-menu" style={{ color: "black" }} />
					</Button>
				</Left>
				<View
					style={{
						justifyContent: "center",
						flexDirection: "row",
						alignItems: "center"
					}}
				>
					<Text>{this.props.headerTitle}</Text>
					{/* <Image
						source={this.props.headerIcon}
						style={{ height: 24, width: 24, tintColor: "black", left: 8 }}
					/> */}
				</View>
				<Right />
			</Header>
		);
	}
}

export default MyHeader;
