import { StyleSheet } from "react-native";

export default StyleSheet.create({
	MedicineButtonRow: {
		flexDirection: "row",
		flex: 1,
		justifyContent: "space-between"
	},
	MedicineButtonNameText: {
		fontSize: 20,
		fontWeight: "bold",
		color: "black",
		bottom: 2
	},
	MedicineButtonDateText: {
		fontSize: 15,
		fontWeight: "400",
		color: "black"
	},
	MedicineButtonLocationText: {
		fontSize: 12,
		fontWeight: "400",
		color: "black",
		top: 2
	},
	MedicineButtonTimeText: {
		fontSize: 15,
		fontWeight: "400",
		color: "black"
	},
	medicineInputButton: {
		height: 36,
		width: 36,
		tintColor: "#28DA9A"
	}
});
