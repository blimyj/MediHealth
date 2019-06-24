import React, { Component } from "react";
import { Dimensions, Image, PermissionsAndroid } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { Container } from "native-base";
import MyHeader from "../../components/header";

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE = 1.29027;
const LONGITUDE = 103.851959;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const KML_FILE = "https://pastebin.com/raw/MvMiJt7a";

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
			mapMargin: 1
		};

		this.setMargin = this.setMargin.bind(this);
		this.onKmlReady = this.onKmlReady.bind(this);
	}

	setMargin() {
		PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
		).then(granted => {
			this.setState({ mapMargin: 0 });
		});
	}

	onKmlReady() {
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
					initialRegion={this.state.region}
					showsUserLocation={true}
					showsMyLocationButton={true}
					followsUserLocation={true} //iOS ONLY
					onMapReady={this.setMargin}
					kmlSrc={KML_FILE}
					onKmlReady={this.onKmlReady}
				>
					{/* <Marker
						coordinate={{
							latitude: 1.279597,
							longitude: 103.835886 //Singapore General Hospital
						}}
						image={require("../../assets/images/mapMarker-icon.png")}
					/> */}
					{/* <Marker
						coordinate={this.state.region}
						title="Pharmacy"
						description="Pharmacy"
						image={require("../../assets/images/mapMarker-icon.png")}
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
