import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Alphabetical } from './src/components/List/Alphabetical';
import { items } from './src/assets/sounds.json';
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

export default function App() {
  return (
    <TailwindProvider utilities={{...utilities, ...tailwindExtensions}}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Alphabetical 
            items={items}
          />
        </ScrollView>
      </SafeAreaView>
	</TailwindProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});
