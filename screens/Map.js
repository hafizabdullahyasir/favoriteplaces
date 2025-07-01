import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useState } from "react";

export default function Map() {

    const [selectedLocation, setSelectedLocation] = useState(null);


    const region = {
        latitude: 37.7749,
        longitude: -122.4194,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    }


    const selectLocationHandler = (event) => {
        const lat = event.nativeEvent.coordinate.latitude;
        const lng = event.nativeEvent.coordinate.longitude;
        setSelectedLocation({ lat: lat, lng: lng });
    }

    return (
        <MapView initialRegion={region} style={styles.map} onPress={selectLocationHandler} >{selectedLocation && <Marker title="Picked Location" coordinate={{ latitude: selectedLocation.lat, longitude: selectedLocation.lng}} />}</MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
    }
});