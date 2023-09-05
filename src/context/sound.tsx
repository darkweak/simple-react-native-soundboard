import React, { createContext, useContext, useEffect, useState } from 'react';
import { Item } from '../types/Item';
import { CustomSound } from '../utils/custom';

type Sound = {
    customSounds?: ReadonlyArray<Item>;
    rescanSounds: () => void;
}

const SoundContext = createContext<Sound>({ rescanSounds: () => {} });

export const SoundProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [customSounds, setCustomSounds] = useState<ReadonlyArray<Item>>([]);
  
  const rescanSounds = () => {
    new CustomSound().getSounds().then(setCustomSounds);
  };

  useEffect(() => {rescanSounds();}, []);

  return (
    <SoundContext.Provider value={{ customSounds, rescanSounds }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useCustomSounds = (): ReadonlyArray<Item> => {
  const { customSounds } = useContext(SoundContext);

  return customSounds ?? [];
};

export const useRescanCustomSounds = () => {
  const { rescanSounds } = useContext(SoundContext);

  return rescanSounds;
};
