import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import {
    createAppContainer,
    createStackNavigator,
    createDrawerNavigator,
    createBottomTabNavigator,
    DrawerItems
} from "react-navigation";
import { Container, Content, Header, Body, Icon } from "native-base";

import HomeScreen from "./containers/homeScreen";
import SettingsScreen from "./containers/settingsScreen";

const CustomDrawerContentComponent = props => (
    <Container>
        <Header style={{ backgroundColor: "white", height: 100 }}>
            <Body>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Icon
                        type="FontAwesome"
                        name="user-circle"
                        style={{ color: "black" }}
                    />
                    <Text style={{ left: 20 }}>Joel Loong</Text>
                </View>
            </Body>
        </Header>
        <Content>
            <DrawerItems {...props} />
        </Content>
    </Container>
);

const MyApp = createDrawerNavigator(
    {
        Home: {
            screen: HomeScreen
        },
        Settings: {
            screen: SettingsScreen
        }
    },
    {
        initialRouteName: "Home",
        contentComponent: CustomDrawerContentComponent
    }
);

const AppContainer = createAppContainer(MyApp);

const styles = StyleSheet.create({
    drawerImage: {
        height: 150,
        width: 150,
        borderRadius: 75
    }
});

export default class App extends Component {
    render() {
        return <AppContainer />;
    }
}
