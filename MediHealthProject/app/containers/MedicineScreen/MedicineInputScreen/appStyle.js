import { StyleSheet } from "react-native";
import { Right } from "native-base";

export default StyleSheet.create({
	bigButton: {
		alignItems: "flex-start",
		backgroundColor: "#28DA9A",
		width: 270,
		height: 60,
		borderRadius: 8,
		padding: 15,
		marginTop: 10
	},
	bigButtonText: {
		fontSize: 20,
		fontWeight: "400",
		color: "#FFFFFF"
	},
	AppointmentButtonContainer: {
		flexDirection: "row"
		//alignItems: "center"
	},
	AppointmentButtonPadding: {
		flex: 1
	},
	AppointmentButton: {
		flexDirection: "column",
		backgroundColor: "#28DA9A",
		flex: 3,
		height: 60,
		borderRadius: 8,
		padding: 15,
		marginTop: 10
	},
	AppointmentButtonRow: {
		flexDirection: "row",
		flex: 1
	},
	AppointmentButtonRowLeftColumn: {
		textAlign: "left",
		flex: 1
	},
	AppointmentButtonRowRightColumn: {
		alignItems: "flex-end",
		textAlign: "right",
		flex: 1
	},
	AppointmentButtonApptText: {
		fontSize: 10,
		fontWeight: "400",
		color: "#FFFFFF"
	},
	AppointmentButtonDateText: {
		fontSize: 10,
		fontWeight: "400",
		color: "#FFFFFF"
	},
	AppointmentButtonLocationText: {
		fontSize: 10,
		fontWeight: "400",
		color: "#FFFFFF"
	},
	AppointmentButtonTimeText: {
		fontSize: 10,
		fontWeight: "400",
		color: "#FFFFFF"
	},
	appointmentInputButton: {
		height: 50,
		width: 50,
		tintColor: "#28DA9A"
	}
});
