import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Item } from '../Item/Item';
import { Item as ItemType } from '../../types/Item';

interface innerProps {
    items: ItemType[];
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 5,
    }
})

export const SimpleList = ({ items }: innerProps) => {
    const [size, setSize] = useState(0);
    return (
    <View style={styles.row} onLayout={({ nativeEvent: { layout: { width } } }) => {setSize((width-10)/4)}}>
        {
            items.map((item, i) => <Item key={i} item={item} size={size} />)
        }
    </View>
)}