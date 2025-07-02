import { View, Text, StyleSheet, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useCallback, useLayoutEffect, useState } from "react";
import IconButton from "../components/UI/IconButton";

export default function Map( {navigation, route}) {

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

   const savePickedLocationHandler = useCallback (() => {
        if (!selectedLocation) {
            Alert.alert("No location picked!", "Please pick a location on the map first.");
            return;
        }
        navigation.navigate("AddPlaces", {
            pickedLat: selectedLocation.lat,
            pickedLng: selectedLocation.lng
        });
        setSelectedLocation(null);
    },[navigation, selectedLocation])       



    useLayoutEffect(()=>{
           navigation.setOptions({
            headerRight: ({tintColor}) => (
                <IconButton icon="save" size={24} color={tintColor} onPress={savePickedLocationHandler} />
            )   
           })
    },[navigation, savePickedLocationHandler])

    return (
        <MapView initialRegion={region} style={styles.map} onPress={selectLocationHandler} >{selectedLocation && <Marker title="Picked Location" coordinate={{ latitude: selectedLocation.lat, longitude: selectedLocation.lng }} />}</MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
    }
});