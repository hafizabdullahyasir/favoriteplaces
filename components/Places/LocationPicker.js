import OutlinedButton from "../UI/OutlinedButton";
import { Alert, View, StyleSheet, Image, Text, ActivityIndicator } from "react-native";
import Colors from "../../constants/colors"; // ✅ Correct import
import { getCurrentPositionAsync } from "expo-location";
import { useForegroundPermissions, PermissionStatus } from "expo-location";
import { useState, useEffect } from "react";
import { getAddress, getMapPreview } from "../../util/location";
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";


export default function LocationPicker({onPickLocation}) {

    const [pickedLocation, setPickedLocation] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [imageError, setImageError] = useState(false);
    const navigation = useNavigation(); 
    const [locationPermissionInformation, requestPermission] = useForegroundPermissions();
    const route = useRoute();
    // const mapPickedLocation = route.params && {lat: route.params.pickedLat, lng: route.params.pickedLng};       
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused && route.params && route.params.pickedLat && route.params.pickedLng) {
            const mapPickedLocation = {
                lat: route.params.pickedLat, 
                lng: route.params.pickedLng
            };
            setPickedLocation(mapPickedLocation);
        }
    }, [route, isFocused])
        

    useEffect(()=>{
        async function handleLocation(){
            if (pickedLocation){
                const address = await getAddress(pickedLocation.lat, pickedLocation.lng);
                onPickLocation({...pickedLocation, address: address});
            }
        }
        handleLocation();
        
    },[pickedLocation, onPickLocation, getAddress])


    
    async function verifyPermissions() {
        if (locationPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }

        if (locationPermissionInformation?.status === PermissionStatus.DENIED) {
            Alert.alert("Insufficient Permissions!", "You need to grant location access.");
            return false;
        }

        return true;
    }





    async function getLocationHandler() {
        setIsLoading(true);
        try {
            const hasPermission = await verifyPermissions();
            if (!hasPermission) {
                setIsLoading(false);
                return;
            }

          
            const location = await getCurrentPositionAsync();
        
            
            const locationData = {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            };
            
           
            setPickedLocation(locationData);
            setImageError(false); // Reset image error state
               
            const mapUrl = getMapPreview(locationData.lat, locationData.lng);
          
            
        } catch (error) {
            
            Alert.alert(
                "Error", 
                "Could not fetch location. Please try again or check your location settings."
            );
        }
        setIsLoading(false);
    }

    function pickOnMapHandler() { 
        navigation.navigate('Map', {
            initialLocation: pickedLocation,
            readonly: false
        })
    }
    let locationPreview = <Text>No location picked yet.</Text>;

    if (isLoading) {
        locationPreview = <ActivityIndicator size="large" color={Colors.primary500} />;
    } else if (pickedLocation) {
        if (imageError) {
            // Fallback display when image fails
            locationPreview = (
                <View style={styles.fallbackContainer}>
                    <Text style={styles.fallbackTitle}>📍 Location Found</Text>
                    <Text style={styles.fallbackCoords}>
                        Lat: {pickedLocation.lat.toFixed(6)}
                    </Text>
                    <Text style={styles.fallbackCoords}>
                        Lng: {pickedLocation.lng.toFixed(6)}
                    </Text>
                    <Text style={styles.fallbackNote}>
                        (Map preview unavailable)
                    </Text>
                </View>
            );
        } else {
            const mapUri = getMapPreview(pickedLocation.lat, pickedLocation.lng);
            
            
            locationPreview = (
                <Image 
                    source={{ uri: mapUri }} 
                    style={styles.image}
                    onLoad={() => console.log("Image loaded successfully!")}
                    onError={(error) => {
                       
                        setImageError(true);
                    }}
                    onLoadStart={() => console.log("Image loading started...")}
                    onLoadEnd={() => console.log("Image loading ended")}
                />
            );
        }
    }
  

    return (
        <View>
        <View style={styles.mapPreview}>{locationPreview}</View>
            <View>
                {/* <Text>Latitude: {pickedLocation?.lat}</Text>
                <Text>Longitude: {pickedLocation?.lng}</Text> */}
            </View>
            <View style={styles.actions}>
                <OutlinedButton 
                    icon="location" 
                    onPress={getLocationHandler}
                    disabled={isLoading}
                >
                    {isLoading ? "Getting Location..." : "Locate User"}
                </OutlinedButton>
                <OutlinedButton icon="map" onPress={pickOnMapHandler}>
                    Pick on Map
                </OutlinedButton>
            </View>
        </View>
    );
} 


const styles = StyleSheet.create({
    mapPreview: {
        width: "100%",
        height: 200,
        marginVertical: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary100, // ✅ Make sure this exists in your constants
        borderRadius: 4,
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-around", // ✅ Fixed typo
        alignItems: "center",
    },
    image:{
        width: "100%",
        height: "100%",
        borderRadius: 4,
    },
    fallbackContainer: {
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    fallbackTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: Colors.primary700,
        marginBottom: 10,
    },
    fallbackCoords: {
        fontSize: 14,
        color: Colors.primary500,
        marginBottom: 5,
    },
    fallbackNote: {
        fontSize: 12,
        color: Colors.gray700,
        fontStyle: "italic",
        marginTop: 5,
    }
});
