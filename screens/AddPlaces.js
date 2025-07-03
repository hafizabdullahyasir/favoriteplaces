import { View, Text } from "react-native";
import PlaceForm from "../components/Places/PlaceForm";
import { insertPlace } from "../util/database";

export default function AddPlaces({navigation}) {
  async function createPlaceHandler(place){
    try {
      await insertPlace(place);
      navigation.navigate('AllPlaces');
    } catch (error) {
      console.log('Error saving place:', error);
    }
  }

  return(
    <PlaceForm onCreatePlace={createPlaceHandler}/>
  )
}