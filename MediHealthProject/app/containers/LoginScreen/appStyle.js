import { StyleSheet } from "react-native";
import { Right } from "native-base";

export default StyleSheet.create({
	bigButton: {
		alignItems: "flex-start",
		backgroundColor: "transparent",
		width: 270,
		height: 60,
		borderRadius: 5,
		padding: 15,
		marginTop: 10
	},
	bigButtonText: {
		fontSize: 20,
		fontWeight: "400",
		color: "black",
		alignSelf: "center"
	},
	ButtonsContainer: {
		flexDirection: "row"
		//alignItems: "center"
	},
	ButtonContainer: {
		flex: 3
	},
	LoginButton: {
		backgroundColor: "transparent",
		height: 60,
		borderRadius: 5,
		padding: 15,
		marginTop: 10,
		borderColor: "#28DA9A",
		borderWidth: 2
	},
	SignUpButton: {
		backgroundColor: "transparent",
		height: 60,
		borderRadius: 5,
		padding: 15,
		marginTop: 10,
		borderColor: "#28DA9A",
		borderWidth: 2
	},
	LogoutButton: {
		backgroundColor: "transparent",
		height: 60,
		borderRadius: 5,
		padding: 15,
		marginTop: 10,
		borderColor: "#28DA9A",
		borderWidth: 2
	},
	DisplayUserButton: {
		backgroundColor: "transparent",
		height: 60,
		borderRadius: 5,
		padding: 15,
		marginTop: 10,
		borderColor: "#28DA9A",
		borderWidth: 2
	},
	ButtonPadding: {
		flex: 1
	}
});
