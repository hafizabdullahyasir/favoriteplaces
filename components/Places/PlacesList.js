import { FlatList, View, Text, StyleSheet } from "react-native";
import PlaceItem from "./PlaceItem";
import Colors from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";




export default function PlacesList({ places }) {


    const navigation = useNavigation();

  function selectPlaceHandler(id){
    navigation.navigate("PlaceDetails", {placeId: id})
  }



    if (!places || places.length === 0) {
        return (
            <View style={styles.fallbackContainer}>
                <Text style={styles.fallbackText}>No places found. Start adding some!</Text>
            </View>
        )
    }




    return (
        <FlatList
            style={styles.list}
            data={places.filter(place => place && place.id)} // Filter out invalid places
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <PlaceItem place={item} onSelect={selectPlaceHandler} />}
        />
    )
}

const styles = StyleSheet.create({
    list: {
        margin: 24,
    },
    fallbackContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    fallbackText: {
        fontSize: 16,
        color: Colors.primary200,
    },



})