import { createStackNavigator } from "react-navigation";

import AppointmentScreen from "./appointmentScreen";
import AppointmentInputScreen from "./AppointmentInputScreen/appointmentInputScreen";

const AppointmentStack = createStackNavigator(
	{
		Appointment: {
			screen: AppointmentScreen
		},
		AppointmentInput: {
			screen: AppointmentInputScreen
		}
	},
	{
		mode: "modal", // Only for iOS
		headerMode: "none",
		initialRouteName: "Appointment"
	}
);

export default AppointmentStack;
