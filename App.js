import { StatusBar } from 'expo-status-bar';
  import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllPlaces from './screens/AllPlaces';
import AddPlaces from './screens/AddPlaces';
import Colors from './constants/colors';
import IconButton from './components/UI/IconButton';
import Map from './screens/Map';

const Stack = createNativeStackNavigator();


export default function App() {
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
              <IconButton icon="add" size={24} color={tintColor || '#fff'} onPress={() => navigation.navigate('AddPlaces')} />
            )
           })} />
              <Stack.Screen name="AddPlaces" component={AddPlaces} options={{ title: 'Add Place' }} />
          <Stack.Screen name="Map" component={Map} options={{ title: 'Map' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({

});
