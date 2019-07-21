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
		flex: 1,
		justifyContent: "space-between"
	},
	AppointmentButtonApptText: {
		fontSize: 20,
		fontWeight: "bold",
		color: "black",
		bottom: 2
	},
	AppointmentButtonDateText: {
		fontSize: 15,
		fontWeight: "400",
		color: "black"
	},
	AppointmentButtonLocationText: {
		fontSize: 12,
		fontWeight: "400",
		color: "black",
		top: 2
	},
	AppointmentButtonTimeText: {
		fontSize: 15,
		fontWeight: "400",
		color: "black"
	},
	appointmentInputButton: {
		height: 36,
		width: 36,
		tintColor: "#28DA9A"
	}
});
