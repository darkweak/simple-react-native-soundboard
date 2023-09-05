import React from 'react';
import { items } from '../../../src/assets/sounds.json';
import { Alphabetical } from '../../components/List/Alphabetical';

const Home = () => {
  return <Alphabetical items={items} />;
};

export default Home;