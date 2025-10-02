import React from 'react';
import { Text, View, TouchableOpacity, PlatformColor } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import Sound from 'react-native-sound';
import { Item as ItemType } from '../../types/Item';
import { mappedSounds } from '../../utils/sound';
import { useStore } from '../../context/store';
import { displaySuccessAlert } from '../../utils/alert';
import { CustomSound } from '../../utils/custom';
import { useRescanCustomSounds } from '../../context/sound';

interface innerProps {
  size: number;
  item: ItemType;
}

export const Item = ({ size, item }: innerProps) => {
  const tailwind = useTailwind();
  const store = useStore();
  const { isTextMode, setStore } = store;
  const rescan = useRescanCustomSounds();

  const [sound, setSound] = React.useState<Sound>();

  function playSound(item: ItemType) {
    const sound = item.sound ?? mappedSounds[item.name];
    setSound(sound);
    sound.play();
  }

  return (
    <View style={{ height: size, width: size }}>
      <View style={tailwind('p-2 h-full w-full')}>
        <TouchableOpacity
          style={{
            ...tailwind(
              'border rounded-lg w-full h-full shadow justify-center items-center'
            ),
            borderColor: PlatformColor('tertiaryLabel'),
            backgroundColor: PlatformColor('tertiarySystemBackground')
          }}
          onPress={() => {
            if (sound) {
              sound.stop();
            }
            playSound(item);
          }}
          onLongPress={() =>
            displaySuccessAlert(
              'Delete this sound',
              `Do you want to delete ${item.image} ${item.name}?`,
              [
                { text: 'Cancel' },
                {
                  text: 'Confirm',
                  onPress: () => {
                    new CustomSound()
                      .remove(item.name, item.image)
                      .then((found) => {
                        if (!found) {
                          setStore({
                            ...store,
                            hiddenDefaultSounds: [
                              ...(store.hiddenDefaultSounds ?? []),
                              item
                            ]
                          });
                        }
                      })
                      .finally(() => rescan());
                  }
                }
              ]
            )
          }
        >
          <Text style={tailwind('text-3xl')}>
            {isTextMode ? item.name : item.image}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
