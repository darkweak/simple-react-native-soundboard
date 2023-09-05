import React from 'react';
import { Button, Switch, Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { useStore } from '../../context/store';
import { CustomSound } from '../../utils/custom';
import { useRescanCustomSounds } from '../../context/sound';
import { displaySuccessAlert } from '../../utils/alert';

const Profile = () => {
  const tailwind = useTailwind();
  const store = useStore();
  const rescan = useRescanCustomSounds();
  const { setStore } = store;

  const deleteAllData = () => {
    new CustomSound().reset().then(() => {
      rescan();
      displaySuccessAlert('Data wiped', 'Your additional content has been deleted successfully.');
    });
  };

  return (
    <View style={tailwind('px-4 font-extrabold')}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 16 }}>
        <Text style={tailwind('pt-2')}>Enable sensitive content</Text>
        <Switch onChange={({ nativeEvent: { value } }) => { setStore({ ...store, isSensitiveContentEnabled: value }); }} value={store?.isSensitiveContentEnabled} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 16 }}>
        <Text style={tailwind('pt-2')}>Enable text mode</Text>
        <Switch onChange={({ nativeEvent: { value } }) => { setStore({ ...store, isTextMode: value }); }} value={store?.isTextMode} />
      </View>
      <View style={tailwind('flex items-center justify-center')}>
        <Button color='red' onPress={deleteAllData} title='Delete all data' />
      </View>
    </View>
  );
};

export default Profile;