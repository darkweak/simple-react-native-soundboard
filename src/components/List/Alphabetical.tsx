import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { SimpleList } from './Simple';
import { useTailwind } from 'tailwind-rn';

interface innerProps {
    items: ItemType[];
}

export const Alphabetical = ({ items }: innerProps) => {
	const tailwind = useTailwind();
    const mappedList = useMemo(() => {
        let list = {};
        items.forEach(item => {
            let index = item.name.charAt(0).toLowerCase();
            if (list[index]) {
                list[index].push(item)
            } else {
                list[index] = [item]
            }
        });

        return list;
    }, [items])

    return (
        <>
            {
                Object.keys(mappedList).sort().map(k => (
                    <View key={k}>
                        <Text style={tailwind('text-3xl pt-2 px-4 font-extrabold')}>{k}</Text>
                        <SimpleList items={mappedList[k]} />
                    </View>
                ))
            }
        </>
    )
}