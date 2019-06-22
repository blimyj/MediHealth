import React, { Component } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Container, Content } from "native-base";
import MyHeader from "../../components/header";
import styles from "./appStyle";

class AppointmentScreen extends Component {
	render() {
		return (
			<Container>
				<MyHeader nav={this.props.navigation} headerTitle="Appointment" />
				<Content
					contentContainerStyle={{
						flex: 1
						//alignItems: "center",
						//width: "100%"
						//justifyContent: "center"
					}}
				>
					<FlatList
						data={[
							{
								key: "a",
								appt: "Dr Bong",
								location: "SGH",
								date: "21-June-2019",
								time: "16:51"
							},
							{
								key: "b",
								appt: "Dr Gregory",
								location: "SGH",
								date: "21-June-2019",
								time: "16:51"
							},
							{
								key: "c",
								appt: "Dr Hong",
								location: "SGH",
								date: "21-June-2019",
								time: "16:51"
							},
							{
								key: "d",
								appt: "Dr James",
								location: "SGH",
								date: "21-June-2019",
								time: "16:51"
							},
							{
								key: "e",
								appt: "Dr Quack",
								location: "SGH",
								date: "21-June-2019",
								time: "16:51"
							},
							{
								key: "f",
								appt: "Dr Cynthia",
								location: "SGH",
								date: "21-June-2019",
								time: "16:51"
							}
						]}
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
