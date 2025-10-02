import React from 'react';
import { initializeSounds } from './src/utils/sound';
import { StatusBar, useColorScheme } from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer
} from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import utilities from './tailwind.json';
import Icon from 'react-native-vector-icons/Feather';
import { TailwindProvider } from 'tailwind-rn';
import { SoundProvider } from './src/context/sound';
import { StoreProvider } from './src/context/store';
import AddSound from './src/screens/add_sound';
import Home from './src/screens/home';
import Profile from './src/screens/profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

initializeSounds();

const tailwindExtensions = {
  shadow: {
    style: {
      shadowColor: '#000',
      shadowOffset: {
        width: 2,
        height: 2
      },
      shadowOpacity: 0.15,
      shadowRadius: 2,
      elevation: 2
    }
  }
};

const Tab = createBottomTabNavigator();

export default function App() {
  const scheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <StatusBar barStyle='default' />
      <StoreProvider>
        <SoundProvider>
          <TailwindProvider utilities={{ ...utilities, ...tailwindExtensions }}>
            <NavigationContainer
              theme={scheme === 'dark' ? DarkTheme : DefaultTheme}
            >
              <Tab.Navigator>
                <Tab.Screen
                  name='Home'
                  component={Home}
                  key='home'
                  options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                      <Icon name='home' color={color} size={size} />
                    )
                  }}
                />
                <Tab.Screen
                  name='Add sound'
                  key='add_sound'
                  component={AddSound}
                  options={{
                    tabBarIcon: ({ color, size }) => (
                      <Icon name='plus-square' color={color} size={size} />
                    )
                  }}
                />
                <Tab.Screen
                  name='Profile'
                  key='profile'
                  component={Profile}
                  options={{
                    tabBarIcon: ({ color, size }) => (
                      <Icon name='user' color={color} size={size} />
                    )
                  }}
                />
              </Tab.Navigator>
            </NavigationContainer>
          </TailwindProvider>
        </SoundProvider>
      </StoreProvider>
    </SafeAreaProvider>
  );
}
