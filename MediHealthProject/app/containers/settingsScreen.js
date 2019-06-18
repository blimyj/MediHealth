import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Icon, Button, Container, Header, Content, Left } from "native-base";

class SettingsScreen extends Component {
    static navigationOptions = {
        drawerIcon: (
            <Image
                source={require("../assets/images/settings-icon.png")}
                style={{ height: 24, width: 24 }}
            />
        )
    };

    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: "white" }}>
                    <Left style={{ flex: 1, flexDirection: "row" }}>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.openDrawer()}
                        >
                            <Icon
                                ios="ios-menu"
                                android="md-menu"
                                style={{ color: "black" }}
                            />
                        </Button>
                    </Left>
                </Header>
                <Content
                    contentContainerStyle={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <Text>Settings Screen</Text>
                </Content>
            </Container>
        );
    }
}

export default SettingsScreen;
