
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllPlaces from './screens/AllPlaces';
import AddPlaces from './screens/AddPlaces';
import Colors from './constants/colors';
import IconButton from './components/UI/IconButton';
import Map from './screens/Map';
import { init } from './util/database';
import { useEffect, useState } from 'react';
import AppLoading from 'expo-app-loading';
import PlaceDetails from './screens/PlaceDetails';


const Stack = createNativeStackNavigator();


export default function App() {
const [dbInitialized, setDbInitialized] = useState(false);
useEffect(()=>{
  async function initializeDatabase() {
    try {
      await init();
      setDbInitialized(true);
    } catch (err) {
      console.log(err);
    }
  }
  
  initializeDatabase();
},[])

if(!dbInitialized){
    return <AppLoading/>
}





  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: {backgroundColor: Colors.primary500},
          headerTintColor: Colors.gray700,
          contentStyle: {backgroundColor: Colors.gray700},
        }}>
          <Stack.Screen name="AllPlaces" component={AllPlaces} options={({navigation}) => ({
            title: 'Your Favourite Places',
            headerRight: ({tintColor}) => (
              <IconButton 
                  icon={Platform.OS === 'android' ? 'add' : 'add-outline'} 
                  size={24} 
                  color={tintColor || '#fff'} 
                  onPress={() => navigation.navigate('AddPlaces')} 
              />
          )
           })} />
              <Stack.Screen name="AddPlaces" component={AddPlaces} options={{ title: 'Add Place' }} />
          <Stack.Screen name="Map" component={Map} options={{ title: 'Map' }} />
          <Stack.Screen name="PlaceDetails" component={PlaceDetails} options={{ title: 'Place Details' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({

});
