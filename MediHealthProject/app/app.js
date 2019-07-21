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
	createStackNavigator,
	createSwitchNavigator,
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
import LoginScreen from "./containers/LoginScreen/loginScreen";
import LoadingScreen from "./containers/LoginScreen/loadingScreen";
import NotificationScreen from "./containers/NotificationScreen/notificationScreen";
import MedicineInputScreen from "./containers/MedicineScreen/MedicineInputScreen/medicineInputScreen"

import Config from "react-native-config";
import * as firebase from "firebase";

var firebaseConfig = {
	apiKey: Config.FIREBASE_API_KEY,
	authDomain: Config.authDomain,
	databaseURL: Config.databaseURL,
	projectId: Config.projectId,
	storageBucket: Config.storageBucket,
	messagingSenderId: Config.messagingSenderId,
	appId: Config.appId
};

firebase.initializeApp(firebaseConfig);

const { width, height } = Dimensions.get("screen");

const MyStackNav = createStackNavigator(
	{
		Home: {
			screen: HomeScreen
		},
		Medicine: {
			screen: MedicineScreen
		},
		MedicineInput: {
			screen: MedicineInputScreen
		},
		Appointment: {
			screen: AppointmentScreen
		},
		AppointmentInput: {
			screen: AppointmentInputScreen
		},
		Biomarker: {
			screen: BiomarkerScreen
		},
		Rehabilitation: {
			screen: RehabilitationScreen
		},
		Notification: {
			screen: NotificationScreen
		}
	},
	{
		initialRouteName: "Home",
		defaultNavigationOptions: {
			headerLeftContainerStyle: { left: 3 },
			headerBackImage: (
				<Image
					source={require("./assets/images/back-icon.png")}
					style={{ height: 24, width: 24, tintColor: "#28DA9A" }}
				/>
			),
			headerStyle: { height: 60 }
		},
		headerMode: "float"
	}
);

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
						<Image
							source={require("./assets/images/profile-icon.png")}
							style={styles.profileIcon}
						/>
						<Text style={styles.profileName}>Sng Hao Jun</Text>
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
			screen: MyStackNav,
			navigationOptions: {
				drawerIcon: (
					<Image
						source={require("./assets/images/home-icon.png")}
						style={{ height: 24, width: 24, tintColor: "#28DA9A" }}
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
						style={{ height: 24, width: 24, tintColor: "#28DA9A" }}
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
						style={{ height: 24, width: 24, tintColor: "#28DA9A" }}
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

const MySwitch = createSwitchNavigator(
	{
		Loading: {
			screen: LoadingScreen
		},
		Login: {
			screen: LoginScreen
		},
		Home: {
			screen: MyApp
		}
	},
	{
		initialRouteName: "Loading"
	}
);

const AppContainer = createAppContainer(MySwitch);

const styles = StyleSheet.create({
	sideBarHeader: {
		backgroundColor: "white",
		height: 60
	},
	profileIcon: {
		height: 24,
		width: 24,
		tintColor: "#28DA9A",
		left: 5
	},
	profileName: {
		left: 35,
		fontWeight: "bold",
		color: "black",
		fontSize: 16
	}
});

export default class App extends Component {
	constructor(props) {
		super(props);
		console.disableYellowBox = true;
	}

	render() {
		return <AppContainer />;
	}
}
