import { StyleSheet } from "react-native";
import { Right } from "native-base";

export default StyleSheet.create({
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
