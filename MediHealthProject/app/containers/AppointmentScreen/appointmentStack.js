import {
    createStackNavigator,
} from "react-navigation";

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
        mode: 'modal',
        headerMode: 'none',
    }
);

export default AppointmentStack;