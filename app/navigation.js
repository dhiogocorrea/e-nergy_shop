import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './src/containers/Home/index';
import Pricing from './src/containers/Pricing';

const Stack = createStackNavigator();

const ROUTES = [
  {
    name: 'Home',
    key: '/',
    component: Home,
    options: {headerShown: false},
  },
  {
    name: 'Pricing',
    key: '/Pricing',
    component: Pricing,
    options: {headerShown: false},
  },
];

export function Navigation() {
  return (
    <React.Fragment>
      <NavigationContainer>
        <Stack.Navigator>
          {ROUTES.map((props, i) => {
            return <Stack.Screen {...props} />;
          })}
        </Stack.Navigator>
      </NavigationContainer>
    </React.Fragment>
  );
}
