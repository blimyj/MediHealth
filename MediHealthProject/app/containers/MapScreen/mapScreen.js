import React, { Component } from "react";
import { Dimensions, PermissionsAndroid } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { Container } from "native-base";
import MyHeader from "../../components/header";
import * as firebase from "firebase";
import Config from "react-native-config";
import MapViewDirections from "react-native-maps-directions";

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
			markerData: []
		};

		this.setMargin = this.setMargin.bind(this);
		this.readUserData = this.readUserData.bind(this);
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
					return fbObject[key];
				});
				this.setState({ markerData: newArr });
				console.log(this.state.markerData);
			});
	};

	componentDidMount() {
		this.readUserData();
	}

	componentDidUpdate() {
		this.map.fitToElements(true);
	}

	render() {
		return (
			<Container>
				<MyHeader nav={this.props.navigation} headerTitle="Map" />
				<MapView
					ref={ref => {
						this.map = ref;
					}}
					provider={PROVIDER_GOOGLE}
					style={{ flex: 1, marginBottom: this.state.mapMargin }}
					// initialRegion={this.state.region}
					showsUserLocation={true}
					showsMyLocationButton={true}
					followsUserLocation={true} //iOS ONLY
					onMapReady={this.setMargin}
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
								title={coordinate["Pharmacy Name"]}
								image={require("../../assets/images/mapMarker-icon.png")}
								key={coordinate.id}
							/>
						);
					})}
					{/* <MapViewDirections
						origin={{ latitude: 1.279597, longitude: 103.835886 }} // Daily Limit: 1
						destination={{
							latitude: 1.37624319753702,
							longitude: 103.75640094280243
						}}
						apikey={MAPS_API_KEY}
						mode="WALKING"
					/> */}
				</MapView>
			</Container>
		);
	}
}

MapScreen.propTypes = {
	provider: MapView.ProviderPropType
};

export default MapScreen;
