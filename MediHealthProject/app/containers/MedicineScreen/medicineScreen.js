import React, { Component } from "react";
import {
	View,
	Text,
	FlatList,
	TouchableOpacity,
	Image,
	ListView
} from "react-native";
import { Container, Content, Button } from "native-base";
import { NavigationEvents } from "react-navigation";
import styles from "./appStyle";
import * as firebase from "firebase";

class MedicineScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		headerTitle: (
			<View style={{ alignSelf: "center", flex: 1 }}>
				<Text
					style={{
						textAlign: "center",
						fontWeight: "bold",
						fontSize: 18,
						color: "black"
					}}
				>
					Medicine
				</Text>
			</View>
		),
		headerRight: (
			<TouchableOpacity
				accessibilityLabel="Medicine Input Button"
				onPress={() => navigation.navigate("MedicineInput")}
				style={{ alignSelf: "center" }}
			>
				<Image
					source={require("../../assets/images/plus-icon.png")}
					style={styles.medicineInputButton}
				/>
			</TouchableOpacity>
		),
		headerRightContainerStyle: { right: 20 }
	});

	constructor(props) {
		super(props);

		this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

		this.state = {
			listViewData: [],
			medDate: "",
			medFreq: "",
			medName: "",
			medTime: ""
		};

		this.readUserData = this.readUserData.bind(this);
	}

	componentDidMount() {
		this.readUserData();
	}

	readUserData = () => {
		var user = firebase.auth().currentUser;
		if (user != null) {
			const uid = user.uid;

			firebase
				.database()
				.ref("/users_URW/" + uid + "/medications/list")
				.once("value", snapshot => {
					const fbObject = snapshot.val();
					const newArr = Object.keys(fbObject).map(key => {
						fbObject[key].id = key;
						return fbObject[key];
					});
					this.setState({ listViewData: newArr });
				});
		} else {
			console.log(user);
		}
	};

	render() {
		return (
			<Container>
				<NavigationEvents onDidFocus={this.readUserData} />
				<Content contentContainerStyle={{ flex: 1 }}>
					<FlatList
						data={this.state.listViewData}
						renderItem={({ item }) => (
							<View style={styles.MedicineButtonContainer}>
								<View style={styles.MedicineButtonPadding} />
								<TouchableOpacity
									title={item.medName}
									style={styles.MedicineButton}
									accessibilityLabel={item.medName}
									onPress={() => this.props.navigation.navigate("Biomarker")}
								>
									<Text style={styles.MedicineButtonText}>{item.medName}</Text>
								</TouchableOpacity>
								<View style={styles.MedicineButtonPadding} />
							</View>
						)}
					/>
				</Content>
			</Container>
		);
	}
}

export default MedicineScreen;
