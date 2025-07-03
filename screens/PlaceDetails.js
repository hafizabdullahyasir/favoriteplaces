 import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import OutlinedButton from "../components/UI/OutlinedButton";
import Colors from "../constants/colors";
import { useEffect, useState } from "react";
import { fetchPlaceById } from "../util/database";

export default function PlaceDetails({ route, navigation }) {
    const [place, setPlace] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const selectedPlaceId = route.params.placeId;

    function showOnMapHandler() {
        if (place) {
            navigation.navigate('Map', {
                initialLocation: place.location,
                readonly: true
            });
        }
    }

    useEffect(() => {
        async function loadPlace() {
            try {
                setIsLoading(true);
                const placeData = await fetchPlaceById(selectedPlaceId);
                setPlace(placeData);
            } catch (error) {
                console.log('Error loading place:', error);
            } finally {
                setIsLoading(false);
            }
        }

        if (selectedPlaceId) {
            loadPlace();
        }
    }, [selectedPlaceId]);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (!place) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Place not found!</Text>
            </View>
        );
    }

    return (
        <ScrollView>
            <Image source={{ uri: place.imageUri }} style={styles.image} resizeMode="cover" />
            <View style={styles.content}>
                <View style={styles.locationContainer}>
                    <Text style={styles.title}>{place.title}</Text>
                    <Text style={styles.address}>{place.address}</Text>
                </View>
                <OutlinedButton icon="map" onPress={showOnMapHandler}>
                    View on Map
                </OutlinedButton>
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        height: "35%",
        minHeight: 300,
        width: "100%",
    },
    content: {
        padding: 24,
    },
    locationContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    address: {
        color: Colors.primary500,
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 8,
        textAlign: "center",
    },
})  








