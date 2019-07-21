import React, { Component } from "react";
import {
	View,
	Text,
	FlatList,
	TouchableOpacity,
	Image,
	ListView
} from "react-native";
import { Container, Content, Button } from "native-base";
import { NavigationEvents } from "react-navigation";
import styles from "./appStyle";
import * as firebase from "firebase";


class NotificationScreen extends Component {

	constructor(props) {
		super(props);
		
		this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

		this.state = {
			medName: this.props.navigation.getParam('data').dataInfo.medName
		}

	}

	//Taken Handler
	

	//Snooze Handler
	snooze() {
		//Prompt for duration to remind later 
		
		//Create new notification

		//How would this affect other notifications???

	}

	//Skip Handler


	medNotificationDisplay(notificationDataInfo) {
		//medName
		//freq
		//date
		//time
		//
	}

	notificationPasser(notificationType) {
		if(notificationType == 'medicine') {
			return medNotificationDisplay;
		}
	}

	render() {
		console.log("Test Start.")
		console.log(this.props.navigation.getParam('data', "TestFailed"));
		console.log(this.props.navigation.getParam('data', "TestFailed").dataInfo.medName);
		console.log(this.props.navigation.getParam('data', "TestFailed").tag);
		console.log("Test Complete.")
		return (
			<Container>
				<NavigationEvents/>
				<Content contentContainerStyle={{ flex: 1 }}>
					<View style={{flex: 1 }}>
						<Text style={{ textAlign: "center" }}>
							{this.state.medName}
						</Text>
					</View>
					<View style={{flex: 1 }}>
						<View style={{flex: 1 }}></View>
						<View style={{flexDirection: 'row', justifyContent: 'space-evenly', flex: 1 }}>
						<Button
							transparent
							title="Yes"
							accessibilityLabel="Taken"
							onPress={() => this.props.navigation.navigate("Medicine")}
							style={{}}
						>
							<Image
								source={require("../../assets/images/plus-icon.png")}
								style={styles.takenButton}
							/>
						</Button>
						<Button
							transparent
							title="Snooze"
							accessibilityLabel="Snooze"
							onPress={() => this.props.navigation.navigate("Medicine")}
							style={{}}
						>
							<Image
								source={require("../../assets/images/plus-icon.png")}
								style={styles.snoozeButton}
							/>
						</Button>
						<Button
							transparent
							title="No"
							accessibilityLabel="Skip"
							onPress={() => this.props.navigation.navigate("Medicine")}
							style={{}}
						>
							<Image
								source={require("../../assets/images/plus-icon.png")}
								style={styles.skipButton}
							/>
						</Button>
						</View>
						<View style={{flex: 1 }}></View>
					</View>
				</Content>
			</Container>
		);
	}
}

export default NotificationScreen;
