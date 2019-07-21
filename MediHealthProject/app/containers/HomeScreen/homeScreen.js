import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Container, Content } from "native-base";
import { DrawerActions } from "react-navigation";
import styles from "../../appStyle";
import MenuButton from "../../components/menuButton";
import PushNotification from "react-native-push-notification";

class HomeScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		headerLeft: (
			<View>
				<MenuButton
					whenPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
				/>
			</View>
		),
		headerTitle: (
			<View style={{ alignSelf: "center", flex: 1 }}>
				<Text
					style={{
						textAlign: "center",
						fontWeight: "bold",
						fontSize: 18,
						color: "black"
					}}
				>
					Home
				</Text>
			</View>
		),
		headerRight: <View />
	});

	constructor(props) {
		super(props);

		//PushNotification Configuration
        PushNotification.configure({
            onNotification: function(notification) {
				console.log("NOTIFICATION:", notification['dataInfo']);
                //To test if dataInfo work in both android and iOS or must use tag and userInfo for each OS
                props.navigation.navigate('Notification', {data: notification}); 
                
            },
            popInitialNotification: true,
            requestPermissions: true
		});

		//State Initialization
		this.state = {
			info: 0
		}
	}

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
						<View style={styles.bigButtonView}>
							<Image
								source={require("../../assets/images/medicine-icon.png")}
								style={styles.icon}
							/>
							<Text style={[styles.bigButtonText, { left: 52 }]}>Medicine</Text>
						</View>
					</TouchableOpacity>

					<TouchableOpacity
						title="Appointments"
						style={styles.bigButton}
						accessibilityLabel="Appointment"
						onPress={() => this.props.navigation.navigate("Appointment")}
					>
						<View style={styles.bigButtonView}>
							<Image
								source={require("../../assets/images/appointment-icon.png")}
								style={styles.icon}
							/>
							<Text style={[styles.bigButtonText, { left: 40 }]}>
								Appointment
							</Text>
						</View>
					</TouchableOpacity>

					{/* <TouchableOpacity
						title="Biomarker"
						style={styles.bigButton}
						accessibilityLabel="Biomarker"
						onPress={() => this.props.navigation.navigate("Biomarker")}
					>
						<View style={styles.bigButtonView}>
							<Image
								source={require("../../assets/images/biomarker-icon.png")}
								style={styles.icon}
							/>
							<Text style={[styles.bigButtonText, { left: 48 }]}>
								Biomarker
							</Text>
						</View>
					</TouchableOpacity>

					<TouchableOpacity
						title="Rehabilitation"
						style={styles.bigButton}
						accessibilityLabel="Rehabilitation"
						onPress={() => this.props.navigation.navigate("Rehabilitation")}
					>
						<View style={styles.bigButtonView}>
							<Image
								source={require("../../assets/images/rehabilitation-icon.png")}
								style={styles.icon}
							/>
							<Text style={[styles.bigButtonText, { left: 38 }]}>
								Rehabilitation
							</Text>
						</View>
					</TouchableOpacity>

					<TouchableOpacity
						
						onPress={() => {
							this.props.navigation.navigate('Notification', {data: 
								{dataInfo: 
									{medName: "From Home"}
								}
							}
							); 
							
							this.state.info = 1;
							PushNotification.localNotificationSchedule({ 
								//For Android (Must test if works on iOS emulator)
								tag: this.state.info,
								//For iOS (must test if works on Android emulator)
								userInfo: this.state.info,
								//For both Android & iOS
								dataInfo: this.state.info, //This is meant for both iOS and Android, to test if readable in iOS
								message: "My Message", 
								date: new Date(Date.now() + (3 * 1000)) // in 60 secs})
							
							})
							
						}}
					>
						<Text>Notif</Text>
					</TouchableOpacity>
					*/}
				</Content>
			</Container>
		);
	}
}

export default HomeScreen;
