import React, { Component } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { Container } from "native-base";
import MyHeader from "../../components/header";

class MapScreen extends Component {
	render() {
		return (
			<Container>
				<MyHeader nav={this.props.navigation} headerTitle="Map" />
				<MapView
					provider={PROVIDER_GOOGLE}
					style={{ flex: 1 }}
					initialRegion={{
						latitude: 1.29027,
						longitude: 103.851959,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421
					}}
				>
					<Marker
						coordinate={{
							latitude: 1.279597,
							longitude: 103.835886 //Singapore General Hospital
						}}
						image={require("../../assets/images/mapMarker-icon.png")}
					/>
				</MapView>
			</Container>
		);
	}
}

export default MapScreen;
