import React, { Component } from "react";
import { View, Text, FlatList, TouchableOpacity, ListView } from "react-native";
import { Container, Content } from "native-base";
import MyHeader from "../../components/header";
import styles from "./appStyle";

import * as firebase from 'firebase'

var data = []

class AppointmentScreen extends Component {
	constructor(props) {
		super(props);
	
		this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
		
		this.state = {
            listViewData: data,
            appointment: "",
			location: "",
			date: "",
			time: "",
			uid: ""
		};
	}

	componentDidMount() {
		firebase.database().ref('/items').on('value', (dataSnapshot) => {
			//handle read data.
			const fbObject = dataSnapshot.val();
			const newArr = [];
			Object.keys(fbObject).map( (key,index)=>{
				console.log(key);
				console.log("||");
				console.log(index);
				newArr.push(fbObject[key]);
			});
			this.setState({ listViewData: newArr });
			console.log(this.state.listViewData);
		});	
		/*
		var that = this
	
		firebase.database().ref('/items').on('child_added', function (data) {
	
			var newData = [...that.state.listViewData]
			newData.push(data)
			that.setState({ listViewData: newData })

		})

	*/}

	render() {
		return (
			<Container>
				<MyHeader nav={this.props.navigation} headerTitle="Appointment" />
				<Content
					contentContainerStyle={{
						flex: 1
					}}
				>
					<FlatList
						data={ this.state.listViewData }
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
					<View>
						<TouchableOpacity
							title="AppointmentInput"
							style={styles.appointmentInputButton}
							accessibilityLabel="Appointment Input Button"
							onPress={() => this.props.navigation.navigate("AppointmentInput")}
						>
							<Text style={styles.bigButtonText}>+</Text>
						</TouchableOpacity>
					</View>
				</Content>
			</Container>
		);
	}
}

export default AppointmentScreen;
