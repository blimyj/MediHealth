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
	createDrawerNavigator,
	DrawerItems
} from "react-navigation";
import { Container, Content, Header, Body } from "native-base";

import HomeScreen from "./containers/HomeScreen/homeScreen";
import SettingsScreen from "./containers/SettingsScreen/settingsScreen";
import MedicineScreen from "./containers/MedicineScreen/medicineScreen";
import AppointmentScreen from "./containers/AppointmentScreen/appointmentScreen";
import AppointmentInputScreen from "./containers/AppointmentScreen/AppointmentInputScreen/appointmentInputScreen";
import BiomarkerScreen from "./containers/BiomarkerScreen/biomarkerScreen";
import RehabilitationScreen from "./containers/RehabilitationScreen/rehabilitationScreen";
import ProfileScreen from "./containers/ProfileScreen/profileScreen";
import MapScreen from "./containers/MapScreen/mapScreen";

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
			screen: HomeScreen,
			navigationOptions: {
				drawerIcon: (
					<Image
						source={require("./assets/images/home-icon.png")}
						style={{ height: 24, width: 24, tintColor: "black" }}
					/>
				)
			}
		},
		Settings: {
			screen: SettingsScreen,
			navigationOptions: {
				drawerIcon: (
					<Image
						source={require("./assets/images/settings-icon.png")}
						style={{ height: 24, width: 24, tintColor: "black" }}
					/>
				)
			}
		},
		Medicine: {
			screen: MedicineScreen,
			navigationOptions: {
				drawerIcon: (
					<Image
						source={require("./assets/images/medicine-icon.png")}
						style={{ height: 24, width: 24, tintColor: "black" }}
					/>
				)
			}
		},
		Appointment: {
			screen: AppointmentScreen,
			navigationOptions: {
				drawerIcon: (
					<Image
						source={require("./assets/images/appointment-icon.png")}
						style={{ height: 24, width: 24, tintColor: "black" }}
					/>
				)
			}
		},
		AppointmentInput: {
			screen: AppointmentInputScreen,
			navigationOptions: {
				drawerLabel: () => null
			}
		},
		Biomarker: {
			screen: BiomarkerScreen,
			navigationOptions: {
				drawerIcon: (
					<Image
						source={require("./assets/images/biomarker-icon.png")}
						style={{ height: 24, width: 24, tintColor: "black" }}
					/>
				)
			}
		},
		Rehabilitation: {
			screen: RehabilitationScreen,
			navigationOptions: {
				drawerIcon: (
					<Image
						source={require("./assets/images/rehabilitation-icon.png")}
						style={{ height: 24, width: 24, tintColor: "black" }}
					/>
				)
			}
		},
		Profile: {
			screen: ProfileScreen,
			navigationOptions: {
				drawerLabel: () => null
			}
		},
		Map: {
			screen: MapScreen,
			navigationOptions: {
				drawerIcon: (
					<Image
						source={require("./assets/images/map-icon.png")}
						style={{ height: 24, width: 24, tintColor: "black" }}
					/>
				)
			}
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
