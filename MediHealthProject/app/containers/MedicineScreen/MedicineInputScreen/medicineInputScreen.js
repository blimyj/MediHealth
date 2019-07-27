import React, { Component } from "react";
import { View, Text, TouchableOpacity, ListView, Image } from "react-native";
import {
	Form,
	Input,
	Item,
	Label,
	Container,
	Content,
	Button
} from "native-base";
import styles from "./appStyle";
import * as firebase from "firebase";
import PushNotification from "react-native-push-notification";

var data = [];

class MedicineInputScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		headerTitle: (
			<View style={{ alignSelf: "center", flex: 1 }}>
				<Text style={{ textAlign: "center" }}>Medicine</Text>
			</View>
		),
		headerRight: <View />
	});

	constructor(props) {
		super(props);

		//PushNotification Configuration
        PushNotification.configure({
            onNotification: function(notification) {
                console.log("MEDICATION:", notification);
                //To test if dataInfo work in both android and iOS or must use tag and userInfo for each OS
                props.navigation.navigate('Notification', {data: notification}); 
                
            },
            popInitialNotification: true,
            requestPermissions: true
		});

		//State Initialization
		this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

		this.state = {
			listViewData: data,
			medicine: "",
			frequency: "",
			date: "",
			time: ""
		};
	}

	addMedication(dataName, dataFreq, dataDate, dataTime) {
		console.log(dataDate);
		console.log(dataTime);
		var user = firebase.auth().currentUser;
		if (user != null) {
			// Add Medicine
			const uid = user.uid;
			var key = firebase
				.database()
				.ref("/users_URW/" + uid + "/medications/list")
				.push().key;

			firebase
				.database()
				.ref("/users_URW/" + uid + "/medications/list")
				.child(key)
				.set({
					medName: dataName,
					medFreq: dataFreq,
					medDate: dataDate,
					medTime: dataTime
				});
			
			if (dataFreq > 0) {//Set local repeating notification otherwise set a one off notification
				PushNotification.localNotificationSchedule({
					//... You can use all the options from localNotifications
					message: "Time to eat your medicine!", // (required)
					date: new Date(dataDate + " " + dataTime),
					//Format
					//Date 2019/mm/dd
					//Time HH:mm
					//dataInfo: {name: "Encapsulated"},
					tag: 'Hihi',
					dataInfo: {
						notifType: 'medicine',
						medName: dataName
						//Work on encapsulating data
					},
					
					repeatType: 'time',
					repeatTime: dataFreq * 1000 * 60 * 60 // in milliseconds
				});
			} else {
				PushNotification.localNotificationSchedule({
					//... You can use all the options from localNotifications
					message: "Time to eat your medicine!", // (required)
					date: new Date(dataDate + " " + dataTime),
					//Format
					//Date 2019/mm/dd
					//Time HH:mm
					//dataInfo: {name: "Encapsulated"},
					tag: 'Hihi',
					dataInfo: {
						notifType: 'medicine',
						medName: dataName
						//Work on encapsulating data
					}
				});
			}
		} else {
			console.log(user);
		}
	}

	render() {
		return (
			<Container>
				<Content
					contentContainerStyle={{
						flex: 1
					}}
				>
					<Text>MedicineInputScreen</Text>

					<Form>
						<Item stackedLabel>
							<Label>Medicine</Label>
							<Input
								onChangeText={text => this.setState({ medicine: text })}
							/>
						</Item>
						<Item stackedLabel num1>
							<Label>Frequency</Label>
							<Input onChangeText={text => this.setState({ frequency: text })} />
						</Item>
						<Item stackedLabel num2>
							<Label>Date</Label>
							<Input onChangeText={text => this.setState({ date: text })} />
						</Item>
						<Item stackedLabel num3>
							<Label>Time</Label>
							<Input onChangeText={text => this.setState({ time: text })} />
						</Item>
					</Form>

					<Button
						transparent
						title="MedicineInput"
						accessibilityLabel="Medicine Input Button"
						onPress={() => {
							this.addMedication(
								this.state.medicine,
								this.state.frequency,
								this.state.date,
								this.state.time
							);
							this.props.navigation.navigate("Medicine");
						}}
						style={{ alignSelf: "flex-end", bottom: 15, right: 15 }}
					>
						<Image
							source={require("../../../assets/images/plus-icon.png")}
							style={styles.appointmentInputButton}
						/>
					</Button>
				</Content>
			</Container>
		);
	}
}

export default MedicineInputScreen;
