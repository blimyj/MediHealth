import { StyleSheet } from "react-native";
import { Right } from "native-base";

export default StyleSheet.create({
	bigButton: {
		alignItems: "flex-start",
		backgroundColor: "#28DA9A",
		width: 270,
		height: 60,
		borderRadius: 5,
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
		backgroundColor: "white",
		flex: 3,
		height: 60,
		borderRadius: 5,
		padding: 15,
		marginTop: 10,
		borderColor: "#28DA9A",
		borderWidth: 2
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
		color: "black"
	},
	AppointmentButtonDateText: {
		fontSize: 10,
		fontWeight: "400",
		color: "black"
	},
	AppointmentButtonLocationText: {
		fontSize: 10,
		fontWeight: "400",
		color: "black"
	},
	AppointmentButtonTimeText: {
		fontSize: 10,
		fontWeight: "400",
		color: "black"
	},
	appointmentInputButton: {
		height: 50,
		width: 50,
		tintColor: "#28DA9A"
	}
});
