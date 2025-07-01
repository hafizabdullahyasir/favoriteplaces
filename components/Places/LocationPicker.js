import OutlinedButton from "../UI/OutlinedButton";
import { View, StyleSheet } from "react-native";
import Colors from "../../constants/colors"; // ✅ Correct import

export default function LocationPicker() {
  function getLocationHandler() {}

  function pickOnMapHandler() {}

  return (
    <View>
      <View style={styles.mapPreivew}></View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreivew: {
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
});
