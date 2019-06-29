import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Icon, Button, Container, Content, Left, Right } from "native-base";
import { DrawerActions } from "react-navigation";
import styles from "../../appStyle";

class HomeScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		headerLeft: (
			<View>
				<Button
					transparent
					onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
				>
					<Icon ios="ios-menu" android="md-menu" style={{ color: "black" }} />
				</Button>
			</View>
		),
		headerTitle: (
			<View style={{ alignSelf: "center", flex: 1 }}>
				<Text style={{ textAlign: "center" }}>Home</Text>
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
					<TouchableOpacity
						title="Medicine" //might want to remove
						style={styles.bigButton}
						accessibilityLabel="Medicine"
						onPress={() => this.props.navigation.navigate("Medicine")}
					>
						<Text style={styles.bigButtonText}>Medicine</Text>
					</TouchableOpacity>

					<TouchableOpacity
						title="Appointments"
						style={styles.bigButton}
						accessibilityLabel="Appointment"
						onPress={() => this.props.navigation.navigate("Appointment")}
					>
						<Text style={styles.bigButtonText}>Appointment</Text>
					</TouchableOpacity>

					<TouchableOpacity
						title="Biomarker"
						style={styles.bigButton}
						accessibilityLabel="Biomarker"
						onPress={() => this.props.navigation.navigate("Biomarker")}
					>
						<Text style={styles.bigButtonText}>Biomarker</Text>
					</TouchableOpacity>

					<TouchableOpacity
						title="Rehabilitation"
						style={styles.bigButton}
						accessibilityLabel="Rehabilitation"
						onPress={() => this.props.navigation.navigate("Rehabilitation")}
					>
						<Text style={styles.bigButtonText}>Rehabilitation</Text>
					</TouchableOpacity>
				</Content>
			</Container>
		);
	}
}

export default HomeScreen;
