import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Icon, Button, Container, Content, Left, Right } from "native-base";
import MyHeader from "../../components/header";
import styles from '../../appStyle'

class HomeScreen extends Component {
    static navigationOptions = {
        drawerIcon: (
            <Image
                source={require("../../assets/images/home-icon.png")}
                style={{ height: 24, width: 24, tintColor: "black" }}
            />
        )
    };

    render() {
        return (
            <Container>
                <MyHeader nav={this.props.navigation} headerTitle="MediHealth"/>
                <Content
                    contentContainerStyle={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <Text>Home Screen</Text>
                    <TouchableOpacity
                        title="Medicine"//might want to remove
                        style={styles.bigButton}
                        accessibilityLabel="Medicine"
                        onPress={() => this.props.navigation.navigate('Medicine')}
                    >
                        <Text style={styles.bigButtonText}>Medicine</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        title="Appointments"
                        style={styles.bigButton}
                        accessibilityLabel="Appointments"
                        onPress={() => this.props.navigation.navigate('Appointment')}
                    >
                        <Text style={styles.bigButtonText}>Appointments</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        title="Biomarker"
                        style={styles.bigButton}
                        accessibilityLabel="Biomarker"
                        onPress={() => this.props.navigation.navigate('Biomarkers')}
                    >
                        <Text style={styles.bigButtonText}>Biomarkers</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        title="Rehabilitation"
                        style={styles.bigButton}
                        accessibilityLabel="Rehabilitation"
                        onPress={() => this.props.navigation.navigate('Rehabilitation')}
                    >
                        <Text style={styles.bigButtonText}>Rehabilitation</Text>
                    </TouchableOpacity>
                </Content>
            </Container>
        );
    }
}

export default HomeScreen;
