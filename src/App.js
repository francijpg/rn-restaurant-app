import 'react-native-gesture-handler';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Menu from './views/Menu';
import OrderProgress from './views/OrderProgress';
import OrderSummary from './views/OrderSummary';
import NewOrder from './views/NewOrder';
import DishDetail from './views/DishDetail';
import DishForm from './views/DishForm';

import StorageContext from './contexts/storage/storageContext';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <StorageContext>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: '#FFDA00',
              },
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerTintColor: '#000',
            }}>
            <Stack.Screen
              name="NewOrder"
              component={NewOrder}
              options={{
                title: 'New Order',
              }}
            />
            <Stack.Screen
              name="Menu"
              component={Menu}
              options={{
                title: 'Our Menu',
              }}
            />
            <Stack.Screen
              name="DishDetail"
              component={DishDetail}
              options={{
                title: 'Dish Detail',
              }}
            />
            <Stack.Screen
              name="DishForm"
              component={DishForm}
              options={{
                title: 'Dish Form',
              }}
            />
            <Stack.Screen
              name="OrderSummary"
              component={OrderSummary}
              options={{
                title: 'Order Summary',
              }}
            />
            <Stack.Screen
              name="OrderProgress"
              component={OrderProgress}
              options={{
                title: 'Order Progress',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </StorageContext>
    </>
  );
};

export default App;
