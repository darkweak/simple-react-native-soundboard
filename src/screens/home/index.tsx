import React from "react";
import { items } from '../../../src/assets/sounds.json';
import { Alphabetical } from "../../components/List/Alphabetical";

export const Home = () => {
    return <Alphabetical items={items} />
}
