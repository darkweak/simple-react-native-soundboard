import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import Sound from 'react-native-sound';
import { Item as ItemType } from '../../types/Item';
import { mappedSounds } from '../../utils/sound';

interface innerProps {
    size: number;
    item: ItemType;
}

export const Item = ({ size, item }: innerProps) => {
	const tailwind = useTailwind();

    const [sound, setSound] = React.useState<Sound>();

    function playSound(name: string) {
        const sound = mappedSounds[name];
        setSound(sound);
        sound.play();
    }

    React.useEffect(() => {
        return sound ?
            () => sound.release() : undefined
    }, [sound]);

    return (
        <View style={{height: size, width: size}}>
            <View style={tailwind('p-2 h-full w-full')}>
                <TouchableOpacity style={tailwind('border rounded-lg bg-white w-full h-full shadow justify-center items-center')} onPress={() => {
                    if (sound) {
                        sound.stop()
                    }
                    playSound(item.name)
                }}>
                    <Text style={tailwind('text-3xl')}>{ item.image }</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}