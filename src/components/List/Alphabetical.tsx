import React, { useMemo, useState } from 'react';
import { PlatformColor, RefreshControl, ScrollView, Text, View } from 'react-native';
import { SimpleList } from './Simple';
import { useTailwind } from 'tailwind-rn';
import { Item as ItemType } from '../../types/Item';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStore } from '../../context/store';
import { Input } from '../form/input';
import { useCustomSounds, useRescanCustomSounds } from '../../context/sound';

interface innerProps {
    items: ReadonlyArray<ItemType>;
}

export const Alphabetical = ({ items }: innerProps) => {
  const insets = useSafeAreaInsets();
  const tailwind = useTailwind();
  const { isSensitiveContentEnabled } = useStore();
  const [search, setSearch] = useState('');
  const customSounds = useCustomSounds();
  const rescan = useRescanCustomSounds();
  const mappedList = useMemo(() => {
    const list: Record<string, Array<ItemType>> = {};
    [...items, ...customSounds].sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
      .filter(item => isSensitiveContentEnabled || !item.sensitive)
      .filter(item => !search || item.name.includes(search.toLowerCase()) || item.image.includes(search))
      .forEach(item => {
        const index = item.name.charAt(0).toLowerCase();
        if (list[index]) {
          list[index].push(item);
        } else {
          list[index] = [item];
        }
      });

    return list;
  }, [customSounds, isSensitiveContentEnabled, items, search]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setIsRefreshing(true);
    rescan();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View style={{
      flex: 1,
      paddingTop: insets.top,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    }}>
      <View style={tailwind('px-4 py-2')}>
        <Input placeholder='Search a sound' setValue={setSearch} value={search} />
      </View>
      <ScrollView refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }>
        {
          Object.keys(mappedList).sort().map(k => (
            <View key={k}>
              <Text style={{...tailwind('text-3xl pt-2 px-4 font-extrabold'), color: PlatformColor('tertiaryLabel')}}>{k}</Text>
              <SimpleList items={mappedList[k]} />
            </View>
          ))
        }
      </ScrollView>
    </View>
  );
};
