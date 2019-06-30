import { StyleSheet } from 'react-native';
import { Right } from 'native-base';

export default StyleSheet.create({
    bigButton: {
        alignItems: 'flex-start',
        backgroundColor: '#28DA9A',
        width: 270,
        height: 60,
        borderRadius: 8,
        padding: 15,
        marginTop:10
      },
    bigButtonText: {
        fontSize: 20,
        fontWeight: '400',
        color: "#FFFFFF",
    },
    ButtonsContainer: {
        flexDirection: 'row'
        //alignItems: "center"
    },
    ButtonContainer: {
        flex: 3
    },
    LoginButton: {
        backgroundColor: '#28DA9A',
        height: 60,
        borderRadius: 8,
        padding: 15,
        marginTop:10
    },
    SignUpButton: {
        backgroundColor: '#28DA9A',
        height: 60,
        borderRadius: 8,
        padding: 15,
        marginTop:10
    },
    LogoutButton: {
        backgroundColor: '#28DA9A',
        height: 60,
        borderRadius: 8,
        padding: 15,
        marginTop:10
    },
    DisplayUserButton: {
        backgroundColor: '#28DA9A',
        height: 60,
        borderRadius: 8,
        padding: 15,
        marginTop:10
    },
    ButtonPadding: {
        flex: 1
    }
});