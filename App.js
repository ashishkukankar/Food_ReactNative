import React from 'react';
import Search from './src/Search';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import RestaurantDetails from './src/RestaurantDetails';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            title: 'Bussiness Search',
            headerTitleAlign: 'center',
            headerTintColor: 'red',
          }}
        />
        <Stack.Screen name="ResultDetail" component={RestaurantDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
