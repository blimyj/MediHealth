import React, { Component } from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	Dimensions
} from "react-native";
import {
	createAppContainer,
	createStackNavigator,
	createDrawerNavigator,
	DrawerItems
} from "react-navigation";
import { Container, Content, Header, Body, Icon, Button } from "native-base";

import HomeScreen from "./containers/HomeScreen/homeScreen";
import SettingsScreen from "./containers/SettingsScreen/settingsScreen";
import MedicineScreen from "./containers/MedicineScreen/medicineScreen";
import AppointmentScreen from "./containers/AppointmentScreen/appointmentScreen";
import BiomarkerScreen from "./containers/BiomarkerScreen/biomarkerScreen";
import RehabilitationScreen from "./containers/RehabilitationScreen/rehabilitationScreen";
import ProfileScreen from "./containers/ProfileScreen/profileScreen";

const { width, height } = Dimensions.get("screen");

const CustomDrawerContentComponent = props => (
	<Container>
		<Header style={styles.sideBarHeader}>
			<Body>
				<TouchableOpacity
					onPress={() => props.navigation.navigate("Profile")}
					hitSlop={{
						right: Math.min(height, width) * 0.75,
						left: Math.min(height, width) * 0.05
					}} // Clickable area
				>
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						{/* <Icon
							type="FontAwesome"
							name="user-circle"
							style={{ color: "black", left: 5 }}
						/> */}
						<Image
							source={require("./assets/images/profile-icon.png")}
							style={styles.profileIcon}
						/>
						<Text style={styles.profileName}>Joel Loong</Text>
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
		contentComponent: CustomDrawerContentComponent,
		drawerWidth: Math.min(height, width) * 0.8
	}
);

const AppContainer = createAppContainer(MyApp);

const styles = StyleSheet.create({
	sideBarHeader: {
		backgroundColor: "white",
		height: 60
	},
	profileIcon: {
		height: 24,
		width: 24,
		tintColor: "black",
		left: 5
	},
	profileName: {
		left: 35,
		fontWeight: "bold",
		color: "black"
	}
});

export default class App extends Component {
	render() {
		return <AppContainer />;
	}
}
