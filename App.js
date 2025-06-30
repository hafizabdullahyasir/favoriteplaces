import { StatusBar } from 'expo-status-bar';
  import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllPlaces from './screens/AllPlaces';
import AddPlaces from './screens/AddPlaces';

import IconButton from './components/UI/IconButton';


const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="AllPlaces" component={AllPlaces} options={({navigation}) => ({
            title: 'All Places',

            headerRight: ({tintColor}) => (
              <IconButton icon="add" size={24} color={tintColor} onPress={() => navigation.navigate('AddPlaces')} />
            )
           })} />
          <Stack.Screen name="AddPlaces" component={AddPlaces} options={{ title: 'Add Place' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({

});
