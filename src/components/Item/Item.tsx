import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import Sound from 'react-native-sound';
import { Item as ItemType } from '../../types/Item';
import { mappedSounds } from '../../utils/sound';
import { useStore } from '../../context/store';

interface innerProps {
    size: number;
    item: ItemType;
}

export const Item = ({ size, item }: innerProps) => {
  const tailwind = useTailwind();
  const { isTextMode } = useStore();

  const [sound, setSound] = React.useState<Sound>();

  function playSound(item: ItemType) {
    const sound = item.sound ?? mappedSounds[item.name];
    setSound(sound);
    sound.play();
  }

  React.useEffect(() => () => { sound?.release(); }, [sound]);

  return (
    <View style={{height: size, width: size}}>
      <View style={tailwind('p-2 h-full w-full')}>
        <TouchableOpacity style={tailwind('border rounded-lg bg-white w-full h-full shadow justify-center items-center')} onPress={() => {
          if (sound) {
            sound.stop();
          }
          playSound(item);
        }}>
          <Text style={tailwind('text-3xl')}>{ isTextMode ? item.name : item.image }</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};