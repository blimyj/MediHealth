import { StyleSheet } from 'react-native';

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
    MedicineButtonContainer: {
        flexDirection: 'row'
        //alignItems: "center"
    },
    MedicineButtonPadding: {
        flex: 1
    },
    MedicineButton: {
        alignItems: 'flex-start',
        backgroundColor: '#28DA9A',
        flex: 3,
        height: 60,
        borderRadius: 8,
        padding: 15,
        marginTop:10
    },
    MedicineButtonText: {
        fontSize: 20,
        fontWeight: '400',
        color: "#FFFFFF",
    },
    medicineInputButton: {
        alignItems: 'center',
        height: 50,
        width: 50,
        backgroundColor: '#28DA9A',
        borderRadius: 50
    }
});