import React, { Component } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { Container, Content } from "native-base";
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
}

export default MedicineScreen;
