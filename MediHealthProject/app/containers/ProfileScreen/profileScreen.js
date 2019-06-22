import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Container } from "native-base";
import MyHeader from "../../components/header";

class ProfileScreen extends Component {
	static navigationOptions = {
		drawerLabel: () => null
	};

	render() {
		return (
			<Container>
				<MyHeader nav={this.props.navigation} headerTitle="MediHealth" />
				<View style={styles.container}>
					<View style={styles.header} />
					<Image
						style={styles.avatar}
						source={{
							uri:
								"https://media.licdn.com/dms/image/C5103AQEiJL0AgWj5KQ/profile-displayphoto-shrink_800_800/0?e=1566432000&v=beta&t=MaAA-eyV5MXKmgj4rRqSfKE8fwGDtjkkVn-EMruGzKA"
						}}
					/>
					<View style={styles.body}>
						<View style={styles.bodyContent}>
							<Text style={styles.name}>Sng Hao Jun</Text>
							<Text style={styles.info}>Student</Text>
							<Text style={styles.description}>
								Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum
								electram expetendis, omittam deseruisse consequuntur ius an,
							</Text>

							<TouchableOpacity style={styles.buttonContainer}>
								<Text>Opcion 1</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.buttonContainer}>
								<Text>Opcion 2</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: "#28DA9A",
		height: 200
	},
	avatar: {
		width: 130,
		height: 130,
		borderRadius: 63,
		borderWidth: 4,
		borderColor: "white",
		marginBottom: 10,
		alignSelf: "center",
		position: "absolute",
		marginTop: 130
	},
	name: {
		fontSize: 22,
		color: "#FFFFFF",
		fontWeight: "600"
	},
	body: {
		marginTop: 40
	},
	bodyContent: {
		flex: 1,
		alignItems: "center",
		padding: 30
	},
	name: {
		fontSize: 28,
		color: "#696969",
		fontWeight: "600"
	},
	info: {
		fontSize: 16,
		color: "#28DA9A",
		marginTop: 10
	},
	description: {
		fontSize: 16,
		color: "#696969",
		marginTop: 10,
		textAlign: "center"
	},
	buttonContainer: {
		marginTop: 10,
		height: 45,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 20,
		width: 250,
		borderRadius: 30,
		backgroundColor: "#28DA9A"
	}
});

export default ProfileScreen;
