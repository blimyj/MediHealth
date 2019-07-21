import { StyleSheet } from "react-native";

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
	MedicineButtonContainer: {
		flexDirection: "row"
		//alignItems: "center"
	},
	MedicineButtonPadding: {
		flex: 1
	},
	MedicineButton: {
		alignItems: "flex-start",
		backgroundColor: "transparent",
		flex: 3,
		height: 60,
		borderRadius: 5,
		padding: 15,
		marginTop: 10,
		borderColor: "#28DA9A",
		borderWidth: 2
	},
	MedicineButtonText: {
		fontSize: 20,
		fontWeight: "400",
		color: "black",
		alignSelf: "center"
	},
	takenButton: {
		height: 50,
		width: 50,
		tintColor: "#28DA9A"
	},
	skipButton: {
		height: 50,
		width: 50,
		tintColor: "#e32d2d"
	},
	snoozeButton: {
		height: 50,
		width: 50,
		tintColor: "#000000"
	}

	
});
