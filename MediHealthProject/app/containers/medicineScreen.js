import React, { Component } from "react";
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from "react-native";
import { Icon, Button, Container, Content, Left, Right } from "native-base";
import MyHeader from "../components/header";
import styles from '../appStyle'

class MedicineScreen extends Component {
    static navigationOptions = {
        drawerIcon: (
            <Image
                source={require("../assets/images/medicine-icon.png")}
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
                    <Text>Medicine Screen</Text>
                    <FlatList
                        data={[
                            {key: 'Panadol'}, 
                            {key: 'b'}, 
                            {key: 'a'}, 
                            {key: 'c'}, 
                            {key: 'd'}, 
                            {key: 'e'}, 
                            {key: 'f'}, 
                            {key: 'g'}, 
                            {key: 'h'}, 
                            {key: 'i'}, 
                            {key: 'j'}]
                        }
                        renderItem={({item}) => 
                            <TouchableOpacity
                                title={item.key}
                                style={styles.MedicineButton}
                                accessibilityLabel={item.key}
                                onPress={() => this.props.navigation.navigate('Biomarkers')}
                            >
                                <Text style={styles.MedicineButtonText}>{item.key}</Text>
                            </TouchableOpacity>}
                    />
                    <Text>Medicine Screen</Text>
                    <TouchableOpacity
                        title="MedicineInput"
                        style={styles.medicineInputButton}
                        accessibilityLabel="Medicine Input Button"
                        onPress={() => this.props.navigation.navigate('Rehabilitation')}
                    >
                        <Text style={styles.bigButtonText}>+</Text>
                    </TouchableOpacity>
                </Content>
            </Container>
        );
    }
}

export default MedicineScreen;
