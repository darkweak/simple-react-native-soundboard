import React, { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";
// import RNStorage from 'react-native-encrypted-storage';

type Store = {
    isSensitiveContentEnabled?: boolean;
    isTextMode?: boolean;
    setStore: Dispatch<SetStateAction<Store>>;
}

const StoreContext = createContext<Store>({ setStore: () => {} });

export const StoreProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [store, setStore] = useState<Store>({setStore: () => {}});
    useEffect(() => {
        // RNStorage.getItem("soundboard.storage.store").then((res) => {
        //     if (res) {
        //         setStore(JSON.parse(res));
        //     }
        // })
    }, []);

    useEffect(() => {
        if (store) {
            // RNStorage.setItem("soundboard.storage.store", JSON.stringify(store));
        }
    }, [store]);

    return (
        <StoreContext.Provider value={{ ...store, setStore }}>
            {children}
        </StoreContext.Provider>
    )
};

export const useStore = () => {
    const store = useContext(StoreContext);

    return store;
}
