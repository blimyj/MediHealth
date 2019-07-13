import React, { Component } from "react";
import {
	Dimensions,
	PermissionsAndroid,
	StyleSheet,
	View,
	Text,
	Keyboard
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { Container } from "native-base";
import * as firebase from "firebase";
import Config from "react-native-config";
import SearchableDropdown from "react-native-searchable-dropdown";
import MenuButton from "../../components/menuButton";

const { width, height } = Dimensions.get("window");

const MAPS_API_KEY = Config.GOOGLE_MAPS_API_KEY;
const ASPECT_RATIO = width / height;
const LATITUDE = 1.29027;
const LONGITUDE = 103.851959;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class MapScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			region: {
				latitude: LATITUDE,
				longitude: LONGITUDE,
				latitudeDelta: LATITUDE_DELTA,
				longitudeDelta: LONGITUDE_DELTA
			},
			mapMargin: 1,
			markerData: [],
			address: []
		};

		this.setMargin = this.setMargin.bind(this);
		this.readUserData = this.readUserData.bind(this);
		this.changeSelectedRegion = this.changeSelectedRegion.bind(this);
	}

	setMargin() {
		PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
		).then(granted => {
			this.setState({ mapMargin: 0 });
		});
	}

	readUserData = () => {
		firebase
			.database()
			.ref("/locations")
			.once("value", snapshot => {
				const fbObject = snapshot.val();
				const newArr = Object.keys(fbObject).map(key => {
					fbObject[key].id = key;
					return {
						id: fbObject[key].id,
						name: fbObject[key]["Pharmacy Name"],
						Latitude: fbObject[key].Latitude,
						Longitude: fbObject[key].Longitude,
						PostalCode: "S" + fbObject[key]["Postal Code"]
					};
				});
				this.setState({ markerData: newArr });
				console.log(this.state.markerData);
			});
	};

	changeSelectedRegion(item) {
		this.setState({
			region: {
				latitude: item.Latitude,
				longitude: item.Longitude,
				latitudeDelta: 0.005,
				longitudeDelta: 0.005
			}
		});
	}

	componentDidMount() {
		this.readUserData();
	}

	render() {
		return (
			<Container>
				<MapView
					ref={ref => {
						this.map = ref;
					}}
					provider={PROVIDER_GOOGLE}
					style={{ flex: 1, marginBottom: this.state.mapMargin }}
					showsUserLocation={true}
					showsMyLocationButton={true}
					followsUserLocation={true} //iOS ONLY
					onMapReady={this.setMargin}
					region={this.state.region}
					onPress={Keyboard.dismiss}
					mapPadding={{ top: 64 }}
				>
					<Marker
						coordinate={{
							latitude: 1.279597,
							longitude: 103.835886 //Singapore General Hospital
						}}
						title="SGH"
						image={require("../../assets/images/mapMarker-icon.png")}
					/>
					{this.state.markerData.map(coordinate => {
						return (
							<Marker
								coordinate={{
									latitude: coordinate.Latitude,
									longitude: coordinate.Longitude
								}}
								title={coordinate.name}
								image={require("../../assets/images/mapMarker-icon.png")}
								key={coordinate.id}
							/>
						);
					})}
				</MapView>
				<View
					style={{
						flexDirection: "row",
						alignSelf: "center",
						backgroundColor: "white",
						position: "absolute",
						width: width * 0.8,
						borderRadius: 16,
						top: 8
					}}
				>
					<MenuButton whenPress={() => this.props.navigation.openDrawer()} />
					<SearchableDropdown
						onItemSelect={item => {
							this.changeSelectedRegion(item);
						}}
						containerStyle={{ flex: 1, padding: 3 }}
						textInputStyle={styles.searchTextInput}
						itemStyle={styles.searchItem}
						itemTextStyle={{ color: "black" }}
						itemsContainerStyle={{ maxHeight: 140 }}
						items={this.state.markerData}
						defaultIndex={2}
						placeholder="Search Address"
						resetValue={false}
						underlineColorAndroid="#28DA9A"
					/>
				</View>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	searchTextInput: {
		padding: 12
	},
	searchItem: {
		padding: 10,
		marginTop: 2,
		backgroundColor: "white",
		borderColor: "#28DA9A",
		borderWidth: 1,
		borderRadius: 5
	}
});

MapScreen.propTypes = {
	provider: MapView.ProviderPropType
};

export default MapScreen;
