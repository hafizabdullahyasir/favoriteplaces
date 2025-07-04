import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

export default function PlaceItem({place, onSelect}) {
  // Safety check to prevent errors if place is undefined
  if (!place) {
    return null;
  }

  return (
    <Pressable onPress={() => onSelect(place.id)} style={({pressed})=>[styles.item, pressed && styles.pressed]}>
          <Image source={{uri: place.imageUri}} style={styles.image} resizeMode="cover"/>
          <View style={styles.info}>
              <Text style={styles.title}>{place.title}</Text>
              <Text style={styles.address}>{place.address}</Text>
          </View>
    </Pressable>
  )

}
const styles = StyleSheet.create({
  item:{
    flexDirection: 'row',
    alignItems: 'stretch',
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: Colors.primary500,
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 2,
  },
  pressed: {
    opacity: 0.8,
  },
  image:{
    flex: 1,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    minHeight: 100,
    },
  info:{
    flex: 2,
    padding: 12,
  },
  title:{
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.gray700,
  },
  address:{
    fontSize: 12,
    color: Colors.gray700,
  },
})