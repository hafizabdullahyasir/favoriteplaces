import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";


export default function Map() {


    const region = {
        latitude: 37.7749,
        longitude: -122.4194,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    }

    return (
      <MapView initialRegion={region} style={styles.map} showsUserLocation={true}></MapView>
    );
}

const styles = StyleSheet.create({
 map: {
    flex: 1,
 }
});