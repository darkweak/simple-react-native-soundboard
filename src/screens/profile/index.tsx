import React, { useEffect, useState } from "react";
import { Switch, Text, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useStore } from "../../context/store";

export const Profile = () => {
	const tailwind = useTailwind();
    const store = useStore();
    const { setStore } = store;

    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 16 }}>
                <Text style={tailwind('pt-2 px-4 font-extrabold')}>Enable sensitive content</Text>
                <Switch onChange={({ nativeEvent: { value } }) => { setStore({ ...store, isSensitiveContentEnabled: value }) }} value={store?.isSensitiveContentEnabled} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 16 }}>
                <Text style={tailwind('pt-2 px-4 font-extrabold')}>Enable text mode</Text>
                <Switch onChange={({ nativeEvent: { value } }) => { setStore({ ...store, isTextMode: value }) }} value={store?.isTextMode} />
            </View>
        </View>
    )
}
