import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import {
	createAppContainer,
	createStackNavigator,
	createDrawerNavigator,
	createBottomTabNavigator,
	DrawerItems
} from "react-navigation";
import { Container, Content, Header, Body, Icon, Button } from "native-base";

import HomeScreen from "./containers/homeScreen";
import SettingsScreen from "./containers/settingsScreen";
import MedicineScreen from "./containers/medicineScreen";
import AppointmentScreen from "./containers/appointmentScreen";
import BiomarkerScreen from "./containers/biomarkerScreen";
import RehabilitationScreen from "./containers/rehabilitationScreen";
import ProfileScreen from "./containers/profileScreen";

const CustomDrawerContentComponent = props => (
	<Container>
		<Header style={{ backgroundColor: "white", height: 100 }}>
			<Body>
				<TouchableOpacity onPress={() => props.navigation.navigate("Profile")}>
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<Icon
							type="FontAwesome"
							name="user-circle"
							style={{ color: "black", left: 5 }}
						/>
						<Text style={{ left: 31 }}>Joel Loong</Text>
					</View>
				</TouchableOpacity>
			</Body>
		</Header>
		<Content>
			<DrawerItems {...props} />
		</Content>
	</Container>
);

const MyApp = createDrawerNavigator(
	{
		Home: {
			screen: HomeScreen
		},
		Settings: {
			screen: SettingsScreen
		},
		Medicine: {
			screen: MedicineScreen
		},
		Appointment: {
			screen: AppointmentScreen
		},
		Biomarker: {
			screen: BiomarkerScreen
		},
		Rehabilitation: {
			screen: RehabilitationScreen
		},
		Profile: {
			screen: ProfileScreen
		}
	},
	{
		initialRouteName: "Home",
		contentComponent: CustomDrawerContentComponent
	}
);

const AppContainer = createAppContainer(MyApp);

const styles = StyleSheet.create({
	drawerImage: {
		height: 150,
		width: 150,
		borderRadius: 75
	}
});

export default class App extends Component {
	render() {
		return <AppContainer />;
	}
}
