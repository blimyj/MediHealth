import React, { Component } from "react";
import {
	View,
	Text,
	FlatList,
	TouchableOpacity,
	ListView,
	Image
} from "react-native";
import { Container, Content, Button } from "native-base";
import { NavigationEvents } from "react-navigation";
import styles from "./appStyle";
import * as firebase from "firebase";

var data = [];

class AppointmentScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		headerTitle: (
			<View style={{ alignSelf: "center", flex: 1 }}>
				<Text style={{ textAlign: "center" }}>Appointment</Text>
			</View>
		),
		headerRight: <View />
	});

	constructor(props) {
		super(props);

		this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

		this.state = {
			listViewData: data,
			appointment: "",
			location: "",
			date: "",
			time: ""
		};

		this.readUserData = this.readUserData.bind(this);
	}

	componentDidMount() {
		this.readUserData();
	}

	readUserData = () => {
		firebase
			.database()
			.ref("/items")
			.once("value", snapshot => {
				const fbObject = snapshot.val();
				const newArr = Object.keys(fbObject).map(key => {
					fbObject[key].id = key;
					return fbObject[key];
				});
				this.setState({ listViewData: newArr });
			});
	};

	render() {
		return (
			<Container>
				<NavigationEvents onDidFocus={this.readUserData} />
				<Content
					contentContainerStyle={{
						flex: 1
						//alignItems: "center",
						//width: "100%"
						//justifyContent: "center"
					}}
				>
					<FlatList
						data={this.state.listViewData}
						renderItem={({ item }) => (
							<View style={styles.AppointmentButtonContainer}>
								<View style={styles.AppointmentButtonPadding} />
								<TouchableOpacity
									title={item.appt}
									style={styles.AppointmentButton}
									accessibilityLabel={item.appt}
									onPress={() => this.props.navigation.navigate("Biomarker")}
								>
									<View style={styles.AppointmentButtonRow}>
										{/*Row 1*/}
										<View style={styles.AppointmentButtonRowLeftColumn}>
											<Text style={styles.AppointmentButtonApptText}>
												{item.appt}
											</Text>
										</View>
										<View style={styles.AppointmentButtonRowRightColumn}>
											<Text style={styles.AppointmentButtonDateText}>
												{item.date}
											</Text>
										</View>
									</View>
									<View style={styles.AppointmentButtonRow}>
										{/*Row 2*/}
										<View style={styles.AppointmentButtonRowLeftColumn}>
											<Text style={styles.AppointmentButtonLocationText}>
												{item.location}
											</Text>
										</View>
										<View style={styles.AppointmentButtonRowRightColumn}>
											<Text style={styles.AppointmentButtonTimeText}>
												{item.time}
											</Text>
										</View>
									</View>
								</TouchableOpacity>
								<View style={styles.AppointmentButtonPadding} />
							</View>
						)}
					/>

					<Button
						transparent
						title="AppointmentInput"
						accessibilityLabel="Appointment Input Button"
						onPress={() => this.props.navigation.navigate("AppointmentInput")}
						style={{ alignSelf: "flex-end", bottom: 15, right: 15 }}
					>
						<Image
							source={require("../../assets/images/plus-icon.png")}
							style={styles.appointmentInputButton}
						/>
					</Button>
				</Content>
			</Container>
		);
	}
}

export default AppointmentScreen;
