import React, { Component } from "react";
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from "react-native";
import { Form, Input, Item, Label, Container, Content} from "native-base";
import MyHeader from "../../../components/header";
import styles from './appStyle'

class AppointmentInputScreen extends Component {
    static navigationOptions = {
        drawerIcon: (
            <Image
                source={require("../../../assets/images/appointment-icon.png")}
                style={{ height: 24, width: 24, tintColor: "black" }}
            />
        )
    };

    render() {
        return (
            <Container>
                <MyHeader nav={this.props.navigation} />
                <Content
                    contentContainerStyle={{
                        flex: 1
                    }}
                >   
                    <Text>ApointmentInputScreen</Text>

                    <Form>
                        <Item stackedLabel>
                            <Label>Appointment</Label>
                            <Input />
                        </Item>
                        <Item stackedLabel num1>
                            <Label>Location</Label>
                            <Input />
                        </Item>
                        <Item stackedLabel num2>
                            <Label>Date</Label>
                            <Input />
                        </Item>
                        <Item stackedLabel num3>
                            <Label>Time</Label>
                            <Input />
                        </Item>                        
                    </Form>

                    <TouchableOpacity
                        title="AppointmentInput"
                        style={styles.appointmentInputButton}
                        accessibilityLabel="Appointment Input Button"
                        onPress={() => this.props.navigation.navigate('AppointmentInput')}
                    >
                        <Text style={styles.bigButtonText}>+</Text>
                    </TouchableOpacity>
                </Content>
            </Container>
        );
    }
}

export default AppointmentInputScreen;
