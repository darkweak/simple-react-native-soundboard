Simple-Soundboard
-----

This app is here to provide a very simple soundboard written in React-native.
* Auto alphabetical sort.
* Tiny build with the minimal features.

## Setup
```
yarn
```
```
cd ios && pod install && cd -
```
```
yarn ios
```

## Development
```
yarn ios --device # If you have only one connected device
```
```
yarn dev:tailwind # To watch and rebuild styles
```

## How to add more sounds
First you have to place the `.mp3` files in the `src/assets` folder.  
Edit the `sounds.json` file to add the icon associated to the sound

```
{
    "items": [
        ...
        {
            "name": "the_sound_name_without_mp3_extension",
            "image": "your_icon"
        },
        ...
    ]
}
```
Add the sound to the `src/utils/sound.ts` list.
```typescript
// src/utils/sound.ts

const the_sound_name_without_mp3_extension = importSound(require(assetPath + 'the_sound_name_without_mp3_extension.mp3'));

export const mappedSounds: Record<string, any> = {
    //...
    the_sound_name_without_mp3_extension,
    //...
}
```