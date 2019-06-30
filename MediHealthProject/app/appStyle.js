import { StyleSheet } from "react-native";

export default StyleSheet.create({
	bigButton: {
		alignItems: "flex-start",
		backgroundColor: "transparent",
		width: 270,
		height: 60,
		borderRadius: 5,
		padding: 15,
		marginTop: 10,
		borderColor: "#28DA9A",
		borderWidth: 2
	},
	bigButtonText: {
		fontSize: 20,
		fontWeight: "400",
		color: "black",
		alignSelf: "center"
	},
	bigButtonView: {
		flexDirection: "row"
	},
	icon: {
		height: 24,
		width: 24,
		tintColor: "#28DA9A"
	}
});
