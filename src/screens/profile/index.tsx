import React, { useMemo, useState } from 'react';
import { Button, FlatList, Modal, PlatformColor, SafeAreaView, Switch, Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { useStore } from '../../context/store';
import { CustomSound } from '../../utils/custom';
import { items } from '../../../src/assets/sounds.json';
import { useCustomSounds, useRescanCustomSounds } from '../../context/sound';
import { displaySuccessAlert } from '../../utils/alert';
import { clearShortcuts, setShortcuts } from '../../utils/shortcut';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Item } from '../../types/Item';

const Profile = () => {
  const color = PlatformColor('label');
  const tailwind = useTailwind();
  const store = useStore();
  const [visible, setVisible] = useState<boolean>(false);
  const customSounds = useCustomSounds();
  const rescan = useRescanCustomSounds();
  const [shortcutSounds, setShortcutSounds] = useState<Record<string, Item>>(store.soundsShortcut?.reduce((acc, cur) => {
    acc[`${cur.image} - ${cur.name}`] = cur;
    return acc;
  }, {} as Record<string, Item>) ?? {});
  const { setStore } = store;

  const deleteAllData = () => {
    new CustomSound().reset().then(() => {
      rescan();
      displaySuccessAlert('Data wiped', 'Your additional content has been deleted successfully.');
    });
  };

  const sounds = useMemo(() => {
    return [...customSounds, ...items]
      .sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
      .map(item => ({ ...item, label: `${item.image} - ${item.name}`, value: `${item.image} - ${item.name}` }));
  }, []);

  const limited = useMemo(() => Object.keys(shortcutSounds).length >= 10, [shortcutSounds]);

  const updateShortcuts = () => {
    clearShortcuts().then(() => {
      const soundsShortcut = Object.values(shortcutSounds);
      setStore({ ...store, soundsShortcut: soundsShortcut });
      setShortcuts(soundsShortcut);
    });
  };

  return (
    <View style={tailwind('px-4 font-extrabold')}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 16 }}>
        <Text style={{ ...tailwind('pt-2'), color }}>Enable sensitive content</Text>
        <Switch onChange={({ nativeEvent: { value } }) => { setStore({ ...store, isSensitiveContentEnabled: value }); }} value={store?.isSensitiveContentEnabled} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 16 }}>
        <Text style={{ ...tailwind('pt-2'), color }}>Enable text mode</Text>
        <Switch onChange={({ nativeEvent: { value } }) => { setStore({ ...store, isTextMode: value }); }} value={store?.isTextMode} />
      </View>
      <View style={tailwind('justify-between pt-8')}>
        {/*
        TODO: see if it's still relevant
        <Button onPress={() => setVisible(true)} title='Set shortcuts' />
        */}
        <Modal
          presentationStyle='pageSheet'
          animationType='slide'
          visible={visible}
          onRequestClose={() => {
            setVisible(false);
            updateShortcuts();
          }}
        >
          <SafeAreaView>
            <Text style={tailwind('text-xl m-auto font-bold py-4')}>Select sounds to shortcuts</Text>
            <FlatList data={sounds} renderItem={({ item }) => (
              <View style={tailwind('py-4 px-4 border-t border-slate-200')}>
                <BouncyCheckbox
                  isChecked={!!shortcutSounds[item.label]}
                  disabled={limited && !shortcutSounds[item.label]}
                  fillColor={'blue'}
                  onPress={(isChecked: boolean) => {
                    if (!isChecked) {
                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
                      const { [item.label]: _, ...rest } = shortcutSounds;
                      setShortcutSounds({ ...rest });
                      return;
                    }

                    setShortcutSounds({ ...shortcutSounds, [item.label]: item });
                  }}
                  text={item.label} 
                  textStyle={{ fontSize: 16, textDecorationLine: 'none', fontWeight: 'bold' }}
                />
              </View>
            )} />
          </SafeAreaView>
        </Modal>
      </View>
      <View style={tailwind('flex items-center justify-center pt-4')}>
        <Button color='red' onPress={deleteAllData} title='Delete all data' />
      </View>
    </View>
  );
};

export default Profile;