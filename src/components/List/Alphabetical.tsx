import React, { useMemo, useState } from 'react';
import { PlatformColor, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SimpleList } from './Simple';
import { useTailwind } from 'tailwind-rn';
import { Item as ItemType } from '../../types/Item';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStore } from '../../context/store';

interface innerProps {
    items: ReadonlyArray<ItemType>;
}

export const Alphabetical = ({ items }: innerProps) => {
    const insets = useSafeAreaInsets();
	const tailwind = useTailwind();
    const { isSensitiveContentEnabled } = useStore();
    const [search, setSearch] = useState('');
    const mappedList = useMemo(() => {
        let list: Record<string, Array<ItemType>> = {};
        items
            .filter(item => isSensitiveContentEnabled || !item.sensitive)
            .filter(item => !search || item.name.includes(search.toLowerCase()) || item.image.includes(search))
            .forEach(item => {
                let index = item.name.charAt(0).toLowerCase();
                if (list[index]) {
                    list[index].push(item)
                } else {
                    list[index] = [item]
                }
            });

        return list;
    }, [isSensitiveContentEnabled, items, search]);

    return (
        <View style={{
            flex: 1,
            paddingTop: insets.top,
            paddingLeft: insets.left,
            paddingRight: insets.right,
        }}>
            <TextInput
                style={styles.input}
                placeholderTextColor={PlatformColor('systemFill')}
                placeholder="Search a sound"
                value={search}
                onChangeText={setSearch}
            />
            <ScrollView>
                {
                    Object.keys(mappedList).sort().map(k => (
                        <View key={k}>
                            <Text style={tailwind('text-3xl pt-2 px-4 font-extrabold')}>{k}</Text>
                            <SimpleList items={mappedList[k]} />
                        </View>
                    ))
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
  input: {
    fontSize: 20,
    margin: 10,
    padding: 10,
    backgroundColor: PlatformColor('label'),
    color: "#000",
    borderRadius: 15,
  },
});
