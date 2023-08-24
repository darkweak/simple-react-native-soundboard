import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { Profile } from './src/screens/profile';
import { Home } from './src/screens/home';
import { StoreProvider } from './src/context/store';
import { TailwindProvider } from 'tailwind-rn';
import utilities from './tailwind.json';
import { initializeSounds } from './src/utils/sound';

initializeSounds()

const tailwindExtensions = {
  "shadow": {
      style: {
          shadowColor: '#000',
          shadowOffset: {
              width: 2,
              height: 2,
          },
          shadowOpacity: 0.15,
          shadowRadius: 2,
          elevation: 2,
      }
  }
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" translucent={true} />
      <StoreProvider>
        <TailwindProvider utilities={{...utilities, ...tailwindExtensions}}>
          <NavigationContainer>
            <Tab.Navigator>
              <Tab.Screen 
                name="Home"
                component={Home} 
                key="home"
                options={{
                  headerShown: false,
                  tabBarIcon: ({ color, size }) => (
                    <Icon name="home" color={color} size={size} />
                  ), 
                }} />
              <Tab.Screen 
                name="Profile" 
                key="profile"
                component={Profile}
                options={{ 
                  tabBarIcon: ({ color, size }) => (
                    <Icon name="user" color={color} size={size} />
                  ), 
                }} />
            </Tab.Navigator>
          </NavigationContainer>
        </TailwindProvider>
      </StoreProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});
