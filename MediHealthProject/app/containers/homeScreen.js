import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Icon, Button, Container, Content, Left, Right } from "native-base";
import MyHeader from "../components/header";

class HomeScreen extends Component {
    static navigationOptions = {
        drawerIcon: (
            <Image
                source={require("../assets/images/home-icon.png")}
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
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <Text>Home Screen</Text>
                </Content>
            </Container>
        );
    }
}

export default HomeScreen;
