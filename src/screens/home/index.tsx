import React from 'react';
import { items } from '../../../src/assets/sounds.json';
import { Alphabetical } from '../../components/List/Alphabetical';
import { useStore } from '../../context/store';

const Home = () => {
  const { hiddenDefaultSounds } = useStore();

  return <Alphabetical items={items.filter(item => !(hiddenDefaultSounds ?? []).some(hidden => hidden.image === item.image && hidden.name === item.name))} />;
};

export default Home;
