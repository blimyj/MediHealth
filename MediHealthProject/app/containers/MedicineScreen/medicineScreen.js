import React, { Component } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { Container, Content, Button } from "native-base";
import styles from "./appStyle";

class MedicineScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		headerTitle: (
			<View style={{ alignSelf: "center", flex: 1 }}>
				<Text style={{ textAlign: "center" }}>Medicine</Text>
			</View>
		),
		headerRight: <View />
	});

	render() {
		return (
			<Container>
				<Content contentContainerStyle={{ flex: 1 }}>
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
					<Button
						transparent
						title="MedicineInput"
						accessibilityLabel="Medicine Input Button"
						onPress={() => this.props.navigation.navigate("Rehabilitation")}
						style={{ alignSelf: "flex-end", bottom: 15, right: 15 }}
					>
						<Image
							source={require("../../assets/images/plus-icon.png")}
							style={styles.medicineInputButton}
						/>
					</Button>
				</Content>
			</Container>
		);
	}
}

export default MedicineScreen;
