import React, { Component } from "react";
<<<<<<< HEAD
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from "react-native";
import { Icon, Button, Container, Content, Left, Right } from "native-base";
import MyHeader from "../../components/header";
import styles from './appStyle'

class MedicineScreen extends Component {
    static navigationOptions = {
        drawerIcon: (
            <Image
                source={require("../../assets/images/medicine-icon.png")}
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
                        //alignItems: "center",
                        //width: "100%"
                        //justifyContent: "center"
                    }}
                >
                
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
                            <View style={styles.MedicineButtonContainer}>
                                <View style={styles.MedicineButtonPadding}></View>
                                <TouchableOpacity
                                    title={item.key}
                                    style={styles.MedicineButton}
                                    accessibilityLabel={item.key}
                                    onPress={() => this.props.navigation.navigate('Biomarker')}
                                >
                                    <Text style={styles.MedicineButtonText}>{item.key}</Text>
                                </TouchableOpacity>
                                <View style={styles.MedicineButtonPadding}></View>
                            </View>
}
                    />
                    
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
=======
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { Icon, Button, Container, Content, Left, Right } from "native-base";
import MyHeader from "../../components/header";
import styles from "./appStyle";

class MedicineScreen extends Component {
	static navigationOptions = {
		drawerIcon: (
			<Image
				source={require("../../assets/images/medicine-icon.png")}
				style={{ height: 24, width: 24, tintColor: "black" }}
			/>
		)
	};

	render() {
		return (
			<Container>
				<MyHeader nav={this.props.navigation} headerTitle="Medicine" />
				<Content
					contentContainerStyle={{
						flex: 1
						//alignItems: "center",
						//width: "100%"
						//justifyContent: "center"
					}}
				>
					<FlatList
						data={[
							{ key: "Panadol" },
							{ key: "Paracetamol" },
							{ key: "Lozenge" },
							{ key: "Duolac" },
							{ key: "d" },
							{ key: "e" },
							{ key: "f" },
							{ key: "g" },
							{ key: "h" },
							{ key: "i" },
							{ key: "j" }
						]}
						renderItem={({ item }) => (
							<View style={styles.MedicineButtonContainer}>
								<View style={styles.MedicineButtonPadding} />
								<TouchableOpacity
									title={item.key}
									style={styles.MedicineButton}
									accessibilityLabel={item.key}
									onPress={() => this.props.navigation.navigate("Biomarker")}
								>
									<Text style={styles.MedicineButtonText}>{item.key}</Text>
								</TouchableOpacity>
								<View style={styles.MedicineButtonPadding} />
							</View>
						)}
					/>

					<TouchableOpacity
						title="MedicineInput"
						style={styles.medicineInputButton}
						accessibilityLabel="Medicine Input Button"
						onPress={() => this.props.navigation.navigate("Rehabilitation")}
					>
						<Text style={styles.bigButtonText}>+</Text>
					</TouchableOpacity>
				</Content>
			</Container>
		);
	}
>>>>>>> c5b1a10da4bb4cb20206f21fd169c1eb484512b1
}

export default MedicineScreen;
